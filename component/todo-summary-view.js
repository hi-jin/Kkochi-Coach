import Component from "../core/component.js";
import HomeData from "../data/home-data.js";
import { loadClearLog, loadTodoList } from "../repo/todo-repo.js";
import { compareDate } from "../util/date-util.js";

export default class TodoSummaryView extends Component {
    /**
     * 
     * @param {HTMLElement} todoSummaryView 
     */
    constructor(todoSummaryView) {
        super();
        this.html = todoSummaryView;
        const homeData = new HomeData();
        this.setState({ "homeData": homeData });
        homeData.addListener(() => this.setState({ "homeData": homeData }));
        loadTodoList().then(data => homeData.todoList = data, reason => alert(reason));
        loadClearLog().then(data => homeData.clearLog = data, reason => alert(reason));
    }

    render() {
        super.render();
        const summaryWrapper = document.createElement("div");
        summaryWrapper.id = "todo-summary-view_summary-wrapper";
        summaryWrapper.appendChild(this._todoSummary.call(this));
        this.html.appendChild(summaryWrapper);
        this.html.appendChild(this._addNewGoal.call(this));
    }

    _todoSummary() {
        const div = document.createElement("div");
        div.classList.add("todo-summary-view_todo-summary");

        const todoList = this.state["homeData"].todoList.filter(todo => todo.repeatDayOfWeek.includes(this.state["homeData"].selectedDate.getDay()));
        const clearLog = this.state["homeData"].clearLog;
        for (const todo of todoList) {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo-summary-view_todo");

            const goalSpan = document.createElement("span");
            goalSpan.classList.add("todo-summary-view_goal-span");
            goalSpan.appendChild(document.createTextNode(`[${todo.goal}]`));
            const whatSpan = document.createElement("span");
            whatSpan.classList.add("todo-summary-view_what-span");
            whatSpan.appendChild(document.createTextNode(todo.what));

            const checkSpan = document.createElement("span");
            checkSpan.classList.add("todo-summary-view_check-span");

            const filteredLog = clearLog.filter(log => log.todoId === todo.id).filter(log => compareDate(log.date, this.state["homeData"].selectedDate));
            if (filteredLog.length > 0) {
                checkSpan.setAttribute("cleared", "true");
            }

            todoDiv.appendChild(goalSpan);
            todoDiv.appendChild(whatSpan);
            todoDiv.appendChild(checkSpan);

            todoDiv.addEventListener("click", () => {
                this.state["homeData"].selectedTodo = todo;
            });

            div.appendChild(todoDiv);
        }

        return div;
    }

    _addNewGoal() {
        const input = document.createElement("input");
        input.id = "todo-summary-view_add-new-goal";
        input.type = "button";
        input.value = "새 목표 추가하기";

        input.addEventListener("click", () => {
            location.href = "./add-todo.html";
        });

        return input;
    }
}