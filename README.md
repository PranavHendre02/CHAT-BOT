# 🔮 AI Chat Bot - Gemini Powered

A sleek and responsive web-based chatbot interface powered by **Google Gemini 2.0 Flash API** for generating content and analyzing uploaded images. Built using **vanilla JavaScript**, this project allows users to interact via text or image prompts with a visually minimal, neon-styled UI.

---

## ✨ Features

* 🤖 **Gemini-2.0-Flash** model for natural language response generation
* 🖼️ Upload images for **image input understanding**
* 📤 Pop-out buttons for file and image prompt input
* 🔵 **Minimal dark UI** with **neon blue glow effect** on the prompt bar and controls
* 💬 Dynamic chat interface with both user and bot avatars
* 📜 Syntax highlighting using **PrismJS** for formatted responses
* 📱 Responsive layout with media queries for mobile view

---

## 📸 Screenshot

*(Include a screenshot of your app here)*

---

## 🧠 How It Works

The frontend is entirely JavaScript-driven. Here's how the logic flows:

1. **User Interaction**:

   * The user types a message or uploads an image.
   * Input is captured through the `<input>` element or file selector button.

2. **Request Handling**:

   * When the user submits a prompt (`Enter` or Upload Button), JavaScript constructs a request to:

     ```
     POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
     ```
   * Payload includes:

     ```json
     {
       "contents": [
         {
           "parts": [
             { "text": "Your question here" },
             { "inline_data": { "mime_type": "...", "data": "base64..." } }
           ]
         }
       ]
     }
     ```

3. **Response Rendering**:

   * The response from Gemini is cleaned, parsed (especially Markdown), and dynamically injected into the DOM.
   * Syntax-highlighted code blocks are rendered using PrismJS.

4. **Image Upload**:

   * If an image is selected, it is converted to Base64 and sent in the request for multimodal understanding by Gemini.

---

## 🍥 UI Design

* 🖤 **Dark Theme** base
* 🔹 **Prompt Input**: Blue neon glow (`box-shadow` on focus)
* 🔘 **Buttons**: Pop-out hover effect with font-awesome icons
* 📱 **Media Queries** ensure:

  * Layout doesn’t break on small screens
  * Bot/user containers don’t overlap

---

## 💠 Tech Stack

* **HTML / CSS / JavaScript**
* **Google Gemini Flash API**
* **Font Awesome** for icons
* **PrismJS** for code formatting
* **Responsive Design** with CSS Flexbox + Media Queries

---

## 🚀 Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/PranavHendre02/CHAT-BOT.git

   ```

2. **Open `index.html` in Browser** *(no server needed)*

3. **Set Your API Key**:
   In `script.js`, replace the placeholder:

   ```js
   const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY";
   ```

---

## 📂 Project Structure

```
chatbot-gemini/
├── index.html
├── style.css
├── script.js
├── person.png
├── Mark_RGB_Blue.png
├── Dual Ball@1x-1.2s-205px-205px.gif
└── README.md
```

---

## 📌 Notes

* This project does **not** require any backend.
* Requires a **valid API key** from Google Generative Language API.
* Use responsibly within rate limits and TOS.

---

## 📄 License

MIT License

---

## 🤛🏼 Author

**Pranav Hendre**

---
