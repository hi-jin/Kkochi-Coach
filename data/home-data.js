import Notifier from "../core/notifier.js";

export default class HomeData extends Notifier {
    static _instance = null;

    constructor() {
        super();
        if (HomeData._instance !== null) return HomeData._instance;
        HomeData._instance = this;
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
}