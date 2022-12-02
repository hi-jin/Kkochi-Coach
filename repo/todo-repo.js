import ClearLog from "../domain/clear-log.js";
import Todo from "../domain/todo.js";
import { dateToString } from "../util/date-util.js";

/**
 * todo를 {user_id}.json에 저장
 * @param {Todo} todo 
 */
export async function addTodo(todo) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;
            if (request.status !== 200) reject("서버와의 연결을 확인해주세요.");

            const response = request.responseText.trim();
            if (response === "login-failed") {
                console.log("no hack!!!!");
                reject("로그인 후 이용해주세요.");
                location.href = "./login.html";
            }
            if (response === "invalid-form") reject("모든 항목을 입력해주세요.");
            if (response === "internal-error") reject("서버 오류. 관리자에게 문의해주세요.");
            todo.id = response;
            alert("성공적으로 저장되었습니다.");
            location.href = "./home.html";
            resolve(response);
        }
        const formData = new FormData();
        formData.append("goal", todo.goal);
        formData.append("what", todo.what);
        formData.append("where", todo.where);
        formData.append("when", todo.when);
        formData.append("repeatDayOfWeek", JSON.stringify(todo.repeatDayOfWeek));
        formData.append("desc", todo.desc);
        formData.append("startDate", dateToString(todo.startDate));

        request.open("POST", "./repo/php/add-todo.php");
        request.send(formData);
    });
}

/**
 * 
 * @returns {Promise<List<Todo>>}
 */
export async function loadTodoList() {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;
            if (request.status !== 200) reject("서버와의 연결을 확인해주세요.");

            const response = request.responseText.trim();
            if (response === "login-failed") {
                reject("로그인 후 이용해주세요.");
                location.href = "./login.html";
            }
            if (response === "internal-error") reject("서버 오류. 관리자에게 문의해주세요.");

            const result = [];
            for (const json of JSON.parse(response)) {
                const todo = Todo.fromJson(json);
                if (todo === null) continue;
                result.push(todo);
            }
            resolve(result);
        }
        request.open("GET", "./repo/php/load-todo-list.php");
        request.send();
    });
}

/**
 * 로그인된 유저의 클리어 로그를 반환
 * 
 * @returns {List<ClearLog>}
 */
export async function loadClearLog() {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;
            if (request.status !== 200) reject("서버와의 연결을 확인해주세요.");

            const response = request.responseText.trim();
            if (response === "login-failed") {
                reject("로그인 후 이용해주세요.");
                location.href = "./login.html";
            }
            if (response === "internal-error") reject("서버 오류. 관리자에게 문의해주세요.");

            const result = [];
            for (const json of JSON.parse(response)) {
                result.push(ClearLog.fromJson(json));
            }
            resolve(result);
        }
        request.open("GET", "./repo/php/load-clear-log.php");
        request.send();
    });
}

/**
 * 
 * @param {String} todo 
 */
export async function removeTodo(todoId) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;
            if (request.status !== 200) reject("서버와의 연결을 확인해주세요.");

            const response = request.responseText.trim();
            if (response === "login-failed") {
                reject("로그인 후 이용해주세요.");
                location.href = "./login.html";
            }
            if (response === "internal-error") reject("서버 오류. 관리자에게 문의해주세요.");
            if (response === "invalid-form") reject("올바르지 않은 요청 형식입니다.");

            resolve(true);
        }
        const formData = new FormData();
        formData.append("todoId", todoId);
        request.open("POST", "./repo/php/remove-todo.php");
        request.send(formData);
    });
}

/**
 * 
 * @param {String} todoId 
 */
export async function finishTodo(todoId) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;
            if (request.status !== 200) reject("서버와의 연결을 확인해주세요.");

            const response = request.responseText.trim();
            if (response === "login-failed") {
                reject("로그인 후 이용해주세요.");
                location.href = "./login.html";
            }
            if (response === "internal-error") reject("서버 오류. 관리자에게 문의해주세요.");
            if (response === "invalid-form") reject("올바르지 않은 요청 형식입니다.");
            if (response === "already-finished") reject("이미 종료된 목표입니다.");

            resolve(true);
        }
        const formData = new FormData();
        formData.append("todoId", todoId);
        formData.append("endDate", dateToString(new Date()));
        request.open("POST", "./repo/php/finish-todo.php");
        request.send(formData);
    });
}

/**
 * 
 * @param {Todo} todo 
 */
export async function modifyTodo(todo) {
    return new Promise((resolve, reject) => {
        if (todo.id === "-1") reject("올바르지 않은 요청 형식입니다.");

        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;
            if (request.status !== 200) reject("서버와의 연결을 확인해주세요.");

            const response = request.responseText.trim();
            if (response === "login-failed") {
                reject("로그인 후 이용해주세요.");
                location.href = "./login.html";
            }
            if (response === "internal-error") reject("서버 오류. 관리자에게 문의해주세요.");
            if (response === "invalid-form") reject("올바르지 않은 요청 형식입니다.");

            resolve(true);
        }
        const formData = new FormData();
        formData.append("todo", todo.toJson());
        request.open("POST", "./repo/php/modify-todo.php");
        request.send(formData);
    });
}

/**
 * 
 * @param {String} todoId 
 * @param {Date} clearDate 
 */
export async function clearTodo(todoId, clearDate) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;
            if (request.status !== 200) reject("서버와의 연결을 확인해주세요.");

            const response = request.responseText.trim();
            if (response === "login-failed") {
                reject("로그인 후 이용해주세요.");
                location.href = "./login.html";
            }
            if (response === "internal-error") reject("서버 오류. 관리자에게 문의해주세요.");
            if (response === "invalid-form") reject("올바르지 않은 요청 형식입니다.");
            if (response === "already-cleared") reject("이미 완료했습니다.");

            resolve();
        }
        const formData = new FormData();
        formData.append("todoId", todoId);
        formData.append("date", clearDate);
        request.open("POST", "./repo/php/clear-todo.php");
        request.send(formData);
    });
}
