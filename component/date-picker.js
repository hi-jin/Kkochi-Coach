import Component from "../core/component.js";
import HomeData from "../data/home-data.js";
import { compareDate, getDayOfWeekString, getOffsetDate } from "../util/date-util.js";

const MAX_DATE_PICKER_LENGTH = 6;  // 화면에 6개까지만 표시

export default class DatePicker extends Component {
    /**
     * 
     * @param {HTMLElement} datePicker 
     */
    constructor(datePicker) {
        super();
        this.html = datePicker;
        this.today = new Date();  // 오늘 기준으로 MAX_DATE_PICKER_LENGTH개 표시
        const homeData = new HomeData();
        this.setState({ "homeData": homeData });
        homeData.addListener(() => this.setState({ "homeData": homeData }));
    }

    render() {
        super.render();
        for (let offset = MAX_DATE_PICKER_LENGTH - 1; offset >= 0; offset--) {
            const date = getOffsetDate(this.today, -1 * offset);
            this.html.appendChild(this._datePickerElement(date));
        }
    }

    /**
     * 
     * @param {Date} date 
     */
    _datePickerElement(date) {
        const div = document.createElement("div");
        div.classList.add("date-picker_date-picker-element");
        div.appendChild(document.createTextNode(getDayOfWeekString(date)));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createTextNode(date.getDate()));

        if (compareDate(this.state["homeData"].selectedDate, date)) {
            div.setAttribute("selected", "true");
        }

        div.addEventListener("click", () => {
            this.state["homeData"].selectedDate = date;
        });

        return div;
    }
}