/**
 * 
 * @param {String} id 
 * @param {String} pw 
 */
export async function register(id, pw) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;
            if (request.status !== 200) reject("서버와의 연결을 확인해주세요.");

            const response = request.responseText.trim();
            if (response === "duplicated") reject("이미 존재하는 아이디입니다.");
            if (response === "invalid-form") reject("아이디, 비밀번호를 올바르게 입력해주세요.");
            if (response === "internal-error") reject("서버 오류. 관리자에게 문의해주세요.");

            resolve("회원가입 되었습니다. 로그인 해주세요.");
        }
        const formData = new FormData();
        formData.append("id", id);
        formData.append("pw", pw);
        request.open("POST", "./repo/php/register.php");
        request.send(formData);
    });
}