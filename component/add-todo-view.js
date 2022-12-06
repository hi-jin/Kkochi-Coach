import Component from "../core/component.js";
import Todo from "../domain/todo.js";
import { addTodo, modifyTodo } from "../repo/todo-repo.js";
import { myPrompt } from "../util/my-prompt.js";

export default class AddTodoView extends Component {
    /**
     * 
     * @param {HTMLElement} addTodoView 
     */
    constructor(addTodoView) {
        super();
        this.html = addTodoView;
        this.setState({
            "goal": "",
            "what": "",
            "where": "",
            "when": "",
            "repeatDayOfWeek": [false, false, false, false, false, false, false],
            "desc": "",
        });
        this.loadFromUrl.call(this);
    }

    /**
     * 수정하기를 통해 진입 시, searchParam으로 Todo 객체가 전달됨
     */
    loadFromUrl() {
        const url = new URL(location.href);
        const urlTodo = url.searchParams.get("selected-todo");
        if (urlTodo === null) return;
        const objTodo = Todo.fromJson(JSON.parse(decodeURIComponent(urlTodo)));
        if (objTodo.id === undefined || objTodo.id === null) return;

        this.setTodoState.call(this, objTodo);
    }

    /**
     * 
     * @param {Todo} todo 
     */
    setTodoState(todo) {
        const repeatDayOfWeek = [false, false, false, false, false, false, false];
        todo.repeatDayOfWeek.forEach(idx => repeatDayOfWeek[idx] = true);
        this.setState({
            "goal": todo.goal,
            "what": todo.what,
            "where": todo.where,
            "when": todo.when,
            "repeatDayOfWeek": repeatDayOfWeek,
            "desc": todo.desc,
            "modifyId": todo.id,  // modify Id가 설정되면 수정하기 모드
            "startDate": todo.startDate,
        });
    }

    render() {
        super.render();
        this.html.appendChild(this._goal.call(this));
        this.html.appendChild(this._what.call(this));
        this.html.appendChild(this._where.call(this));
        this.html.appendChild(this._when.call(this));
        this.html.appendChild(this._repeatDayOfWeek.call(this));
        this.html.appendChild(this._desc.call(this));
        this.html.appendChild(this._cancel.call(this));
        this.html.appendChild(this._submit.call(this));
    }

    _goal() {
        const div = document.createElement("div");
        div.id = "add-todo-view_goal";
        div.classList.add("add-todo-view_input");
        div.appendChild(title.call(this));
        div.appendChild(body.call(this));

        div.addEventListener("click", async () => {
            const input = await myPrompt("상위 목표를 입력해주세요.", "기존 목표에서 선택하거나 새로 추가할 수 있습니다.");
            if (input === false) return;
            if (input.trim() === "") {
                this.setState({ "goal": "" });
                return;
            }
            this.setState({ "goal": input.trim() });
        });

        return div;

        function title() {
            const span = document.createElement("span");
            span.classList.add("add-todo-view_input_title");
            span.appendChild(document.createTextNode("상위 목표 : "));
            return span;
        }

        function body() {
            const span = document.createElement("span");
            span.classList.add("add-todo-view_input_body");
            const goal = this.state["goal"];
            if (goal === "") {
                span.appendChild(document.createTextNode("기존 목표에서 선택하거나 추가해주세요"));
            } else {
                span.appendChild(document.createTextNode(goal));
            }
            return span;
        }
    }

    _what() {
        const div = document.createElement("div");
        div.id = "add-todo-view_what";
        div.classList.add("add-todo-view_input");
        div.appendChild(title.call(this));
        div.appendChild(body.call(this));

        div.addEventListener("click", async () => {
            const input = await myPrompt("작은 목표를 입력해주세요.", "작고 간단할 수록 좋습니다.");
            if (input === false) return;
            if (input.trim() === "") {
                this.setState({ "what": "" });
                return;
            }
            this.setState({ "what": input.trim() });
        });

        return div;

        function title() {
            const span = document.createElement("span");
            span.classList.add("add-todo-view_input_title");
            span.appendChild(document.createTextNode("목표 : "));
            return span;
        }

        function body() {
            const span = document.createElement("span");
            span.classList.add("add-todo-view_input_body");
            const what = this.state["what"];
            if (what === "") {
                span.appendChild(document.createTextNode("상위 목표를 이루기 위한 '작은' 목표를 입력해주세요"));
            } else {
                span.appendChild(document.createTextNode(what));
            }
            return span;
        }
    }

    _where() {
        const div = document.createElement("div");
        div.id = "add-todo-view_where";
        div.classList.add("add-todo-view_input");
        div.appendChild(title.call(this));
        div.appendChild(body.call(this));

        div.addEventListener("click", async () => {
            const input = await myPrompt("목표를 수행할 장소를 입력하세요.", "");
            if (input === false) return;
            if (input.trim() === "") {
                this.setState({ "where": "" });
                return;
            }
            this.setState({ "where": input.trim() });
        });

        return div;

        function title() {
            const span = document.createElement("span");
            span.classList.add("add-todo-view_input_title");
            span.appendChild(document.createTextNode("어디에서 : "));
            return span;
        }

        function body() {
            const span = document.createElement("span");
            span.classList.add("add-todo-view_input_body");
            const where = this.state["where"];
            if (where === "") {
                span.appendChild(document.createTextNode("목표를 수행할 장소를 입력하세요"));
            } else {
                span.appendChild(document.createTextNode(where));
            }
            return span;
        }
    }

    _when() {
        const div = document.createElement("div");
        div.id = "add-todo-view_when";
        div.classList.add("add-todo-view_input");
        div.appendChild(title.call(this));
        div.appendChild(body.call(this));

        div.addEventListener("click", async () => {
            const input = await myPrompt("목표를 수행할 시각 혹은 상황을 입력하세요.", "");
            if (input === false) return;
            if (input.trim() === "") {
                this.setState({ "when": "" });
                return;
            }
            this.setState({ "when": input.trim() });
        });

        return div;

        function title() {
            const span = document.createElement("span");
            span.classList.add("add-todo-view_input_title");
            span.appendChild(document.createTextNode("언제 : "));
            return span;
        }

        function body() {
            const span = document.createElement("span");
            span.classList.add("add-todo-view_input_body");
            const when = this.state["when"];
            if (when === "") {
                span.appendChild(document.createTextNode("목표를 수행할 시각 혹은 상황을 입력하세요"));
            } else {
                span.appendChild(document.createTextNode(when));
            }
            return span;
        }
    }

    _repeatDayOfWeek() {
        const div = document.createElement("div");
        div.id = "add-todo-view_repeat-day-of-week";
        div.classList.add("add-todo-view_input");
        div.appendChild(title.call(this));
        div.appendChild(body.call(this));

        return div;

        function title() {
            const div = document.createElement("div");
            div.classList.add("add-todo-view_input_title");
            div.appendChild(document.createTextNode("반복 요일 (반복할 요일을 선택해주세요)"));
            return div;
        }

        function body() {
            const div = document.createElement("div");
            div.classList.add("add-todo-view_input_body");
            const repeatDayOfWeek = this.state["repeatDayOfWeek"];

            const dayOfWeekString = ["일", "월", "화", "수", "목", "금", "토"];
            for (let i = 0; i < 7; i++) {
                const span = document.createElement("span");
                span.classList.add("add-todo-view_repeat-day-of-week_element")
                span.appendChild(document.createTextNode(dayOfWeekString[i]));
                if (repeatDayOfWeek[i]) {
                    span.setAttribute("selected", "true");
                }

                span.addEventListener("click", () => {
                    if (repeatDayOfWeek[i]) {
                        repeatDayOfWeek[i] = false;
                        this.setState({"repeatDayOfWeek": repeatDayOfWeek});
                    } else {
                        repeatDayOfWeek[i] = true;
                        this.setState({"repeatDayOfWeek": repeatDayOfWeek});
                    }
                });

                div.appendChild(span);
            }

            return div;
        }
    }

    _desc() {
        const div = document.createElement("div");
        div.id = "add-todo-view_desc";
        div.classList.add("add-todo-view_input");
        div.appendChild(title.call(this));
        div.appendChild(body.call(this));

        div.addEventListener("click", async () => {
            const input = await myPrompt("목표를 진행할 때 참고하면 좋을 상세 내용을 작성해주세요.", "자신의 다짐을 작성해도 좋습니다.");
            if (input === false) return;
            if (input.trim() === "") {
                this.setState({ "desc": "" });
                return;
            }
            this.setState({ "desc": input.trim() });
        });

        return div;

        function title() {
            const div = document.createElement("div");
            div.classList.add("add-todo-view_input_title");
            div.appendChild(document.createTextNode("상세 내용"));
            return div;
        }

        function body() {
            const span = document.createElement("span");
            span.classList.add("add-todo-view_input_body");
            const desc = this.state["desc"];
            if (desc === "") {
                span.appendChild(document.createTextNode("목표를 진행할 때 참고하면 좋을 상세 내용을 작성해주세요."));
            } else {
                span.appendChild(document.createTextNode(desc));
            }
            return span;
        }
    }

    _cancel() {
        const input = document.createElement("input");
        input.id = "add-todo-view_cancel";
        input.type = "button";
        input.value = "취소하기";
        input.addEventListener("click", async () => {
            location.href = "./home.html";
        });
        return input;
    }

    _submit() {
        const input = document.createElement("input");
        input.id = "add-todo-view_submit";
        input.type = "button";
        input.value = (this.state["modifyId"] === undefined || this.state["modifyId"] === null) ? "추가하기" : "수정하기";
        input.addEventListener("click", async () => {
            const goal = this.state["goal"];
            const what = this.state["what"];
            const where = this.state["where"];
            const when = this.state["when"];
            const repeatDayOfWeek = this.state["repeatDayOfWeek"]
            const desc = this.state["desc"];

            if (goal === "" || what === "" || where === "" || when === "" || desc === "") {
                alert("모든 항목을 입력해주세요.");
                return;
            }
            let flag = true;
            for (let i = 0; i < 7; i++) {
                if (repeatDayOfWeek[i]) {
                    flag = false;
                }
            }
            if (flag) {
                alert("반복 요일을 하나 이상 선택해주세요.");
                return;
            }

            const _repeatDayOfWeek = [];
            for (let i = 0; i < 7; i++) {
                if (repeatDayOfWeek[i]) {
                    _repeatDayOfWeek.push(i);
                }
            }

            const objTodo = new Todo("-1", goal, what, where, when, _repeatDayOfWeek, desc, new Date(), null);

            const modifyId = this.state["modifyId"];
            if (modifyId === undefined || modifyId === null) {
                await addTodo(objTodo);
            } else {
                objTodo.id = modifyId;
                objTodo.startDate = this.state["startDate"];
                await modifyTodo(objTodo).then(() => {
                    alert("변경되었습니다.");
                    location.href = "./home.html";
                });
            }
        });
        return input;
    }
}