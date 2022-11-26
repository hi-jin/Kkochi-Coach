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