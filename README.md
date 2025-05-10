# 🔮 Velocity AI Chatbot - Gemini Powered

A modern, responsive web-based chatbot powered by the **Google Gemini 2.0 Flash API** for generating natural language responses and analyzing uploaded images. Built with **vanilla JavaScript**, this project features a clean, minimal dark-themed UI with a professional design, optimized for readability and usability across devices.

**✅ Live Demo:** [ChatBot](https://chatbotpranav.netlify.app)

---

## ✨ Features

* 🤖 **Gemini-2.0-Flash** model for intelligent text and image-based responses
* 🖼️ **Image Upload** for multimodal input understanding
* 💬 **Dynamic Chat Interface** with labeled user ("User") and AI ("Velocity") messages for clear distinction
* 📜 **Syntax Highlighting** using **PrismJS** for code blocks, with vertical orientation for enhanced readability
* 📱 **Responsive Layout** with media queries for seamless use on desktops, tablets, and mobile devices
* 🖤 **Minimal Dark Theme** with glassmorphism effects in the prompt bar and header
* 🔲 **Square Chat Areas** for a clean, modern aesthetic
* 📏 **Optimized Spacing** with margin between chat container and prompt area to prevent overlap

---

## 📸 Screenshot

*Note*: The screenshot in the repository ([Interface.png](https://github.com/PranavHendre02/CHAT-BOT/blob/main/Interface.png)) reflects an earlier version with avatars and rounded chat areas. Please replace it with an updated screenshot showcasing the square chat areas, user/AI names, and vertical code display.

---

## 🧠 How It Works

The frontend is powered by vanilla JavaScript, with a straightforward workflow:

1. **User Interaction**:

   * Users type messages in the text input or upload images via the file selector.
   * Inputs are captured through the `<input>` element and buttons.

2. **Request Handling**:

   * On submission (Enter key or send button), JavaScript sends a request to:

     ```
     POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
     ```

   * Payload format:

     ```json
     {
       "contents": [
         {
           "parts": [
             { "text": "User message here" },
             { "inline_data": { "mime_type": "image/...", "data": "base64..." } }
           ]
         }
       ]
     }
     ```

3. **Response Rendering**:

   * Gemini responses are parsed, with Markdown (e.g., code blocks, inline math) converted to HTML.
   * Code blocks are vertically oriented and syntax-highlighted using PrismJS.
   * User and AI messages are labeled with "User" and "Velocity" for clarity.

4. **Image Upload**:

   * Uploaded images are converted to Base64 and included in the API request for Gemini’s multimodal analysis.

---

## 🍥 UI Design

* 🖤 **Dark Theme**: Gradient background (#0a0a0a to #1c2526) for a sleek look
* 🔲 **Square Chat Areas**: Both user and AI messages use square containers with no border-radius
* 📛 **Labeled Messages**: User messages prefixed with "User" (blue) and AI messages with "Velocity" (yellow)
* 📜 **Vertical Code/Math Display**: Code blocks and math terms wrap vertically for readability, eliminating horizontal scroll
* 🔍 **Glassmorphism**: Prompt bar and header use `backdrop-filter: blur` for a frosted-glass effect
* 📱 **Responsive Design**: Media queries ensure usability on small screens, with inline prompt buttons and scaled fonts

---

## 💠 Tech Stack

* **HTML / CSS / JavaScript**: Core frontend technologies
* **Google Gemini 2.0 Flash API**: Powers text and image-based responses
* **Font Awesome**: Icons for prompt buttons
* **PrismJS**: Syntax highlighting for code blocks
* **CSS Flexbox**: Layout management for chat and prompt areas
* **Media Queries**: Responsive design for all screen sizes

---

## 🚀 Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/PranavHendre02/CHAT-BOT.git
   ```

2. **Open `index.html` in a Browser**:

   * No server is required; the app runs locally.

3. **Set Your API Key**:
   In `script.js`, replace the placeholder with your Google Generative Language API key:

   ```js
   const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY";
   ```

---

## 📂 Project Structure

```
chatbot-gemini/
├── index.html          # Main HTML structure
├── style.css           # Styling for UI and responsiveness
├── script.js           # JavaScript logic for API calls and rendering
├── README.md           # Project documentation
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
