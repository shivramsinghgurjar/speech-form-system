# 🎤 Speech Form System

An AI-powered web application that converts **speech or text input into structured form data automatically** using Natural Language Processing (NLP).

---

## 🚀 Project Overview

The **Speech Form System** simplifies form filling by allowing users to:

* 🎙 Speak input using voice
* ⌨️ Enter text manually
* 🤖 Extract meaningful information using AI
* 📄 Automatically populate structured forms
* 💾 Save extracted data to database

---

## 🧠 Architecture

This project is built using a **3-module architecture**:

```
speech-form-system/
│
├── ai-module/        # Python (FastAPI / NLP Processing)
├── backend/          # Node.js + Express + MongoDB
├── frontend/         # React (Vite)
```

---

## ⚙️ Tech Stack

### 🔹 Frontend

* React (Vite)
* JavaScript (ES6)
* CSS

### 🔹 Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### 🔹 AI Module

* Python
* FastAPI
* NLP (Keyword Extraction)

---

## 📌 Features

* 🎤 Speech-to-Text input
* 🧠 AI-based keyword extraction
* 📄 Dynamic form generation
* 🔗 API integration (Frontend ↔ Backend ↔ AI)
* 💾 Data storage in MongoDB
* ⚡ Real-time processing

---

## 🛠️ Installation & Setup

Follow these steps to run the project locally 👇

---

## 🔹 Step 1: Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/speech-form-system.git
cd speech-form-system
```

---

## 🔹 Step 2: Setup AI Module (Python)

```bash
cd ai-module
pip install -r requirements.txt
```

▶️ Run AI Server:

```bash
uvicorn main:app --reload
```

📍 Runs on:

```
http://127.0.0.1:8000
```

---

## 🔹 Step 3: Setup Backend (Node.js)

```bash
cd ../backend
npm install
```

### ⚠️ Create `.env` file inside backend:

```env
MONGO_URI=mongodb://127.0.0.1:27017/speech-form-db
PORT=5000
```

▶️ Run Backend Server:

```bash
node server.js
```

📍 Runs on:

```
http://localhost:5000
```

---

## 🔹 Step 4: Setup Frontend (React)

```bash
cd ../frontend
npm install
```

▶️ Run Frontend:

```bash
npm run dev
```

📍 Runs on:

```
http://localhost:5173
```

---

## 🔗 API Flow

```
Frontend → Backend → AI Module → Backend → Frontend
```

### Example:

* User speaks text
* Frontend sends text → Backend
* Backend calls AI module
* AI extracts keywords
* Backend sends structured data
* Frontend renders form

---

## 📂 Important Files

| File             | Description                |
| ---------------- | -------------------------- |
| `useSpeech.js`   | Handles speech recognition |
| `VoiceInput.jsx` | Voice input UI             |
| `api.js`         | API calls                  |
| `db.js`          | MongoDB connection         |
| `main.py`        | AI processing logic        |

---

## 🐛 Common Issues & Fixes

### ❌ MongoDB URI undefined

✔ Ensure `.env` file is present in backend

---

### ❌ Axios not found

```bash
npm install axios
```

---

### ❌ CSS not applying

✔ Ensure:

```js
import "./index.css";
```

in `main.jsx`

---

### ❌ Speech not working

✔ Use Chrome browser (Speech API support)

---

## 📸 Demo Workflow

1. Click **Start Speaking**
2. Speak your details
3. Click **Use Text**
4. Click **Extract Data**
5. Form auto-fills
6. Click **Submit**

---

## 🌟 Future Enhancements

* 🌐 Multi-language support
* 📱 Mobile responsiveness
* 🔐 Authentication system
* 📊 Dashboard for saved data
* 🤖 Advanced AI extraction

---

## 🤝 Contributing

Feel free to fork this repo and contribute 🚀

```bash
git fork
git clone
git checkout -b feature-name
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Shivram Singh Gurjar**
B.Tech CSE | Full Stack Developer

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
