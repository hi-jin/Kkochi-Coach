export default class Goal {
    /**
     * 
     * @param {String} id auto increment id (임시로 생성한 경우 -1로 생성)
     * @param {String} title 목표 제목
     * @param {List<String>} todoIdList goal이 상위목표인 todo들의 id 리스트
     * @param {Date} startDate 시작 날짜
     * @param {Date|null} endDate 종료 날짜 (null인 경우 아직 종료하지 않은 목표)
     */
    constructor(id, title, todoIdList, startDate, endDate = null) {
        this.id = id;
        this.title = title;
        this.todoIdList = todoIdList;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    /**
     * 
     * @param {Map<String, any>} json 
     */
    static fromJson(json) {
        return new Goal(
            json["id"],
            json["title"],
            json["todo_id_list"],
            json["start_date"],
            json["end_date"],
        );
    }

    toJson() {
        return JSON.stringify({
            "id": this.id,
            "title": this.title,
            "todo_id_list": this.todoIdList,
            "start_date": this.startDate,
            "end_date": this.endDate,
        });
    }
}