'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Experience } from '@/types'

const SEED_EXPERIENCE: Experience[] = [
  {
    _id: '1',
    company: 'AI Startup (Stealth)',
    role: 'AI Engineer',
    description:
      'Designing and shipping production LLM applications including a multi-agent RAG platform for enterprise knowledge management.',
    responsibilities: [
      'Built a multi-agent RAG system with LangGraph, cutting retrieval latency by 40%',
      'Fine-tuned Llama 3 on proprietary data using QLoRA, achieving 15% accuracy gain over GPT-3.5',
      'Designed vector search pipeline with Pinecone + reranking for 10M+ document corpus',
      'Deployed FastAPI inference endpoints on AWS ECS with auto-scaling',
    ],
    technologies: ['Python', 'LangChain', 'LangGraph', 'Llama 3', 'Pinecone', 'FastAPI', 'AWS', 'Docker'],
    startDate: '2023-08',
    current: true,
    order: 1,
  },
  {
    _id: '2',
    company: 'Data Analytics Firm',
    role: 'Machine Learning Engineer',
    description:
      'Developed and maintained ML models powering a B2B predictive analytics product used by 50+ enterprise clients.',
    responsibilities: [
      'Built XGBoost and transformer-based forecasting models, improving MAPE by 22%',
      'Designed feature engineering pipelines processing 500GB+ of time-series data daily',
      'Implemented MLflow-based experiment tracking and model registry',
      'Created automated retraining triggers on data drift with Evidently AI',
    ],
    technologies: ['Python', 'XGBoost', 'PyTorch', 'Scikit-learn', 'MLflow', 'Airflow', 'PostgreSQL'],
    startDate: '2022-05',
    endDate: '2023-07',
    current: false,
    order: 2,
  },
  {
    _id: '3',
    company: 'Research Lab (University)',
    role: 'AI Research Intern',
    description:
      'Contributed to NLP research on low-resource language understanding, resulting in a published workshop paper.',
    responsibilities: [
      'Implemented cross-lingual transfer learning experiments with mBERT and XLM-R',
      'Ran ablation studies and benchmark evaluations on 8 downstream NLP tasks',
      'Co-authored a workshop paper on few-shot prompting for low-resource languages',
    ],
    technologies: ['Python', 'HuggingFace', 'PyTorch', 'NLTK', 'Jupyter', 'LaTeX'],
    startDate: '2021-06',
    endDate: '2022-04',
    current: false,
    order: 3,
  },
]

function formatDate(dateStr: string) {
  const [year, month] = dateStr.split('-')
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>(SEED_EXPERIENCE)

  useEffect(() => {
    fetch('/api/experience')
      .then((r) => r.json())
      .then((data) => { if (data?.length) setExperiences(data) })
      .catch(() => {})
  }, [])

  return (
    <section id="experience" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        label="02 / Experience"
        title="Work Experience"
        subtitle="My journey through AI engineering, ML research, and production deployment."
      />

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent -translate-x-1/2" />

        <div className="space-y-12">
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 pl-12 md:pl-0 ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 border-2 border-[var(--bg-primary)] shadow-lg shadow-cyan-500/30 z-10 mt-6" />

                <div className={`md:w-[46%] ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <div className="glass rounded-2xl p-6 border-gradient hover:shadow-lg hover:shadow-cyan-500/10 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-slate-900 dark:text-white font-bold text-lg group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-cyan-600 dark:text-cyan-400 font-semibold">{exp.company}</p>
                      </div>
                      {exp.current && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-slate-400 text-xs font-mono mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(exp.startDate)} — {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">{exp.description}</p>

                    <ul className="space-y-1.5 mb-5">
                      {exp.responsibilities.map((r, j) => (
                        <li key={j} className="flex gap-2 text-slate-500 dark:text-slate-400 text-sm">
                          <span className="text-cyan-500 mt-0.5 shrink-0">▸</span>
                          {r}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <span key={t} className="px-2.5 py-0.5 rounded-full text-xs font-mono text-purple-600 dark:text-purple-300 bg-purple-500/10 border border-purple-500/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
