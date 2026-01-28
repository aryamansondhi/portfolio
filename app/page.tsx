"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  ArrowUpRight, 
  TrendingUp,
  Scan, 
  Briefcase,
  X,
  Factory,
  Music,
  Headphones,
  Server,
  Linkedin,
  Github,
  Mail,
  FileText,
  Globe
} from "lucide-react";

// --- OPTIMIZED AUDIO ENGINE ---
const useAudio = () => {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({
    click: null,
    hover: null,
    boot: null
  });

  useEffect(() => {
    // Only run on client
    if (typeof window !== "undefined") {
      audioRefs.current.click = new Audio("/sounds/click.mp3");
      audioRefs.current.hover = new Audio("/sounds/hover.mp3");
      audioRefs.current.boot = new Audio("/sounds/boot.mp3");
      
      if (audioRefs.current.hover) audioRefs.current.hover.volume = 0.05;
      if (audioRefs.current.click) audioRefs.current.click.volume = 0.2;
      if (audioRefs.current.boot) audioRefs.current.boot.volume = 0.2;
    }
  }, []);

  const play = useCallback((type: "click" | "hover" | "boot") => {
    const sound = audioRefs.current[type];
    if (sound) {
      sound.currentTime = 0; 
      sound.play().catch(() => { /* Ignore auto-play blocks */ });
    }
  }, []);

  return play;
};

// --- DATA LAYER ---
const PORTFOLIO_DATA = {
  "identity": {
    title: "Aryaman Sondhi",
    subtitle: "The Closer | Backend & Systems Engineer",
    tags: ["TechMahindra", "AT&T NISE-Core", "C++", "PL/SQL", "Oracle"],
    media: null,
    description: (
      <div className="space-y-4 text-slate-300 font-sans">
        <p className="leading-relaxed">
          I graduated from Penn State in 2024 and jumped straight into the deep end of backend engineering. Right now, I work at TechMahindra on AT&T’s NISE-Core platform. It is a massive legacy system that handles critical telecom inventory, so accuracy is everything.
        </p>
        <p className="leading-relaxed">
          My day-to-day involves digging into complex requirements and turning them into production-ready C++ and PL/SQL code. I specialize in the parts of the system where the documentation is thin and the logic is heavy.
        </p>
        <div className="border-t border-white/10 pt-4 mt-4">
          <h4 className="text-white font-bold mb-2">The Arsenal (Tech Stack)</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
             <div><span className="text-blue-400">Languages:</span> C++, Python, PL/SQL, Java</div>
             <div><span className="text-blue-400">Infra:</span> AWS, Unix/Linux, Git</div>
             <div><span className="text-blue-400">Data:</span> Oracle, MySQL, ChromaDB</div>
             <div><span className="text-blue-400">Tools:</span> TOSCA, Power Automate</div>
          </div>
        </div>
      </div>
    )
  },
  "donna": {
    title: "Project Donna",
    subtitle: "Desktop AI Operating System",
    tags: ["Python", "Groq LPU", "ChromaDB", "ElevenLabs", "Computer Vision"],
    media: "/donna_demo.gif", 
    description: (
      <div className="space-y-4 text-slate-300">
        <p>
          Donna is basically my attempt to build a real-life Jarvis. Standard chatbots felt too disconnected from my actual workflow, so I built a desktop-native AI that has system-level control.
        </p>
        <p>
          She runs on the Groq LPU which makes her responses instant. I hooked her up to a local ChromaDB vector database so she actually remembers context from weeks ago.
        </p>
        <div className="border-t border-white/10 pt-4 mt-4">
          <h4 className="text-white font-bold mb-2">Under The Hood:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li><strong>Vision Modality:</strong> She watches my screen via PyAutoGUI and analyzes it.</li>
            <li><strong>System Control:</strong> She can open Spotify, change volume, or launch VS Code.</li>
            <li><strong>Persona:</strong> I hardcoded her to be sharp and witty (Suits style).</li>
          </ul>
        </div>
        <div className="bg-black/30 p-3 rounded-lg border border-white/10 font-mono text-[10px] text-green-400 mt-2 overflow-x-auto">
          <span className="text-purple-400">def</span> <span className="text-yellow-400">run_vision_thread</span>(self, user_query):<br/>
          &nbsp;&nbsp;base64_image = mac.capture_screen()<br/>
          &nbsp;&nbsp;completion = groq_client.chat.completions.create(<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;model=<span className="text-green-300">"meta-llama/llama-4-scout..."</span>,<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;messages=[{"{"}<span className="text-green-300">"image_url"</span>: base64_image{"}"}]<br/>
          &nbsp;&nbsp;)
        </div>
      </div>
    )
  },
  "signallab": {
    title: "SignalLab",
    subtitle: "Tactical Risk Analytics Engine",
    tags: ["Python", "Streamlit", "Quant Finance", "Pandas", "Backtesting"],
    media: "/signallab_demo.gif", 
    description: (
      <div className="space-y-4 text-slate-300">
        <p>
          I wanted to see if I could mathematically beat "Buy & Hold" without taking on insane risk, so I built SignalLab. It is a quantitative dashboard that tests "Tactical Risk-Off" strategies against the S&P 500.
        </p>
        <p>
          The core logic monitors price deviations against long-term moving averages. When the market gets overheated (or crashes), the system signals a move to cash.
        </p>
        <div className="border-t border-white/10 pt-4 mt-4">
          <h4 className="text-white font-bold mb-2">Key Engineering:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li><strong>Vectorized Backtesting:</strong> Zero for-loops; uses rolling windows for speed.</li>
            <li><strong>Parameter Sweep:</strong> Runs a grid search to prove the strategy isn't just overfitting.</li>
            <li><strong>Tech Stack:</strong> Streamlit, YFinance API, Matplotlib, NumPy.</li>
          </ul>
        </div>
        <div className="bg-black/30 p-3 rounded-lg border border-white/10 font-mono text-[10px] text-green-400 mt-2 overflow-x-auto">
          <span className="text-slate-500"># Vectorized "Risk Off" Mask</span><br/>
          is_risk_off = (<br/>
          &nbsp;&nbsp;sig.rolling(window=cooldown, min_periods=1)<br/>
          &nbsp;&nbsp;.max().shift(1).fillna(0).astype(<span className="text-purple-400">bool</span>)<br/>
          )
        </div>
      </div>
    )
  },
  "posture": {
    title: "Posture Guard",
    subtitle: "AI Computer Vision Coach",
    tags: ["OpenCV", "MediaPipe", "Vector Math", "IoT"],
    media: "/posture_demo.gif", 
    description: (
      <div className="space-y-4 text-slate-300">
        <p>
          I call this "Iron Therapy" for developers. My back was killing me during long coding sessions, so instead of buying a better chair, I wrote code to fix my spine.
        </p>
        <p>
          It isn't just a motion detector. It uses Google's <strong>MediaPipe</strong> to map 33 skeletal landmarks on my body in real-time. I use NumPy to calculate the precise vector angle between my ear and shoulder.
        </p>
        <div className="border-t border-white/10 pt-4 mt-4">
          <h4 className="text-white font-bold mb-2">Technical Implementation:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li><strong>Trigonometry:</strong> Uses <code>arctan2</code> to compute spinal inclination vectors.</li>
            <li><strong>Calibration Mode:</strong> CLI tool to adjust thresholds based on whether I'm facing Left or Right.</li>
            <li><strong>Optimization:</strong> Runs at 30+ FPS on CPU by optimizing frame processing.</li>
          </ul>
        </div>
        <div className="bg-black/30 p-3 rounded-lg border border-white/10 font-mono text-[10px] text-green-400 mt-2 overflow-x-auto">
          <span className="text-purple-400">if</span> angle {">"} 105:<br/>
          &nbsp;&nbsp;status = <span className="text-red-400">"SLOUCHING!"</span> <span className="text-slate-500"># Red Alert</span>
        </div>
      </div>
    )
  },
  "techm": {
    title: "Tech Mahindra",
    subtitle: "Associate Software Engineer (AT&T NISE-Core)",
    tags: ["Legacy Modernization", "C++", "PL/SQL", "Telecom Infra"],
    media: null,
    description: (
      <div className="space-y-4 text-slate-300">
        <p>
          <strong>The Mission:</strong> Maintaining the nervous system of AT&T's network inventory. NISE-Core is a high-availability legacy platform that cannot fail.
        </p>
        <p>
          I own end-to-end user stories. This means analyzing 15-year-old codebases, writing optimized C++ patches, and crafting complex PL/SQL queries to ensure data integrity across millions of records.
        </p>
        <div className="bg-slate-900/50 p-4 rounded-lg border border-white/5 mt-4">
           <h4 className="text-white font-bold text-sm mb-2">Key Wins:</h4>
           <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
             <li>Delivered critical patches for User Story <strong>Royal-5317</strong>.</li>
             <li>Optimized SQL queries reducing fetch time by ~15% for inventory reports.</li>
             <li>Bridged the gap between legacy logic and modern requirement docs.</li>
           </ul>
        </div>
      </div>
    )
  },
  "cummins": {
    title: "Cummins Inc.",
    subtitle: "Software Engineer I Intern (DevOps)",
    tags: ["PowerApps", "TOSCA", "qTest", "Automation", "DevOps"],
    media: null,
    description: (
      <div className="space-y-4 text-slate-300">
        <p>
          During my time at Cummins, I focused on <strong>optimizing workflows</strong>. I realized that Project Managers were wasting hours on manual tracking, so I engineered a PowerApps-based solution to fix it.
        </p>
        <div className="border-t border-white/10 pt-4 mt-4">
          <h4 className="text-white font-bold mb-2">Impact Delivered:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
            <li><strong>25% Reduction</strong> in interaction overhead for Project Managers.</li>
            <li><strong>Automated Pipelines:</strong> Replaced manual email follow-ups with automated triggers.</li>
            <li><strong>QA Automation:</strong> Optimized TOSCA test suites for reliable releases.</li>
          </ul>
        </div>
      </div>
    )
  },
  "pennstate": {
    title: "Penn State University",
    subtitle: "B.Sc. Computer Science (2020 - 2024)",
    tags: ["Systems Programming", "OS", "Machine Learning", "Data Structures"],
    media: null, 
    description: (
      <div className="space-y-4 text-slate-300">
        <p>
          My time at Penn State wasn't just about grades; it was about mastering the fundamentals of computing. I focused heavily on <strong>Systems Programming</strong> and <strong>Operating Systems</strong>, which gave me the confidence to work on the legacy C++ architectures I handle today.
        </p>
        <div className="border-t border-white/10 pt-3 mt-3">
           <h4 className="text-white font-bold text-sm mb-1">Key Coursework:</h4>
           <p className="text-xs text-slate-400">
             Data Structures & Algorithms • Operating Systems • Systems Programming • Machine Learning
           </p>
        </div>
      </div>
    )
  },
  "mufc": {
    title: "Manchester United",
    subtitle: "Red Devil Since 2012",
    tags: ["Old Trafford", "Premier League", "Theatre of Dreams"],
    media: null,
    description: (
      <div className="space-y-4 text-slate-300">
        <div>
            <h4 className="text-white font-bold mb-1">The Origin</h4>
            <p className="text-sm text-slate-400">
              I started properly watching during <strong>Robin van Persie's PL win season (2012/13)</strong>. It was the perfect introduction—Sir Alex's final bow, title number 20, and pure dominance.
            </p>
        </div>
        <div className="mt-4">
            <h4 className="text-white font-bold mb-1">The Icon</h4>
            <p className="text-sm text-slate-400">
              While RVP was the spark, <strong>Wayne Rooney</strong> is the soul. To me, a Red Manchester United will always be associated with him—the grit, the range, and the passion.
            </p>
        </div>
        <div className="mt-4">
            <h4 className="text-white font-bold mb-1">The Memory</h4>
            <p className="text-sm text-slate-400">
              <strong>Paris, 2019.</strong> The comeback against PSG. Rashford's penalty in the dying moments. That game proved that no matter the squad or the odds, this club never dies.
            </p>
        </div>
      </div>
    )
  }
};

const Typewriter = ({ text, speed = 50, startDelay = 0 }: { text: string, speed?: number, startDelay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 1; 
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
      }
      i++;
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return <span>{displayText}</span>;
};

// --- BOOT SEQUENCE ---
const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const playSfx = useAudio();

  useEffect(() => {
    playSfx("boot");
    const steps = [
      { delay: 500, action: () => setStep(1) },
      { delay: 1500, action: () => setStep(2) },
      { delay: 2500, action: () => setStep(3) },
      { delay: 3500, action: onComplete }
    ];
    let timeouts: NodeJS.Timeout[] = [];
    steps.forEach((s) => timeouts.push(setTimeout(s.action, s.delay)));
    return () => timeouts.forEach(clearTimeout);
  }, [playSfx, onComplete]);

  return (
    <div className="fixed inset-0 bg-slate-950 z-100 flex items-center justify-center font-mono text-green-500 text-sm md:text-base p-8">
      <div className="max-w-xl w-full space-y-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between border-b border-green-900 pb-2 mb-4">
           <span>ARYAMAN.OS [Version 3.2.0]</span>
           <span>SECURE BOOT</span>
        </motion.div>
        <div className="space-y-1">
          {step >= 0 && <p>{">"} INITIALIZING KERNEL...</p>}
          {step >= 1 && (
            <>
              <p>{">"} LOADING ASSETS...</p>
              <p className="text-slate-500 ml-4">Loading donna_core.py... [OK]</p>
              <p className="text-slate-500 ml-4">Loading signallab_engine... [OK]</p>
            </>
          )}
          {step >= 2 && <p>{">"} ESTABLISHING SECURE CONNECTION...</p>}
          {step >= 3 && <p className="animate-pulse">{">"} SYSTEM READY. WELCOME BACK.</p>}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [booting, setBooting] = useState(true);
  const selectedItem = activeCard ? PORTFOLIO_DATA[activeCard as keyof typeof PORTFOLIO_DATA] : null;
  const playSfx = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  // --- OPTIMIZED SPOTLIGHT LOGIC (rAF) ---
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    frameRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const { left, top } = containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    });
  }, []);

  return (
    <>
      <AnimatePresence>
        {booting && (
          <motion.div exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <BootScreen onComplete={() => setBooting(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <main 
        className="min-h-screen p-4 md:p-12 pb-32 flex items-center justify-center overflow-hidden relative"
        onMouseMove={handleMouseMove}
        ref={containerRef}
      >
        
        {/* === ANIMATED BACKGROUND (GPU ACCELERATED) === */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
          <motion.div 
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-20 will-change-transform"
            style={{ 
              backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', 
              backgroundSize: '32px 32px' 
            }}
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2], x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-200 h-200 bg-blue-900/30 rounded-full blur-[100px] will-change-transform"
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1], x: [0, -50, 0], y: [0, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-20%] right-[-10%] w-150 h-150 bg-emerald-900/20 rounded-full blur-[80px] will-change-transform"
          />
        </div>

        {/* MAIN GRID - FIXED HEIGHT WARNING */}
        {!booting && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 w-full max-w-6xl h-full md:h-187.5 relative z-10"
          >
            
            {/* TILE 1: IDENTITY */}
            <PortfolioCard 
              onClick={() => { setActiveCard("identity"); playSfx("click"); }}
              onHover={() => playSfx("hover")}
              className="md:col-span-2 md:row-span-2 border border-white/5 hover:border-blue-500/30"
            >
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-slate-400 font-mono tracking-wider">ONLINE</span>
                  <span className="text-[10px] text-emerald-500 font-bold tracking-tight">DELHI, INDIA</span>
                </div>
              </div>

              <div className="absolute top-6 left-6 w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl z-20">
                 <img src="/me.jpg" alt="Aryaman" className="object-cover w-full h-full" />
              </div>

              <div className="z-10 mt-28"> 
                {/* FIXED: GRADIENT SYNTAX */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white to-slate-500">
                  Aryaman<br/>Sondhi
                </h1>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full border border-blue-900/50 bg-blue-900/20 text-xs text-blue-300 font-mono">Backend Engineer</span>
                  <span className="px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-xs text-slate-300 font-mono">Financial Engineer</span>
                </div>
              </div>
              
              <div className="z-10 flex flex-col gap-2 mt-8">
                 <div className="flex items-center gap-2 text-slate-400">
                   <Briefcase size={16} className="text-purple-400" />
                   <span className="text-sm font-medium">TechMahindra (AT&T NISE-Core)</span>
                 </div>
                 <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                   <Globe size={14} />
                   <span>United Arab Emirates → Russia → India</span>
                 </div>
              </div>
            </PortfolioCard>

            {/* TILE 2: DONNA */}
            <PortfolioCard 
              onClick={() => { setActiveCard("donna"); playSfx("click"); }}
              onHover={() => playSfx("hover")}
              className="md:col-span-2 font-mono text-xs md:text-sm text-slate-300 hover:border-green-500/30"
            >
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex items-center gap-2 mb-4 text-slate-500 border-b border-white/10 pb-2">
                <Terminal size={14} />
                <span>donna_env — zsh</span>
              </div>
              <div className="space-y-2 opacity-90 h-full">
                <p className="flex items-center gap-2">
                    <span className="text-green-400">➜</span> 
                    <span className="text-blue-400">~</span> 
                    <Typewriter text="python donna_gui.py" speed={30} startDelay={1000} />
                </p>
                <p className="text-slate-500">
                   <Typewriter text="Initializing Llama-4-Scout model..." speed={20} startDelay={2000} />
                </p>
                <p className="text-slate-500">
                   <span className="text-green-400"><Typewriter text="Vision Processor: Active" speed={20} startDelay={3000} /></span>
                </p>
              </div>
              <div className="absolute top-6 right-6 px-2 py-1 bg-white/10 rounded text-[10px] text-slate-400 tracking-widest border border-white/5">PROJECT DONNA</div>
            </PortfolioCard>

            {/* TILE 3: SIGNAL LAB */}
            <PortfolioCard 
               onClick={() => { setActiveCard("signallab"); playSfx("click"); }}
               onHover={() => playSfx("hover")}
               className="hover:bg-emerald-900/10 hover:border-emerald-500/30"
            >
               <div className="flex justify-between items-start">
                 <TrendingUp size={24} className="text-emerald-400" />
               </div>
               <div>
                 <h3 className="text-lg font-bold text-white">SignalLab</h3>
                 <p className="text-xs text-emerald-400/80 mt-1">Wealth Analytics</p>
               </div>
            </PortfolioCard>

            {/* TILE 4: POSTURE GUARD */}
            <PortfolioCard 
               onClick={() => { setActiveCard("posture"); playSfx("click"); }}
               onHover={() => playSfx("hover")}
               className="hover:bg-white/5 hover:border-blue-400/30"
            >
               <Scan size={24} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
               <div>
                 <h3 className="text-lg font-bold text-white">Posture Guard</h3>
                 <p className="text-xs text-slate-500 mt-1">Computer Vision</p>
               </div>
            </PortfolioCard>

            {/* TILE 5: TECHM */}
            <PortfolioCard 
               onClick={() => { setActiveCard("techm"); playSfx("click"); }}
               onHover={() => playSfx("hover")}
               className="hover:bg-blue-900/10 hover:border-blue-500/30"
            >
              <div className="flex justify-between items-start">
                 <Server size={24} className="text-blue-400" />
                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Tech Mahindra</h3>
                <p className="text-xs text-blue-300/80 mt-1">AT&T NISE-Core</p>
              </div>
            </PortfolioCard>

            {/* TILE 6: CUMMINS */}
            <PortfolioCard 
               onClick={() => { setActiveCard("cummins"); playSfx("click"); }}
               onHover={() => playSfx("hover")}
               className="hover:bg-white/5 hover:border-red-500/30"
            >
              <div className="flex justify-between items-start">
                 <Factory size={24} className="text-red-500" />
                 <div className="w-2 h-2 bg-red-500 rounded-full" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Cummins</h3>
                <p className="text-xs text-slate-500 mt-1">DevOps & Automation</p>
              </div>
            </PortfolioCard>

            {/* TILE 7: PENN STATE */}
            <PortfolioCard 
               onClick={() => { setActiveCard("pennstate"); playSfx("click"); }}
               onHover={() => playSfx("hover")}
               className="hover:bg-white/5"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-blue-900/30 rounded-full border border-blue-500/20 text-blue-400">
                   <ArrowUpRight size={20} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">Penn State</h3>
                <p className="text-slate-400 text-xs mt-1">Class of 2024</p>
              </div>
            </PortfolioCard>

            {/* TILE 8: MUFC */}
            <PortfolioCard 
               onClick={() => { setActiveCard("mufc"); playSfx("click"); }}
               onHover={() => playSfx("hover")}
               className="flex items-center justify-center hover:border-red-600/30"
            >
              {/* FIXED: GRADIENT SYNTAX */}
              <div className="absolute inset-0 bg-linear-to-br from-red-900/20 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="text-4xl font-black text-red-600/80 z-10 group-hover:scale-110 transition-transform duration-300">MUFC</span>
            </PortfolioCard>

          </motion.div>
        )}

        {/* --- THE DOCK --- */}
        {!booting && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-card px-6 py-3 rounded-full flex items-center gap-6 z-50 border border-white/10"
          >
            <DockIcon icon={<Linkedin size={20} />} label="LinkedIn" href="https://www.linkedin.com/in/aryaman-sondhi/" playSfx={playSfx} />
            <DockIcon icon={<Github size={20} />} label="GitHub" href="https://github.com/aryamansondhi" playSfx={playSfx} />
            <DockIcon icon={<Mail size={20} />} label="Email" href="mailto:aryamanpsu@gmail.com" playSfx={playSfx} />
            <DockIcon icon={<Music size={20} />} label="Apple Music" href="https://music.apple.com/profile/aryamansondhi" playSfx={playSfx} />
            <DockIcon icon={<Headphones size={20} />} label="Spotify" href="https://open.spotify.com/user/31dfokarhdku4gkn7ndbeq5j2c3e?si=T6E49UstTt-9U2_igerKbg" playSfx={playSfx} />
            <div className="w-px h-6 bg-slate-700 mx-2" /> 
            <DockIcon icon={<FileText size={20} />} label="Resume" href="/resume.pdf" isDownload={true} playSfx={playSfx} />
          </motion.div>
        )}

        {/* --- THE MODAL --- */}
        <AnimatePresence>
          {selectedItem && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveCard(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-0 m-auto w-[90%] md:w-150 h-fit max-h-[80vh] bg-[#0f172a] border border-slate-700 rounded-3xl p-8 z-70 shadow-2xl overflow-y-auto"
              >
                <button 
                  onClick={() => { setActiveCard(null); playSfx("click"); }}
                  className="absolute top-6 right-6 p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>

                <div className="mt-2">
                  <span className="text-xs font-mono text-blue-400 mb-2 block uppercase tracking-widest">
                    {selectedItem.subtitle}
                  </span>
                  <h2 className="text-3xl font-bold text-white mb-6">
                    {selectedItem.title}
                  </h2>
                  
                  {selectedItem.tags && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {selectedItem.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {selectedItem.media && (
                      <div className="mb-6 rounded-xl overflow-hidden border border-white/10 bg-black/20">
                          {/* FIXED: Fallback || "" ensures TypeScript knows it's a string */}
                          <img 
                              src={selectedItem.media || ""} 
                              alt="Project Demo" 
                              className="w-full h-auto object-cover opacity-90"
                          />
                      </div>
                  )}

                  <div className="text-slate-300 leading-relaxed font-sans">
                    {selectedItem.description}
                  </div>

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </main>
    </>
  );
}

function PortfolioCard({ children, onClick, onHover, className }: { children: React.ReactNode, onClick: () => void, onHover: () => void, className?: string }) {
  return (
    <motion.div 
      onClick={onClick}
      onMouseEnter={onHover}
      className={`glass-card rounded-3xl p-6 flex flex-col justify-between group relative overflow-hidden cursor-pointer border border-white/5 transition-colors ${className}`}
      style={{
        background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
      }}
    >
      {children}
    </motion.div>
  );
}

function DockIcon({ icon, label, href, isDownload = false, playSfx }: { icon: any, label: string, href: string, isDownload?: boolean, playSfx: any }) {
  return (
    <a 
      href={href} 
      target={isDownload ? "_self" : "_blank"} 
      rel="noopener noreferrer"
      download={isDownload ? "Aryaman_Sondhi_Resume.pdf" : undefined}
      onClick={() => playSfx("click")}
      onMouseEnter={() => playSfx("hover")}
    >
      <motion.div 
        whileHover={{ scale: 1.2, y: -5 }}
        className="text-slate-400 hover:text-white cursor-pointer transition-colors relative group"
      >
        {icon}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700 pointer-events-none">
          {label}
        </span>
      </motion.div>
    </a>
  );
}