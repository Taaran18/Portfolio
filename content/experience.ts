import type { Experience } from '@/types'

export const EXPERIENCES: Experience[] = [
  {
    _id: '1',
    company: 'e-Marketing.io',
    role: 'AI Engineer',
    description:
      'Design and ship the AI products a performance marketing agency runs for its clients, owning each one from problem scoping and model selection to deployment and iteration.',
    responsibilities: [
      'Built an AI meeting summarizer that turns hour-long recordings into structured briefs with decisions and action items, cutting follow-up work after every call.',
      'Shipped lead-qualifying AI chatbots across social and messaging platforms that reply instantly and keep client pipelines active around the clock.',
      'Developed an NLP keyword analysis engine that surfaces trends, search intent and competitor gaps, replacing gut-feel content planning.',
      'Delivered a lead management dashboard with real-time pipeline status and full bot conversation history for each client.',
      'Built a WhatsApp task delegation system where teams assign, track and close tasks by text or voice note, without switching apps.',
    ],
    technologies: [
      'Python',
      'LangChain',
      'OpenAI API',
      'WhatsApp Business API',
      'FastAPI',
      'React',
      'PostgreSQL',
      'Docker',
    ],
    startDate: '2025-06',
    current: true,
    order: 1,
  },
  {
    _id: '2',
    company: 'LogiScope Technologies Pvt. Ltd.',
    role: 'Data Science Specialist',
    description:
      'Built ML and deep learning backends that turned large, noisy system logs into alerts that monitoring and reliability teams could act on.',
    responsibilities: [
      'Built and deployed anomaly detection models, using both ML and deep learning, that flag system irregularities in real time before they escalate.',
      'Ran EDA on large-scale log datasets and surfaced failure patterns that manual monitoring consistently missed.',
      'Benchmarked several detection techniques to find the most reliable signals in complex log behaviour.',
      'Integrated the findings into data processing pipelines and improved the anomaly reporting framework with cross-functional teams.',
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
    description: 'Worked in a production data science team, taking projects from raw data to deployed models on Azure.',
    responsibilities: [
      'Cleaned and preprocessed large datasets so the models trained on reliable inputs.',
      'Implemented ML models against real business problems, from first experiment to a working predictive model.',
      'Used Azure cloud services to see how production data applications are architected and deployed.',
      'Delivered cross-functional project work alongside senior data scientists.',
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Azure', 'Machine Learning'],
    startDate: '2024-05',
    endDate: '2024-08',
    current: false,
    order: 3,
  },
]
