"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  ArrowUpRight, 
  Cpu, 
  Globe,
  Github,
  Linkedin,
  Mail,
  FileText,
  TrendingUp,
  Scan, 
  Briefcase,
  X,
  Factory,
  Music,
  Headphones
} from "lucide-react";

// --- DATA LAYER ---
const PORTFOLIO_DATA = {
  "identity": {
    title: "Aryaman Sondhi",
    subtitle: "The Closer | Backend & Systems Engineer",
    tags: ["TechMahindra", "AT&T NISE-Core", "C++", "PL/SQL", "Oracle"],
    description: (
      <div className="space-y-4 text-slate-300 font-sans">
        <p className="leading-relaxed">
          I graduated from Penn State in 2024 and jumped straight into the deep end of backend engineering. Right now, I work at TechMahindra on AT&T’s NISE-Core platform. It is a massive legacy system that handles critical telecom inventory, so accuracy is everything.
        </p>
        <p className="leading-relaxed">
          My day-to-day involves digging into complex requirements and turning them into production-ready C++ and PL/SQL code. I specialize in the parts of the system where the documentation is thin and the logic is heavy. I like figuring out how to make old, rigid systems do new, flexible things without breaking them.
        </p>
        <div className="border-t border-white/10 pt-4 mt-4">
          <h4 className="text-white font-bold mb-2">The Builder's Mindset</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
             Outside of enterprise architecture, I ship projects: <strong>SignalLab</strong> (FinTech), <strong>Donna</strong> (AI), and <strong>Posture Guard</strong> (HealthTech).
          </p>
        </div>
      </div>
    )
  },
  "donna": {
    title: "Project Donna",
    subtitle: "Desktop AI Operating System",
    tags: ["Python", "Groq LPU", "ChromaDB", "ElevenLabs", "Computer Vision"],
    description: (
      <div className="space-y-4 text-slate-300">
        <p>
          Donna is basically my attempt to build a real-life Jarvis. Standard chatbots felt too disconnected from my actual workflow, so I built a desktop-native AI that has system-level control.
        </p>
        <p>
          She runs on the Groq LPU which makes her responses instant. I hooked her up to a local ChromaDB vector database so she actually remembers context from weeks ago. The coolest part is her vision. She uses local Llama models to take screenshots of what I am working on and give me feedback in real time.
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
          &nbsp;&nbsp;&nbsp;&nbsp;messages=[&#123;<span className="text-green-300">"image_url"</span>: base64_image&#125;]<br/>
          &nbsp;&nbsp;)
        </div>
      </div>
    )
  },
  "cummins": {
    title: "Cummins Inc.",
    subtitle: "Software Engineer I Intern (DevOps)",
    tags: ["PowerApps", "TOSCA", "qTest", "Automation", "DevOps"],
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
    description: (
      <div className="space-y-4 text-slate-300">
        <p>
          My time at Penn State wasn't just about grades; it was about mastering the fundamentals of computing. I focused heavily on <strong>Systems Programming</strong> and <strong>Operating Systems</strong>, which gave me the confidence to work on the legacy C++ architectures I handle today.
        </p>
        <p>
          I also dove into <strong>Machine Learning</strong> early, which laid the groundwork for projects like Donna and SignalLab.
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
  "arsenal": {
    title: "The Arsenal",
    subtitle: "Technical Stack & Tools",
    tags: ["Full Stack", "DevOps", "Data Science", "Cloud"],
    description: (
      <div className="space-y-4 text-slate-300">
        <p>
          I don't just write code; I build ecosystems. My stack spans from low-level systems programming to modern AI integration.
        </p>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <h4 className="text-white font-bold text-sm mb-1">Core</h4>
                <p className="text-xs text-slate-400">Python, C++, Java, JavaScript</p>
            </div>
            <div>
                <h4 className="text-white font-bold text-sm mb-1">Backend & DB</h4>
                <p className="text-xs text-slate-400">PL/SQL, Pro*C, Oracle, MySQL</p>
            </div>
            <div>
                <h4 className="text-white font-bold text-sm mb-1">Cloud & Ops</h4>
                <p className="text-xs text-slate-400">AWS, Azure, UNIX/Linux, Git</p>
            </div>
            <div>
                <h4 className="text-white font-bold text-sm mb-1">Automation</h4>
                <p className="text-xs text-slate-400">TOSCA, qTest, Power Automate</p>
            </div>
        </div>
      </div>
    )
  },
  "signallab": {
    title: "SignalLab",
    subtitle: "Tactical Risk Analytics Engine",
    tags: ["Python", "Streamlit", "Quant Finance", "Pandas", "Backtesting"],
    description: (
      <div className="space-y-4 text-slate-300">
        <p>
          I wanted to see if I could mathematically beat "Buy & Hold" without taking on insane risk, so I built SignalLab. It is a quantitative dashboard that tests "Tactical Risk-Off" strategies against the S&P 500.
        </p>
        <p>
          The core logic monitors price deviations against long-term moving averages. When the market gets overheated (or crashes), the system signals a move to cash. I built the backtesting engine from scratch using vectorized Pandas operations—no pre-built libraries—to calculate Sharpe Ratios and Drawdowns in milliseconds.
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
    description: (
      <div className="space-y-4 text-slate-300">
        <p>
          I call this "Iron Therapy" for developers. My back was killing me during long coding sessions, so instead of buying a better chair, I wrote code to fix my spine.
        </p>
        <p>
          It isn't just a motion detector. It uses Google's <strong>MediaPipe</strong> to map 33 skeletal landmarks on my body in real-time. I use NumPy to calculate the precise vector angle between my ear and shoulder. If that angle deviates by more than 15 degrees from the vertical axis, the system flags it as "Forward Head Posture" and alerts me.
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
          <span className="text-slate-500"># Calculate inclination via Vector Math</span><br/>
          radians = np.<span className="text-yellow-400">arctan2</span>(b[1] - a[1], b[0] - a[0])<br/>
          angle = np.abs(radians * 180.0 / np.pi)<br/>
          <br/>
          <span className="text-purple-400">if</span> angle &gt; 105:<br/>
          &nbsp;&nbsp;status = <span className="text-red-400">"SLOUCHING!"</span> <span className="text-slate-500"># Red Alert</span>
        </div>
      </div>
    )
  },
  "mufc": {
    title: "Manchester United",
    subtitle: "Red Devil Since 2012",
    tags: ["Old Trafford", "Premier League", "Theatre of Dreams"],
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

// --- TYPEWRITER COMPONENT ---
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

export default function Home() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <main className="min-h-screen p-4 md:p-12 pb-32 flex items-center justify-center overflow-hidden relative">
      
      {/* Background Grid Noise */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 w-full max-w-6xl h-full md:h-[750px] relative z-10">
        
        {/* TILE 1: IDENTITY (2x2) */}
        <motion.div 
          onClick={() => setActiveCard("identity")}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card md:col-span-2 md:row-span-2 rounded-3xl p-8 flex flex-col justify-between group relative overflow-hidden cursor-pointer border border-white/5 hover:border-blue-500/30 transition-all"
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

          <div className="z-10 mt-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
              Aryaman<br/>Sondhi
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full border border-blue-900/50 bg-blue-900/20 text-xs text-blue-300 font-mono">
                Backend Engineer
              </span>
              <span className="px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-xs text-slate-300 font-mono">
                Financial Engineer
              </span>
            </div>
          </div>
          
          <div className="z-10 flex flex-col gap-2 mt-8">
             <div className="flex items-center gap-2 text-slate-400">
               <Briefcase size={16} className="text-purple-400" />
               <span className="text-sm font-medium">TechMahindra (AT&T NISE-Core)</span>
             </div>
             <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
               <Globe size={14} />
               <span>Dubai &rarr; Russia &rarr; India</span>
             </div>
          </div>
          <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">
             <ArrowUpRight size={24} />
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] group-hover:bg-blue-600/30 transition-all duration-700" />
        </motion.div>

        {/* TILE 2: DONNA (2x1) */}
        <motion.div 
          onClick={() => setActiveCard("donna")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-card md:col-span-2 rounded-3xl p-6 font-mono text-xs md:text-sm text-slate-300 overflow-hidden relative flex flex-col cursor-pointer hover:border-green-500/30 transition-colors group"
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
                <Typewriter text="python donna_gui.py" speed={30} startDelay={500} />
            </p>
            <p className="text-slate-500">
               <Typewriter text="Initializing Llama-4-Scout model..." speed={20} startDelay={1500} />
            </p>
            <p className="text-slate-500">
               <span className="text-green-400"><Typewriter text="Vision Processor: Active" speed={20} startDelay={2500} /></span>
            </p>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 0.5 }}
                className="flex items-center gap-2 mt-4 p-2 bg-white/5 rounded border border-white/5"
            >
               <div className="w-2 h-2 bg-purple-500 animate-pulse rounded-full" />
               <span>Donna is listening...</span>
            </motion.div>
          </div>
          <div className="absolute top-6 right-6 px-2 py-1 bg-white/10 rounded text-[10px] text-slate-400 tracking-widest border border-white/5 group-hover:bg-green-500/20 transition-colors">
            PROJECT DONNA
          </div>
        </motion.div>

        {/* TILE 3: CUMMINS (1x1) */}
        <motion.div 
           onClick={() => setActiveCard("cummins")}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3, duration: 0.5 }}
           className="glass-card rounded-3xl p-6 flex flex-col justify-between group cursor-pointer hover:bg-white/5 hover:border-red-500/30 transition-colors"
        >
          <div className="flex justify-between items-start">
             <Factory size={24} className="text-red-500" />
             <div className="w-2 h-2 bg-red-500 rounded-full" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Cummins</h3>
            <p className="text-xs text-slate-500 mt-1">DevOps & Automation</p>
          </div>
        </motion.div>

        {/* TILE 4: PENN STATE (1x1) */}
        <motion.div 
           onClick={() => setActiveCard("pennstate")}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4, duration: 0.5 }}
           className="glass-card rounded-3xl p-6 flex flex-col justify-between group cursor-pointer hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-900/30 rounded-full border border-blue-500/20 text-blue-400">
               <ArrowUpRight size={20} />
            </div>
            <span className="text-xs text-slate-500 font-mono">2020 — 2024</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">Penn State</h3>
            <p className="text-slate-400 text-xs mt-1">B.Sc. Computer Science</p>
          </div>
        </motion.div>

        {/* TILE 5: THE ARSENAL (1x1) */}
        <motion.div 
           onClick={() => setActiveCard("arsenal")}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 0.5 }}
           className="glass-card rounded-3xl p-6 flex flex-col justify-between group cursor-pointer hover:bg-slate-800/50 transition-colors"
        >
          <Cpu size={24} className="text-slate-300" />
          <div>
             <h3 className="font-bold text-lg text-slate-200">The Arsenal</h3>
             <p className="text-xs text-slate-500 mt-1">Full Stack & DevOps</p>
          </div>
        </motion.div>

        {/* TILE 6: SIGNALLAB (1x1) */}
        <motion.div 
           onClick={() => setActiveCard("signallab")}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6, duration: 0.5 }}
           className="glass-card rounded-3xl p-6 flex flex-col justify-between group cursor-pointer hover:bg-emerald-900/10 hover:border-emerald-500/30 transition-colors"
        >
           <div className="flex justify-between items-start">
             <TrendingUp size={24} className="text-emerald-400" />
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
           </div>
           <div>
             <h3 className="text-lg font-bold text-white">SignalLab</h3>
             <p className="text-xs text-emerald-400/80 mt-1">Wealth Analytics</p>
           </div>
        </motion.div>

        {/* TILE 7: POSTURE GUARD (1x1) */}
        <motion.div 
           onClick={() => setActiveCard("posture")}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.7, duration: 0.5 }}
           className="glass-card rounded-3xl p-6 flex flex-col justify-between group cursor-pointer hover:bg-white/5 hover:border-blue-400/30 transition-colors"
        >
           <Scan size={24} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
           <div>
             <h3 className="text-lg font-bold text-white">Posture Guard</h3>
             <p className="text-xs text-slate-500 mt-1">Real-time Detection</p>
           </div>
        </motion.div>

        {/* TILE 8: MUFC (1x1) */}
        <motion.div 
           onClick={() => setActiveCard("mufc")}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8, duration: 0.5 }}
           className="glass-card rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-red-600/30 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="text-4xl font-black text-red-600/80 z-10 group-hover:scale-110 transition-transform duration-300">MUFC</span>
          <span className="text-slate-500 text-xs mt-2 z-10 font-mono">EST. 1878</span>
        </motion.div>

      </div>

      {/* --- THE DOCK --- */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-card px-6 py-3 rounded-full flex items-center gap-6 z-50 border border-white/10"
      >
        <DockIcon 
            icon={<Linkedin size={20} />} 
            label="LinkedIn" 
            href="https://www.linkedin.com/in/aryaman-sondhi/"
        />
        <DockIcon 
            icon={<Github size={20} />} 
            label="GitHub" 
            href="https://github.com/aryaman-sondhi"
        />
        <DockIcon 
            icon={<Mail size={20} />} 
            label="Email" 
            href="mailto:aryamanpsu@gmail.com"
        />
        <DockIcon 
            icon={<Music size={20} />} 
            label="Apple Music" 
            href="https://music.apple.com/profile/aryamansondhi"
        />
        <DockIcon 
            icon={<Headphones size={20} />} 
            label="Spotify" 
            href="https://open.spotify.com/user/31dfokarhdku4gkn7ndbeq5j2c3e?si=T6E49UstTt-9U2_igerKbg"
        />
        
        <div className="w-px h-6 bg-slate-700 mx-2" /> 
        
        <DockIcon 
            icon={<FileText size={20} />} 
            label="Resume" 
            href="/resume.pdf"
            isDownload={true}
        />
      </motion.div>

      {/* --- THE MODAL --- */}
      <AnimatePresence>
        {activeCard && PORTFOLIO_DATA[activeCard as keyof typeof PORTFOLIO_DATA] && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCard(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 m-auto w-[90%] md:w-[600px] h-fit max-h-[80vh] bg-[#0f172a] border border-slate-700 rounded-3xl p-8 z-[70] shadow-2xl overflow-y-auto"
            >
              <button 
                onClick={() => setActiveCard(null)}
                className="absolute top-6 right-6 p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>

              <div className="mt-2">
                <span className="text-xs font-mono text-blue-400 mb-2 block uppercase tracking-widest">
                  {PORTFOLIO_DATA[activeCard as keyof typeof PORTFOLIO_DATA].subtitle}
                </span>
                <h2 className="text-3xl font-bold text-white mb-6">
                  {PORTFOLIO_DATA[activeCard as keyof typeof PORTFOLIO_DATA].title}
                </h2>
                
                {PORTFOLIO_DATA[activeCard as keyof typeof PORTFOLIO_DATA].tags && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {PORTFOLIO_DATA[activeCard as keyof typeof PORTFOLIO_DATA].tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="text-slate-300 leading-relaxed font-sans">
                  {PORTFOLIO_DATA[activeCard as keyof typeof PORTFOLIO_DATA].description}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </main>
  );
}

function DockIcon({ icon, label, href, isDownload = false }: { icon: any, label: string, href: string, isDownload?: boolean }) {
  return (
    <a 
      href={href} 
      target={isDownload ? "_self" : "_blank"} 
      rel="noopener noreferrer"
      download={isDownload ? "Aryaman_Sondhi_Resume.pdf" : undefined}
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