import Header from "../component/header.js"
import LoginForm from "../component/login-form.js";
import { getCurrentUserName } from "../repo/auth-repo.js";

window.addEventListener("load", () => {
    getCurrentUserName().then(data => {
        if (data === null) return;
        location.href = "./home.html";
    });
    new Header(document.getElementById("header"));
    new LoginForm(document.getElementById("login-form"));
});
