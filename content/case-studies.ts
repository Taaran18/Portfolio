import type { CaseStudy } from '@/types'

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'nexus-ai',
    title: 'Nexus AI',
    tagline: 'Cites the exact line and scores options with calibrated confidence',
    summary:
      'A LangGraph assistant that shows its route, cites the exact page and line from your documents, and scores decisions with a calibrated decision model. Built on FastAPI, Next.js and JEV.',
    metaDescription:
      'Case study of Nexus AI: a LangGraph and FastAPI assistant with RAG line citations, open-weight LLMs, JEV decision scoring and a Next.js 16 frontend.',
    timeline: 'Mar 2026 – Sep 2026',
    stack: ['LangGraph', 'FastAPI', 'Next.js', 'JEV by TypeSafe', 'Hugging Face embeddings'],
    liveUrl: 'https://nexus-ai.taaranjain.com/',
    imageUrl: '/projects/nexus-ai/decision-board.png',
    publishedAt: '2026-09-26',
    metrics: [
      { label: '18-cell decision board scored', value: '0.4s' },
      { label: 'Faster backend cold start', value: '~2×' },
      { label: 'LLM providers supported', value: '8' },
    ],
    sections: [
      {
        heading: 'The Problem With Black-Box Assistants',
        body: [
          "Most chat assistants give you an answer and nothing else. You can't see whether it came from a web page, one of your own files or the model's memory, and you can't tell how confident it is. For anyone checking a policy document or making a real decision, that is the part that matters most.",
          'The first version of Nexus, which I built in March 2026, had the same problem, and a more urgent one. It defaulted to llama-3.1-8b-instant on Groq, and when Groq shut down its Llama models for free-tier keys on 16 August 2026, the app could no longer answer anything. I used the rebuild in September to fix both: an assistant that shows its route, its sources and its confidence, on models that are actually available.',
        ],
      },
      {
        heading: 'Constraints I Set',
        body: [
          "Cost came first. It had to run on free tiers: Groq for inference, the Hugging Face Inference API for embeddings and DuckDuckGo for search, with no paid vector database. Groq's free plan allows roughly 8,000 tokens per minute per model, so every extra LLM call had to justify itself.",
          'Second, it had to work as an open trial with no sign-up. That meant isolating strangers from each other without accounts, and capping usage per IP address: 25 messages a day, 15 per chat, 5 uploads and 30 voice recordings. Third, the backend had to sleep when idle, so nothing could depend on an always-on process.',
        ],
      },
      {
        heading: 'Architecture: A Six-Node LangGraph Pipeline',
        body: [
          "Every message runs through a LangGraph state graph with six nodes: classify, retrieve, web_search, deliberate, generate and decide. Conditional edges route each question to documents, the web or straight to the writer, and in Think mode the decide node runs in parallel with generate. The FastAPI backend turns LangGraph's event stream into Server-Sent Events: node starts and ends with timings and token counts, sources, thinking notes, answer tokens, and a final done or error event.",
        ],
        bullets: [
          'Next.js 16 frontend: chat UI, live pipeline view, decision board, and a local cache of chats and usage',
          'FastAPI API: SSE streaming, per-IP quotas with refunds, uploads, and voice transcription via Whisper',
          'LangGraph graph: routing, retrieval, deliberation, writing and decision scoring as separate nodes',
          'Groq models: GPT-OSS 20B as the default writer and for extraction, GPT-OSS 120B for Think mode, Qwen 3.8 27B as a preview option',
          'JEV by TypeSafe: question routing and option scoring through typed Choice and Score questions',
          'JSON store on a persistent volume: chats, documents with embeddings, memory and encrypted API keys, per workspace',
        ],
      },
      {
        heading: 'Why JSON Files on a Volume Over a Database',
        body: [
          "The original build used Supabase with pgvector. For a trial with no accounts, a database was mostly overhead: another service to provision, secure and pay for once the free tier ran out. I replaced it with JSON files on a single persistent volume, one folder per workspace, where a workspace ID is a uuid5 of a random browser ID plus the visitor's IP. Writes go through a temporary file and an atomic os.replace, guarded by a per-workspace asyncio lock.",
          'Document search moved in-process: a line-aware chunker splits each page into windows of up to 900 characters with a two-line overlap, vectors are normalised at upload, and retrieval is a cosine scan returning the top 4 passages (6 in documents mode) above a 0.2 similarity threshold. The trade-off is explicit: this only works with one backend instance, which is why the deployment is pinned to a single replica. A linear scan is fine for 20 documents per workspace, but it is the first thing I would replace at scale.',
        ],
      },
      {
        heading: 'Why a Decision Model Scores the Options, Not the LLM',
        body: [
          "For Think mode I wanted a decision board: options down one side, criteria across the top, every cell scored. My first plan treated JEV as another chat model behind an OpenAI-compatible endpoint. Reading TypeSafe's API reference showed it is a decision model: you POST state and typed questions to /v1/systemone and get back probabilities and a confidence for each answer, not generated text.",
          "So I split the job. GPT-OSS 20B, in JSON mode, extracts the options and criteria from the reasoning notes, retrying on GPT-OSS 120B if the output can't be parsed. JEV then scores every option against every criterion on a five-level scale and picks a winner, all in one batched request. I also use JEV for routing, accepting its answer only above 0.55 confidence and otherwise falling back to the Groq router, so the scores come with calibrated confidence instead of an LLM's guess and routing no longer spends Groq tokens, at the cost of a second external dependency.",
        ],
      },
      {
        heading: 'The Hardest Problem: A Reply That Silently Vanished',
        body: [
          'A test message came back as an empty reply: the Nexus avatar and no text, no error, and a trial message deducted. The backend log showed the request finishing, so I ran the streaming generator directly in a script with the same placeholder Groq key, and the traceback appeared at once. Inside the generator, a local variable named usage held token counts, which made Python treat usage as local throughout the function. When the model call failed, the error handler called usage.refund on the trial-quota module and raised UnboundLocalError instead.',
          "That crash inside the error handler meant no error event was ever sent, the stream simply closed, and the refund never ran. Worse, the linter's auto-fix had removed the module import it now saw as unused, so the bug survived a clean lint. I fixed it at three levels: the module is now imported under an alias that can't collide, error cleanup runs inside its own guarded block, and the frontend treats any stream that ends without done or error as a failure with a Try Again button. Generation also got a 180-second timeout, so a hung provider can never leave the UI waiting forever.",
        ],
      },
      {
        heading: 'Results',
        body: [
          'In local testing with real keys, all seven Groq model options answered correctly, and JEV scored a full decision board of 18 option-criterion cells plus its pick in one request of about 0.4 seconds. Loading the OpenAI and Anthropic SDKs only when a bring-your-own-key model is used cut backend import time from 1.2 to 1.6 seconds down to about 0.7, which matters because every cold start after the backend sleeps pays it. A page visit now makes zero backend requests until someone sends a message, which I verified by recording network traffic in Playwright.',
          'The codebase is about 3,500 lines of Python and 9,800 lines of TypeScript across 14 commits.',
        ],
      },
      {
        heading: 'What I Would Do Differently',
        body: [
          'I would write tests for the failure paths before the happy paths. The vanished-reply bug and a later one, where GPT-OSS occasionally tries to call a built-in tool and Groq rejects the response, were both found by running the app by hand. A test that forces a provider error and checks that the stream ends with an error event would have caught the first one on day one.',
          "I would also verify external constraints before designing around them. The Llama shutdown broke the first version, Groq's 8,000 tokens-per-minute limit shaped how many calls Think mode can afford, and I initially planned JEV as a chat model. Ten minutes with each provider's current docs would have saved a round of rework on all three.",
        ],
      },
    ],
  },
  {
    slug: 'ml-insights',
    title: 'MLInsights',
    tagline: '68 ML models, no code, and a backend that scales to zero',
    summary:
      'I rebuilt MLInsights so anyone can upload a spreadsheet, then train, compare and export 68 ML models in the browser. The backend has no database and scales to zero, which forced careful choices about storage, long-running training and, unexpectedly, bot traffic.',
    metaDescription:
      'Case study: MLInsights, a no-code ML workbench using FastAPI, scikit-learn, XGBoost and Next.js to train and compare 68 models on a serverless backend.',
    timeline: 'Mar 2026 – Sep 2026',
    stack: ['FastAPI', 'scikit-learn', 'XGBoost', 'pandas', 'Next.js', 'Tailwind CSS'],
    liveUrl: 'https://ml-insights.taaranjain.com',
    imageUrl: '/projects/ml-insights/training-results.png',
    publishedAt: '2026-09-26',
    metrics: [
      { label: 'ML models available', value: '68' },
      { label: 'Comparison views', value: '7' },
      { label: 'Database servers', value: '0' },
    ],
    sections: [
      {
        heading: 'The Problem: Choosing a Model Without Writing a Notebook',
        body: [
          "If you have a spreadsheet and want to know whether a column can be predicted, the honest answer is that nobody knows which algorithm will work until several have been tried. In practice that means a notebook: load the file, fix the missing values, encode the text columns, fit a dozen estimators and build a comparison table by hand. That's a real barrier for people who understand their data but don't write Python, and tedious even for those who do.",
          'MLInsights puts that whole loop in the browser. You upload a CSV or Excel file, explore and clean it, train any of 68 models, compare them side by side and export everything.',
        ],
      },
      {
        heading: 'The Constraints I Set',
        body: [
          'I shipped a first version in March 2026: Next.js 14 with a FastAPI service on a free hosting plan, writing sessions to /tmp. It worked, and it showed me what the September 2026 rebuild had to respect. Four constraints drove the design.',
        ],
        bullets: [
          'Near-zero idle cost: the API must be able to sleep when nobody is using it, which rules out always-on workers and background loops.',
          'No accounts and no database: a visitor should get from the landing page to a trained model without signing up, and a database is a lot to run for data that lives for a day.',
          'Privacy by expiry: uploads are deleted 24 hours after upload, and a visitor can delete everything sooner from Settings.',
          'Safe on a small container: 68 algorithms with very different costs must not hang a request or saturate a CPU-limited instance.',
        ],
      },
      {
        heading: 'Architecture',
        body: [
          'There are two deployables: a Next.js 16 frontend, and a FastAPI service with a persistent volume mounted at /data. The browser calls the API directly. All server state lives in per-session folders on that volume, and the browser only holds a session ID.',
          'An upload is checked against a 50 MB limit and decoded by trying UTF-8, cp1252 and Latin-1 in turn, then saved as Parquet. Every later request loads the active dataframe (the cleaned copy, if there is one), does one unit of work and writes its results back to meta.json.',
        ],
        bullets: [
          'Frontend (Next.js 16, React 19, Tailwind CSS 4, Recharts): the workflow from upload to export, all charts, and the client-side training queue.',
          'API (FastAPI): upload, insights, cleaning, models, training, report and sessions routers under /api, plus /health for wake-up checks.',
          'Session store: data.parquet, cleaned.parquet and meta.json per session under /data/sessions, with an in-memory cache of the 8 most recent sessions.',
          'Model registry: 16 modules that register 28 regression, 30 classification and 10 clustering estimators behind a single build_model call.',
          'Trainer: scikit-learn pipelines with an optional Standard, MinMax or Robust scaler, then test metrics, 5-fold cross-validation and feature importance.',
          'Report layer: a ReportLab PDF, a CSV or XLSX export of the dataset, meta.json, pickled models with a manifest, and a bundle endpoint that zips them all.',
        ],
      },
      {
        heading: 'Why Parquet Files on a Volume Over a Database',
        body: [
          "I considered three places for session state: process memory, a database, or files. Memory can't survive a platform that stops the container when idle. The first version had already shown the file-based variant of that failure: /tmp on the free plan was ephemeral, so every restart deleted all sessions. A database would have meant a second always-on service to store dataframes that are deleted within a day anyway.",
          "I chose Parquet files on a persistent volume. Parquet preserves column types, which a CSV round trip would not, and it loads quickly. Every write goes to a temporary file first and is then swapped in with os.replace, so a container stopped mid-write never leaves a half-written session. A least-recently-used cache capped at eight sessions, guarded by a re-entrant lock, replaced version one's unbounded dictionary. Session IDs must now match a UUID v4 pattern before they're used in a file path.",
          'Expiry has no scheduler, because a scheduler would keep the container awake. Instead, expired sessions are pruned at startup, and incoming requests trigger another prune at most once an hour. The trade-off is scale: a volume attaches to a single instance, so the deployment is pinned to one replica, and the lock only works within one process. Scaling out would mean moving to object storage and a shared cache.',
        ],
      },
      {
        heading: 'Why One Model per Request Over a Job Queue',
        body: [
          "Training twelve models could be one long request or a background queue with a worker. A queue conflicts with the sleep constraint, because it needs a broker and a worker process that keeps the container busy. One long request would run into proxy timeouts and couldn't report progress.",
          'Instead, POST /api/training/{session_id}/train trains exactly one model and returns its metrics and duration. The browser owns the queue: it sends the selected models one request at a time, updates a progress modal, and offers Stop After This Model. When a model fails, the API returns a 422 with a readable reason and the run moves on to the next model.',
          'The cost is that one slow model still ties up a request, so I capped the worst cases on the server. scikit-learn, XGBoost, LightGBM and CatBoost are imported inside the route handlers, so the server doesn\'t load them when it starts. On the client, the first request after four minutes of silence polls /health first. It backs off from 1 second to at most 5, shows a "waking" notice after 2.5 seconds and gives up after 90.',
        ],
        bullets: [
          'Gaussian Process and Affinity Propagation are limited to 3,000 rows, Spectral clustering to 5,000 and OPTICS to 20,000.',
          'Cross-validation is skipped above 20,000 rows.',
          'The silhouette score is computed on a sample of at most 10,000 rows.',
          "threadpoolctl caps the BLAS maths libraries at two threads, so NumPy and the boosting libraries don't oversubscribe the CPU.",
        ],
      },
      {
        heading: 'The Hardest Problem: A Server That Would Not Stay Asleep',
        body: [
          "After launch, the platform's logs showed the service stopping and starting all afternoon, even though I expected it to sleep for hours at a time. Reading the deploy logs line by line, I found that none of these wake-ups came from the app. They were requests for /.env, /.env.backup, /.git/config, /.aws/credentials and /robots.txt, plus people opening the API root in a browser. The API correctly answered 404, but on a scale-to-zero platform any inbound request wakes the container, which then stays up for about ten minutes.",
          "With a probe arriving every 15 to 25 minutes, the service spent much of the day awake. My best explanation is that scanners found the new API subdomain through public certificate transparency logs, which list new hostnames as soon as their certificates are issued. I also confirmed that the frontend isn't the cause: it only calls the API when a visitor's browser already holds a session ID, so crawlers visiting the site never touch the backend.",
          'Since no application code can stop a request from waking a container, the fix had two layers. In code, I added a robots.txt that disallows everything and an X-Robots-Tag: noindex, nofollow header on every response, which keeps crawlers that follow the rules away. At the infrastructure level, the fix is to retire the exposed hostname and point the frontend at the platform-generated domain.',
        ],
      },
      {
        heading: 'Results',
        body: [
          'MLInsights is live, with 68 models across three task types and seven comparison views: leaderboard, bar chart, all metrics, heatmap, profile, radar and score versus speed. Each of the 15 metrics and 68 models has a written guide with its formula. Before switching to Python 3.12.10, I ran a smoke test that trained every model in the registry, and all of them passed.',
          'On the bundled Diabetes sample (442 rows), twelve regression models ranged from an R² of 0.0776 for a single decision tree to 0.4685 for Extra Trees. The fastest was Lasso, at 15 ms. That spread is exactly why comparing models beats guessing. The production logs show the app handling its first request 0.1 to 0.4 seconds after its startup log line.',
        ],
      },
      {
        heading: 'What I Would Do Differently',
        body: [
          "First, I would design the public hostname as part of the scale-to-zero system from day one. I assumed that no users meant no traffic, but the internet's background noise is traffic. Next time I would choose the API domain deliberately, track how often the service wakes from the first deploy, and consider routing API calls through the frontend's own domain so there is only one public surface.",
          'Second, I would commit the tests. The repository has no automated test suite, and the smoke test that trained every model ran as a script outside it. With 68 estimators from four libraries pinned to exact versions, one dependency upgrade can quietly break a model. A CI job that trains each one on a tiny dataset would catch that before a user does.',
        ],
      },
    ],
  },
  {
    slug: 'self-driven-car',
    title: 'Self-Driven Car',
    tagline: 'Real neuroevolution in the browser, with the actual training code stepping live',
    summary:
      'I rebuilt a Pygame neuroevolution project as a browser lab where anyone can watch cars learn to drive with NEAT. A vectorised NumPy engine streams live frames over WebSockets, and the code panel shows the real Python source running each step.',
    metaDescription:
      'Case study: a browser neuroevolution lab using NEAT-Python, NumPy, FastAPI WebSockets and Next.js to show neural networks learning to drive in real time.',
    timeline: 'May 2024 – Sep 2026',
    stack: ['NEAT-Python', 'NumPy', 'FastAPI', 'Next.js', 'TypeScript', 'SQLite'],
    liveUrl: 'https://self-driven-car.taaranjain.com',
    imageUrl: '/projects/self-driven-car/simulator-brain.png',
    publishedAt: '2026-09-26',
    metrics: [
      { label: 'Cars per generation', value: '20–150' },
      { label: 'Backend tests', value: '26' },
      { label: 'Accounts needed', value: '0' },
    ],
    sections: [
      {
        heading: 'Machine Learning Demos Hide the Interesting Part',
        body: [
          'Most neural network demos show a finished result: a car that already drives, or a chart that has already gone up. The part that teaches something, how a population of random networks becomes a set of drivers, happens inside a training loop nobody gets to see. I first built this project in May 2024 as a Pygame simulation trained with NEAT, and in early 2026 I added a Streamlit dashboard, but both needed a local Python install and neither explained what the code was doing.',
          'I wanted a version anyone could open in a browser and learn from. The audience is students and curious engineers who have heard of neural networks and genetic algorithms but have never watched one evolve tick by tick. That meant the simulation had to be real rather than an animation, and the code behind it had to stay visible while it ran.',
        ],
      },
      {
        heading: 'The Constraints I Set',
        body: [
          'Four constraints drove the design. First, honesty: every number on screen had to come from the running training loop, including the values in the code panel. Second, cost: this is a personal project, so the backend could not run around the clock and I ruled out a separately hosted database.',
          'Third, zero friction: no sign-up and no login, yet I still had to stop one visitor from monopolising the CPU. Fourth, it had to work on phones and tablets as well as wide desktops, because a teaching tool that only works on a laptop loses half its readers.',
        ],
      },
      {
        heading: 'How the System Fits Together',
        body: [
          'The browser asks the API for a one-time ticket that expires after 60 seconds, then opens a WebSocket with it. From then on the server pushes JSON frames, and the browser sends control messages to pause, step one tick, skip a generation or change speed. Each run lives in its own thread, so the NEAT loop never blocks the async API.',
        ],
        bullets: [
          "Next.js 16 frontend: draws the track on a canvas, the leading car's network as SVG, and the code panel; owns the anonymous visitor ID in local storage and the controller that turns frames into UI state.",
          'FastAPI service: REST endpoints for runs, usage and data export, plus the ticket endpoint and the simulation socket; owns per-IP quotas and origin checks.',
          'Simulation session: one thread per run wrapping a NEAT-Python population; owns pause and stepping, the 45-minute run cap and the 5-minute idle disconnect.',
          'NumPy engine: runs sense, think, decide, move and score for every car each tick, at 30 ticks per second in real time; owns physics, ray casting and collision.',
          'SQLite on a persistent volume through async SQLAlchemy and aiosqlite: visitors, usage events, runs and per-generation statistics.',
        ],
      },
      {
        heading: 'Keeping the Code Panel Honest',
        body: [
          "The code panel uses no hand-copied snippets. The backend reads the source of the functions that actually execute with Python's inspect module, from the training loop down to the ray caster, and sends it to the browser alongside the leading car's live values. If I change the engine, the panel changes with it, so the two can never drift apart.",
        ],
      },
      {
        heading: 'Why a Headless NumPy Engine Over Pygame',
        body: [
          'The original version looped over cars in plain Python and let Pygame draw each one, so physics and rendering were tangled together. Moving to the browser left three options: stream rendered video from Pygame, port the simulation to JavaScript, or rewrite it as a headless Python engine that sends state and lets the browser draw. Video would have cost bandwidth and hidden the data I wanted to show, and a JavaScript port would have meant giving up NEAT-Python, the library doing the actual learning.',
          'I chose the headless engine and vectorised it. The whole fleet lives in NumPy arrays, and one broadcast segment-intersection pass tests all 8 sensor rays of every car against every nearby wall segment, replacing nested loops. I build roads from Hermite splines in NumPy, which let me drop SciPy entirely. The trade-off is that I now own a rendering layer Pygame used to give me for free, and every visual has to be rebuilt from the frame data.',
        ],
      },
      {
        heading: 'Why a Sleeping Server and SQLite Over Always-On Infrastructure',
        body: [
          'The conventional setup, a managed Postgres instance and an always-on API, costs money every hour whether anyone is training or not. Instead, the service is configured to sleep when idle and all data lives in one SQLite file on a 5 GB volume mounted at /data. Starting a run is what wakes the server.',
          'Sleeping has a visible cost: the first request after an idle period can get a 502 while the container starts. The frontend treats 502, 503 and 504 as retryable, backs off at 1, 2, 3, 5 and 6 seconds, and shows a waking-up state instead of an error. Tickets and live sessions are held in memory, so I pinned the service to a single replica and capped it at 3 concurrent simulations. For a teaching tool that is the right trade; for heavy traffic it would not be.',
          'Identity follows the same pay-nothing approach. The browser generates a UUID, and the server derives a workspace ID as a uuid5 of that ID plus the client IP, taken from the last X-Forwarded-For hop. Each IP gets 5 runs a day and 20 a week. Usage is consumed under an asyncio lock, and a run that fails before finishing its first generation is refunded.',
        ],
      },
      {
        heading: 'The Hardest Problem: A CORS Error That Was Not a CORS Error',
        body: [
          'After I introduced anonymous visitors, a brand-new browser opening the dashboard would sometimes fail, and the console reported a CORS error. The CORS configuration was correct, and the clue was that it only happened for a visitor ID the server had never seen. The dashboard fires several requests at once, and each one checked whether the visitor row existed and inserted it if not.',
          'Two concurrent requests could both see no row. The second insert then hit a primary-key violation, and the resulting 500 was produced outside the CORS middleware, so the response had no Access-Control-Allow-Origin header. The browser reported the missing header and hid the real server error behind it.',
          'I fixed it in two places. The check-then-insert became a single SQLite insert with on-conflict-do-nothing, which is idempotent under concurrency. I also moved the middleware that turns unhandled exceptions into JSON responses inside the CORS layer, so even failures carry CORS headers and show up as what they are. Regression tests now fire concurrent requests from a fresh visitor.',
        ],
      },
      {
        heading: 'Results',
        body: [
          'The simulator is live at self-driven-car.taaranjain.com with no sign-up. Visitors can train 20 to 150 cars per generation for up to 200 generations, and step through the real source of seven training phases. The backend has 26 tests covering the engine, the WebSocket protocol and the usage limits.',
          'On my own machine, a 30-car run on the long track completed 25 generations at maximum speed in about 1.3 seconds of server time, with individual generations taking 25 to 105 milliseconds. In one run that kept the same track every generation, the best fitness climbed in steps from 2 to 62, and a car finished the 24,000-unit road in generation 24.',
        ],
      },
      {
        heading: 'What I Would Do Differently',
        body: [
          'I would separate simulation from rendering from day one. The Pygame version mixed them, and it took a full rewrite to reach an engine I could unit test and run headless on a server. Much of the later speed-up came from that separation, not from the vectorisation itself.',
          'I would also add visual regression tests much earlier. Two of the bugs that took longest were only visible on screen, and I caught both by screenshotting at several viewport sizes by hand; a Playwright visual check in CI would have caught them automatically.',
        ],
        bullets: [
          'On high-density displays, the canvas kept resizing itself in a feedback loop.',
          'Sensor rays appeared to pass through walls, for two reasons: the frontend drew them from the wrong car, and the road edges had small notches where points stepped backwards.',
        ],
      },
    ],
  },
  {
    slug: 'grabbit',
    title: 'Grabbit',
    tagline: 'A media downloader that never offers a format it cannot deliver',
    summary:
      'Grabbit turns a public link from 15 sources into exactly the file you want, offering only the qualities and formats the media and server can genuinely produce. I built it with a FastAPI, yt-dlp and ffmpeg backend and a static Next.js frontend.',
    metaDescription:
      'Grabbit case study: a media downloader built with FastAPI, yt-dlp, ffmpeg and Next.js that only offers formats each source can genuinely deliver.',
    timeline: 'Sep 2026',
    stack: ['Python', 'FastAPI', 'yt-dlp', 'ffmpeg', 'Next.js', 'SQLite', 'Docker'],
    liveUrl: 'https://grabbit.taaranjain.com',
    imageUrl: '/projects/grabbit/quality-options.png',
    publishedAt: '2026-09-27',
    metrics: [
      { label: 'Backend tests', value: '126' },
      { label: 'Supported sources', value: '15' },
      { label: 'Cold start', value: '0.45–0.71s' },
    ],
    sections: [
      {
        heading: 'Menus That Promise What the Source Cannot Deliver',
        body: [
          'Grabbit started as a throwaway script. I needed a YouTube playlist as MP3s for a trip where I would have no internet, and a short yt-dlp script got me there. What it taught me was that the download is the easy part; the hard part is knowing what a given link can actually produce.',
          'A downloader with a fixed menu of qualities and formats makes promises it cannot check. Offer 4K on a 720p upload and the job either fails after minutes of work or quietly upscales. Offer a 320 kbps MP3 from a source encoded at around 129 kbps and you ship a bigger file with no better sound. I wanted a tool anyone with a public link could use without an account, which would only ever show choices the source and the server could genuinely deliver.',
        ],
      },
      {
        heading: 'The Constraints I Set',
        body: [
          'Four rules shaped every later decision, and each one closed off an easier design.',
          'Keeping a public, unauthenticated API cheap also set the default limits. One file is capped at 500 MB, a playlist job at 10 items and a job at 600 seconds, and one IP can create 5 jobs a minute. That took the worst case for a single job from 100 GB under my original defaults to 4.9 GB.',
        ],
        bullets: [
          'Never show an option the source cannot provide: every quality, frame rate and format is discovered per link, never declared.',
          'Temporary storage only: a file deletes itself 15 minutes after you save it, or 180 minutes if you never do.',
          'No accounts and no circumvention: no login, and nothing that bypasses DRM, paywalls or authentication.',
          'Cheap and safe to run in public: the API has no authentication, so anyone with the URL spends my egress.',
        ],
      },
      {
        heading: 'Architecture',
        body: [
          'The two halves deploy independently. The frontend is a Next.js App Router site with five static routes and no SSR, API routes or middleware. The backend is FastAPI in a self-contained Docker image with ffmpeg, SQLite in WAL mode on a mounted volume, and serverless sleep switched on. Media never passes through the frontend host: files stream straight from the API to the browser.',
          "A download is two calls. POST /api/v1/inspect validates the URL, runs yt-dlp behind a cache and a circuit breaker, and returns only what this media and this server's ffmpeg can both produce. POST /api/v1/jobs re-validates the chosen options, checks disk capacity and queues the job, and the browser polls every 1.5 seconds until the file is ready.",
        ],
        bullets: [
          'Platform registry: 15 sources, matched on exact or suffix hostnames so that evil.com/reddit.com is not treated as Reddit.',
          'Capability probe: runs ffmpeg -encoders once per process and reports what this machine can actually encode.',
          'Inspection service: turns a raw yt-dlp info dict into a quality ladder, frame rates, audio formats, chapters, subtitles and playlist items.',
          'Job service: validate_choice() rejects any option that inspection did not find.',
          "State machine: the only code allowed to change a job's status, driven by a declared transition table.",
          'Executor: 2 job workers, each running at most 2 playlist items, so no more than four yt-dlp processes run at once.',
          'Storage: per-job directories, traversal-safe paths, capacity checks and atomic filename claims.',
          'Resilience: a per-platform circuit breaker (5 failures, 60-second cooldown), a 300-second LRU inspection cache, and retries classified as permanent, rate-limited or transient, with exponential backoff and jitter.',
        ],
      },
      {
        heading: 'Why Discovered Options Over a Hardcoded Menu',
        body: [
          'The simple design was a per-platform list of qualities and formats in the frontend. It is quick to ship, but it is wrong for every video that does not match the list. I chose to derive the entire form from the inspection response, intersected with the ffmpeg probe. If a video has no 4K rendition, no 4K option exists; if ffmpeg is missing, audio conversion disappears from the UI instead of failing at download time.',
          'The trade-off is an inspection round trip before anything can be chosen, about 3.5 seconds for a YouTube video in my local test, and more complex UI state. It paid off when I expanded coverage: adding a platform became mostly a registry entry and a logo, which is how the count went from 7 to 15 in one phase.',
          'It also exposed a subtle bug. In yt-dlp, a vcodec of None means the codec is unknown, while the string "none" means there is no video track, and my code treated them the same, discarding working video from Twitch, Rumble and Imgur. For audio I applied the distinction conservatively, because guessing wrong offers a download that cannot work: offer it if any format declares an audio codec, or if nothing declares anything at all.',
        ],
      },
      {
        heading: 'Why Playlist Indices Over Client-Supplied URLs',
        body: [
          'For per-item playlist selection, the obvious design is for the browser to send the URLs of the items you ticked. That is a server-side request forgery hole: the server would fetch whatever URL it was handed. Instead the client sends positions, and the server re-resolves the playlist itself and picks by index. This sits alongside URL validation that rejects embedded credentials, local hostnames and any host resolving to a private, loopback or link-local address.',
          'The cost is that inspect and download must enumerate a playlist identically, and at first they did not. The download path skipped entries without a resolvable URL while inspect counted them, so indices could drift and you would get the wrong tracks. Both now share one enumeration, and a test pins the alignment against real data.',
        ],
      },
      {
        heading: 'The Hardest Problem: Races That Lost Files',
        body: [
          'When I moved playlist items from a sequential loop to a bounded thread pool, two data-loss bugs surfaced. The first was in unique_name(), which checked whether a filename was free and then used it, so two items with identical titles could resolve to the same path and the second overwrote the first. I replaced the check with an atomic claim, opening the file with O_CREAT and O_EXCL under a lock and moving to "Title (2)" on collision.',
          'The second bug was in progress counters, computed under a lock but written outside it. A stale count could land last, so a five-item playlist could finish reporting four. I serialised the writes and added one authoritative write after the pool drains, and both fixes are now pinned by tests.',
          "The same work pushed me to replace scattered status checks with an explicit state machine, because a worker that had not noticed its job was finished could overwrite a completed job as cancelled. Every status change now goes through a transition table that refuses and logs illegal moves. Workers claim jobs with a conditional UPDATE on status = 'queued' and check the row count, because SQLite ignores SELECT FOR UPDATE. One limitation remains: concurrent playlists are proven against a stub provider rather than live YouTube, because cookie access was blocked in my build environment.",
        ],
      },
      {
        heading: 'Results',
        body: [
          'Grabbit is live at grabbit.taaranjain.com. It supports 15 sources, video from 144p to 4K, clip ranges, chapter splitting, subtitles, ID3 tags with cover art, and a QR code for saving on a phone. I took it from a throwaway script to a deployed full-stack app in one day, 19 September 2026. The backend has 126 tests that pass in about 12 seconds, covering the job lifecycle, SSRF, path traversal, injection and concurrency.',
          "I measured cost rather than guessing. Converting a minute of audio to tagged MP3 costs about 2 seconds of CPU, while a 60-second 360p clip with exact cuts costs 23.5 seconds against 0.3 without them, a 74× difference driven by ffmpeg's force_keyframes_at_cuts. A cold start after serverless sleep measured 0.45 to 0.71 seconds.",
          'What is missing is deliberate too. I left out TikTok because every request from my machine failed, even with curl_cffi TLS impersonation, and TikTok blocks datacenter IPs, so it could fail in production even if it worked locally. A feature that works for the developer and breaks for users is worse than no feature.',
        ],
      },
      {
        heading: 'What I Would Do Differently',
        body: [
          'First, I would test the contract between frontend and backend, not just each side. The frontend has no test runner, and while capturing screenshots for this write-up I found that the API serialises expires_at as UTC without a time zone marker. The browser reads it as local time, so in India, at UTC+5:30, the countdown shows the file as already deleted the moment a download finishes. Time-zone-aware timestamps end to end, plus a few contract tests, would have caught it.',
          'Second, I would deploy a production image on day one. I relied on the host\'s automatic builder with a custom build command, and it installed dependencies into one interpreter path while the runtime resolved another, producing "No module named uvicorn" in a crash loop. It took eight deploy-related commits in 24 minutes before I switched to a pinned python:3.12-slim Dockerfile that reproduces production anywhere.',
        ],
      },
    ],
  },
  {
    slug: 'logvera',
    title: 'Logvera',
    tagline: 'Five anomaly models vote on every log window and explain themselves',
    summary:
      'A private log analyser that turns any server, network or app log into a health score, explained anomalies and security findings. Five ML detectors vote on each time window, and an LLM summarises only redacted aggregates.',
    metaDescription:
      'Logvera case study: log analytics with Isolation Forest, LOF and PCA anomaly detection, LLM summaries, FastAPI and Next.js, private by design.',
    stack: ['Python', 'FastAPI', 'scikit-learn', 'NumPy', 'Next.js', 'TypeScript'],
    liveUrl: 'https://logvera.taaranjain.com',
    imageUrl: '/projects/logvera/ai-overview.png',
    publishedAt: '2026-09-27',
    metrics: [
      { label: 'Anomaly models voting', value: '5' },
      { label: 'Upload retention', value: '60 min' },
      { label: 'Backend tests passing', value: '41' },
    ],
    sections: [
      {
        heading: 'The Problem With Reading Raw Logs',
        body: [
          "When something breaks in production, the evidence is usually sitting in a log file, but getting an answer out of it means grep, a lot of scrolling and a good memory for what normal looks like. Hosted observability platforms handle this well, but only if agents were installed and logs were shipping before the incident. For a one-off file, such as an auth.log from a server you suspect was brute-forced or an Nginx log from yesterday's outage, there was no quick path from raw text to an explanation.",
          'I wanted a tool where you drop in a log and get back a health score, the unusual periods, the attacks and a plain-English root-cause hypothesis. It had to serve two readers at once: an engineer who wants patterns, line numbers and latency percentiles, and a manager who wants to know whether users were affected.',
        ],
      },
      {
        heading: 'The Constraints I Set',
        body: [
          'Privacy came first, because nobody should upload production logs to a website that keeps them. I decided there would be no accounts, every upload would be encrypted under its own key, nothing would survive beyond 60 minutes, and no language model would ever see a log line that had not been redacted.',
          'The second constraint was that it had to work on any text log with zero configuration, which ruled out per-format schemas as the main path and pushed me towards learning structure from the text itself. The third was cost: the backend runs as a single instance with one analysis worker, and model usage is capped by an in-process budget of 8,000 tokens per minute and 200,000 per day.',
          'The last was resilience. Anything that could fail, including the whole AI layer, had to degrade to a useful report rather than an error.',
        ],
      },
      {
        heading: 'How the Pipeline Fits Together',
        body: [
          'The frontend is a Next.js 16 app and the backend is FastAPI with a mounted volume. An upload is streamed through an archive unpacker straight into an encrypted vault, a job manager queues it (at most 8 waiting, with a 420-second limit per analysis), and a worker runs eight stages from parsing to indexing. Each analyser runs inside a guard, so a failure in, say, the geo lookup becomes a warning on the report instead of a failed job.',
        ],
        bullets: [
          'Intake: streams .log, .gz, .zip and .tar uploads of up to 100 MB, caps expanded text at 800 MB and 1.5 million lines, and skips binary archive members.',
          "Vault: AES-GCM in 1 MiB chunks, with a per-analysis key derived by HKDF-SHA256 from a master key and a secret that only exists in the user's link; a sweeper shreds anything older than an hour.",
          'Ingest: format and timestamp detection plus a Drain-style template miner that masks UUIDs, IPs, emails and numbers before clustering, with a similarity threshold of 0.45 and a cap of 4,000 templates.',
          'ML: windowed features, a five-model anomaly vote, change points, Holt-Winters forecasts, K-Means and DBSCAN clustering, and association rules between error types.',
          'Security: rules for brute force, credential stuffing, scanners, SQL injection, path traversal, port scans and secrets written to logs.',
          'AI: an LLM for summaries and questions, and JEV by TypeSafe for structured decisions such as severity and whether an incident likely affected users.',
          'Frontend: a 17-tab dashboard, live tail over WebSockets, a log comparison view and a ReportLab PDF export.',
        ],
      },
      {
        heading: 'Why a Voting Ensemble Over a Single Anomaly Model',
        body: [
          'The simplest option was one Isolation Forest over time windows, since it is cheap and needs no labels. The problem is that every detector has a blind spot. Isolation Forest finds globally odd windows, Local Outlier Factor finds windows that are odd next to similar periods, PCA residuals on message-type counts (the Xu et al. method) catch a changed mix of messages at normal volume, MAD-based z-scores catch plain spikes, and a Markov model over template transitions catches events happening in an unusual order.',
          "I run all five and flag a window only when at least two agree. A sensitivity setting sets each model's contamination at 2%, 4% or 8%, and the combined score averages each model's rank rather than its raw score, because the raw scales are not comparable. The trade-off is that a real anomaly visible to only one model gets missed, and I accepted that because one obvious false alarm costs trust in every other finding.",
          'Agreement is not enough if the user cannot see why, so every incident lists the features whose z-score against the median exceeds 2.5 and the templates over-represented by a lift above 1.5. Users can mark an incident as a false alarm or confirmed, and windows within 0.35 of the median pairwise distance in feature space are then suppressed or promoted to match.',
        ],
      },
      {
        heading: 'Why the LLM Sees Aggregates, Not Logs',
        body: [
          'The obvious design was to paste log lines into a large model and ask what went wrong. I rejected it for three reasons: logs contain secrets and personal data, a 100 MB file does not fit in a context window, and a model asked to summarise raw text will happily invent numbers. Instead every figure is computed deterministically first, and the model receives a compact JSON summary of that analysis.',
          'Summaries come from gpt-oss-120b, with a system prompt that treats all log content as untrusted data and forbids claims the summary does not support. Questions go to gpt-oss-20b with retrieval: BM25 over the learned templates plus a search of the encrypted line index, passing at most 10 lines after redacting keys, tokens, card numbers, emails and the last two octets of every IP. Any line number the model cites that was not in the retrieved set is dropped. A rule-based summary built from the same numbers is always generated first, so if the model times out or the budget runs dry, the report still reads sensibly.',
        ],
      },
      {
        heading: 'The Hardest Problem: Time Lies at the Edges of a Log',
        body: [
          'The trickiest failure mode was not in a model but in the windows fed to them. A log rarely starts or ends on a bucket boundary, so the last window usually covers only part of its interval and looks like volume collapsing. That artefact can resemble an outage to both the z-score and the Isolation Forest, which is enough votes to report a confident incident at the end of almost every file.',
          'I fixed it by marking a window as partial when data starts more than 40% of the way into the first bucket, or covers less than 60% of the last one. Partial windows are still charted but can never be flagged, and the forecaster trims them before fitting so its projection does not start from an artificial drop. Bucket size comes from a fixed ladder between 1 second and 1 week, chosen so that any log produces no more than 180 windows.',
          'Syslog added a second edge, because its timestamps have no year. I assume the current year, step back one if the first timestamps land more than a day in the future, and add 365 days whenever time jumps backwards by more than 150 days, so an auth.log spanning New Year still sorts correctly.',
        ],
      },
      {
        heading: 'Results',
        body: [
          'Logvera is live at logvera.taaranjain.com. On the bundled e-commerce sample, one day of Nginx traffic in 34,492 lines (5.6 MB), it learned 84 message patterns, flagged 3 unusual periods and raised 8 security findings, including 588 rejected login requests from credential stuffing, 76 requests from an automated scanner and 72 sensitive-file probes that all failed. The strongest incident, a 30-minute stretch where average latency rose to 4.1 times normal alongside 500s and gateway timeouts on the cart API, was flagged by 4 of the 5 models, and JEV rated it 94% likely to have affected users.',
          'The backend has 41 passing tests covering ingest, archive unpacking, the vault, security rules and the API.',
        ],
      },
      {
        heading: 'What I Would Do Differently',
        body: [
          'I would build an evaluation harness before tuning the ensemble. The samples contain planted incidents, but my tests only assert that incidents exist, not that the right windows were caught, so choices such as the two-vote threshold and the 4.5 z-score limit were tuned by inspection rather than measured precision and recall.',
          'I would also design for more than one machine from the start. The job queue lives in process, analyses sit on a single volume and the service runs as one replica with one worker. That kept it simple and cheap, but a second instance would need a shared queue and object storage before it could take any load.',
        ],
      },
    ],
  },
  {
    slug: 'comet',
    title: 'Comet',
    tagline: 'A link shortener that blocks phishing before the link exists',
    summary:
      'Comet is a URL shortener where every link is checked by rules and an AI model before it exists, encrypted at rest, and deleted within 7 days. I built it to run on one small container, with a hand-written Bloom filter, HyperLogLog and request tracing.',
    metaDescription:
      'How I built Comet, a FastAPI and Next.js URL shortener that screens links with an AI model, encrypts them with AES-256-GCM and deletes them in 7 days.',
    timeline: 'Sep 2026',
    stack: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'SQLite', 'JEV by TypeSafe', 'AES-256-GCM'],
    liveUrl: 'https://comet.taaranjain.com',
    imageUrl: '/projects/comet/safety-verdict.png',
    publishedAt: '2026-09-27',
    metrics: [
      { label: 'Backend tests passing', value: '70' },
      { label: 'Cached lookup median', value: '7µs' },
      { label: 'Visitor IPs stored', value: '0' },
    ],
    sections: [
      {
        heading: 'The Problem With Permanent, Unchecked Links',
        body: [
          'Most URL shorteners assume a link should live forever and every click is worth tracking. The result is years of dead redirects that still resolve, visitor logs full of IP addresses, and a short domain that hides where it actually leads. That last part makes shorteners a favourite wrapper for phishing: the person clicking cannot see the destination, and the service rarely checks it either.',
          'I wanted the opposite for the everyday case of sharing a meeting link, a paper or a file with a group. A link should check where it leads before anyone opens it, count visits without identifying anyone, and disappear when it is no longer needed.',
        ],
      },
      {
        heading: 'The Constraints I Set',
        body: [
          'Four constraints shaped almost every decision. First, nothing lives longer than 7 days: LINK_MAX_TTL_HOURS is 168, and expiry is enforced on every read rather than left to a cleanup job. Second, no visitor IP addresses are stored, so analytics had to work from salted hashes.',
          'Third, every destination is checked before its short code exists. That puts a network fetch and an AI call on the creation path, which made latency a design problem from the start. Fourth, it had to run on one small instance: the deployment is pinned to a single replica, mounts a single volume at /data and lets the app sleep when idle.',
        ],
      },
      {
        heading: 'How Comet Is Put Together',
        body: [
          "Comet is a Next.js 16 frontend and a FastAPI backend, with SQLite in WAL mode as the only datastore. There are no user accounts: the browser generates a random UUID as a workspace key, and the server only ever stores an HMAC of it. A short link hits a Next.js route handler, which forwards the visitor's user agent and referrer to POST /api/v1/r/{code} and then redirects.",
          'Expiry needed no timers. Expired rows are ignored on read, and a cleanup sweep piggybacks on ordinary requests every 15 minutes. That matters on a container that sleeps when idle, where a scheduled job would either never run or keep the machine awake.',
        ],
        bullets: [
          'Next.js app: landing page, dashboard, safety check, live monitor, and the route handler that resolves and redirects short codes.',
          'Edge middleware: request IDs, an origin allow-list for writes, security headers, per-request trace spans and the X-Chaos fault header.',
          'Token-bucket rate limiter: separate budgets per action, such as 12 creates, 120 resolves and 6 AI calls per minute per client.',
          'Guardian: URL normalisation, a 12-signal rule-based score, a page fetch that refuses private network addresses, and the Jev decision, merged into one verdict.',
          'Lookup path: a Bloom filter sized for 100,000 codes at a 0.1% false-positive target, then an in-memory TTL cache of 5,000 entries, then SQLite.',
          'Storage: destinations encrypted with AES-256-GCM using the short code as associated data, and link passwords hashed with Argon2id.',
          'Analytics: counters by day, hour, device, browser, OS and referrer, plus a 4 KB HyperLogLog per link for unique visitors, written in a background task after the redirect is sent.',
        ],
      },
      {
        heading: 'Why a Confidence-Gated Model Over a Raw AI Verdict',
        body: [
          "The obvious design was to send each URL to a model and do whatever it said. Instead I treated the model as one decider among several. Heuristics score the URL first, and the fetcher adds what it learnt from the page and its redirect chain. Jev (TypeSafe's decision API, model jev-latest) then answers three typed questions: whether the link is safe, suspicious or malicious; how likely it is to impersonate a brand; and what category of site it is.",
          "The model's answer only changes the outcome when its confidence clears JEV_MIN_CONFIDENCE, which I set to 0.55. A malicious verdict at 0.8 or above blocks creation, an impersonation probability of 0.75 or above forces the danger level, and a heuristic score of 90 blocks on its own. Every decider's raw output is stored with the verdict, so the UI can show exactly why a link was flagged.",
          'Running it against real destinations showed why the gate matters. The page at notion.so redirects to notion.com, and the model called it safe with only 0.38 confidence, alongside a 0.41 probability of suspicious. Acting on that would have put a warning on a legitimate site, so the gate ignored it. A phishing-shaped test URL on apple-id-verify-login.example-support.top scored 90 out of 100 on heuristics and malicious at 1.0 from the model, and was blocked.',
        ],
      },
      {
        heading: 'Why SQLite and In-Process State Over Redis and Postgres',
        body: [
          'A conventional stack would be Postgres for links, Redis for the cache and rate limits, and a scheduled worker for expiry. For one instance that sleeps when idle, that means three services to run, and the always-on ones defeat the point of sleeping. I kept everything in one process: SQLite with a write connection and a separate read-only connection, an OrderedDict-based TTL cache, and a token-bucket limiter held in a dictionary.',
          'The Bloom filter earns its place on the lookup path. Mistyped codes, and fresh candidate codes during creation, are answered "definitely absent" without touching the database. Codes are 7 characters from a 57-character alphabet with no look-alike characters, which gives about 1.95 trillion combinations. Because a Bloom filter cannot delete entries, the sweep rebuilds it from active codes, and the same sweep runs at start-up so a restart never serves stale membership.',
          'The trade-off is explicit: this cannot scale horizontally as written. The cache, limiter and Bloom filter live in each process, so a second replica would double every rate limit and serve stale cache entries. I would move shared state into Redis before adding replicas.',
        ],
      },
      {
        heading: 'The Hardest Problem: When the Model Is Slow or Down',
        body: [
          'The hardest problem was putting an external AI call where a user is waiting for their short link. If Jev is overloaded or slow, a naive version either hangs the request or fails link creation, and a safety feature becomes an outage.',
          'I fixed it in layers. Each Jev call has a 4 second timeout and at most 2 attempts, with exponential backoff from 0.25 seconds plus jitter. It skips the retry when the provider asks for more than 2 seconds via Retry-After, and it retries only on status codes such as 429, 503 and 529. Two 4 second attempts plus backoff can exceed 8 seconds, so the Guardian also wraps all AI work in a 7 second budget with asyncio.wait and cancels anything still pending.',
          'When the model fails, the verdict records the reason, such as http_529 or timeout, and the heuristics and page metadata still decide and summarise the link. To prove the fallback works, I added an X-Chaos request header that injects faults such as jev_down, jev_slow, fetch_timeout and slow_db into a single request. A test asserts that a jev_down request makes exactly two attempts with one backoff span in the trace. The same header drives a Chaos Lab in the UI, so anyone can watch the fallback happen.',
        ],
      },
      {
        heading: 'Results',
        body: [
          'The shipped feature set covers AI-checked link creation; password, click-limit, time-lock, device-routing and A/B rules; bulk shortening streamed as NDJSON; QR codes; privacy-preserving analytics; and a live monitor. The backend has 70 passing tests. They cover the links API, link lifecycle, bulk creation, workspaces, timezone-correct analytics, the chaos paths and the domain data structures.',
          'The built-in load tester ran 500 in-process lookups at a concurrency of 10 on my laptop: about 30,000 lookups per second, a median of 7 microseconds for cache hits, 0.88 milliseconds for SQLite reads and 5 microseconds for Bloom-filter rejections. These exclude network overhead, so they show the relative cost of each layer rather than end-to-end latency. One live safety check against a real page, including the fetch and the Jev decision, took 1.4 seconds locally.',
        ],
      },
      {
        heading: 'What I Would Do Differently',
        body: [
          'I would take the deep scan off the synchronous create path. A better shape is to create the link immediately in a pending state, scan in the background, and hold the first visitor on the existing warning page only if the verdict is not back yet. The creator would get their link in milliseconds, and only the first visitor to a brand-new link could ever hit the 7 second worst case.',
          'I would also build an evaluation set before tuning thresholds. The 0.55 confidence gate, the 0.8 block threshold and the heuristic weights, such as 35 points for a brand name in a subdomain, came from reasoning and spot checks rather than labelled data. A few thousand URLs from a public phishing feed and a top-sites list would let me report precision and recall, and choose thresholds from a curve instead of intuition.',
        ],
      },
    ],
  },
  {
    slug: 'decidex',
    title: 'DecideX',
    tagline: 'Catches 85.6% of leavers on held-out data, then drafts the offer',
    summary:
      'I built a churn decision app that reads account notes with an LLM, scores customers with a calibrated model and recommends what to do, with reasons. A cost-tuned threshold catches 85.6% of leavers on held-out data.',
    metaDescription:
      'DecideX case study: churn prediction with a calibrated scikit-learn model, LLM note reading, FastAPI and Next.js, built to sleep when idle.',
    timeline: 'Sep 2026',
    stack: ['scikit-learn', 'LightGBM', 'FastAPI', 'gpt-oss-20b', 'Next.js', 'SQLite'],
    liveUrl: 'https://decidex.taaranjain.com',
    imageUrl: '/projects/decidex/decision-detail.png',
    publishedAt: '2026-09-27',
    metrics: [
      { label: 'Churners caught', value: '85.6%' },
      { label: 'Missed churners', value: '184→54' },
      { label: 'Decision time', value: '~1.5s' },
    ],
    sections: [
      {
        heading: 'The Problem: Churn Scores Without Next Steps',
        body: [
          'Retention teams at subscription businesses usually find out a customer is leaving when the cancellation arrives. Churn models exist, but a probability on its own leaves the hard part to the person reading it: what to do, who should do it, how urgently, and whether it is worth a discount. The richest signal, the free-text notes from support calls and emails, rarely reaches the model at all.',
          'I wanted a tool that a non-technical customer team could open and act on. It would read the notes, score the customer and turn both into a recommendation with reasons in plain English, a price tag on the risk and a draft of what to say.',
        ],
      },
      {
        heading: 'The Constraints I Set',
        body: [
          'Four constraints drove most of the decisions. The audience is non-technical, so every screen had to explain itself in plain words and every recommendation had to carry its reasons. People stay in charge: uncertain calls go to a review queue, reviewers can override anything, and gender and senior-citizen status are dropped before training so they cannot influence a recommendation.',
          'Idle cost had to be as close to zero as possible, so the backend runs with sleep mode enabled and must go quiet when nobody is using it. Finally, there are no accounts. Each browser generates a random workspace key and the server stores only an HMAC hash of it, which removes sign-up friction without storing anything that identifies a person.',
        ],
      },
      {
        heading: 'Architecture: Four Stages and a Human',
        body: [
          'A decision runs as a four-stage pipeline in FastAPI. The note reader and the churn model run concurrently with asyncio.gather, their outputs feed a structured decision engine, and a review policy decides whether a person needs to check the result. Each stage records its status and timing, and the decision stores the exact inputs, so every recommendation carries its own audit trail.',
          "On top of the pipeline sit the features that make it useful day to day: yearly revenue at risk (monthly bill times twelve times the probability), a best-offer search, LLM-drafted emails and call scripts, expiring share links for a one-page report, a fairness check and an activity log. None of them needs a user account; they all hang off the browser's workspace key.",
        ],
        bullets: [
          'Next.js 16 frontend: the app, dashboards and printable reports, proxying /api to the backend.',
          'LLM note reader: gpt-oss-20b in JSON mode returns sentiment, complaint topics, competitor mentions, cancellation intent and evidence quotes; any quote not found verbatim in the notes is discarded.',
          'Churn model: a calibrated scikit-learn pipeline that returns a probability, a risk level and occlusion-based reasons, measured by swapping each feature for its typical training value.',
          'Decision engine: a structured-decision API answers four typed questions (action and owning team as choices, urgency as a score, escalation as yes or no), each with probabilities; if it is unreachable, deterministic backup rules answer and the decision is always flagged.',
          'Review policy: flags confidence below the workspace threshold, escalation probabilities between 40% and 60%, unreadable notes, and actions that contradict the risk level.',
          'Storage: async SQLAlchemy 2 on SQLite, with a startup step that adds missing columns so deploys never need a manual migration.',
        ],
      },
      {
        heading: 'Why a Cost-Based Threshold Over the Default 0.5',
        body: [
          'I trained four candidates on a stratified 60/20/20 split of the IBM Telco dataset (7,043 customers, 26.5% churn): a class-prior baseline, logistic regression, a 300-tree random forest and LightGBM. I picked the winner by validation PR-AUC rather than accuracy, because when a quarter of customers leave, a model can look accurate while missing most of them. The random forest edged ahead at 0.643, against 0.640 for logistic regression and 0.633 for LightGBM, and I wrapped it in isotonic calibration with five-fold cross-validation so that a stated 30% means roughly 30%.',
          'The bigger lever was the threshold: at the default 0.5, the model caught only 50.8% of leavers on the test set. I treated a missed churner as five times as costly as an unnecessary intervention and chose the threshold that minimises expected cost, which landed at 21%. Recall rose to 85.6% and missed churners fell from 184 to 54 out of 374, at the price of precision dropping from 64.6% to 48.3%. For a retention team a few extra check-in calls are cheap and a lost customer is not, so I accepted more false alarms and let the review queue absorb them.',
        ],
      },
      {
        heading: 'Why SQLite on a Volume Over Postgres',
        body: [
          'The original production configuration used Postgres through asyncpg, with SQLite only for local development, and I ran the full test suite against a local Postgres 18 instance to prove it worked. But a managed database is a second service that runs around the clock, which cut against the zero-idle-cost goal, and open database connections count as activity that can stop the app sleeping. DecideX runs as a single instance with modest write volume, so Postgres was buying very little.',
          'I switched to SQLite in WAL mode on a persistent volume mounted at /data and removed the Postgres driver. The trade-offs are real: volumes rule out multiple replicas, redeploys cause a few seconds of downtime, and backups become my responsibility. The biggest risk was silent data loss, because without a volume every redeploy would start from an empty file. So the app refuses to start in production unless the database file sits inside the mounted volume, and the log says why.',
        ],
      },
      {
        heading: 'The Hardest Problem: Making the Backend Actually Sleep',
        body: [
          'The host sleeps a service after roughly five to ten minutes without outbound traffic. My first audit found two things keeping it awake around the clock: the dashboard refetched its data every 60 seconds, and the public landing page called the backend on every visit to fetch live model metrics. I removed the polling, moved the landing-page metrics and sample customers into static JSON snapshots generated by a small script, and made the guide, the new-decision form and bulk upload render without touching the API. The server now wakes only when someone picks a sample, starts typing, drops in a file or opens a page that needs saved data.',
          "The subtler bug only showed up when I measured it. After a decision, lsof showed two HTTPS connections from the backend to the AI providers still established after twelve seconds of idle, because httpx keeps connections alive for reuse and does not close them proactively. When a provider eventually closes one of those sockets, the backend's reply is outbound traffic, which can reset the sleep timer. In serverless mode I set max_keepalive_connections to zero; the same check then showed no open connections two seconds after the last request, and a regression test now guards the setting.",
          'Waking up had to feel acceptable too. I cut backend import time from 2.0 to 0.7 seconds by loading scikit-learn and LightGBM only when first needed, and the frontend retries unreachable responses with delays of 1, 2, 3.5 and 5 seconds while showing a short waking-up banner. Decision requests carry an idempotency key, so the retries are safe: in a test with the server stopped, the decision completed about nine seconds after the click once the server came back, and exactly one decision was created.',
        ],
      },
      {
        heading: 'Results',
        body: [
          'On 1,409 held-out customers the calibrated model reaches ROC-AUC 0.844 and PR-AUC 0.653 with an expected calibration error of 0.018, and at the tuned threshold it catches 85.6% of customers who leave. In local tests with the live LLM and decision engine, a full decision takes about 1 to 1.5 seconds. The best-offer search re-scores every single and paired change in one batch in roughly 150 milliseconds, and for one sample customer it found that a two-year contract would take the chance of leaving from 62% to 19%, below the warning line.',
          'The backend has 51 automated tests, and the suite also passed on Postgres before the switch to SQLite.',
        ],
      },
      {
        heading: 'What I Would Do Differently',
        body: [
          'The best-offer finder re-scores a customer with one feature changed, but the model learned correlations from observational data, not causal effects. Customers on two-year contracts churn less partly because loyal customers choose them, so the predicted drop from offering one is optimistic. Before trusting those numbers with real discounts, I would validate offers with a holdout experiment or an uplift model.',
          'I also relied on prompt instructions alone to keep the LLM drafts honest, and testing showed why that is not enough: one call script promised the customer could cancel any time, which was never in the facts it had been given. I tightened the prompt, but next time I would build a small evaluation set of drafts from day one and check automatically that every commitment in a draft traces back to the offer it was given.',
        ],
      },
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}

export function readingMinutes(study: CaseStudy) {
  const words = study.sections
    .flatMap((section) => [section.heading, ...section.body, ...(section.bullets ?? [])])
    .join(' ')
    .split(/\s+/).length
  return Math.max(1, Math.round(words / 220))
}
