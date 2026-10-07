# Taaran Jain

**AI / ML Engineer · LLMs, RAG & Agentic Systems**

Jaipur, Rajasthan, India | +91 89555 35949 | [taaranjain16@gmail.com](mailto:taaranjain16@gmail.com) | [taaranjain.com](https://www.taaranjain.com) | [linkedin.com/in/taaran-jain](https://www.linkedin.com/in/taaran-jain/) | [github.com/Taaran18](https://github.com/Taaran18)

## Summary

AI/ML engineer with a year of industry experience building LLM tools for marketing teams, and seven projects that are live online, including a RAG assistant, a churn model and a log anomaly detector. I work mostly in Python, LangGraph and FastAPI, and care about the parts that make AI usable: answers that point to their source, scores that mean something, and systems that keep running when an API fails.

## Technical Skills

- **GenAI & LLMs:** LangChain, LangGraph, RAG, Embeddings, Vector Databases (ChromaDB, FAISS), BM25, AI Agents, Prompt Engineering, Structured Outputs, LLM Evaluation, Transformers (Hugging Face)
- **Machine Learning:** Deep Learning, scikit-learn, LightGBM, XGBoost, PyTorch, TensorFlow, Keras, NLP, Anomaly Detection, Probability Calibration
- **Backend & MLOps:** Python, FastAPI, REST APIs, SSE, WebSockets, Docker, PostgreSQL, MongoDB, Supabase, n8n, GCP, AWS, Azure
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS

## Experience

**AI Engineer**, e-Marketing.io · Jaipur | _Jun 2025 – Present_

- Build and ship the agency's AI tools, scoping each problem with the account team, picking the model and deploying it.
- Built an LLM **meeting summarizer** that turns hour-long calls into a brief with decisions and action items, an NLP **keyword analysis engine**, and **lead-qualifying chatbots** that reply to client leads around the clock.
- Built a **WhatsApp task delegation** system (text or voice note) and a **lead management dashboard** in FastAPI, React and PostgreSQL so clients can see where every lead stands.

**Data Science Intern**, LogiScope Pvt. Ltd. · Bengaluru | _Dec 2024 – Jun 2025_

- Built anomaly detection for large volumes of system logs with **DBSCAN and a deep learning autoencoder**, flagging problems as they happened and cutting the time to spot an issue by **20%**.
- Wrote the **FastAPI pipeline** around it (log ingestion, preprocessing, inference and alerts) and connected it to the production monitoring setup.

## Projects

**Nexus AI** | _LangGraph, FastAPI, Next.js, SSE_ | [Live Demo](https://nexus-ai.taaranjain.com) · [Case Study](https://www.taaranjain.com/case-studies/nexus-ai)

- Chat assistants rarely show where an answer came from, which makes them hard to trust, and the first version of this one broke overnight when its free LLM was retired.
- Rebuilt it as a six-step **LangGraph** pipeline that chooses between web search, the user's documents (via **embeddings**) or a direct answer, and streams each step as it runs.
- Document answers now cite the exact **file, page and line**. An 18-score decision board comes back in **about 0.4 s**, and cold start fell from up to 1.6 s to **0.7 s**.

**DecideX** | _scikit-learn, LightGBM, LLMs, FastAPI_ | [Live Demo](https://decidex.taaranjain.com) · [Case Study](https://www.taaranjain.com/case-studies/decidex)

- A churn score on its own doesn't tell a retention team what to do, and with only 26.5% of customers leaving, a model can look accurate while missing most of them.
- Built a tool where an **LLM reads account notes**, a **calibrated model** scores the risk, and a decision step suggests the action and owner, sending unsure cases to a person.
- On 1,409 held-out customers it reached **ROC-AUC 0.844**. Setting the threshold by the cost of a missed churner raised recall to **85.6%**, so missed churners went from 184 to **54**.

**Logvera** | _scikit-learn, RAG, FastAPI, Next.js_ | [Live Demo](https://logvera.taaranjain.com) · [Case Study](https://www.taaranjain.com/case-studies/logvera)

- Working out what went wrong from a raw server log usually means hours of grep, and a single anomaly model on its own misses a lot.
- Built a log analyser where **five detectors vote** on each time window, and an LLM answers questions using only redacted data and **BM25-retrieved lines** it has to cite.
- On a 34,492-line sample it flagged **3 incidents** and **588 credential-stuffing attempts**. Each upload is encrypted with its own key and deleted after an hour.

## Education

**B.Tech, Artificial Intelligence and Data Science**, Poornima Institute of Engineering & Technology | _Nov 2021 – Jun 2025_ | CGPA 8.5

## Certifications

- MLOps, TensorFlow Developer and Machine Learning Specializations (DeepLearning.AI); WorldQuant Silver; Azure AI Fundamentals

## Leadership

- AI/ML Lead, GDSC Poornima (20+ members, 6+ workshops); Event Lead, Poornima Hackathon 2.0 (200+ participants)
