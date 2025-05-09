let prompt = document.querySelector("#prompt");

let box = document.querySelector(".chat_container");

let imagebtn = document.querySelector(".sub");

let imageinput = document.querySelector(".sub input");

let imagei = document.querySelector(".sub i");

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBhOv0hpLkny6MJ2BzU0g-oRL8hSpHUmHQ";

function createChatBox(html, classes) {
    let div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}

let user = {
    message: null,
    file: {
        mime_type: null,
        data: null
    }
}

async function generateresponse(aichatbox) {
    let text = aichatbox.querySelector(".ai_chat_area");

    let Requestoption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({

            "contents":
                [{
                    "parts": [{ "text": user.message }, (user.file.data ? [{ "inline_data": user.file }] : [])]
                }]

        })
    }
    try {
        let response = await fetch(API_URL, Requestoption)

        if (!response.ok) {
            throw new Error(`there is an error${response.status}`)
        }

        let data = await response.json();
        console.log(data);
        let apiResponse = data.candidates[0].content.parts[0].text;
        // Remove markdown syntax like '*', '|', backticks, etc.

        apiResponse = apiResponse
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/[*|_#]/g, '')
            .replace(/^\s*[-]{3,}/gm, '')
            .replace(/\r?\n/g, '<br>');

        console.log(apiResponse);
        text.innerHTML = apiResponse;
        Prism.highlightAll();

    } catch (error) {

        console.error(error);

    }
    finally {
        box.scrollTo({ top: box.scrollHeight, behavior: "smooth" })
    }
}

function handlechatresponse(userMessage) {

    user.message = userMessage;

    let html = `  <img src="person.png" alt="person" id="personimage">
            <div class="user_chat_area" id="area">
               ${user.message}
               ${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}"class="chooseimg"/>` : ""}
            </div>`
    prompt.value = "";
    let userchat = createChatBox(html, "userchatbox")
    box.appendChild(userchat);
    box.scrollTo({ top: box.scrollHeight, behavior: "smooth" })

    setTimeout(async () => {
        let html = `<img src="Bot.png" alt="bot" id="botimage">
                <div class="ai_chat_area" id="area">
                <img src="Dual Ballgif" alt="dual">
                </div>`

        let aichatbox = createChatBox(html, "aichatbox");

        box.appendChild(aichatbox);
        generateresponse(aichatbox);

        await generateresponse(aichatbox);

        // ✅ Reset file after AI responds
        user.file = {
            mime_type: null,
            data: null
        };
    }, 600);

    // user.file = {
    //     mime_type: null,
    //     data: null
    // };
}


prompt.addEventListener("keydown", (e) => {

    if (e.key == "Enter") {
        console.log(prompt.value);

        handlechatresponse(prompt.value)

    }
})
// Trigger chat when Upload button (btn2) is clicked
document.querySelector("#btn2").addEventListener("click", () => {
    if (prompt.value.trim() !== "") {
        handlechatresponse(prompt.value);
    }
});

imagebtn.addEventListener("click", () => {

    imagebtn.querySelector("input").click()
})

imageinput.addEventListener("change", () => {

    const file = imageinput.files[0];

    if (!file) {
        return
    }

    let reader = new FileReader()

    reader.onload = (e) => {
        console.log(e);
        let base64string = e.target.result.split(",")[1]
        user.file = {
            mime_type: file.type,
            data: base64string
        }

    }
    // imagebtn.innerHTML=`${user.file.data?`<img src="data:${user.file.mime_type};base64,${user.file.data}"class="chooseimg"/>`:""}`

    reader.readAsDataURL(file)
})