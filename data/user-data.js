import Notifier from "../core/notifier.js"

export default class UserData extends Notifier {
    static _instance = null;

    constructor() {
        super();
        if (UserData._instance !== null) return UserData._instance;
        UserData._instance = this;
    }

    get userName() {
        return this._userName;
    }

    set userName(name) {
        this._userName = name;
        this.notifyListener();
    }
}
