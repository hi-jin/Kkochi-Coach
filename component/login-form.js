import Component from "../core/component.js";
import UserData from "../data/user-data.js";
import { login, register } from "../repo/auth-repo.js";

export default class LoginForm extends Component {
    /**
     * 
     * @param {HTMLElement} loginForm 
     */
    constructor(loginForm) {
        super();
        this.html = loginForm;
        const userData = new UserData();
        this.setState({ "userData": userData });
        this.id = "";
        this.pw = "";
    }

    render() {
        while (this.html.hasChildNodes()) {
            this.html.removeChild(this.html.firstChild);
        }

        this.html.appendChild(this._idField.call(this));
        this.html.appendChild(this._pwField.call(this));
        this.html.appendChild(this._registerButton.call(this));
        this.html.appendChild(this._loginButton.call(this));
    }

    _idField() {
        const input = document.createElement("input");
        input.id = "login-form_id-field";
        input.type = "text";
        input.placeholder = "아이디를 입력해주세요";
        input.addEventListener("keyup", (e) => this.id = e.target.value);
        return input;
    }

    _pwField() {
        const input = document.createElement("input");
        input.id = "login-form_pw-field";
        input.type = "password";
        input.placeholder = "비밀번호를 입력해주세요";
        input.addEventListener("keyup", (e) => this.pw = e.target.value);
        return input;
    }

    _registerButton() {
        const input = document.createElement("input");
        input.id = "login-form_register-button";
        input.type = "button";
        input.value = "회원가입";
        input.addEventListener("click", () => {
            this.id = this.id.trim();
            this.pw = this.pw.trim();
            if (this.id === "" || this.pw === "") {
                alert("아이디와 비밀번호를 모두 입력해주세요.");
                return;
            }
            register(this.id, this.pw).then(data => alert(data), reason => alert(reason));
        });
        return input;
    }

    _loginButton() {
        const input = document.createElement("input");
        input.id = "login-form_login-button";
        input.type = "button";
        input.value = "로그인";
        input.addEventListener("click", () => {
            this.id = this.id.trim();
            this.pw = this.pw.trim();
            if (this.id === "" || this.pw === "") {
                alert("아이디와 비밀번호를 모두 입력해주세요.");
                return;
            }
            login(this.id, this.pw).then(
                data => {
                    alert(data);
                    this.state["userData"].userName = this.id;
                    location.href = "./home.html";
                },
                reason => alert(reason),
            );
        });
        return input;
    }
}