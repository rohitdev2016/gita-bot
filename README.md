# 🙏 Gita‑Bot

A multilingual Bhagavad Gītā chatbot built with Next.js, LangChain, and OpenAI. Ask questions about life, duty, or spirituality—and receive verse-based answers in **English**, **Telugu**, and **Hindi**.

---

## 🌟 Live Demo

Your chatbot is publicly available at:  
**https://YOUR-VERCEL-URL.vercel.app/**

---

## 🔍 Features

- **Multilingual Support** – Ask questions and receive answers in English, Telugu, and Hindi (select one or multiple languages).
- **Verse Retrieval** – Uses retrieval-augmented generation (RAG) to fetch relevant Bhagavad Gītā verses.
- **GPT‑Powered Answers** – Powered by OpenAI’s GPT‑4 (or similar) model for insightful, contextual responses.
- **Empathetic Mode** – Personal/life-question detection triggers compassionate, verse-based guidance.
- **Mobile‑First & Clean UI** – Styled with Tailwind CSS and 21st.dev components for a warm, accessible experience.

---

## 🗂 Project Structure

gita-bot/
├── data/
│ └── *.pdf # Bhagavad Gītā PDFs (English, Telugu, Hindi)
├── lib/
│ ├── ingest.js # PDF ingestion & embedding logic
│ └── chat.js # Retrieval + OpenAI chat integration
├── pages/ or app/
│ ├── index.js # Home / chat UI
│ └── api/chat.js # Next.js API route for handling user queries
├── public/ # Static assets (logo, icons)
├── styles/ # Global styles (Tailwind CSS)
└── package.json, etc.

yaml
Copy
Edit

---

## ⚙️ Setup & Local Development

1. **Clone the repo**
   ```bash
   git clone https://github.com/rohitdev2016/gita-bot.git
   cd gita-bot
Install dependencies

bash
Copy
Edit
npm install
Add your OpenAI API key

bash
Copy
Edit
export OPENAI_API_KEY="your_openai_api_key"
Ingest PDFs to build vector store

bash
Copy
Edit
node lib/ingest.js
Run the development server

bash
Copy
Edit
npm run dev
Visit http://localhost:3000

🚀 Deployment on Vercel
Push your project to GitHub:

bash
Copy
Edit
git add .
git commit -m "Initial deploy"
git push origin main
Connect your repository on Vercel.com.

Add OPENAI_API_KEY in the Vercel Project Settings.

Deploy: Vercel auto-deploys the app, making it live with its own domain.

🧠 Technical Details
PDF → Embeddings: Uses LangChain’s PDFLoader and TextSplitter, generates embeddings stored in ChromaDB.

Similarity Search: Retrieves top relevant verse chunks using user questions.

Prompt Engineering: Constructs contextual prompts for GPT‑4 with selected verses and instructions in chosen languages.

Chat API: Accepts JSON ({ question, languages }), returns replies per language.

💬 Usage Tips
Try:

“What is dharma?”

“I’m feeling anxious about my job.”

Select multiple languages to compare translations.

If no verse is found, GPT gives general advice (fallback behavior).

🛠 Troubleshooting
No responses? Ensure PDF ingestion succeeded and the data/ folder exists.

Timeouts or errors? Check Vercel logs to inspect /api/chat runtime behavior.

Model issues? Confirm your OpenAI key is correct and GPT‑4 access is enabled.

🧩 Future Enhancements
Add more languages (e.g., Sanskrit, Kannada).

UI improvements: avatars, theme toggle, user session history.

Authentication and favorite quotes tracking.

Analytics on most asked questions.

🤝 Contributing
Contributions are welcome! To help:

Fork the repo

Create a feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Add your feature"

Push and open a Pull Request

📄 License
This project is released under the MIT License.

May Gītā’s wisdom guide every seeker. 🙏

yaml
Copy
Edit

---

Let me know if you'd like badges for build status, OpenAI usage metrics, or screenshots added!
::contentReference[oaicite:0]{index=0}
