/* Selected résumé projects and their public GitHub repositories. */
window.PORTFOLIO_PROJECTS = [
  {
    title: 'Palmivo',
    repo: 'Palmivo',
    category: 'Computer vision / Spatial CAD',
    tags: ['TypeScript', 'Three.js', 'MediaPipe', 'ONNX Runtime Web', 'Manifold WASM'],
    description: 'A browser-based CAD workbench for creating and editing 3D solids with webcam hand gestures. Top 40 finalist at HackForge 2K26.',
    detail: 'Palmivo combines MediaPipe hand tracking and MIT Online TSM gesture shortcuts with a typed command compiler that builds Manifold geometry. It exports STL and OBJ and uses ElevenLabs to read STL inspection findings aloud. With gesture inference running on-device, it reached about 29 camera FPS and 60 render FPS.',
    art: 'mouse',
    cover: 'Shape\nby gesture.',
    symbol: '◇'
  },
  {
    title: 'ExoScope',
    repo: 'Planetary_Biosignature',
    category: 'Astrobiology / Explainable AI',
    tags: ['Python', 'Streamlit', 'XGBoost', 'YOLOv8', 'SHAP'],
    description: 'An explainable exoplanet habitability and biosignature-likelihood index that combines NASA Exoplanet Archive data with computer vision.',
    detail: 'ExoScope combines around 180 physics-grounded features, including Kopparapu habitable-zone boundaries and the Earth Similarity Index, with a tiered surface-imagery pipeline. It uses calibrated XGBoost and Random Forest models, SHAP attribution, and bootstrap confidence intervals. A four-page Streamlit dashboard and 71 tests support the analysis, which reproduced the accepted TRAPPIST-1 e, f, and g habitable-zone classification.',
    art: 'crowd',
    cover: 'Worlds\nbeyond.',
    symbol: '◉'
  },
  {
    title: 'Teach Chhota',
    repo: 'Teach-Chhota',
    category: 'Team project / Ed-tech',
    tags: ['React', 'TypeScript', 'Gemini', 'RAG'],
    description: 'An offline-first AI learning companion where students in classes 6–12 teach maths and science concepts. First runner-up at Horizon by Hoollow.',
    detail: 'Built by Team Recursive Bytes, Teach Chhota uses real-time Gemini feedback to surface misconceptions and retrieval over NCERT material to answer questions. It tracks concept mastery and learning streaks and offers teacher and parent dashboards.',
    art: 'disease',
    cover: 'Learn by\nteaching.',
    symbol: '✳'
  },
  {
    title: 'KAVACH Risk Command Center',
    repo: 'https://github.com/Arpitgit06/NSUT-Finance',
    category: 'Team project / Fintech',
    tags: ['React', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    description: 'A team-built fintech platform that brings fraud detection and loan-default prediction together in a 3D analyst workspace.',
    detail: 'KAVACH brings fraud and repayment scores into a single view called Twin Score. The workspace adds a 3D WebGL risk helix, a money-mule network graph, and a dashboard for monitoring fairness and bias.',
    art: 'credit',
    cover: 'Risk,\nin stereo.',
    symbol: '◈'
  },
  {
    title: 'Tracelight',
    repo: 'CodeCubicle',
    category: 'AI / Data intelligence',
    tags: ['Python', 'Next.js', 'PyTorch', 'Hugging Face Transformers', 'Playwright'],
    description: 'A GPU-accelerated research platform that runs Qwen2.5 locally and streams structured web data into a live dashboard.',
    detail: 'Tracelight loads Qwen2.5 into local GPU memory and collects web data through Playwright. It streams deduplicated JSON records with per-task progress, and users can export the results as CSV or JSON.',
    art: 'speech',
    cover: 'Follow\nthe signal.',
    symbol: '⌁'
  },
  {
    title: 'TESSERACTZ',
    repo: 'ISRO_Hackathon_IR_Enhancement',
    category: 'Team project / Satellite imagery',
    tags: ['Python', 'FastAPI', 'React', 'PyTorch', 'YOLOv8'],
    description: 'A deep-learning pipeline that enhances and colorizes infrared satellite imagery for the Bharatiya Antariksh Hackathon.',
    detail: 'The pipeline uses CLAHE preprocessing, Real-ESRGAN 4× super-resolution, and neural colorization. YOLOv8 detects objects, GradCAM highlights influential regions, and a React dashboard reports PSNR, SSIM, and LPIPS image-quality metrics.',
    art: 'mouse',
    cover: 'See the\ninvisible.',
    symbol: '◉'
  },
  {
    title: 'Crowd Flow Optimiser',
    repo: 'GrandPrixGeekRoom',
    category: 'Computer vision / Crowd digital twin',
    tags: ['Python', 'FastAPI', 'YOLOv8', 'MiDaS', 'WebSockets'],
    description: 'A real-time crowd digital twin that pairs computer vision with physics simulation to forecast bottlenecks and reroute crowds.',
    detail: 'The system combines YOLOv8 and MiDaS vision models with a Social Force Model simulation. It generates live density heatmaps, forecasts bottlenecks 15 minutes ahead, and reroutes crowds as conditions change.',
    art: 'portfolio',
    cover: 'Predict\nthe flow.',
    symbol: '◎'
  }
];
