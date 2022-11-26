/**
 * 
 * @param {Date} date 
 */
export function getDayOfWeekString(date) {
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return dayOfWeek[date.getDay()];
}

/**
 * 
 * @param {Date} date 
 * @param {number} offset 
 */
export function getOffsetDate(date, offset) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()+offset);
}

/**
 * date1, date2 비교
 * 
 * @param {Date} date1 
 * @param {Date} date2 
 */
export function compareDate(date1, date2) {
    if (date1.getFullYear() !== date2.getFullYear()) return false;
    if (date1.getMonth() !== date2.getMonth()) return false;
    if (date1.getDate() !== date2.getDate()) return false;

    return true;
}

/**
 * 
 * @param {Date} date 
 */
export function dateToString(date) {
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
}