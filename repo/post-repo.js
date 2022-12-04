import Post from "../domain/post.js";

/**
 * 
 * @param {Post} post 
 */
export async function addPost(post) {
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

            post.id = response;
            resolve();
        }
        const formData = new FormData();
        formData.append("post", post.toJson());
        request.open("POST", "./repo/php/add-post.php");
        request.send(formData);
    });
}

export async function loadPostList() {
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

            const result = [];
            for (const jsonPost of JSON.parse(response)) {
                result.push(Post.fromJson(jsonPost));
            }
            resolve(result);
        }
        request.open("GET", "./repo/php/load-post-list.php");
        request.send();
    });
}

/**
 * 
 * @param {Post} post 
 */
export async function follow(post) {
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
            if (response === "invalid-form") reject("모든 항목을 입력해주세요.");
            if (response === "internal-error") reject("서버 오류. 관리자에게 문의해주세요.");
            resolve(response);
        }
        const formData = new FormData();
        formData.append("postId", post.id);

        request.open("POST", "./repo/php/follow.php");
        request.send(formData);
    });
}