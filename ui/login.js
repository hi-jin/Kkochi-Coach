import Header from "../component/header.js"
import LoginForm from "../component/login-form.js";

window.addEventListener("load", () => {
    new Header(document.getElementById("header"));
    new LoginForm(document.getElementById("login-form"));
});
