# 📘 Gita‑Bot

A multilingual Bhagavad Gītā chatbot built with Next.js, Tailwind CSS, OpenAI, and LangChain—supporting English, Hindi & Telugu. Hosted for free on Vercel, empowering users to seek spiritual wisdom and guidance.

---

## 🚀 Live Demo

Check out the live version here:  
**https://your-deployed-url.vercel.app**  *(Replace with your actual URL)*

---

## 🧭 Features

- **Multilingual chat**: User-selectable output in English, Hindi & Telugu
- **PDF-based knowledge**: Answers drawn directly from Bhagavad Gītā PDFs (English/Hindi/Telugu)
- **RAG-powered responses**: Retrieval-augmented with LangChain + OpenAI for accurate verse references
- **Personal question mode**: Compassionate, verse-enabled replies for life queries
- **Mobile-first, 21st.dev–inspired UI**: Clean, responsive, accessible interface built with Tailwind and 21st.dev components
- **Free hosting**: Deployed via Vercel's Hobby plan—no cost to end users

---

## 🧩 How It Works

1. **PDF ingestion**  
   - Preprocesses your Gītā PDFs into small text chunks  
   - Embeds chunks via OpenAIEmbeddings & stores in Chroma vector database

2. **User query flow**  
   - Frontend sends `{ question, languages }` to `/api/chat`  
   - Backend retrieves relevant verse chunks via similarity search  
   - Composes a prompt combining:
     - System guidance ("You are a spiritual guide…")  
     - Retrieved verse snippets  
     - User’s question  
   - Requests GPT‑4.1 (or your preferred model) to answer per selected language

3. **Frontend display**  
   - Renders responses in card/tabs per language  
   - Shows errors, loading states, and validations gracefully

---

## ⚙️ Local Setup

To run locally:

```bash
git clone https://github.com/rohitdev2016/gita-bot.git
cd gita-bot

# Install dependencies
npm install

# Add your OpenAI key
export OPENAI_API_KEY="sk‑YOURKEY"

# Run the app
npm run dev
