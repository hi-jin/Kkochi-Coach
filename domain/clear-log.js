export default class ClearLog {
    /**
     * 
     * @param {String} id auto increment id
     * @param {String} goalId 
     * @param {String} todoId 
     * @param {Date} date 
     */
    constructor(id, goalId, todoId, date) {
        this.id = id;
        this.goalId = goalId;
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
            json["goal_id"],
            json["todo_id"],
            new Date(json["date"]),
        );
    }

    toJson() {
        return JSON.stringify({
            "id": this.id,
            "goal_id": this.goalId,
            "todo_id": this.todoId,
            "date": this.date,
        });
    }
}