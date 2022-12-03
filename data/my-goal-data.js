import Notifier from "../core/notifier.js";
import ClearLog from "../domain/clear-log.js";
import Todo from "../domain/todo.js";

export default class MyGoalData extends Notifier {
    static _instance = null;

    constructor() {
        super();
        if (MyGoalData._instance !== null) return MyGoalData._instance;
        MyGoalData._instance = this;
    }

    /**
     * @returns {Map<String, Array<Todo>>}
     */
    get goalTodoMap() {
        const goalTodoMap = new Map();
        for (const todo of this.todoList) {
            if (!goalTodoMap.has(todo.goal)) {
                goalTodoMap.set(todo.goal, []);
            }
            goalTodoMap.get(todo.goal).push(todo);
        }
        return goalTodoMap;
    }

    /**
     * @returns {String|null}
     */
    get selectedGoal() {
        return this._selectedGoal ?? null;
    }

    /**
     * @param {String}
     */
    set selectedGoal(goal) {
        this._selectedGoal = goal;
        this.notifyListener();
    }

    /**
     * @returns {Array<Todo>}
     */
    get todoList() {
        return this._todoList ?? [];
    }

    /**
     * @param {Array<Todo>}
     */
    set todoList(todoList) {
        this._todoList = todoList;
        this.notifyListener();
    }

    /**
     * @returns {Array<ClearLog>}
     */
    get clearLog() {
        return this._clearLog ?? [];
    }

    /**
     * @param {Array<ClearLog>}
     */
    set clearLog(clearLog) {
        this._clearLog = clearLog;
        this.notifyListener();
    }

    get selectedTodo() {
        return this._selectedTodo ?? null;
    }

    set selectedTodo(todo) {
        this._selectedTodo = todo;
        this.notifyListener();
    }
}