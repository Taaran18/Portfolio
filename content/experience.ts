import type { Experience } from '@/types'

export const EXPERIENCES: Experience[] = [
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
