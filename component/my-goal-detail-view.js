import Component from "../core/component.js";
import MyGoalData from "../data/my-goal-data.js";
import Todo from "../domain/todo.js";
import { dateToString } from "../util/date-util.js";

const CANVAS_HEIGHT = 200;

export default class MyGoalDetailView extends Component {
    /**
     * 
     * @param {HTMLElement} myGoalDetailView 
     */
    constructor(myGoalDetailView) {
        super();
        this.html = myGoalDetailView;
        const myGoalData = new MyGoalData();
        this.setState({
            "myGoalData": myGoalData,
            "innerWidth": innerWidth - 20,
        });
        myGoalData.addListener(() => this.setState({
            "myGoalData": myGoalData,
        }));
        window.addEventListener("resize", () => {
            this.setState({ "innerWidth": innerWidth - 20 });
        });
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
        const timeline = this._timeline.call(this);
        if (timeline !== null) this.html.appendChild(timeline);
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

    _timeline() {
        const canvasWidth = this.state["innerWidth"];

        const selectedTodo = this.myGoalData.selectedTodo;
        if (selectedTodo === null) return null;

        const canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = CANVAS_HEIGHT;
        const ctx = canvas.getContext("2d");

        const clearSet = this.clearSet;
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
        animateCircle(canvas, ctx, () => {
            ctx.fillStyle = "black";
            ctx.font = "18px Gowun Dodum";
            ctx.fillText(`${selectedTodo.what}`, 210, 40);
            ctx.fillStyle = "grey";
            ctx.fillText(`총 ${clearCount + failCount}일 중 ${clearCount}일 성공`, 210, 70);
            ctx.fillText(`${dateToString(selectedTodo.startDate)}부터`, 210, 120);
            ctx.fillText(`${(selectedTodo.endDate === null) ? "진행중" : dateToString(selectedTodo.endDate) + "까지"}`, 210, 150);

            setTimeout(() => {
                scrollTo({
                    top: document.body.scrollHeight,
                    left: 0,
                    behavior: "smooth",
                });
            }, 300);
        });

        return canvas;


        /**
         * 
         * @param {HTMLCanvasElement} canvas 
         * @param {CanvasRenderingContext2D} ctx 
         * @param {Function} callback 
         * @param {number} cur 
         * @returns 
         */
        function animateCircle(canvas, ctx, callback, cur = 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCircleGraph(ctx, clearCount, failCount);

            const x = 100;
            const y = 100;
            const radius = 90;

            if (cur >= 2 * Math.PI) {
                callback();
                return;
            }

            ctx.moveTo(x, y);
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(x, y, radius + 1, -0.5 * Math.PI + cur, 1.5 * Math.PI);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.fill();

            setTimeout(() => {
                animateCircle(canvas, ctx, callback, cur + 0.15);
            }, 10);
        }

        /**
         * 
         * @param {CanvasRenderingContext2D} ctx 
         * @param {number} data1 
         * @param {number} data2 
         */
        function drawCircleGraph(ctx, data1, data2) {
            const x = 100;
            const y = 100;
            const radius = 90;
            const unit = (2 * Math.PI) / (data1 + data2);
            ctx.moveTo(x, y);
            ctx.beginPath();
            ctx.fillStyle = "green";
            ctx.arc(x, y, radius, -0.5 * Math.PI, unit * data1 - 0.5 * Math.PI);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.fill();

            ctx.moveTo(x, y);
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(x, y, radius, unit * data1 - 0.5 * Math.PI, 1.5 * Math.PI);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.fill();

            ctx.moveTo(x, y);
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(x, y, radius / 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }
    }

    /**
     * @returns {Array<Todo>}
     */
    get todoList() {
        const selectedGoal = this.myGoalData.selectedGoal;
        const todoList = this.myGoalData.goalTodoMap.get(selectedGoal);
        return todoList ?? [];
    }

    get clearSet() {
        const set = new Set();
        for (const log of this.clearLog) {
            set.add(dateToString(log.date));
        }
        return set;
    }

    get clearLog() {
        const selectedTodo = this.myGoalData.selectedTodo;
        if (selectedTodo === null) return [];
        return this.myGoalData.clearLog.filter(log => log.todoId === selectedTodo.id);
    }

    /**
     * @returns {MyGoalData}
     */
    get myGoalData() {
        return this.state["myGoalData"];
    }
}
