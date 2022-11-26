import Notifier from "../core/notifier.js";

export default class HomeData extends Notifier {
    static _instance = null;

    constructor() {
        super();
        if (HomeData._instance !== null) return HomeData._instance;
        HomeData._instance = this;
    }

    get todoList() {
        if (this._todoList === undefined) {
            return [];
        }
        return this._todoList;
    }

    set todoList(todoList) {
        this._todoList = todoList;
        this.notifyListener();
    }

    get clearLog() {
        if (this._clearLog === undefined) {
            return [];
        }
        return this._clearLog;
    }

    set clearLog(clearLog) {
        this._clearLog = clearLog;
        this.notifyListener();
    }

    get selectedDate() {
        if (this._selectedDate === undefined) {
            return new Date();
        }
        return this._selectedDate;
    }

    set selectedDate(date) {
        this._selectedDate = date;
        this.notifyListener();
    }

    get selectedTodo() {
        if (this._selectedTodo === undefined) {
            return null;
        }
        return this._selectedTodo;
    }

    set selectedTodo(todo) {
        this._selectedTodo = todo;
        this.notifyListener();
    }
}