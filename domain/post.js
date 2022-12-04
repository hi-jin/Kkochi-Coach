export default class Post {
    /**
     * 
     * @param {String} id auto increment id
     * @param {String} userId 유저 아이디
     * @param {String} goal 
     * @param {String} what 
     * @param {String} where 
     * @param {String} when 
     * @param {Array<Number>} repeatDayOfWeek 
     * @param {String} desc 
     * @param {Number} clearCount
     * @param {Number} failCount
     * @param {Number} follower
     */
    constructor(
        id,
        userId,
        goal,
        what,
        where,
        when,
        repeatDayOfWeek,
        desc,
        clearCount,
        failCount,
        follower,
    ) {
        this.id = id;
        this.userId = userId;
        this.goal = goal;
        this.what = what;
        this.where = where;
        this.when = when;
        this.repeatDayOfWeek = repeatDayOfWeek;
        this.desc = desc;
        this.clearCount = clearCount;
        this.failCount = failCount;
        this.follower = follower;
    }

    /**
     * 
     * @param {Map<String, any>} json 
     */
    static fromJson(json) {
        if (json === null) return null;
        return new Post(
            json["id"],
            json["user_id"],
            json["goal"],
            json["what"],
            json["where"],
            json["when"],
            json["repeat_day_of_week"],
            json["desc"],
            json["clear_count"],
            json["fail_count"],
            json["follower"],
        );
    }

    toJson() {
        return JSON.stringify({
            "id": this.id,
            "user_id": this.userId,
            "goal": this.goal,
            "what": this.what,
            "where": this.where,
            "when": this.when,
            "repeat_day_of_week": this.repeatDayOfWeek,
            "desc": this.desc,
            "clear_count": this.clearCount,
            "fail_count": this.failCount,
            "follower": this.follower,
        });
    }
}