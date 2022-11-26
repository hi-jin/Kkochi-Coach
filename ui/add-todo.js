import AddTodoView from "../component/add-todo-view.js";
import Header from "../component/header.js";
import { getCurrentUserName } from "../repo/auth-repo.js";

window.addEventListener("load", () => {
    getCurrentUserName().then(data => {
        if (data === null) {
            location.href = "./login.html";
        }
    });

    new Header(document.getElementById("header"));
    new AddTodoView(document.getElementById("add-todo-view"));
});
