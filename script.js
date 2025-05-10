const promptInput = document.querySelector("#prompt");
const chatContainer = document.querySelector(".chat-container");
const imageBtn = document.querySelector(".image-btn");
const imageInput = document.querySelector(".image-btn input");
const sendBtn = document.querySelector(".send-btn");

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBhOv0hpLkny6MJ2BzU0g-oRL8hSpHUmHQ";

function createChatBox(html, classes) {
    const div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}

const states = {
    user: {
        message: null,
        file: {
            mime_type: null,
            data: null
        }
    }
};

async function generateResponse(aichatbox) {
    const text = aichatbox.querySelector(".ai-chat-area");
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "contents": [{
                "parts": [
                    { "text": states.user.message },
                    ...(states.user.file.data ? [{ "inline_data": states.user.file }] : [])
                ]
            }]
        })
    };

    try {
        const response = await fetch(API_URL, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        let apiResponse = data.candidates[0].content.parts[0].text;

        // Detect code blocks and math terms
        apiResponse = apiResponse
            .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
                const language = lang ? `language-${lang}` : 'language-text';
                return `<pre><code class="${language}">${code.trim()}</code></pre>`;
            })
            .replace(/`([^`]+)`/g, '<code class="language-text">$1</code>')
            .replace(/[*|_#]/g, '') // Remove markdown symbols
            .replace(/\r?\n/g, '<br>');

        text.innerHTML = apiResponse;
        Prism.highlightAllUnder(aichatbox);
    } catch (error) {
        console.error(error);
        text.innerHTML = "Sorry, something went wrong.";
    } finally {
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
    }
}

function handleChatResponse(userMessage) {
    states.user.message = userMessage;
    userMessage = userMessage.replace(/</g, "<").replace(/>/g, ">"); // Sanitize HTML
    const html = `
        <div class="user-chat-area">
            ${userMessage}
            ${states.user.file.data ? `<img src="data:${states.user.file.mime_type};base64,${states.user.file.data}" class="chooseimg"/>` : ""}
        </div>
    `;
    promptInput.value = "";
    const userChat = createChatBox(html, "userchatbox");
    chatContainer.appendChild(userChat);
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

    setTimeout(async () => {
        const html = `
            <div class="ai-chat-area">
                Loading...
            </div>
        `;
        const aichatbox = createChatBox(html, "aichatbox");
        chatContainer.appendChild(aichatbox);
        await generateResponse(aichatbox);
        states.user.file = { mime_type: null, data: null };
    }, 600);
}

promptInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && promptInput.value.trim()) {
        handleChatResponse(promptInput.value);
    }
});

sendBtn.addEventListener("click", () => {
    if (promptInput.value.trim()) {
        handleChatResponse(promptInput.value);
    }
});

imageBtn.addEventListener("click", () => {
    imageInput.click();
});

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const base64string = e.target.result.split(",")[1];
        states.user.file = {
            mime_type: file.type,
            data: base64string
        }; 
    };
    reader.readAsDataURL(file);
});