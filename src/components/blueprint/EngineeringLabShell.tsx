import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectSchema, SubsystemSchema, ReplayStep } from '../../types/blueprint';
import pulseXData from '../../data/knowledge/projects/pulse_x.json';
import rizzoData from '../../data/knowledge/projects/rizzo.json';
import omniRoomData from '../../data/knowledge/projects/omni_room.json';

interface EngineeringLabShellProps {
  onClose: () => void;
}

type LabState = 'LAB_ACTIVE' | 'PROJECT_FOCUS' | 'SUBSYSTEM_FOCUS';

// Dynamic SVG Icons representing technical circuit schematic symbols
const getTechIcon = (techId: string) => {
  const cleanId = techId.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  switch (cleanId) {
    case 'react':
      return (
        <svg className="w-5 h-5 text-[#00f0ff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <ellipse cx="10" cy="10" rx="9" ry="3.5" transform="rotate(0 10 10)" />
          <ellipse cx="10" cy="10" rx="9" ry="3.5" transform="rotate(60 10 10)" />
          <ellipse cx="10" cy="10" rx="9" ry="3.5" transform="rotate(120 10 10)" />
          <circle cx="10" cy="10" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'typescript':
      return (
        <svg className="w-5 h-5 text-[#00f0ff]" viewBox="0 0 20 20" fill="currentColor">
          <rect x="2" y="2" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <text x="5" y="14" fontSize="9" fontWeight="bold" fontFamily="monospace" fill="currentColor">TS</text>
        </svg>
      );
    case 'nodejs':
      return (
        <svg className="w-5 h-5 text-[#00f0ff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <polygon points="10,2 17,6 17,14 10,18 3,14 3,6" />
          <line x1="10" y1="2" x2="10" y2="18" strokeDasharray="1,2" />
        </svg>
      );
    case 'mysql':
    case 'prisma':
      return (
        <svg className="w-5 h-5 text-[#00f0ff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <ellipse cx="10" cy="5" rx="6" ry="2" />
          <path d="M4,5 C4,5 4,10 4,10 C4,11.1 6.7,12 10,12 C13.3,12 16,11.1 16,10 C16,10 16,5 16,5" />
          <path d="M4,10 C4,10 4,15 4,15 C4,16.1 6.7,17 10,17 C13.3,17 16,16.1 16,15 C16,15 16,10 16,10" />
        </svg>
      );
    case 'python':
      return (
        <svg className="w-5 h-5 text-[#00f0ff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="10" cy="7" r="4" />
          <circle cx="10" cy="13" r="4" />
          <line x1="10" y1="3" x2="10" y2="17" />
        </svg>
      );
    case 'fastapi':
      return (
        <svg className="w-5 h-5 text-[#00f0ff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <polygon points="11,2 3,11 9,11 9,18 17,9 11,9" fill="currentColor" fillOpacity="0.2" />
        </svg>
      );
    case 'opencv':
    case 'hog':
    case 'cnn':
      return (
        <svg className="w-5 h-5 text-[#00f0ff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="10" cy="10" r="7" />
          <circle cx="10" cy="10" r="3" />
          <line x1="10" y1="3" x2="10" y2="17" strokeDasharray="2,2" />
          <line x1="3" y1="10" x2="17" y2="10" strokeDasharray="2,2" />
        </svg>
      );
    case 'rpi4':
    case 'servomotors':
    case 'sonyimx':
      return (
        <svg className="w-5 h-5 text-[#00f0ff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="3" y="4" width="14" height="12" rx="1" />
          <rect x="5" y="6" width="4" height="4" fill="currentColor" fillOpacity="0.2" />
          <line x1="17" y1="7" x2="19" y2="7" />
          <line x1="17" y1="10" x2="19" y2="10" />
          <line x1="17" y1="13" x2="19" y2="13" />
        </svg>
      );
    case 'razorpay':
      return (
        <svg className="w-5 h-5 text-[#00f0ff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <polygon points="13,2 5,11 10,11 7,18 15,9 10,9" />
        </svg>
      );
    case 'googleoauth':
      return (
        <svg className="w-5 h-5 text-[#00f0ff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="5" y="8" width="10" height="9" rx="1" />
          <path d="M7,8 C7,8 7,4 10,4 C13,4 13,8 13,8" />
        </svg>
      );
    case 'hostinger':
      return (
        <svg className="w-5 h-5 text-[#00f0ff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M3,5 L17,5 L17,15 L3,15 Z" />
          <line x1="3" y1="10" x2="17" y2="10" />
          <circle cx="6" cy="7.5" r="0.7" fill="currentColor" />
          <circle cx="6" cy="12.5" r="0.7" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-[#00f0ff]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="4" y="4" width="12" height="12" rx="1" strokeDasharray="1,1" />
          <circle cx="10" cy="10" r="1.5" />
        </svg>
      );
  }
};

interface SearchResult {
  proj: ProjectSchema;
  sub: SubsystemSchema;
}

export const EngineeringLabShell: React.FC<EngineeringLabShellProps> = ({ onClose }) => {
  const [labState, setLabState] = useState<LabState>('LAB_ACTIVE');
  const [selectedProj, setSelectedProj] = useState<ProjectSchema | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubsystemSchema | null>(null);

  // Search Engine states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Replay states
  const [isReplaying, setIsReplaying] = useState(false);
  const [replayStepIdx, setReplayStepIdx] = useState(0);
  const [replayPlaying, setReplayPlaying] = useState(false);

  const projects: ProjectSchema[] = [
    pulseXData as ProjectSchema,
    rizzoData as ProjectSchema,
    omniRoomData as ProjectSchema,
  ];

  // Auto-play interval for Replay Console
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (replayPlaying && selectedProj && selectedProj.replay) {
      interval = setInterval(() => {
        setReplayStepIdx((prev) => {
          if (prev >= selectedProj.replay.length - 1) {
            setReplayPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [replayPlaying, selectedProj]);

  const handleSelectProj = (proj: ProjectSchema) => {
    setSelectedProj(proj);
    setSelectedSub(null);
    setIsReplaying(false);
    setLabState('PROJECT_FOCUS');
  };

  const handleSelectSub = (sub: SubsystemSchema) => {
    setSelectedSub(sub);
    setIsReplaying(false);
    setLabState('SUBSYSTEM_FOCUS');
  };

  const handleBreadcrumbClick = (targetState: LabState) => {
    if (targetState === 'LAB_ACTIVE') {
      setSelectedProj(null);
      setSelectedSub(null);
      setIsReplaying(false);
      setLabState('LAB_ACTIVE');
    } else if (targetState === 'PROJECT_FOCUS') {
      setSelectedSub(null);
      setIsReplaying(false);
      setLabState('PROJECT_FOCUS');
    }
  };

  // Search logic
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }

    const query = val.toLowerCase();
    const matches: SearchResult[] = [];

    projects.forEach((proj) => {
      proj.spec.subsystems.forEach((sub) => {
        const matchesName = sub.name.toLowerCase().includes(query);
        const matchesFunc = sub.function.toLowerCase().includes(query);
        const matchesTech = sub.technologies.some((t) => t.toLowerCase().includes(query));

        if (matchesName || matchesFunc || matchesTech) {
          matches.push({ proj, sub });
        }
      });
    });

    setSearchResults(matches);
  };

  const handleSelectSearchResult = (res: SearchResult) => {
    setSelectedProj(res.proj);
    setSelectedSub(res.sub);
    setSearchQuery('');
    setSearchResults([]);
    setIsReplaying(false);
    setLabState('SUBSYSTEM_FOCUS');
  };

  // Replay triggers
  const startReplay = () => {
    setIsReplaying(true);
    setReplayStepIdx(0);
    setReplayPlaying(true);
  };

  const stopReplay = () => {
    setIsReplaying(false);
    setReplayPlaying(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020813] text-[#00f0ff] font-mono flex flex-col overflow-hidden select-none">
      
      {/* 1. Technical Header / Breadcrumbs Toolbar */}
      <div className="h-14 border-b border-[#00f0ff]/20 flex items-center justify-between px-6 bg-black/40 relative">
        {/* CAD grid overlay line inside header */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#00f0ff]/0 via-[#00f0ff]/20 to-[#00f0ff]/0" />

        <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase">
          <span className="text-[#ffad00] animate-pulse font-bold">● STATION.ONLINE</span>
          <span className="opacity-30">|</span>
          <div className="flex items-center gap-1.5 font-bold">
            <span
              onClick={() => handleBreadcrumbClick('LAB_ACTIVE')}
              className="cursor-pointer hover:text-white transition-colors"
            >
              LAB_ROOT
            </span>
            {selectedProj && (
              <>
                <span className="opacity-40">&gt;</span>
                <span
                  onClick={() => handleBreadcrumbClick('PROJECT_FOCUS')}
                  className="cursor-pointer hover:text-white transition-colors text-white"
                >
                  {selectedProj.id}
                </span>
              </>
            )}
            {selectedSub && (
              <>
                <span className="opacity-40">&gt;</span>
                <span className="text-white bg-[#00f0ff]/10 px-1 py-0.5 rounded-sm border border-[#00f0ff]/30">
                  {selectedSub.name.replace(' ', '_').toUpperCase()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Search Console Input */}
        <div className="relative hidden md:flex items-center bg-black/45 border border-[#00f0ff]/20 focus-within:border-[#00f0ff]/60 rounded-sm px-2 py-1">
          <span className="text-[8px] text-[#00f0ff]/50 mr-1.5 font-bold">FIND:</span>
          <input
            type="text"
            placeholder="Search Tech/Subsystem..."
            value={searchQuery}
            onChange={handleSearch}
            className="bg-transparent text-white text-[9px] outline-none uppercase font-bold placeholder-[#00f0ff]/30 w-44"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
              className="text-[9px] text-[#00f0ff]/50 hover:text-white ml-1"
            >
              ✕
            </button>
          )}

          {/* Search Dropdown Panel */}
          {searchResults.length > 0 && (
            <div className="absolute top-full right-0 mt-2 bg-[#020a17] border border-[#00f0ff]/30 w-64 shadow-[0_4px_16px_rgba(0,0,0,0.85)] z-[9999] rounded-sm divide-y divide-[#00f0ff]/10 max-h-48 overflow-y-auto scrollbar-thin">
              {searchResults.map((res, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectSearchResult(res)}
                  className="p-2 hover:bg-[#00f0ff]/5 cursor-pointer flex flex-col text-left transition-colors"
                >
                  <span className="text-[9px] font-bold text-white uppercase">{res.sub.name}</span>
                  <span className="text-[7.5px] text-[#00f0ff]/55 mt-0.5 uppercase">
                    Project: {res.proj.name.split(' ')[0]} | {res.sub.technologies.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rule 6 Close Button */}
        <button
          onClick={onClose}
          className="text-xs hover:text-white text-[#00f0ff] border border-[#00f0ff]/30 hover:border-white px-3 py-1 rounded-sm transition-all duration-300 bg-[#00f0ff]/5 hover:shadow-[0_0_8px_rgba(0,240,255,0.2)]"
        >
          ✕ Close Lab
        </button>
      </div>

      {/* 2. Split Screen Viewport Layout */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Faint blueprint CAD layout backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,240,255,0.03),rgba(0,0,0,0))] pointer-events-none" />

        {/* LEFT PANEL: Fixed Resume (Assembled System) */}
        <div className="w-full md:w-1/2 h-[45%] md:h-full border-b md:border-b-0 md:border-r border-[#00f0ff]/20 p-4 md:p-6 flex items-center justify-center bg-black/25 relative overflow-hidden">
          <div className="absolute bottom-2 left-3 text-[8px] text-[#00f0ff]/35 font-mono z-10">SYSTEM_MODULE: ASSEMBLED_HARDWARE</div>
          
          {/* Programmatic High-Fidelity Resume Document */}
          <div className="w-full h-full max-w-xl max-h-[88vh] bg-white text-slate-900 shadow-2xl p-5 md:p-6 rounded-sm overflow-y-auto scrollbar-thin flex flex-col font-sans select-text text-left border border-slate-200">
            
            {/* Header */}
            <div className="text-center space-y-1 pb-3 border-b border-slate-200">
              <h1 className="text-xl font-bold tracking-wide text-slate-950 font-serif">PRAJWAL A</h1>
              <p className="text-[10px] text-slate-600">
                Bengaluru, Karnataka | <a href="mailto:prajwalshetty4552@gmail.com" className="text-blue-600 hover:underline">prajwalshetty4552@gmail.com</a>
              </p>
              <div className="text-[9px] text-slate-500 space-x-2">
                <a href="https://linkedin.com/in/prajwal4552" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold">LinkedIn</a>
                <span>•</span>
                <a href="https://github.com/praju4552" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold">GitHub</a>
                <span>•</span>
                <a href="resume/Prajwal_A_Software.pdf" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold">PDF</a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mt-3">
              <h2 className="text-[10px] font-bold text-slate-950 tracking-wider border-b border-slate-300 pb-0.5 uppercase font-serif">
                Professional Summary
              </h2>
              <p className="text-[9.5px] text-slate-700 leading-relaxed mt-1.5 font-sans">
                ECE graduate (2026) and software developer with production experience: sole developer of a live e-commerce platform and
                maintainer of a second live platform, covering APIs, databases, payments, CI/CD and production support. Also built an AI
                capstone combining Raspberry Pi camera hardware, face recognition and an offline LLM assistant.
              </p>
            </div>

            {/* Education */}
            <div className="mt-3">
              <h2 className="text-[10px] font-bold text-slate-950 tracking-wider border-b border-slate-300 pb-0.5 uppercase font-serif">
                Education
              </h2>
              <div className="mt-1.5 flex justify-between items-start text-[9.5px]">
                <div>
                  <span className="font-bold text-slate-900">B.Tech, Electronics and Communication Engineering</span>
                  <p className="text-slate-600 text-[9px]">Dayananda Sagar University, Bengaluru, Karnataka</p>
                </div>
                <span className="font-mono text-slate-600">2026</span>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="mt-3">
              <h2 className="text-[10px] font-bold text-slate-950 tracking-wider border-b border-slate-300 pb-0.5 uppercase font-serif">
                Professional Experience
              </h2>
              <div className="mt-1.5 space-y-2 text-[9.5px]">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900">Full Stack Developer Intern</span>
                    <span className="font-mono text-slate-600 text-[9px]">Feb 2026 – Present</span>
                  </div>
                  <p className="text-slate-600 text-[9px] italic">PulseWriteX Solutions Pvt. Ltd.</p>
                  <ul className="list-disc list-outside pl-4 mt-1 space-y-1 text-slate-700 text-[9px] leading-relaxed">
                    <li>Sole developer of PulseX, a live ordering platform for PCB fabrication, 3D printing and laser cutting that replaced a fully offline process.</li>
                    <li>Built Node.js/Express REST APIs, a MySQL schema with Prisma, Google OAuth, Razorpay payments and a Gerber viewer with 0.1 mm accuracy.</li>
                    <li>Hardened Rizzo Education: PM2 cluster behind Nginx, versioned migrations, automated backups, rollback and gated GitHub Actions CI/CD.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="mt-3 flex-1">
              <h2 className="text-[10px] font-bold text-slate-950 tracking-wider border-b border-slate-300 pb-0.5 uppercase font-serif">
                Projects
              </h2>
              <div className="mt-1.5 space-y-3 text-[9.5px]">
                {/* Project 1 */}
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">PulseX – Engineering Services Platform</span>
                  </div>
                  <p className="text-[8px] text-slate-500 font-mono tracking-wide mt-0.5">React • TypeScript • Node.js • Express.js • MySQL • Prisma • Razorpay</p>
                  <ul className="list-disc list-outside pl-4 mt-1 space-y-1 text-[#222] text-[9px] leading-relaxed">
                    <li>Designed and developed a full-stack web platform that digitized quotation and order management for PCB manufacturing, 3D printing, laser cutting, and prototyping services.</li>
                    <li>Engineered the backend by designing REST APIs, relational database models, authentication, and secure payment workflows.</li>
                    <li>Built responsive user and administrative interfaces, integrating backend services.</li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">Rizzo Education – Production Systems Engineering</span>
                  </div>
                  <p className="text-[8px] text-slate-500 font-mono tracking-wide mt-0.5">Node.js • PostgreSQL • Prisma • Linux • Nginx • PM2 • GitHub Actions</p>
                  <ul className="list-disc list-outside pl-4 mt-1 space-y-1 text-[#222] text-[9px] leading-relaxed">
                    <li>Engineered production improvements for a live AI education platform by strengthening application security, improving backend reliability, and resolving critical issues.</li>
                    <li>Increased platform stability and scalability by redesigning workflows and supporting reliable operation.</li>
                    <li>Built a safer production release process through migrations, automated backups, and a gated CI/CD pipeline.</li>
                  </ul>
                </div>

                {/* Project 3 */}
                <div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">Omni Room Management System – AI Smart Classroom</span>
                  </div>
                  <p className="text-[8px] text-slate-500 font-mono tracking-wide mt-0.5">Python • OpenCV • Raspberry Pi • React • Node.js • Ollama • Computer Vision</p>
                  <ul className="list-disc list-outside pl-4 mt-1 space-y-1 text-[#222] text-[9px] leading-relaxed">
                    <li>Designed and developed a smart classroom platform by integrating embedded hardware, computer vision, and web technologies.</li>
                    <li>Engineered a real-time face recognition pipeline using Raspberry Pi, camera modules, and machine learning techniques.</li>
                    <li>Integrated a local LLM-powered learning assistant that transforms classroom audio into summaries and study aids.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mt-3 pt-2 border-t border-slate-200">
              <h2 className="text-[10px] font-bold text-slate-950 tracking-wider border-b border-slate-300 pb-0.5 uppercase font-serif">
                Technical Skills
              </h2>
              <div className="mt-1.5 space-y-1 text-[9px] leading-relaxed text-slate-700">
                <p><span className="font-semibold text-slate-900">Languages:</span> Python, JavaScript, TypeScript, SQL, Java, C</p>
                <p><span className="font-semibold text-slate-900">Frontend:</span> React, HTML5, CSS3</p>
                <p><span className="font-semibold text-slate-900">Backend:</span> Node.js, Express.js | <span className="font-semibold text-slate-900">Databases:</span> MySQL, PostgreSQL, Prisma ORM</p>
                <p><span className="font-semibold text-slate-900">Production Systems:</span> Linux, Nginx, PM2, Git, GitHub Actions</p>
                <p><span className="font-semibold text-slate-900">Computer Vision:</span> OpenCV, Ollama, Raspberry Pi</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL: Interactive Engineering Blueprint (Exploded View) */}
        <div className="w-full md:w-1/2 h-[55%] md:h-full p-4 md:p-6 flex flex-col overflow-hidden relative bg-[#020916]/40">
          <div className="absolute bottom-2 right-3 text-[8px] text-[#00f0ff]/35 font-mono">EXPLODED_LAYERS: STABLE</div>
          
          <div className="flex-1 border border-[#00f0ff]/15 bg-[#020a17]/95 p-4 md:p-5 rounded-sm relative flex flex-col overflow-hidden">
            {/* CAD Corner Brackets */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00f0ff]/40 pointer-events-none" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00f0ff]/40 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00f0ff]/40 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00f0ff]/40 pointer-events-none" />

            {/* Layout viewports inside blueprint workspace */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <AnimatePresence mode="wait">
                
                {/* STATE 1: Root Lab View (PulseX, Rizzo, Omni) */}
                {labState === 'LAB_ACTIVE' && (
                  <motion.div
                    key="lab-active"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="h-full flex flex-col justify-center items-center space-y-6"
                  >
                    <div className="text-center mb-2">
                      <h3 className="text-xs font-black tracking-widest text-[#00f0ff] uppercase">
                        CHIP_ARRAY: EXPLODED_PROJECTS_REGISTER
                      </h3>
                      <p className="text-[9px] text-white/50 tracking-wider mt-1 uppercase">
                        Select an engineering chip below to explode its architectural layers
                      </p>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          onClick={() => handleSelectProj(proj)}
                          className="relative p-4 border border-[#00f0ff]/35 bg-black/40 cursor-pointer hover:bg-[#00f0ff]/5 hover:border-[#00f0ff] transition-all group flex flex-col items-center justify-between text-center min-h-[140px] rounded-sm hover:shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                        >
                          {/* IC Chip Leg pins */}
                          <div className="absolute -left-[4px] top-4 bottom-4 flex flex-col justify-between w-1 h-3/4">
                            <span className="h-[2px] w-[5px] bg-[#00f0ff]/35" />
                            <span className="h-[2px] w-[5px] bg-[#00f0ff]/35" />
                            <span className="h-[2px] w-[5px] bg-[#00f0ff]/35" />
                          </div>
                          <div className="absolute -right-[4px] top-4 bottom-4 flex flex-col justify-between w-1 h-3/4">
                            <span className="h-[2px] w-[5px] bg-[#00f0ff]/35" />
                            <span className="h-[2px] w-[5px] bg-[#00f0ff]/35" />
                            <span className="h-[2px] w-[5px] bg-[#00f0ff]/35" />
                          </div>

                          <span className="text-[8px] text-[#00f0ff]/50 font-mono tracking-widest">
                            SYS.{proj.id.toUpperCase()}
                          </span>

                          <div className="my-2">
                            <h4 className="text-xs font-black text-white group-hover:text-[#00f0ff] uppercase tracking-wider leading-tight">
                              {proj.name.split(' ')[0]}
                            </h4>
                            <span className="text-[8px] text-[#ffad00] border border-[#ffad00]/30 px-1 py-0.2 rounded-sm inline-block mt-1">
                              {proj.activeVersion}
                            </span>
                          </div>

                          <span className="text-[9px] text-[#00f0ff]/70 tracking-widest font-bold">
                            [EXPLODE]
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STATE 2: Project Selected (Show Subsystems & Replay Action) */}
                {labState === 'PROJECT_FOCUS' && selectedProj && (
                  <motion.div
                    key="project-focus"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col overflow-hidden"
                  >
                    {/* Top focused project summary banner */}
                    <div className="flex justify-between items-center border-b border-[#00f0ff]/15 pb-2 mb-3">
                      <div>
                        <h3 className="text-xs font-bold text-white tracking-widest uppercase">
                          MODULE: {selectedProj.name}
                        </h3>
                        <span className="text-[9px] text-[#00f0ff]/65 font-mono">
                          STATUS: {selectedProj.status} | DEPLOYMENT: STABLE
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isReplaying ? (
                          <button
                            onClick={startReplay}
                            className="text-[9px] border border-[#ffad00]/50 hover:bg-[#ffad00]/10 text-[#ffad00] px-2 py-0.5 rounded-sm transition-all"
                          >
                            [LAUNCH REPLAY ⚡]
                          </button>
                        ) : (
                          <button
                            onClick={stopReplay}
                            className="text-[9px] border border-red-500/50 hover:bg-red-500/10 text-red-400 px-2 py-0.5 rounded-sm transition-all"
                          >
                            [EXIT REPLAY]
                          </button>
                        )}
                        <button
                          onClick={() => handleBreadcrumbClick('LAB_ACTIVE')}
                          className="text-[9px] border border-[#00f0ff]/25 px-2 py-0.5 rounded-sm hover:bg-[#00f0ff]/5 hover:text-white transition-all"
                        >
                          [BACK_TO_ROOT]
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center overflow-y-auto scrollbar-none pr-1">
                      {isReplaying && selectedProj.replay ? (
                        /* Replay Console View */
                        <div className="p-3 border border-[#ffad00]/30 bg-black/40 rounded-sm space-y-3">
                          <div className="flex items-center justify-between text-[8px] font-bold text-[#ffad00] tracking-widest uppercase border-b border-[#ffad00]/20 pb-1.5">
                            <span>REPLAY SIMULATOR // STAGE {replayStepIdx + 1} OF {selectedProj.replay.length}</span>
                            <span className="animate-pulse">● LIVE_FEED</span>
                          </div>

                          {selectedProj.replay[replayStepIdx] && (
                            <div className="space-y-2 text-left">
                              <h4 className="text-[11px] font-extrabold text-white uppercase tracking-wider">
                                {selectedProj.replay[replayStepIdx].stage}. {selectedProj.replay[replayStepIdx].title}
                              </h4>
                              <p className="text-[9px] text-white/80 leading-relaxed font-sans select-none">
                                {selectedProj.replay[replayStepIdx].description}
                              </p>
                              
                              <div className="grid grid-cols-2 gap-2 text-[8px] pt-1">
                                <div className="p-1.5 border border-[#00f0ff]/10 bg-[#00f0ff]/5">
                                  <span className="text-[#00f0ff] font-bold uppercase tracking-wider block mb-0.5">DECISION</span>
                                  <span className="text-white/70 leading-normal">{selectedProj.replay[replayStepIdx].decisions}</span>
                                </div>
                                <div className="p-1.5 border border-[#ffad00]/10 bg-[#ffad00]/5">
                                  <span className="text-[#ffad00] font-bold uppercase tracking-wider block mb-0.5">CHALLENGE</span>
                                  <span className="text-white/70 leading-normal">{selectedProj.replay[replayStepIdx].challenges}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Replay Controls Footer */}
                          <div className="flex items-center justify-between border-t border-[#ffad00]/20 pt-2.5">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setReplayStepIdx((p) => Math.max(0, p - 1))}
                                disabled={replayStepIdx === 0}
                                className="px-2 py-0.5 border border-[#ffad00]/20 hover:border-[#ffad00] text-[#ffad00] rounded-sm disabled:opacity-30 text-[8px]"
                              >
                                ◀ BACK
                              </button>
                              <button
                                onClick={() => setReplayPlaying(!replayPlaying)}
                                className="px-2.5 py-0.5 bg-[#ffad00] text-black font-bold rounded-sm hover:opacity-90 text-[8px]"
                              >
                                {replayPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                              </button>
                              <button
                                onClick={() => setReplayStepIdx((p) => Math.min(selectedProj.replay.length - 1, p + 1))}
                                disabled={replayStepIdx === selectedProj.replay.length - 1}
                                className="px-2 py-0.5 border border-[#ffad00]/20 hover:border-[#ffad00] text-[#ffad00] rounded-sm disabled:opacity-30 text-[8px]"
                              >
                                NEXT ▶
                              </button>
                            </div>
                            <span className="text-[8px] text-[#ffad00]/60">TIMESTEP: 3.5S</span>
                          </div>
                        </div>
                      ) : (
                        /* Standard Subsystems View */
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {selectedProj.spec.subsystems.map((sub, idx) => (
                            <div
                              key={sub.id || idx}
                              onClick={() => handleSelectSub(sub)}
                              className="p-3 border border-[#00f0ff]/25 bg-black/35 hover:bg-[#00f0ff]/5 hover:border-[#00f0ff] cursor-pointer rounded-sm flex flex-col justify-between group transition-all min-h-[90px] relative hover:shadow-[0_0_8px_rgba(0,240,255,0.1)] animate-reveal"
                            >
                              <div className="absolute top-0 right-1 text-[7px] text-[#00f0ff]/30 font-mono">
                                IC-0{idx + 1}
                              </div>
                              <h4 className="text-[10px] font-bold text-white group-hover:text-[#00f0ff] uppercase tracking-wider leading-tight">
                                {sub.name}
                              </h4>
                              <p className="text-[8px] text-white/50 leading-normal line-clamp-2 mt-1 select-none">
                                {sub.function}
                              </p>
                              <span className="text-[8px] text-[#ffad00]/80 tracking-widest font-black uppercase mt-2 block">
                                [INSPECT]
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STATE 3: Subsystem Selected (Show Tech Modules & Specifications) */}
                {labState === 'SUBSYSTEM_FOCUS' && selectedProj && selectedSub && (
                  <motion.div
                    key="subsystem-focus"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="h-full flex flex-col justify-between overflow-hidden"
                  >
                    {/* Header back navigation */}
                    <div className="flex justify-between items-center border-b border-[#00f0ff]/15 pb-2 mb-3">
                      <div>
                        <span className="text-[8px] text-[#00f0ff]/50 block font-bold">SUBSYSTEM_INSPECTION</span>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{selectedSub.name}</h4>
                      </div>
                      <button
                        onClick={() => handleBreadcrumbClick('PROJECT_FOCUS')}
                        className="text-[9px] border border-[#00f0ff]/25 px-2 py-0.5 rounded-sm hover:bg-[#00f0ff]/5 hover:text-white transition-all"
                      >
                        [BACK_TO_SCHEMATIC]
                      </button>
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden mb-3">
                      {/* Left: Expanded Tech Modules */}
                      <div className="flex-1 flex flex-col justify-center space-y-2.5">
                        <span className="text-[8px] text-[#00f0ff]/50 tracking-widest font-bold block uppercase mb-1">
                          TECHNOLOGY_STACK
                        </span>

                        <div className="space-y-2">
                          {selectedSub.technologies.map((t) => (
                            <div
                              key={t}
                              className="p-2 border border-[#00f0ff]/25 bg-black/40 hover:border-[#00f0ff] rounded-sm flex items-center justify-between group transition-all"
                            >
                              <div className="flex items-center gap-2">
                                <div className="p-1 bg-[#00f0ff]/5 border border-[#00f0ff]/20 rounded-sm">
                                  {getTechIcon(t)}
                                </div>
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider">{t}</span>
                              </div>
                              <span className="text-[8px] text-[#00f0ff]/35 font-mono">STATUS: OK</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Technical Spec Specs Box */}
                      <div className="flex-1 border border-[#00f0ff]/15 bg-black/35 p-3 rounded-sm flex flex-col overflow-y-auto space-y-3 scrollbar-thin">
                        <div>
                          <span className="text-[8px] text-[#00f0ff]/55 block font-bold uppercase tracking-widest">
                            FUNCTION_REGISTRY
                          </span>
                          <p className="text-[9px] text-white/80 leading-relaxed mt-0.5">{selectedSub.function}</p>
                        </div>

                        {selectedProj.spec.challenges && (
                          <div className="border-t border-[#00f0ff]/10 pt-2">
                            <span className="text-[8px] text-[#ffad00]/80 block font-bold uppercase tracking-widest">
                              ENGINEERING_CHALLENGE
                            </span>
                            <p className="text-[9px] text-white/80 leading-relaxed mt-0.5">
                              {selectedProj.spec.challenges}
                            </p>
                          </div>
                        )}

                        {selectedProj.spec.engineeringDecisions && (
                          <div className="border-t border-[#00f0ff]/10 pt-2">
                            <span className="text-[8px] text-[#00f0ff] block font-bold uppercase tracking-widest">
                              ARCHITECTURAL_DECISION
                            </span>
                            <p className="text-[9px] text-white/80 leading-relaxed mt-0.5">
                              {selectedProj.spec.engineeringDecisions}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom: Interview QA Section */}
                    {selectedProj.spec.interviewQuestions && selectedProj.spec.interviewQuestions[0] && (
                      <div className="border-t border-[#00f0ff]/15 pt-2 text-[9px] bg-black/20 p-2 rounded-sm animate-pulse-slow">
                        <span className="text-[7.5px] text-[#ffad00]/80 block font-black uppercase tracking-widest mb-0.5">
                          SYSTEM_DEEP_DIVE_Q&A
                        </span>
                        <div className="leading-snug">
                          <span className="text-[#00f0ff] font-bold">Q: </span>
                          <span className="text-white/90">{selectedProj.spec.interviewQuestions[0].q}</span>
                        </div>
                        <div className="leading-snug mt-1">
                          <span className="text-emerald-400 font-bold">A: </span>
                          <span className="text-white/70">{selectedProj.spec.interviewQuestions[0].a}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
