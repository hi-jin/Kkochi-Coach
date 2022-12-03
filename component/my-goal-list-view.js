import Component from "../core/component.js";
import MyGoalData from "../data/my-goal-data.js";
import ClearLog from "../domain/clear-log.js";
import Todo from "../domain/todo.js";
import { loadClearLog, loadTodoList } from "../repo/todo-repo.js";

export default class MyGoalListView extends Component {
    /**
     * 
     * @param {HTMLElement} myGoalListView 
     */
    constructor(myGoalListView) {
        super();
        this.html = myGoalListView;
        const myGoalData = new MyGoalData();
        this.setState({ "myGoalData": myGoalData });
        myGoalData.addListener(() => this.setState({ "myGoalData": myGoalData }));
        Promise.all([
            loadTodoList(),
            loadClearLog()
        ]).then(data => {
            myGoalData.todoList = data[0];
            myGoalData.clearLog = data[1];
        });
    }

    render() {
        super.render();
        this.html.appendChild(this._scrollDiv.call(this));
    }

    _scrollDiv() {
        const div = document.createElement("div");
        div.id = "my-goal-list-view_scroll-div";

        for (const goal of this.myGoalData.goalTodoMap.keys()) {
            const goalDiv = document.createElement("div");
            goalDiv.classList.add("my-goal-list-view_goal-div");
            goalDiv.appendChild(document.createTextNode(goal));
            const todoCount = document.createElement("span");
            todoCount.classList.add("my-goal-list-view_todo-count");
            todoCount.appendChild(document.createTextNode(" [" + this.myGoalData.goalTodoMap.get(goal).length + "개의 목표]"));
            goalDiv.appendChild(todoCount);
            goalDiv.addEventListener("click", () => {
                this.myGoalData.selectedGoal = goal;
                this.myGoalData.selectedTodo = null;
            });
            if (this.myGoalData.selectedGoal === goal) {
                goalDiv.setAttribute("selected", "true");
            }
            div.appendChild(goalDiv);
        }

        return div;
    }

    /**
     * @returns {MyGoalData}
     */
    get myGoalData(){
        return this.state["myGoalData"];
    }
}