import Component from "../core/component.js";
import Post from "../domain/post.js";
import Todo from "../domain/todo.js";
import { follow, loadPostList } from "../repo/post-repo.js";
import { addTodo } from "../repo/todo-repo.js";

export default class FeedListView extends Component {
    constructor(feedListView) {
        super();
        this.html = feedListView;

        loadPostList().then(
            value => this.postList = value,
            reason => alert(reason),
        );
    }

    render() {
        super.render();

        this.html.appendChild(this._searchBox.call(this));
        this.html.appendChild(this._postListDiv.call(this));
    }

    _searchBox() {
        const input = document.createElement("input");
        input.id = "feed-list-view_search-box";

        input.placeholder = "검색할 키워드를 '공백'단위로 입력 후 엔터를 눌러주세요.";
        input.value = this.filter;
        input.addEventListener("change", (e) => {
            this.setState({ "filter": e.currentTarget.value.trim() });
        });

        return input;
    }

    _postListDiv() {
        const div = document.createElement("div");
        div.id = "feed-list-view_post-list-div";
        for (const post of this.filtered) {
            div.appendChild(this._postDiv.call(this, post));
        }
        return div;
    }

    /**
     * 
     * @param {Post} post 
     */
    _postDiv(post) {
        const div = document.createElement("div");
        div.classList.add("feed-list-view_post-div");

        const goalSpan = document.createElement("span");
        goalSpan.classList.add("feed-list-view_post-div_goal-span");
        goalSpan.appendChild(document.createTextNode(`[${post.goal}]`));
        div.appendChild(goalSpan);

        const whatSpan = document.createElement("span");
        whatSpan.classList.add("feed-list-view_post-div_what-span");
        whatSpan.appendChild(document.createTextNode(post.what));
        div.appendChild(whatSpan);

        const userSpan = document.createElement("span");
        userSpan.classList.add("feed-list-view_post-div_user-span");
        userSpan.appendChild(document.createTextNode(` - ${post.userId}님`));
        div.appendChild(userSpan);

        div.appendChild(document.createElement("br"));

        const followerSpan = document.createElement("span");
        followerSpan.classList.add("feed-list-view_post-div_follower-span");
        followerSpan.appendChild(document.createTextNode(`${post.follower}명이 함께 하고 있어요`));
        div.appendChild(followerSpan);

        div.addEventListener("click", () => this.showDetailDialog(post));

        return div;
    }

    /**
     * 
     * @param {Post} post 
     */
    showDetailDialog(post) {
        const barrier = document.getElementById("barrier");
        const modalBox = document.createElement("div");
        modalBox.id = "modal-box";

        modalBox.appendChild(_whatDiv.call(this, post.goal, post.what, post.userId));
        modalBox.appendChild(_whereWhenDiv.call(this, post.where, post.when));
        modalBox.appendChild(_repeatDayOfWeekDiv.call(this, post.repeatDayOfWeek));
        modalBox.appendChild(_descDiv.call(this, post.desc));
        modalBox.appendChild(_buttonDiv.call(this, post));

        barrier.style.display = "block";
        barrier.appendChild(modalBox);

        barrier.addEventListener("click", (e) => {
            if (e.target !== barrier) return;
            this.quit();
        });


        function _whatDiv(goal, what, userId) {
            const div = document.createElement("div");
            div.id = "todo-detail-view_what";
            div.classList.add("todo-detail-view_div");

            const goalSpan = document.createElement("span");
            goalSpan.id = "modal-goal";
            goalSpan.appendChild(document.createTextNode(`[${goal}]`));
            div.appendChild(goalSpan);

            div.appendChild(document.createTextNode(`${what} - ${userId}님`));
            return div;
        }

        function _whereWhenDiv(where, when) {
            const div = document.createElement("div");
            div.classList.add("todo-detail-view_div");
            div.appendChild(document.createTextNode(`어디에서 : ${where}`));
            div.appendChild(document.createElement("br"));
            div.appendChild(document.createTextNode(`언제 : ${when}`));
            return div;
        }

        function _repeatDayOfWeekDiv(repeatDayOfWeek) {
            const div = document.createElement("div");
            div.classList.add("todo-detail-view_div");

            div.appendChild(document.createTextNode("반복 요일"));
            div.appendChild(document.createElement("br"));
            div.appendChild(document.createElement("br"));


            const repeatDayOfWeekTF = [false, false, false, false, false, false, false];
            for (const i of repeatDayOfWeek) {
                repeatDayOfWeekTF[i] = true;
            }

            const dayOfWeekString = ["일", "월", "화", "수", "목", "금", "토"];
            for (let i = 0; i < 7; i++) {
                const span = document.createElement("span");
                span.classList.add("todo-detail-view_repeat-day-of-week_element")
                span.appendChild(document.createTextNode(dayOfWeekString[i]));
                if (repeatDayOfWeek[i]) {
                    span.setAttribute("selected", "true");
                }

                div.appendChild(span);
            }

            return div;
        }

        function _descDiv(desc) {
            const div = document.createElement("div");
            div.classList.add("todo-detail-view_div");

            div.appendChild(document.createTextNode("상세 내용"));
            div.appendChild(document.createElement("br"));
            div.appendChild(document.createElement("br"));
            div.appendChild(document.createTextNode(desc));

            return div;
        }

        /**
         * 
         * @param {Post} post 
         */
        function _buttonDiv(post) {
            const div = document.createElement("div");

            const loadButton = document.createElement("input");
            loadButton.type = "button";
            loadButton.id = "todo-detail-view_load-button";
            loadButton.value = "목표 따라하기";
            loadButton.addEventListener("click", async () => {
                if (!confirm("따라하는 목표는 '나의 목표'에서 확인하실 수 있습니다.")) return;
                await follow(post);
                await addTodo(new Todo(
                    "-1",
                    post.goal,
                    post.what,
                    post.where,
                    post.when,
                    post.repeatDayOfWeek,
                    post.desc,
                    new Date(),
                    null,
                ));
            });
            div.appendChild(loadButton);

            const quitButton = document.createElement("input");
            quitButton.type = "button";
            quitButton.id = "todo-detail-view_quit-button";
            quitButton.value = "상세 정보 닫기";
            quitButton.addEventListener("click", this.quit);
            div.appendChild(quitButton);

            return div;
        }
    }

    quit() {
        const barrier = document.getElementById("barrier");
        const modalBox = document.getElementById("modal-box");
        barrier.style.display = "none";
        if (modalBox === null) return;
        barrier.removeChild(modalBox);
    }

    /**
     * @returns {String}
     */
    get filter() {
        return this.state["filter"] ?? "";
    }

    get filtered() {
        if (this.filter.trim() === "") return this.postList;

        const postWithScore = [];
        const keys = ["goal", "what", "where", "when", "desc", "userId"];
        const keywords = this.filter.split(" ");
        for (const post of this.postList) {
            let score = 0;
            for (const key of keys) {
                for (const keyword of keywords) {
                    if (post[key].includes(keyword)) {
                        score += 1;
                    }
                }
            }
            if (score === 0) continue;
            postWithScore.push([post, score]);
        }

        return postWithScore.sort((ps1, ps2) => ps2[0].follower - ps1[0].follower).sort((ps1, ps2) => ps2[1] - ps1[1]).map(elem => elem[0]);
    }

    /**
     * @returns {Array<Post>}
     */
    get postList() {
        return this.state["postList"] ?? [];
    }

    /**
     * @param {Array<Post>} list 
     */
    set postList(list) {
        this.setState({
            "postList": list,
        });
    }
}