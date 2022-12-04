import Header from "../component/header.js";
import { getCurrentUserName } from "../repo/auth-repo.js";

window.addEventListener("load", () => {
    getCurrentUserName().then(data => {
        if (data === null) {
            location.href = "./login.html";
        }
    });

    new Header(document.getElementById("header"));
});
