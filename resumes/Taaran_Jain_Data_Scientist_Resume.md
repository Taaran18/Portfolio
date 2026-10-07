# Taaran Jain

**Data Scientist · Machine Learning & Analytics**

Jaipur, Rajasthan, India | +91 89555 35949 | [taaranjain16@gmail.com](mailto:taaranjain16@gmail.com) | [taaranjain.com](https://www.taaranjain.com) | [linkedin.com/in/taaran-jain](https://www.linkedin.com/in/taaran-jain/) | [github.com/Taaran18](https://github.com/Taaran18)

## Summary

Data scientist with hands-on experience finding anomalies in production log data and building predictive models, now working on applied AI in industry. Seven of my projects are live, including a churn model, a no-code model comparison tool and a log analyser. I spend most of my time on what decides whether a model is useful: exploring the data, choosing the right metric, calibrating probabilities and setting thresholds by cost.

## Technical Skills

- **Languages & Data:** Python, SQL, Pandas, NumPy, PyArrow, EDA, Feature Engineering, Data Cleaning, Data Quality
- **Machine Learning:** scikit-learn, XGBoost, LightGBM, CatBoost, PyTorch, TensorFlow, Classification, Regression, Clustering, Time Series
- **Modelling:** Cross-Validation, Imbalanced Data (PR-AUC), Calibration, Cost-Sensitive Thresholds, Anomaly Detection, Explainability, Fairness
- **Tools & Cloud:** PostgreSQL, MySQL, MongoDB, FastAPI, Docker, Matplotlib, NLP, LLMs and RAG, LangChain, Azure, GCP, AWS

## Experience

**AI Engineer**, e-Marketing.io · Jaipur | _Jun 2025 – Present_

- Build and ship the agency's AI tools, including an NLP **keyword analysis engine** that surfaces search trends, intent and competitor gaps.
- Built an LLM **meeting summarizer**, lead-qualifying chatbots and a **lead dashboard** (FastAPI, React, PostgreSQL) that shows clients where every lead stands.

**Data Science Intern**, LogiScope Pvt. Ltd. · Bengaluru | _Dec 2024 – Jun 2025_

- Explored large volumes of system logs (**EDA**) and built anomaly detection with **DBSCAN and an autoencoder**, cutting the time to spot an issue by **20%**.
- Wrote the **FastAPI pipeline** around it (log ingestion, preprocessing, inference and alerts) and connected it to production monitoring.

## Projects

**DecideX** | _scikit-learn, LightGBM, LLMs, FastAPI_ | [Live Demo](https://decidex.taaranjain.com) · [Case Study](https://www.taaranjain.com/case-studies/decidex)

- Only 26.5% of customers churn in the IBM Telco data, so accuracy hides how many leavers a model misses, and missing one costs far more than a false alarm.
- Compared four models on a stratified 60/20/20 split, chose by **PR-AUC**, calibrated with isotonic regression and set the threshold from a 5:1 cost ratio.
- Held-out **ROC-AUC 0.844** and **ECE 0.018**. Recall went from 50.8% to **85.6%** (missed churners from 184 to 54), with gender and age kept out of training.

**MLInsights** | _scikit-learn, XGBoost, LightGBM, CatBoost, FastAPI_ | [Live Demo](https://ml-insights.taaranjain.com) · [Case Study](https://www.taaranjain.com/case-studies/ml-insights)

- Finding the right model for a spreadsheet usually means a notebook per model, which shuts out people who know their data but don't write Python.
- Built a no-code tool that cleans the data and trains any of **68** scikit-learn, XGBoost, LightGBM and CatBoost models with **5-fold cross-validation**.
- It ranks the models side by side and exports the report and trained models. On a 442-row sample, 12 models ranged from **R2 0.08 to 0.47**.

**Logvera** | _scikit-learn, NumPy, FastAPI, LLMs_ | [Live Demo](https://logvera.taaranjain.com) · [Case Study](https://www.taaranjain.com/case-studies/logvera)

- Anomalies in server logs hide among thousands of normal lines, and half-filled time windows at the start and end of a log were showing up as fake outages.
- Built an ensemble where **five detectors vote** on each window, explained every incident with feature z-scores, and stopped edge windows from being flagged.
- On a 34,492-line sample it learned **84 message patterns** and flagged **3 incidents**, one caught by four of the five models, plus **588 login attacks**.

## Education

**B.Tech, Artificial Intelligence and Data Science**, Poornima Institute of Engineering & Technology | _Nov 2021 – Jun 2025_ | CGPA 8.5

## Research

- [Deep Reinforcement Learning in Algorithmic Trading: A Review (2024)](https://drive.google.com/file/d/1JrQr3GPGTdiZVVmTB8NyQrjBRennxn4-/view?usp=sharing)
- [AI-Driven Medical Diagnostic System Using Deep Learning (2024)](https://drive.google.com/file/d/1xuDjC77PjfrImIh8O-SiCckdHI8ioUfh/view?usp=sharing)

## Certifications

- Google Advanced Analytics and Data Analytics; Machine Learning Specialization (DeepLearning.AI); WorldQuant Silver; Azure Data Fundamentals
