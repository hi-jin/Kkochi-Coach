export default class Todo {
    /**
     * 
     * @param {String} id auto increment id (임시로 생성한 경우 -1)
     * @param {String} goal 상위 목표 이름
     * @param {String} what 할 일 제목
     * @param {String} where 할 일을 수행할 장소
     * @param {String} when 수행 시각 (시기)
     * @param {List<number>} repeatDayOfWeek  0~6의 수의 배열 (0: 일요일). 반복할 요일
     * @param {String} desc 할 일 설명
     * @param {Date} startDate 시작 날짜
     * @param {Date|null} endDate 종료 날짜
     */
    constructor(id, goal, what, where, when, repeatDayOfWeek, desc, startDate, endDate = null) {
        this.id = id;
        this.goal = goal;
        this.what = what;
        this.where = where;
        this.when = when;
        this.repeatDayOfWeek = repeatDayOfWeek;
        this.desc = desc;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    /**
     * 
     * @param {Map<String, any>} json 
     */
    static fromJson(json) {
        return new Todo(
            json["id"],
            json["goal"],
            json["what"],
            json["where"],
            json["when"],
            json["repeat_day_of_week"],
            json["desc"],
            new Date(json["start_date"]),
            new Date(json["end_date"]),
        );
    }

    toJson() {
        return JSON.stringify({
            "id": this.id,
            "goal": this.goal,
            "what": this.what,
            "where": this.where,
            "when": this.when,
            "repeat_day_of_week": this.repeatDayOfWeek,
            "desc": this.desc,
            "start_date": this.startDate,
            "end_date": this.endDate,
        });
    }
}