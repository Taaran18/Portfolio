import type { Paper } from '@/types'

export const PUBLISHED_PAPERS: Paper[] = [
  {
    _id: 'p1',
    title: 'A Review of Deep Reinforcement Learning Techniques in Algorithmic and Quantitative Trading',
    year: 'Nov 2024',
    summary:
      'A systematic review of DRL methods applied to algorithmic trading — benchmarking frameworks like AlphaOptimizerNet, QTNet, and FinRL against challenges of market volatility, transaction costs, and the exploration-exploitation tradeoff. Evaluates DDQN and RDMM approaches and outlines what is still needed before DRL systems are production-robust.',
    link: 'https://drive.google.com/file/d/1JrQr3GPGTdiZVVmTB8NyQrjBRennxn4-/view?usp=sharing',
    category: 'Finance',
  },
  {
    _id: 'p2',
    title: 'AI-Driven Medical Diagnostic System: Incorporating Deep Learning for a More Effective Healthcare Model',
    year: 'Apr 2024',
    summary:
      'Presents a multi-modal diagnostic system combining deep learning and NLP to automate disease detection, medical image analysis, and drug identification. Integrates Gemini for real-time AI insights on a Django/React Native stack — targeting reduced diagnostic time, human error, and cost, especially in remote and underserved healthcare settings.',
    link: 'https://drive.google.com/file/d/1xuDjC77PjfrImIh8O-SiCckdHI8ioUfh/view?usp=sharing',
    category: 'Healthcare',
  },
]
