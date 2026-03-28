'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Experience } from '@/types'

const EXPERIENCES: Experience[] = [
  {
    _id: '1',
    company: 'e-Marketing.io',
    role: 'AI Engineer',
    description:
      'Sole AI Engineer responsible for designing and shipping the full suite of AI-powered products for a performance marketing agency and its clients — owning everything from problem scoping and model selection to deployment and iteration.',
    responsibilities: [
      'Built an AI Meeting Summarizer that converts hour-long recordings into structured briefs with decisions and action items — saving teams hours of follow-up every week.',
      'Developed a Keyword Analysis Engine that replaced gut-feel content decisions with NLP-driven insights on trends, intent, and competitor gaps.',
      'Shipped AI chatbots across social media and messaging platforms that qualify leads and respond instantly — keeping client pipelines active around the clock without human intervention.',
      'Delivered a Lead Management Dashboard giving clients real-time visibility into pipeline status and full bot conversation history — everything in one place.',
      'Built a WhatsApp Task Delegation system where teams assign, track, and close tasks via text or voice note — eliminating app-switching and keeping everyone accountable.',
    ],
    technologies: ['Python', 'LangChain', 'OpenAI API', 'WhatsApp Business API', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
    startDate: '2025-06',
    current: true,
    order: 1,
  },
  {
    _id: '2',
    company: 'LogiScope Technologies Pvt. Ltd.',
    role: 'Data Science Specialist',
    description:
      'Focused on making sense of massive, noisy log data — building ML and deep learning backends that turned raw system logs into actionable intelligence for monitoring and reliability teams.',
    responsibilities: [
      'Ran deep EDA on large-scale log datasets to surface hidden patterns that manual monitoring consistently missed.',
      'Built and deployed anomaly detection models using ML and DL algorithms that flagged system irregularities in real time — strengthening monitoring before issues escalated.',
      'Experimented across multiple analytical techniques to identify the most reliable signals within complex log behaviour, turning raw data into clear, actionable outcomes.',
      'Collaborated with cross-functional teams to integrate findings into data processing pipelines and improve anomaly reporting frameworks end-to-end.',
    ],
    technologies: ['Python', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Deep Learning', 'Anomaly Detection', 'EDA'],
    startDate: '2024-12',
    endDate: '2025-06',
    current: false,
    order: 2,
  },
  {
    _id: '3',
    company: 'Celebal Technologies',
    role: 'Data Science Intern',
    description:
      'Worked within a professional data science team during a summer internship — getting hands-on with the full pipeline from raw data to deployed models, and applying Azure Cloud to bring it all together in a real production context.',
    responsibilities: [
      'Cleaned and preprocessed large datasets end-to-end, ensuring model inputs were reliable before a single line of training code ran.',
      'Implemented ML algorithms against real business problems — moving from experimentation to predictive models with measurable outcomes.',
      'Leveraged Azure Cloud services to understand how production-grade data applications are architected and deployed at scale.',
      'Collaborated closely with senior data scientists, absorbing best practices and contributing to cross-functional project delivery.',
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Azure', 'Machine Learning'],
    startDate: '2024-05',
    endDate: '2024-08',
    current: false,
    order: 3,
  },
]

function formatDate(d: string) {
  const [y, m] = d.split('-')
  return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function Experience() {
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
          {EXPERIENCES.map((exp, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, scale: 0.88, x: isLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 pl-12 md:pl-0 ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                }`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 border-2 border-[var(--bg-primary)] shadow-lg shadow-cyan-500/30 z-10 mt-6" />

                <div className={`md:w-[46%] ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <div className="glass rounded-2xl p-6 border-gradient hover:shadow-lg hover:shadow-cyan-500/10 hover:scale-[1.02] transition-all group">
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

                    <div className="flex items-center gap-1 text-slate-400 text-xs font-mono mb-4">
                      <Calendar size={12} />
                      <span>{formatDate(exp.startDate)} — {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}</span>
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
