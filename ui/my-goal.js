import Header from "../component/header.js";
import MyGoalDetailView from "../component/my-goal-detail-view.js";
import MyGoalListView from "../component/my-goal-list-view.js";
import MyGoalTodoDetailView from "../component/my-goal-todo-detail-view.js";
import { getCurrentUserName } from "../repo/auth-repo.js";

window.addEventListener("load", () => {
    getCurrentUserName().then(data => {
        if (data === null) {
            location.href = "./login.html";
        }
    });

    new Header(document.getElementById("header"));
    new MyGoalListView(document.getElementById("my-goal-list-view"));
    new MyGoalDetailView(document.getElementById("my-goal-detail-view"));
    new MyGoalTodoDetailView(document.getElementById("my-goal-todo-detail-view"));
});
