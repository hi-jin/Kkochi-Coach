import Component from "../core/component.js";
import UserData from "../data/user-data.js";

export default class Header extends Component {
    /**
     * 
     * @param {HTMLElement} header 
     */
    constructor(header) {
        super();
        this.html = header;

        const userData = new UserData();
        this.setState({ "userData": userData });
        userData.addListener(() => { this.setState({ "userData": userData }) });
    }

    render() {
        while (this.html.hasChildNodes()) {
            this.html.removeChild(this.html.firstChild);
        }
        this.html.appendChild(this._homeLink.call(this));

        if (this.state["userData"].userName !== undefined) {
            this.html.appendChild(this._myGoal.call(this));
            this.html.appendChild(this._feed.call(this));
            this.html.appendChild(this._userName.call(this));
        }
    }

    _homeLink() {
        const span = document.createElement("span");
        span.id = "header_home-link";
        span.appendChild(document.createTextNode("꼬치코치"));
        span.addEventListener("click", () => {
            location.href = "./home.html";
        });
        return span;
    }

    _myGoal() {
        const span = document.createElement("span");
        span.id = "header_my-goal";
        span.appendChild(document.createTextNode("나의 목표"));
        span.addEventListener("click", () => {
            location.href = "./my-goal.html";
        });
        return span;
    }

    _feed() {
        const span = document.createElement("span");
        span.id = "header_feed";
        span.appendChild(document.createTextNode("피드"));
        span.addEventListener("click", () => {
            location.href = "./feed.html";
        });
        return span;
    }

    _userName() {
        const span = document.createElement("span");
        span.id = "header_user-name";
        span.appendChild(document.createTextNode(this.state["userData"].userName));
        span.addEventListener("click", () => {
            location.href = "./feed.html";
        });
        return span;
    }
}