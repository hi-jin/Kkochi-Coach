import Component from "../core/component.js";

export default class LoginForm extends Component {
    /**
     * 
     * @param {HTMLElement} loginForm 
     */
    constructor(loginForm) {
        super();
        this.html = loginForm;
        this.setState();
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

        });
        return input;
    }

    _loginButton() {
        const input = document.createElement("input");
        input.id = "login-form_login-button";
        input.type = "button";
        input.value = "로그인";
        input.addEventListener("click", () => {
            
        });
        return input;
    }
}