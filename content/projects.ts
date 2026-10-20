import type { Project } from '@/types'

export const PROJECTS: Project[] = [
  {
    slug: 'nexus-ai',
    title: 'Nexus AI',
    category: 'RAG · LangGraph Agent',
    tagline: 'An AI assistant that shows its sources and confidence',
    description:
      "An AI assistant that shows where every answer came from: the route it took, the exact page and line it cited, and a calibrated score when you're weighing a decision.",
    problem:
      "Chat assistants give you an answer and hide the rest: whether it came from the web, your files or the model's memory, and how confident it is. That's exactly what matters when you're checking a policy or making a real decision.",
    solution:
      "A six-node LangGraph pipeline routes each question to web search, your documents or the model, and streams every step with its time and token cost. Answers cite the exact file, page and line, and a calibrated decision model scores every option when you're choosing.",
    impact: [
      'Every answer is auditable: route, sources, timing and token cost stream live alongside the reply',
      'Scores a full 18-cell decision board and picks a winner in one request of about 0.4 seconds',
      'Cut backend cold start roughly in half, from 1.2–1.6s to 0.7s, by loading optional provider libraries only when needed',
      'Runs as an open, no-signup trial with per-IP quotas, refunds on failure and no database to operate',
      'Works across 8 LLM providers and 36 curated model options, from free open-weight models to your own OpenAI, Claude or Gemini key',
    ],
    metrics: [
      { value: '0.4s', label: 'Decision board scored' },
      { value: '~2×', label: 'Faster cold start' },
      { value: '8', label: 'LLM providers' },
    ],
    technologies: [
      'LangGraph',
      'LangChain',
      'Groq',
      'FastAPI',
      'Next.js',
      'TypeScript',
      'Hugging Face',
      'Tailwind CSS',
    ],
    liveUrl: 'https://nexus-ai.taaranjain.com/',
    caseStudySlug: 'nexus-ai',
    images: [
      {
        src: '/projects/nexus-ai/decision-board.png',
        alt: 'Nexus AI Think mode decision board with options scored against criteria and adjustable weights',
        caption: 'Think mode decision board scored by JEV, with adjustable weights',
      },
      {
        src: '/projects/nexus-ai/document-citations.png',
        alt: 'Nexus AI document answer showing the pipeline route and a page and line citation',
        caption: 'Document answer with pipeline route and page/line citation',
      },
      {
        src: '/projects/nexus-ai/source-choice.png',
        alt: 'Nexus AI asking whether to answer from uploaded documents or from the model',
        caption: 'Nexus asks whether to answer from documents or AI',
      },
      {
        src: '/projects/nexus-ai/model-picker.png',
        alt: 'Nexus AI model picker listing free Groq models grouped by speed and thoroughness',
        caption: 'Free Groq models grouped by speed and thoroughness',
      },
      {
        src: '/projects/nexus-ai/model-settings.png',
        alt: 'Nexus AI model settings with plain-English guidance for each model',
        caption: 'Model settings with plain-English guidance for each model',
      },
    ],
    featured: true,
    order: 0,
  },
  {
    slug: 'ml-insights',
    title: 'MLInsights',
    category: 'AutoML Workbench',
    tagline: 'From spreadsheet to the best-fit ML model, no code needed',
    description:
      'A no-code ML workbench: upload a spreadsheet, clean it, train up to 68 models, see which one actually wins, and export the report and trained models.',
    problem:
      "Nobody knows which algorithm will predict a column until several have been tried, and trying them means a notebook per model. That locks out people who know their data but don't write Python, and slows down those who do.",
    solution:
      'A browser workbench that runs the whole loop: profile and clean the data, train any of 68 scikit-learn, XGBoost, LightGBM and CatBoost models with cross-validation, compare them in seven views and export everything in one ZIP.',
    impact: [
      'Replaces a notebook-per-model workflow with one guided flow from upload to export',
      'On a 442-row sample, 12 models ranged from R² 0.08 to 0.47, the spread that picking a model by guesswork misses',
      'All 68 models passed a full training smoke test before release',
      'Row limits, thread caps and one-model-per-request training keep a small server responsive',
      'Traced scanner traffic that kept the scale-to-zero backend awake back to certificate transparency logs',
    ],
    metrics: [
      { value: '68', label: 'Models to compare' },
      { value: '7', label: 'Comparison views' },
      { value: '0', label: 'Database servers' },
    ],
    technologies: [
      'Python',
      'FastAPI',
      'scikit-learn',
      'XGBoost',
      'LightGBM',
      'CatBoost',
      'pandas',
      'Next.js',
      'TypeScript',
      'Recharts',
    ],
    liveUrl: 'https://ml-insights.taaranjain.com',
    caseStudySlug: 'ml-insights',
    images: [
      {
        src: '/projects/ml-insights/training-results.png',
        alt: 'MLInsights leaderboard ranking 12 regression models by R² score',
        caption: 'Leaderboard of 12 regression models by R² score',
      },
      {
        src: '/projects/ml-insights/landing.png',
        alt: 'MLInsights landing page: turn raw spreadsheets into trained ML models in minutes',
        caption: 'Landing page: spreadsheets to trained models without code',
      },
      {
        src: '/projects/ml-insights/column-profiles.png',
        alt: 'MLInsights column profiles with a data quality score and value distributions',
        caption: 'Column profiles with quality score and distributions',
      },
      {
        src: '/projects/ml-insights/compare-heatmap.png',
        alt: 'MLInsights heatmap comparing 12 models across seven metrics',
        caption: 'Heatmap comparing 12 models across seven metrics',
      },
      {
        src: '/projects/ml-insights/model-guide.png',
        alt: 'MLInsights XGBoost guide showing the objective and split-gain formulas',
        caption: 'XGBoost guide with objective and split-gain formulas',
      },
    ],
    featured: true,
    order: 1,
  },
  {
    slug: 'self-driven-car',
    title: 'Self-Driven Car',
    category: 'Neuroevolution · Simulation',
    tagline: 'Watch neural networks learn to drive, code and all',
    description:
      'A browser lab where cars teach themselves to drive with NEAT, while you watch their neural networks evolve and step through the real Python code running each tick.',
    problem:
      'Most ML demos show a finished result and hide the part that teaches: how random networks become drivers. My original version was a Pygame script that needed a local Python install and never explained its own code.',
    solution:
      'A zero-install browser lab: a vectorised NumPy engine simulates the population, NEAT-Python evolves the networks and FastAPI streams every frame over a WebSocket, while the code panel shows the real Python source running with live values.',
    impact: [
      'Turned a local-only script into a lab anyone can open in a browser, with no sign-up',
      'Casts all 8 sensor rays for every car in one batched NumPy pass instead of nested Python loops',
      'Simulated 25 generations of 30 cars in about 1.3 seconds of server time at maximum speed',
      'The code panel is generated from the live source, so the explanation can never drift from the implementation',
      'Covered by 26 automated tests across the engine, the WebSocket protocol and the usage limits',
    ],
    metrics: [
      { value: '20–150', label: 'Cars per generation' },
      { value: '~1.3s', label: '25 generations simulated' },
      { value: '26', label: 'Backend tests' },
    ],
    technologies: ['Python', 'NEAT-Python', 'NumPy', 'FastAPI', 'WebSockets', 'Next.js', 'TypeScript', 'SQLite'],
    liveUrl: 'https://self-driven-car.taaranjain.com',
    caseStudySlug: 'self-driven-car',
    images: [
      {
        src: '/projects/self-driven-car/simulator-brain.png',
        alt: "Self-Driven Car simulator with cars training on a road beside the leading car's evolving neural network",
        caption: 'Cars training live beside the evolving neural network',
      },
      {
        src: '/projects/self-driven-car/simulator-code.png',
        alt: 'Self-Driven Car code view stepping through the real Python source with live values',
        caption: 'Real Python source stepping through with live values',
      },
      {
        src: '/projects/self-driven-car/simulator-stats.png',
        alt: 'Self-Driven Car stats view with generation, best fitness and a live fitness-over-time chart',
        caption: 'Live stats and fitness chart while cars train',
      },
      {
        src: '/projects/self-driven-car/run-detail.png',
        alt: 'Self-Driven Car run detail with a fitness curve and per-generation statistics',
        caption: 'Fitness curve and per-generation stats for a finished run',
      },
      {
        src: '/projects/self-driven-car/dashboard.png',
        alt: 'Self-Driven Car dashboard listing training runs and remaining free runs',
        caption: 'Dashboard of training runs and remaining free runs',
      },
    ],
    featured: true,
    order: 2,
  },
  {
    slug: 'grabbit',
    title: 'Grabbit',
    category: 'Full-Stack Media Tool',
    tagline: 'Save exactly the clip, quality or format a source really offers',
    description:
      'Paste a link from 15 sites and get exactly the quality, format or clip you want. Options come from the source itself, and files delete themselves.',
    problem:
      "Most downloaders show a fixed menu of qualities and formats, then fail when the source can't deliver the one you picked. Few let you take just a clip or a chapter, and many keep your files indefinitely.",
    solution:
      "A FastAPI job queue that inspects each link with yt-dlp, intersects it with what the server's ffmpeg can produce, and offers only what both allow. It trims clips, splits chapters, picks playlist items and tags MP3s, then deletes every file after 15 to 180 minutes.",
    impact: [
      "Options are discovered, not hardcoded, and the server re-checks every choice, so users can't pick a format the source can't deliver",
      'Cut worst-case storage and egress per job from 100 GB to 4.9 GB by tightening default limits',
      'Measured a 74× CPU gap between exact and keyframe clip cuts (23.5s vs 0.3s on a 60-second clip) and made the trade-off configurable',
      'Fixed a real overwrite race in concurrent playlist downloads with atomic filename claims and a job state machine that stops slow workers overwriting finished jobs',
      'Covered by 126 backend tests, including SSRF, path traversal, concurrency and the full job lifecycle',
    ],
    metrics: [
      { value: '15', label: 'Supported sources' },
      { value: '−95%', label: 'Worst-case storage per job' },
      { value: '126', label: 'Backend tests' },
    ],
    technologies: ['Python', 'FastAPI', 'yt-dlp', 'ffmpeg', 'Next.js', 'TypeScript', 'SQLite', 'Docker'],
    liveUrl: 'https://grabbit.taaranjain.com',
    caseStudySlug: 'grabbit',
    images: [
      {
        src: '/projects/grabbit/quality-options.png',
        alt: 'Grabbit showing quality options read from the video itself, from 4K down to 144p',
        caption: 'Quality options read from the video itself, 4K to 144p',
      },
      {
        src: '/projects/grabbit/playlist-picker.png',
        alt: 'Grabbit playlist picker with 10 of 19 items selected, capped at the limit',
        caption: 'Choosing 10 of 19 playlist items, capped at the limit',
      },
      {
        src: '/projects/grabbit/clip-range.png',
        alt: 'Grabbit trimming an audio download to a 1:30 to 3:45 clip in dark mode',
        caption: 'Trimming audio to a 1:30–3:45 clip',
      },
      {
        src: '/projects/grabbit/qr-handoff.png',
        alt: 'Grabbit finished download with a QR code to save on a phone and a deletion countdown',
        caption: 'Finished download with QR handoff and deletion countdown',
      },
      {
        src: '/projects/grabbit/supported-platforms.png',
        alt: 'Grabbit list of all 15 supported sources and what each one offers',
        caption: 'All 15 supported sources and what each offers',
      },
    ],
    featured: true,
    order: 3,
  },
  {
    slug: 'logvera',
    title: 'Logvera',
    category: 'ML Anomaly Detection',
    tagline: 'Turns raw logs into incidents, attacks and root causes',
    description:
      'Upload any server, network or app log and get ML anomaly detection, attack findings and an AI root-cause summary, with no sign-up.',
    problem:
      'Reading a raw log to find out what went wrong is slow, and most log tools need agents, accounts and setup before they show you anything. Engineers end up grepping by hand, and an attack spread across thousands of lines is easy to miss.',
    solution:
      'Drop in a log or an archive and Logvera detects the format, learns message patterns with a Drain-style parser, and runs a five-model anomaly ensemble plus a rule-based security scan. An LLM layer writes summaries and answers questions with cited lines, seeing only redacted data, and every upload is encrypted and deleted after an hour.',
    impact: [
      'On a 34,492-line sample log it found 3 unusual periods, 8 security findings including 588 credential-stuffing attempts, and 84 distinct message patterns',
      'Flags a time window only when at least 2 of 5 models agree (Isolation Forest, LOF, PCA residuals, robust z-scores and a Markov model) and explains which signals moved',
      "Answers plain-English questions with line citations checked against the retrieved evidence, so the model can't point to a line it never saw",
      'Learns from feedback: marking an incident as a false alarm or confirmed tunes sensitivity for future logs of the same format',
      "Encrypts every upload with its own AES-GCM key that lives only in the user's link, and shreds it after 60 minutes",
    ],
    metrics: [
      { value: '5', label: 'Models voting on anomalies' },
      { value: '588', label: 'Attacks found in sample log' },
      { value: '41', label: 'Backend tests' },
    ],
    technologies: ['Python', 'FastAPI', 'scikit-learn', 'NumPy', 'Next.js', 'TypeScript', 'WebSockets', 'AES-GCM'],
    liveUrl: 'https://logvera.taaranjain.com',
    caseStudySlug: 'logvera',
    images: [
      {
        src: '/projects/logvera/ai-overview.png',
        alt: 'Logvera AI executive summary and health score for an e-commerce API log',
        caption: 'AI executive summary and health score for an e-commerce log',
      },
      {
        src: '/projects/logvera/anomaly-detection.png',
        alt: 'Logvera anomaly timeline where models vote on unusual periods, with an explained critical incident',
        caption: 'Model-vote anomaly timeline with an explained critical incident',
      },
      {
        src: '/projects/logvera/ask-your-log.png',
        alt: 'Logvera answering a plain-English question from redacted log evidence with cited lines',
        caption: 'Plain-English question answered from redacted log evidence',
      },
      {
        src: '/projects/logvera/security-findings.png',
        alt: 'Logvera security findings: credential stuffing, automated scanners and sensitive file probing',
        caption: 'Detected credential stuffing, scanners and file probing',
      },
      {
        src: '/projects/logvera/landing.png',
        alt: 'Logvera landing page: turn any log into clear answers',
        caption: 'Landing page: turn any log into clear answers',
      },
    ],
    featured: true,
    order: 4,
  },
  {
    slug: 'comet',
    title: 'Comet',
    category: 'AI Link Safety · Systems',
    tagline: 'Short links that check their destination, then self-destruct',
    description:
      'Short links that check each destination with AI before anyone clicks, encrypt it at rest, and delete themselves within 7 days.',
    problem:
      "Most link shorteners keep your links forever, never check where they lead, and track every visitor by IP. Because a short link hides its destination, it's also a favourite wrapper for phishing.",
    solution:
      'A shortener where every link expires within 7 days and every destination is checked before the link exists: a 12-rule URL risk score, a safe page fetch and an AI classification with a confidence score. Destinations are encrypted with AES-256-GCM, and analytics count unique visitors without storing a single IP.',
    impact: [
      'Blocks confident phishing verdicts and warns visitors on borderline links, falling back to rules alone if the AI misses its 7-second budget',
      'Re-checks verdicts older than 6 hours after a redirect, catching pages that turned malicious after the link was made',
      "The page fetcher can't be aimed at internal servers: every redirect hop is resolved and checked for a public IP, with at most 3 redirects and a 256 KB read limit",
      'A hand-written 4 KB HyperLogLog (±1.6%) counts unique visitors without storing IPs, and a Bloom filter rejects unknown codes without a database query',
      'Handled about 30k lookups a second in a local in-process load test, with a 7µs median on cache hits and 0.88ms on database reads',
    ],
    metrics: [
      { value: '~30k/s', label: 'Lookups in local load test' },
      { value: '7µs', label: 'Median cache-hit lookup' },
      { value: '70', label: 'Backend tests' },
    ],
    technologies: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'SQLite', 'httpx', 'AES-256-GCM', 'Argon2id'],
    liveUrl: 'https://comet.taaranjain.com',
    caseStudySlug: 'comet',
    images: [
      {
        src: '/projects/comet/safety-verdict.png',
        alt: 'Comet blocking a phishing-style Apple ID link with AI and rule-based checks',
        caption: 'AI and rules block a phishing-style Apple ID link',
      },
      {
        src: '/projects/comet/links-dashboard.png',
        alt: 'Comet links dashboard with safety verdicts, link rules and self-destruct timers',
        caption: 'Links dashboard with safety verdicts, rules and self-destruct timers',
      },
      {
        src: '/projects/comet/link-analytics.png',
        alt: 'Comet per-link analytics with device, browser and referrer breakdown and a safety report',
        caption: 'Per-link device, browser and referrer breakdown with safety report',
      },
      {
        src: '/projects/comet/load-test.png',
        alt: 'Comet built-in load test comparing cache, database and Bloom filter lookups',
        caption: 'Built-in load test comparing cache, database and Bloom filter',
      },
      {
        src: '/projects/comet/link-ready.png',
        alt: 'Comet landing page with a freshly shortened link and its QR code',
        caption: 'Landing page with a freshly shortened link and QR',
      },
    ],
    featured: true,
    order: 5,
  },
  {
    slug: 'decidex',
    title: 'DecideX',
    category: 'ML Churn Prediction',
    tagline: 'Tells customer teams who might leave, why, and what to do',
    description:
      'Predicts which customers will leave, explains why, puts a dollar value on the risk and drafts the retention offer for a person to approve.',
    problem:
      "Customer teams usually find out a customer is leaving when it's too late, and a churn score on its own doesn't say what to do next, who should do it, or how much the account is worth saving.",
    solution:
      'A decision app that reads account notes with an LLM and scores each customer with a calibrated churn model, then recommends what to do, who owns it and how urgently, with plain-English reasons, the revenue at risk and the smallest offer that brings the customer back under the risk line.',
    impact: [
      'Catches 85.6% of leavers on 1,409 held-out customers from the IBM Telco dataset (ROC-AUC 0.844, PR-AUC 0.653), with probabilities calibrated to an ECE of 0.018',
      'A cost-tuned threshold, treating a missed churner as 5× a false alarm, cut missed churners from 184 to 54 and expected cost from 1,024 to 613',
      'Finds the smallest retention offer that crosses the risk line by re-scoring every single and paired change in one batch of about 150 ms',
      'Sends low-confidence or close calls to a human review queue, drops any evidence quote the LLM invented, and falls back to rules if the decision engine is down',
      'Checks fairness with the four-fifths rule across customer groups, and keeps gender and age out of training',
    ],
    metrics: [
      { value: '85.6%', label: 'Leavers caught on held-out data' },
      { value: '−71%', label: 'Missed churners after cost tuning' },
      { value: '0.018', label: 'Calibration error (ECE)' },
    ],
    technologies: ['Python', 'scikit-learn', 'LightGBM', 'FastAPI', 'Next.js', 'TypeScript', 'SQLite', 'Tailwind CSS'],
    liveUrl: 'https://decidex.taaranjain.com',
    caseStudySlug: 'decidex',
    images: [
      {
        src: '/projects/decidex/decision-detail.png',
        alt: 'DecideX decision view with the recommended action, chance of leaving, revenue at risk and reasons',
        caption: 'Recommendation, chance of leaving, revenue at risk and reasons',
      },
      {
        src: '/projects/decidex/revenue-dashboard.png',
        alt: 'DecideX portfolio dashboard showing revenue at risk, money saved and top accounts',
        caption: 'Portfolio revenue at risk, money saved and top accounts',
      },
      {
        src: '/projects/decidex/what-if-email.png',
        alt: 'DecideX offer simulation cutting churn risk from 62% to 19%, with an AI-drafted retention email',
        caption: 'Offer simulation cutting risk 62%→19%, with AI-drafted email',
      },
      {
        src: '/projects/decidex/model-evaluation.png',
        alt: 'DecideX model evaluation comparing candidates, with a calibration curve and a cost-tuned threshold',
        caption: 'Candidate comparison, calibration curve and cost-tuned threshold',
      },
      {
        src: '/projects/decidex/shared-report.png',
        alt: 'DecideX printable one-page decision report shared through a private link',
        caption: 'Printable one-page decision report shared by private link',
      },
    ],
    featured: true,
    order: 6,
  },
]
