// Single source of truth for the recruiter-facing page.
// Tracks: "genai" (Python & GenAI), "embedded" (Embedded & IoT), "fullstack" (Full Stack & DevOps)

export const TRACKS = [
  { id: "all", label: "All" },
  { id: "genai", label: "Python & GenAI" },
  { id: "embedded", label: "Embedded & IoT" },
  { id: "fullstack", label: "Full Stack" },
];

export const RESUMES = [
  { label: "Python & GenAI", href: "resume/Prajwal_A_Python_GenAI.pdf" },
  { label: "Embedded", href: "resume/Prajwal_A_Embedded.pdf" },
  { label: "Software", href: "resume/Prajwal_A_Software.pdf" },
];

export const PROJECTS = [
  {
    title: "PulseX – Engineering Services Platform",
    tracks: ["fullstack"],
    badge: "Live in production",
    period: "2026 – Present",
    summary:
      "Sole developer of a live ordering platform for PCB fabrication, 3D printing and laser cutting that replaced a fully offline quotation and order process.",
    points: [
      "Custom Gerber file viewer that renders PCB designs with 0.1 mm dimensional accuracy",
      "Razorpay payments (UPI, net banking, cards) and Google OAuth login",
      "Node.js/Express REST APIs, MySQL schema with Prisma ORM, deployed and maintained on a Linux VPS",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "MySQL", "Prisma", "Razorpay"],
    links: [{ label: "Live site", href: "https://www.pulsewritexsolutions.com" }],
    featured: true,
  },
  {
    title: "Omni Room – AI Smart Classroom",
    tracks: ["genai", "embedded"],
    badge: "Capstone",
    period: "Nov 2025 – Mar 2026",
    summary:
      "Classroom system that combines custom camera hardware, face-recognition attendance and an offline LLM study assistant. Built solo.",
    points: [
      "Echo Minds: local LLM on Ollama turns lecture audio, PDFs and slides into summaries, quizzes, flashcards and mind maps, fully offline",
      "Benchmarked 5 face-recognition approaches (Haar, LBPH, k-NN, HOG, CNN) and shipped HOG detection + CNN embeddings",
      "Servo-driven pan-tilt camera on Raspberry Pi 4 with a Sony IMX sensor in a 3D-printed, actively cooled housing; web app with 4 user roles",
    ],
    stack: ["Python", "Ollama", "OpenCV", "dlib", "Raspberry Pi 4", "React", "Node.js"],
    links: [],
    featured: true,
  },
  {
    title: "Fluid AI – Autonomous Document Agent",
    tracks: ["genai"],
    badge: "Agentic AI",
    period: "2026",
    summary:
      "FastAPI agent that takes a natural-language request, plans its own steps and produces a formatted Word document.",
    points: [
      "Four-stage pipeline: validate → plan → generate → build",
      "Groq LLM for fast planning; Pydantic schemas validate every LLM output",
      "Retry loop feeds the exact validation error back to the model, so malformed JSON is corrected instead of crashing",
    ],
    stack: ["Python", "FastAPI", "Groq", "Pydantic", "python-docx"],
    links: [],
  },
  {
    title: "Rizzo Education – Production Hardening",
    tracks: ["fullstack"],
    badge: "Live in production",
    period: "2026",
    summary:
      "Improved reliability and release safety of a live AI education platform during my internship.",
    points: [
      "Clustered deployment with PM2 behind Nginx and better error recovery",
      "Versioned database migrations, automated backups and rollback procedures",
      "Gated GitHub Actions CI/CD pipeline for predictable releases",
    ],
    stack: ["Node.js", "PostgreSQL", "Prisma", "Linux", "Nginx", "PM2", "GitHub Actions"],
    links: [{ label: "Live site", href: "https://rizzoeducation.tech/ai-school" }],
  },
  {
    title: "Smart Attendance – On-Device Face Recognition",
    tracks: ["embedded", "genai"],
    badge: "Embedded Linux",
    period: "",
    summary:
      "Face-recognition attendance that runs entirely on a Raspberry Pi, with no cloud.",
    points: [
      "Brought up the Sony IMX708 NoIR camera: configuration, orientation and the NoIR purple colour cast",
      "CLAHE lighting normalisation, HOG/CNN detection and 128-D face embeddings on-device",
      "Flask live MJPEG preview, CSV/Excel export, runs as a systemd service at boot",
    ],
    stack: ["Raspberry Pi", "Picamera2", "Python", "OpenCV", "dlib", "Flask", "systemd"],
    links: [],
  },
  {
    title: "Predictive Maintenance – IIoT Anomaly Detection",
    tracks: ["embedded", "genai"],
    badge: "Edge ML",
    period: "2025",
    summary:
      "Detects motor faults from vibration and temperature sensor data, with inference at the edge.",
    points: [
      "Sliding-window time-domain features (RMS, peak-to-peak, kurtosis) instead of FFT to fit edge compute limits",
      "Random Forest classifier at 0.88 precision; SMOTE to handle anomalies being ~2% of data",
      "Inference runs locally without a cloud round-trip",
    ],
    stack: ["Python", "scikit-learn", "Pandas", "Edge ML"],
    links: [],
  },
  {
    title: "PiPilot – Raspberry Pi Voice Assistant",
    tracks: ["embedded", "genai"],
    badge: "In progress",
    period: "2026",
    summary: "Modular Python voice assistant running headless on a Raspberry Pi 4.",
    points: [
      "Speech-to-text, text-to-speech and command handling with a GPIO status LED",
      "Logging, config file, basic tests; autostarts as a systemd service",
    ],
    stack: ["Raspberry Pi 4", "Python", "Linux", "systemd"],
    links: [],
  },
  {
    title: "RC Car – Microcontroller Drive Control",
    tracks: ["embedded"],
    badge: "Hardware",
    period: "",
    summary: "Bluetooth-controlled car: HC-05 → Arduino Uno → L298N H-bridge → DC motors.",
    points: [
      "GPIO direction control for forward, reverse and turning",
      "Separate motor and logic supplies with a common ground; debugged supply dips under motor load",
    ],
    stack: ["Arduino Uno", "Embedded C", "L298N", "HC-05 (UART)"],
    links: [],
  },
];

export const SKILLS = [
  {
    track: "genai",
    label: "Python & GenAI",
    items: [
      "Python", "Ollama / local LLMs", "Groq API", "Prompt design", "Agentic pipelines",
      "FastAPI", "Pydantic", "Flask", "OpenCV", "dlib / face_recognition", "scikit-learn", "Pandas",
    ],
  },
  {
    track: "embedded",
    label: "Embedded & IoT",
    items: [
      "Embedded C", "Raspberry Pi 3/4", "Arduino", "Embedded Linux", "systemd",
      "libcamera / Picamera2", "GPIO", "Servo & DC motor control", "UART", "I2C", "SPI", "Circuit debugging",
    ],
  },
  {
    track: "fullstack",
    label: "Full Stack & DevOps",
    items: [
      "TypeScript", "JavaScript", "React", "Node.js", "Express", "REST APIs",
      "MySQL", "PostgreSQL", "Prisma", "Linux", "Nginx", "PM2", "GitHub Actions", "Git",
    ],
  },
];
