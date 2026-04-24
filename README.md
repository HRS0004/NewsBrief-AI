# NewsBrief AI
**An Intelligent News Article Summary Generator**

> **NLP Mini Project** | IIIT Hinjewadi, Pune (Semester VIII)

NewsBrief AI is a full-stack web application that enables users to paste a news article URL or raw text and receive a clean, concise summary in seconds. The system combines a premium React-based frontend with a Python/Flask backend that pipes content through a pretrained transformer model (BART-large-CNN) to produce abstractive summaries.

---

## 🌟 Features
- **URL & Text Summarization:** Extract text directly from a news URL or paste raw text.
- **Adjustable Lengths:** Choose between *Short* (~2 sentences), *Medium* (~4 sentences), or *Detailed* (~6-8 sentences).
- **Keyword Extraction:** Automatically identifies top 5 keywords using KeyBERT.
- **Premium UI/UX:** Glassmorphic design, smooth animations, smart history sidebar, and reduced-motion support.
- **Stats Comparison:** View exactly how many words were saved.
- **Export Options:** One-click copy or download as a `.txt` file.

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Tailwind CSS (Custom Design System), Framer Motion, Axios.
- **Backend**: Python, Flask, Flask-CORS.
- **NLP Models**: HuggingFace `facebook/bart-large-cnn` (Summarization), `KeyBERT` (Keyword Extraction).
- **Web Scraping**: `newspaper3k`, `trafilatura`.

---

## 🚀 Running Locally

### Prerequisites
- Python 3.9+
- Node.js 18+

### 1. Start the Backend
```bash
cd backend
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```
*The backend will run on `http://127.0.0.1:5000`*

### 2. Start the Frontend
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
*The frontend will run on `http://localhost:5173`*

---

## 🌍 Deployment Guide (Phase 4)

To deploy NewsBrief AI to production, follow these steps using your own GitHub account.

### Deploying the Backend to Render
1. Push this entire repository to GitHub.
2. Sign in to [Render](https://render.com/).
3. Click **New** -> **Blueprint**.
4. Connect your GitHub repository.
5. Render will automatically detect the `render.yaml` file and deploy the backend service.
6. Once deployed, copy your backend URL (e.g., `https://newsbrief-backend.onrender.com`).

### Deploying the Frontend to Vercel
1. Sign in to [Vercel](https://vercel.com/).
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. In the "Configure Project" step:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Environment Variables**: Add `VITE_API_URL` and set its value to your Render backend URL (from step 6 above).
5. Click **Deploy**. Vercel will build and serve your frontend application.

---

## 👨‍💻 Project By
- **Prepared By**: Hrishikesh Supe
- **Course**: Natural Language Processing
- **Institution**: IIIT Hinjewadi, Pune (SPPU)
