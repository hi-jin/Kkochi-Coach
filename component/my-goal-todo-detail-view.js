import Component from "../core/component.js";
import MyGoalData from "../data/my-goal-data.js";
import Post from "../domain/post.js";
import { addPost } from "../repo/post-repo.js";
import { dateToString } from "../util/date-util.js";

export default class MyGoalTodoDetailView extends Component {
    constructor(myGoalTodoDetailView) {
        super();
        this.html = myGoalTodoDetailView;
        const myGoalData = new MyGoalData();
        this.setState({ "myGoalData": myGoalData });
        myGoalData.addListener(() => this.setState({ "myGoalData": myGoalData }));
    }

    render() {
        super.render();

        if (this.myGoalData.selectedTodo === null) return;

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
        div.appendChild(document.createTextNode(this.myGoalData.selectedTodo.what));
        return div;
    }

    _whereWhenDiv() {
        const div = document.createElement("div");
        div.classList.add("todo-detail-view_div");
        div.appendChild(document.createTextNode(`어디에서 : ${this.myGoalData.selectedTodo.where}`));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createTextNode(`언제 : ${this.myGoalData.selectedTodo.when}`));
        return div;
    }

    _repeatDayOfWeekDiv() {
        const div = document.createElement("div");
        div.classList.add("todo-detail-view_div");

        div.appendChild(document.createTextNode("반복 요일"));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));


        const repeatDayOfWeek = [false, false, false, false, false, false, false];
        for (const i of this.myGoalData.selectedTodo.repeatDayOfWeek) {
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
        div.appendChild(document.createTextNode(this.myGoalData.selectedTodo.desc));

        return div;
    }

    _buttonDiv() {
        const div = document.createElement("div");
        div.appendChild(removeButton.call(this));
        if (this.myGoalData.selectedTodo.endDate === null) div.appendChild(finishButton.call(this));
        else div.appendChild(shareButton.call(this));
        div.appendChild(modifyButton.call(this));
        return div;

        function shareButton() {
            const input = document.createElement("input");
            input.type = "button";
            input.id = "todo-detail-view_finish-button";
            input.value = "공유하기";

            input.addEventListener("click", () => {
                if (!confirm("공유하시겠어요?")) return;

                const selectedTodo = this.myGoalData.selectedTodo;
                if (selectedTodo === null) return;

                const clearSet = new Set();
                for (const log of this.myGoalData.clearLog) {
                    clearSet.add(dateToString(log.date));
                }
                let clearCount = 0;
                let failCount = 0;
                for (let date = selectedTodo.startDate; date <= new Date(); date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)) {
                    if (selectedTodo.repeatDayOfWeek.includes(date.getDay())) {
                        if (clearSet.has(dateToString(date))) {
                            clearCount += 1;
                        } else {
                            failCount += 1;
                        }
                    }
                }

                const post = new Post(
                    "-1",
                    "-1",
                    selectedTodo.goal,
                    selectedTodo.what,
                    selectedTodo.where,
                    selectedTodo.when,
                    selectedTodo.repeatDayOfWeek,
                    selectedTodo.desc,
                    clearCount,
                    failCount,
                    0,
                );

                addPost(post).then(
                    () => alert("공유되었습니다."),
                    reason => alert(reason),
                );
            });

            return input;
        }

        function removeButton() {
            const input = document.createElement("input");
            input.type = "button";
            input.id = "todo-detail-view_remove-button";
            input.value = "삭제하기";

            input.addEventListener("click", () => {
                if (!confirm("삭제하면 복구할 수 없습니다. 삭제하시겠어요?")) return;
            });

            return input;
        }

        function finishButton() {
            const input = document.createElement("input");
            input.type = "button";
            input.id = "todo-detail-view_finish-button";
            input.value = "목표종료";

            input.addEventListener("click", () => {
                if (!confirm("종료한 목표는 '나의 목표' 화면에서 확인할 수 있습니다. 종료하시겠어요?")) return;
            });

            return input;
        }

        function modifyButton() {
            const input = document.createElement("input");
            input.type = "button";
            input.id = "todo-detail-view_modify-button";
            input.value = "수정하기";

            input.addEventListener("click", () => {
                if (this.myGoalData.selectedTodo === null) return;
                const params = new URLSearchParams();
                params.set("selected-todo", encodeURIComponent(this.myGoalData.selectedTodo.toJson()));
                location.href = `./add-todo.html?${params}`
            });

            return input;
        }
    }

    /**
     * @returns {MyGoalData} 
     */
    get myGoalData() {
        return this.state["myGoalData"];
    }
}