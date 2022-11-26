export default class Todo {
    /**
     * 
     * @param {String} id auto increment id (임시로 생성한 경우 -1)
     * @param {String} what 할 일 제목
     * @param {String} where 할 일을 수행할 장소
     * @param {String} when 수행 시각 (시기)
     * @param {List<number>} repeatDayOfWeek  0~6의 수의 배열 (0: 일요일). 반복할 요일
     * @param {String} desc 할 일 설명
     */
    constructor(id, what, where, when, repeatDayOfWeek, desc) {
        this.id = id;
        this.what = what;
        this.where = where;
        this.when = when;
        this.repeatDayOfWeek = repeatDayOfWeek;
        this.desc = desc;
    }

    /**
     * 
     * @param {Map<String, any>} json 
     */
    static fromJson(json) {
        return new Todo(
            json["id"],
            json["what"],
            json["where"],
            new Date(json["when"]),
            json["repeat_day_of_week"],
            json["desc"],
        );
    }

    toJson() {
        return JSON.stringify({
            "id": this.id,
            "what": this.what,
            "where": this.where,
            "when": this.when,
            "repeat_day_of_week": this.repeatDayOfWeek,
            "desc": this.desc,
        });
    }
}