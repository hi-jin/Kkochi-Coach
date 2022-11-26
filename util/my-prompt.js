/**
 * 유저 입력을 받기 위한 Prompt입니다.
 * @param {String} title dialog의 제목
 * @param {String} body dialog에 들어갈 본문
 * @returns 유저가 입력한 값
 */
 export async function myPrompt(title, body) {
    return new Promise((resolve) => {
        const modalBarrier = document.createElement("div");
        modalBarrier.id = "modal-barrier";

        modalBarrier.addEventListener("click", (e) => {
            if (e.currentTarget != e.target) return;

            document.body.removeChild(modalBarrier);
            resolve(false);
        })

        const modalPopup = document.createElement("div");
        modalPopup.id = "modal-barrier_modal-popup";

        const titleDiv = document.createElement("div");
        titleDiv.id = "modal-barrier_modal-popup_title"
        titleDiv.appendChild(document.createTextNode(title));
        modalPopup.appendChild(titleDiv);

        const bodyDiv = document.createElement("div");
        bodyDiv.id = "modal-barrier_modal-popup_body";
        bodyDiv.appendChild(document.createTextNode(body));
        modalPopup.appendChild(bodyDiv);

        const formDiv = document.createElement("div");
        formDiv.id = "modal-barrier_modal-popup_form";
        const input = document.createElement("input");
        input.id = "my-input";
        input.type = "text";
        input.placeholder = "이곳에 입력해주세요.";
        input.setAttribute("autoFocus", "true");
        formDiv.appendChild(input);

        formDiv.appendChild(document.createElement("br"));
        formDiv.appendChild(document.createElement("br"));

        const saveButton = document.createElement("input");
        saveButton.id = "modal_save-button";
        saveButton.type = "button";
        saveButton.value = "확인";
        const quitButton = document.createElement("input");
        quitButton.id = "modal_quit-button";
        quitButton.type = "button";
        quitButton.value = "취소";

        saveButton.addEventListener("click", () => {
            resolve(document.getElementById("my-input").value);
            document.body.removeChild(modalBarrier);
        });

        quitButton.addEventListener("click", () => {
            resolve(false);
            document.body.removeChild(modalBarrier);
        })

        formDiv.appendChild(saveButton);
        formDiv.appendChild(quitButton);

        modalPopup.appendChild(formDiv);
        modalBarrier.appendChild(modalPopup);
        document.body.appendChild(modalBarrier);
    });
}