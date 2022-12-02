import Component from "../core/component.js";
import HomeData from "../data/home-data.js";
import Todo from "../domain/todo.js";
import { clearTodo, finishTodo, loadClearLog, loadTodoList, removeTodo } from "../repo/todo-repo.js";
import { dateToString } from "../util/date-util.js";

export default class TodoDetailView extends Component {
    /**
     * 
     * @param {HTMLElement} todoDetailView 
     */
    constructor(todoDetailView) {
        super();
        this.html = todoDetailView;
        const homeData = new HomeData();
        this.setState({ "homeData": homeData });
        homeData.addListener(() => this.setState({ "homeData": homeData }));
    }

    render() {
        super.render();
        if (this.selectedTodo === null) return;

        this.html.appendChild(this._whatDiv.call(this));
        this.html.appendChild(this._whereWhenDiv.call(this));
        this.html.appendChild(this._repeatDayOfWeekDiv.call(this));
        this.html.appendChild(this._descDiv.call(this));
        this.html.appendChild(this._buttonDiv.call(this));
    }

    _whatDiv() {
        const div = document.createElement("div");
        div.id = "todo-detail-view_what";
        div.classList.add("todo-detail-view_div");
        div.appendChild(document.createTextNode(this.selectedTodo.what));
        return div;
    }

    _whereWhenDiv() {
        const div = document.createElement("div");
        div.classList.add("todo-detail-view_div");
        div.appendChild(document.createTextNode(`어디에서 : ${this.selectedTodo.where}`));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createTextNode(`언제 : ${this.selectedTodo.when}`));
        return div;
    }

    _repeatDayOfWeekDiv() {
        const div = document.createElement("div");
        div.classList.add("todo-detail-view_div");

        div.appendChild(document.createTextNode("반복 요일"));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));


        const repeatDayOfWeek = [false, false, false, false, false, false, false];
        for (const i of this.selectedTodo.repeatDayOfWeek) {
            repeatDayOfWeek[i] = true;
        }

        const dayOfWeekString = ["일", "월", "화", "수", "목", "금", "토"];
        for (let i = 0; i < 7; i++) {
            const span = document.createElement("span");
            span.classList.add("todo-detail-view_repeat-day-of-week_element")
            span.appendChild(document.createTextNode(dayOfWeekString[i]));
            if (repeatDayOfWeek[i]) {
                span.setAttribute("selected", "true");
            }

            span.addEventListener("click", () => {
                if (repeatDayOfWeek[i]) {
                    repeatDayOfWeek[i] = false;
                    this.setState({ "repeatDayOfWeek": repeatDayOfWeek });
                } else {
                    repeatDayOfWeek[i] = true;
                    this.setState({ "repeatDayOfWeek": repeatDayOfWeek });
                }
            });

            div.appendChild(span);
        }

        return div;
    }

    _descDiv() {
        const div = document.createElement("div");
        div.classList.add("todo-detail-view_div");

        div.appendChild(document.createTextNode("상세 내용"));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createTextNode(this.selectedTodo.desc));

        return div;
    }

    _buttonDiv() {
        const div = document.createElement("div");
        div.appendChild(removeButton.call(this));
        div.appendChild(finishButton.call(this));
        div.appendChild(modifyButton.call(this));
        div.appendChild(clearButton.call(this));
        return div;

        function removeButton() {
            const input = document.createElement("input");
            input.type = "button";
            input.id = "todo-detail-view_remove-button";
            input.value = "삭제하기";

            input.addEventListener("click", () => {
                removeTodo(this.selectedTodo.id).then(
                    data => {
                        this.state["homeData"].selectedTodo = null;
                        loadTodoList().then(value => this.state["homeData"].todoList = value);
                    },
                    reason => alert(reason),
                )
            });

            return input;
        }

        function finishButton() {
            const input = document.createElement("input");
            input.type = "button";
            input.id = "todo-detail-view_finish-button";
            input.value = "목표종료";

            input.addEventListener("click", () => {
                finishTodo(this.selectedTodo.id).then(
                    data => {
                        this.state["homeData"].selectedTodo = null;
                        loadTodoList().then(value => this.state["homeData"].todoList = value);
                    },
                    reason => alert(reason),
                );
            });

            return input;
        }

        function modifyButton() {
            const input = document.createElement("input");
            input.type = "button";
            input.id = "todo-detail-view_modify-button";
            input.value = "수정하기";

            input.addEventListener("click", () => {
                if (this.selectedTodo === null) return;
                const params = new URLSearchParams();
                params.set("selected-todo", encodeURIComponent(this.selectedTodo.toJson()));
                location.href = `./add-todo.html?${params}`
            });

            return input;
        }

        function clearButton() {
            const input = document.createElement("input");
            input.type = "button";
            input.id = "todo-detail-view_clear-button";
            input.value = "도전성공";

            input.addEventListener("click", () => {
                if (this.selectedTodo === null) return;
                clearTodo(this.selectedTodo.id, dateToString(this.state["homeData"].selectedDate)).then(
                    () => {
                        loadTodoList().then(data => this.state["homeData"].todoList = data, reason => alert(reason));
                        loadClearLog().then(data => this.state["homeData"].clearLog = data, reason => alert(reason));
                    },
                    reason => alert(reason),
                );
            })

            return input;
        }
    }

    /**
     * @returns {Todo|null}
     */
    get selectedTodo() {
        return this.state["homeData"].selectedTodo;
    }
}