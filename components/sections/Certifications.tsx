'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  description: string
  credential: string
  color: 'blue' | 'orange' | 'green' | 'purple'
}

const CERTS: Certification[] = [
  {
    id: '0',
    name: 'WorldQuant Challenge — Silver Certificate',
    issuer: 'WorldQuant',
    date: 'Jun 2025',
    description: 'Awarded for strong performance in WorldQuant\'s quantitative research challenge — applying data-driven and algorithmic thinking to real financial markets.',
    credential: 'https://drive.google.com/file/d/1cUXfSkDlyhoAIUGm0plalbrZT1RBkTsH/view?usp=sharing',
    color: 'purple',
  },
  {
    id: '1',
    name: 'Financial Analyst Career Track',
    issuer: '365 Financial Analyst',
    date: 'Nov 2024',
    description: 'Financial modelling, valuation, and data-driven investment analysis — adding a quantitative finance lens to complement my ML engineering background.',
    credential: 'https://learn.365financialanalyst.com/certificates/DD-FB6D812B4E/',
    color: 'purple',
  },
  {
    id: '2',
    name: 'MLOps Specialization',
    issuer: 'DeepLearning.AI · Coursera',
    date: 'Mar 2024',
    description: 'Bridges the gap between model training and production — CI/CD for ML, data pipelines, model monitoring, and scalable deployment practices.',
    credential: 'https://www.coursera.org/account/accomplishments/specialization/U3YF7Z5E72Q2',
    color: 'orange',
  },
  {
    id: '3',
    name: 'TensorFlow: Advanced Techniques Specialization',
    issuer: 'DeepLearning.AI · Coursera',
    date: 'Feb 2024',
    description: 'Goes beyond standard TensorFlow — custom model architectures, advanced CV pipelines, and performance optimisation for production deployment.',
    credential: 'https://www.coursera.org/account/accomplishments/specialization/AXDXB9D9XPDM',
    color: 'orange',
  },
  {
    id: '4',
    name: 'TensorFlow Developer Specialization',
    issuer: 'DeepLearning.AI · Coursera',
    date: 'Feb 2024',
    description: 'End-to-end deep learning with TensorFlow — building and training neural networks for computer vision, NLP, and time series tasks.',
    credential: 'https://www.coursera.org/account/accomplishments/specialization/VAPLJXCE9G6S',
    color: 'orange',
  },
  {
    id: '5',
    name: 'Advanced Analytics Professional Certificate',
    issuer: 'Google · Coursera',
    date: 'Aug 2023',
    description: 'Advanced-level data analytics with Python and statistical modelling — translating complex analysis into decisions that drive measurable outcomes.',
    credential: 'https://www.coursera.org/account/accomplishments/professional-cert/BZGJQBE4JRE2',
    color: 'green',
  },
  {
    id: '6',
    name: 'Google Data Analytics Professional Certificate',
    issuer: 'Google · Coursera',
    date: 'Aug 2023',
    description: 'Google\'s professional data analytics track — data cleaning, SQL, R, and Tableau to turn raw data into clear, actionable insights.',
    credential: 'https://coursera.org/share/b7640004570568bb820df9b25115339d',
    color: 'green',
  },
  {
    id: '7',
    name: 'Business Analytics & Digital Media',
    issuer: 'Indian School of Business · Coursera',
    date: 'Jun 2023',
    description: 'Covers data-driven decision making, digital marketing analytics, and business strategy — bridging the gap between ML outputs and real business impact.',
    credential: 'https://coursera.org/share/efdaf8b4eee4b6da9ca235cac7b50dc0',
    color: 'purple',
  },
  {
    id: '8',
    name: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI · Coursera',
    date: 'Jun 2023',
    description: 'Andrew Ng\'s gold-standard ML curriculum — supervised, unsupervised, and reinforcement learning with a strong focus on real-world application.',
    credential: 'https://www.coursera.org/account/accomplishments/specialization/BXVTML3Y2G5V',
    color: 'orange',
  },
  {
    id: '9',
    name: 'Azure AI Fundamentals',
    issuer: 'Microsoft',
    date: 'May 2023',
    description: 'Validates core AI and ML concepts on Microsoft Azure — the foundation for deploying AI services in cloud-native production environments.',
    credential: 'https://www.credly.com/badges/ea0d49b6-8fd8-49be-9c4b-0c828d4307e1/linked_in_profile',
    color: 'blue',
  },
  {
    id: '10',
    name: 'Azure Data Fundamentals',
    issuer: 'Microsoft',
    date: 'Apr 2023',
    description: 'Validates core data concepts on Azure — relational and non-relational databases, analytics workloads, and cloud data storage fundamentals.',
    credential: 'https://www.credly.com/badges/cabc0e27-e5a9-44f4-b931-d97c635d50ab/linked_in_profile',
    color: 'blue',
  },
]

const COLOR_MAP = {
  blue:   { dot: 'bg-blue-500',   badge: 'bg-blue-500/10 border-blue-500/20 text-blue-500',     hover: 'hover:border-blue-500/30 hover:shadow-blue-500/10' },
  orange: { dot: 'bg-orange-400', badge: 'bg-orange-400/10 border-orange-400/20 text-orange-400', hover: 'hover:border-orange-400/30 hover:shadow-orange-400/10' },
  green:  { dot: 'bg-green-500',  badge: 'bg-green-500/10 border-green-500/20 text-green-500',   hover: 'hover:border-green-500/30 hover:shadow-green-500/10' },
  purple: { dot: 'bg-purple-500', badge: 'bg-purple-500/10 border-purple-500/20 text-purple-400', hover: 'hover:border-purple-500/30 hover:shadow-purple-500/10' },
}

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        label="07 / Certifications"
        title="Certifications"
        subtitle="Credentials that validate my expertise across AI, ML, and data — from foundations to production."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CERTS.map((cert, i) => {
          const c = COLOR_MAP[cert.color]
          return (
            <motion.a
              key={cert.id}
              href={cert.credential}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className={`group glass rounded-2xl p-5 border border-black/5 dark:border-white/5
                hover:shadow-xl hover:scale-[1.03] transition-all duration-300 flex flex-col ${c.hover}`}
            >
              {/* Top row — dot + date */}
              <div className="flex items-center justify-between mb-4">
                <span className={`w-2.5 h-2.5 rounded-full ${c.dot} shadow-md`} />
                <span className="text-slate-400 text-xs font-mono">{cert.date}</span>
              </div>

              {/* Cert name */}
              <h3 className="text-slate-900 dark:text-white font-bold text-base leading-snug mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {cert.name}
              </h3>

              {/* Issuer badge */}
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${c.badge} mb-3`}>
                {cert.issuer}
              </span>

              {/* Description */}
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-4 flex-1">
                {cert.description}
              </p>

              {/* View credential */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 group-hover:text-cyan-500 transition-colors">
                <ExternalLink size={12} />
                <span>View Credential</span>
              </div>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}
