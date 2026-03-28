'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, Rocket, Database, BookOpen } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const stats = [
  { value: '2+', label: 'Years in AI/ML' },
  { value: '5+', label: 'Projects Deployed' },
  { value: '3+', label: 'Research Papers Read' },
  { value: '10+', label: 'GitHub Repositories' },
]

const traits = [
  { icon: BrainCircuit, title: 'LLM Engineering', desc: 'Building RAG pipelines, fine-tuning transformers, and deploying production-grade LLM applications.' },
  { icon: Database, title: 'Data Science', desc: 'End-to-end ML pipelines — from raw data ingestion and feature engineering to model evaluation.' },
  { icon: Rocket, title: 'MLOps & Deployment', desc: 'Taking models from notebook to production with robust CI/CD, monitoring, and scalability.' },
  { icon: BookOpen, title: 'Research-Driven', desc: 'Staying close to SOTA research and translating cutting-edge ideas into practical systems.' },
]

export default function About() {
  return (
    <section id="about" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        label="01 / About"
        title="About Me"
        subtitle="I'm obsessed with making machines learn — and making sure what they learn is actually useful."
      />

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left — zooms in from left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, x: -50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed text-justify">
            Hey! I&apos;m <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Taaran</span>, an AI Engineer
            passionate about building systems at the intersection of{' '}
            <span className="text-purple-600 dark:text-purple-400 font-semibold">large language models</span>,
            deep learning, and real-world applications.
          </p>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
            I work across the full ML lifecycle — from exploratory data analysis and model research to
            serving models at scale in production. My current focus is on LLM-powered applications:
            retrieval-augmented generation (RAG), agentic AI, and multimodal systems.
          </p>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-justify">
            When I&apos;m not training models or writing code, I&apos;m reading the latest papers on arXiv,
            contributing to open-source AI tools, or experimenting with new architectures.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              // Core ML
              'Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'Keras',
              // Data
              'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SQL',
              // LLM / NLP
              'LangChain', 'LangGraph', 'HuggingFace', 'OpenAI API', 'RAG',
              'LoRA', 'QLoRA', 'RLHF', 'Prompt Engineering', 'spaCy',
              // Vector / Search
              'Pinecone', 'ChromaDB', 'FAISS',
              // CV
              'OpenCV', 'YOLO', 'TensorRT',
              // MLOps & Infra
              'MLflow', 'Weights & Biases', 'DVC', 'FastAPI', 'Docker',
              'Kubernetes', 'AWS', 'GCP', 'Apache Spark',
            ].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full text-xs font-mono text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 bg-cyan-500/5">
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-4">
            <a href="https://drive.google.com/file/d/1-ckubTF7jTKD8m9k3MNkf8JmydBHCjuy/view?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-cyan-500/40 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 hover:scale-105 transition-all text-sm font-medium">
              View Resume
            </a>
          </div>
        </motion.div>

        {/* Right — zooms in from right */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-6 text-center border-gradient"
              >
                <p className="text-3xl font-bold text-gradient mb-1">{stat.value}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs whitespace-nowrap">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, scale: 0.82, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-xl p-5 group hover:border-cyan-500/30 transition-all"
              >
                <trait.icon size={22} className="text-cyan-500 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-slate-900 dark:text-white font-semibold text-sm mb-1">{trait.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{trait.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
