export default class ClearLog {
    /**
     * 
     * @param {String} id auto increment id
     * @param {String} todoId 
     * @param {Date} date 
     */
    constructor(id, todoId, date) {
        this.id = id;
        this.todoId = todoId;
        this.date = date;
    }

    /**
     * 
     * @param {Map<String, any>} json 
     */
    static fromJson(json) {
        return new ClearLog(
            json["id"],
            json["todo_id"],
            new Date(json["date"]),
        );
    }

    toJson() {
        return JSON.stringify({
            "id": this.id,
            "todo_id": this.todoId,
            "date": this.date,
        });
    }
}