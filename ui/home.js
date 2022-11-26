import Header from "../component/header.js";
import DatePicker from "../component/date-picker.js";
import TodoSummaryView from "../component/todo-summary-view.js";
import { getCurrentUserName } from "../repo/auth-repo.js";
import TodoDetailView from "../component/todo-detail-view.js";

window.addEventListener("load", () => {
    getCurrentUserName().then(data => {
        if (data === null) {
            location.href = "./login.html";
        }
    });

    new Header(document.getElementById("header"));
    new DatePicker(document.getElementById("date-picker"));
    new TodoSummaryView(document.getElementById("todo-summary-view"));
    new TodoDetailView(document.getElementById("todo-detail-view"));
});
