import Component from "../core/component.js";
import MyGoalData from "../data/my-goal-data.js";
import Todo from "../domain/todo.js";
import { dateToString } from "../util/date-util.js";

export default class MyGoalDetailView extends Component {
    /**
     * 
     * @param {HTMLElement} myGoalDetailView 
     */
    constructor(myGoalDetailView) {
        super();
        this.html = myGoalDetailView;
        const myGoalData = new MyGoalData();
        this.setState({ "myGoalData": myGoalData });
        myGoalData.addListener(() => this.setState({
            "myGoalData": myGoalData,
        }));
    }

    render() {
        super.render();
        if (this.myGoalData.selectedGoal === null) return;
        if (this.todoList.length === 0) return;
        this.html.appendChild(this._title.call(this));
        this.html.appendChild(document.createElement("br"));
        this.html.appendChild(document.createTextNode("(클릭하여 자세히 확인해보세요!)"));
        this.html.appendChild(document.createElement("br"));
        this.html.appendChild(document.createElement("br"));
        this.html.appendChild(this._todoListDiv.call(this));
    }

    _title() {
        const span = document.createElement("span");
        span.id = "my-goal-detail-view_title";
        span.appendChild(document.createTextNode(`나의 목표 [${this.myGoalData.selectedGoal}]`));
        return span;
    }

    _todoListDiv() {
        const div = document.createElement("div");
        div.id = "my-goal-detail-view_todo-list-div";

        const sorted = this.todoList.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        for (const todo of sorted) {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("my-goal-detail-view_todo-div");
            todoDiv.appendChild(document.createTextNode(todo.what));

            todoDiv.addEventListener("click", () => {
                this.myGoalData.selectedTodo = todo;
            });

            if (this.myGoalData.selectedTodo === todo) {
                todoDiv.setAttribute("selected", "true");
            }

            div.appendChild(todoDiv);
        }

        return div;
    }

    /**
     * @returns {Array<Todo>}
     */
    get todoList() {
        const selectedGoal = this.myGoalData.selectedGoal;
        const todoList = this.myGoalData.goalTodoMap.get(selectedGoal);
        return todoList ?? [];
    }

    /**
     * @returns {MyGoalData}
     */
    get myGoalData() {
        return this.state["myGoalData"];
    }
}
