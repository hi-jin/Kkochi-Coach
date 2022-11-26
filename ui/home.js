import Header from "../component/header.js";
import DatePicker from "../component/date-picker.js";

window.addEventListener("load", () => {
    new Header(document.getElementById("header"));
    new DatePicker(document.getElementById("date-picker"));
});
