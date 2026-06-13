import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Cpu,
  Play,
  Eye,
  Activity,
  FileText,
  Award,
  Info,
  Zap,
  ShieldCheck,
  ChevronRight,
  Maximize2,
  Globe,
  Terminal,
  Compass,
  Layers,
  Box,
  Binary,
  ArrowUpRight
} from 'lucide-react';
import { PROJECTS } from './data';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.slug === slug);
  const [activeTab, setActiveTab] = useState('description');
  const [activeSim, setActiveSim] = useState(0);
  const [activeVid, setActiveVid] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
      <Link to="/" className="text-zinc-400 hover:text-white transition-colors">Return to Home</Link>
    </div>
  );

  const Icon = project.icon || Cpu;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black pb-20 overflow-x-hidden">
      {/* Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
      </div>

      {/* Premium HUD Navigation */}
      <nav className="fixed top-0 w-full z-[150] py-6 px-6 md:px-12 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          <motion.button
            onClick={() => navigate('/')}
            whileHover={{ x: -5, color: '#fff' }}
            className="group flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 transition-colors"
          >
            <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center group-hover:border-white/20 transition-all">
              <ArrowLeft className="w-3 h-3" />
            </div>
            <span className="hidden sm:inline">System.Back_Exit</span>
          </motion.button>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 text-[9px] font-mono uppercase tracking-[0.4em] text-white/20">
              <span className="flex items-center gap-2"><Binary className="w-3 h-3" /> STATUS: DEPLOYED</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-2"><Terminal className="w-3 h-3" /> NODE_0x{project.id.slice(-2).toUpperCase()}</span>
            </div>
            <div className="w-[1px] h-4 bg-white/10 hidden lg:block" />
            <div className="text-xl font-black tracking-tighter italic hover:scale-110 transition-transform cursor-default">VGP</div>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-6 md:px-12 max-w-[1600px] mx-auto relative z-10">
        {/* Header Section with Technical Readout */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono tracking-[0.3em] text-white/60">
                PRJ_SPEC_{project.id.toUpperCase()}
              </div>
              <motion.div
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-white"
              />
            </div>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-4">
              {project.title}
            </h1>
            <p className="text-white/40 font-mono text-[11px] uppercase tracking-[0.4em] flex items-center gap-3">
              <Compass className="w-3 h-3" /> {project.role} // {project.team}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex gap-4"
          >
            <div className="p-6 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-2 min-w-[120px]">
              <Layers className="w-5 h-5 text-white/40" />
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Stack_Lvl</span>
              <span className="text-lg font-bold">L4</span>
            </div>
            <div className="p-6 bg-white text-black rounded-[2rem] flex flex-col items-center justify-center gap-2 min-w-[120px]">
              <Box className="w-5 h-5 opacity-60" />
              <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Version</span>
              <span className="text-lg font-black tracking-tighter">v1.0</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* ── CARD 1: DESCRIPTION (THE MANIFEST) ── */}
          <motion.section
            variants={cardVariants}
            className="lg:col-span-8 group relative overflow-hidden bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[3.5rem] p-8 md:p-14"
          >
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12">
              <Icon className="w-80 h-80 text-white" />
            </div>

            <div className="relative z-10 space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Info className="w-4 h-4 text-white/60" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">Operation_Log // Overview</span>
                </div>

                <div className="grid md:grid-cols-12 gap-12">
                  <div className="md:col-span-7 space-y-8">
                    <p className="text-2xl md:text-4xl font-bold tracking-tight leading-tight">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono uppercase tracking-widest text-white/60 hover:bg-white hover:text-black transition-all cursor-default">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-5 prose prose-invert prose-sm text-white/40 leading-relaxed font-light border-l border-white/5 pl-8 italic">
                    {project.fullDescription}
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: 'Role', val: project.role },
                  { label: 'Team', val: project.team },
                  { label: 'Status', val: 'Optimized' },
                  { label: 'Complexity', val: 'Extreme' }
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-[9px] font-mono uppercase tracking-widest text-white/20 mb-2">{item.label}</p>
                    <p className="text-xs font-bold uppercase tracking-tighter text-white/80">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ── CARD 2: TECHNICAL SPECS ── */}
          <motion.section
            variants={cardVariants}
            className="lg:col-span-4 bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-8 md:p-12 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
              <Terminal className="w-64 h-64" />
            </div>

            <div className="space-y-12 relative z-10">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-white/40" />
                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">Core_Data // Specs</span>
              </div>

              <div className="space-y-10">
                <h3 className="text-4xl font-black uppercase tracking-tighter leading-none italic">Analysis<br />Report.</h3>
                <div className="space-y-5">
                  {project.specs.map(spec => (
                    <div key={spec.label} className="group/item">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 group-hover/item:text-white transition-colors">{spec.label}</span>
                        <span className="text-[11px] font-bold uppercase tracking-tight text-white/80">{spec.value}</span>
                      </div>
                      <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="absolute inset-0 bg-white/20"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/20">System_Documentation</h4>
                <div className="space-y-3">
                  {project.documents?.map((doc, i) => (
                    <motion.a
                      key={i}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                      className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-[1.5rem] group/doc transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-[9px] font-mono font-bold text-white/40 group-hover/doc:text-white group-hover/doc:border-white/30 transition-all">
                          {doc.type || 'PDF'}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-tight text-white/70 group-hover/doc:text-white">{doc.title}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/20 group-hover/doc:text-white transition-all" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── CARD 3: DESIGN MANIFEST (GALLERY) ── */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.section
              variants={cardVariants}
              className="lg:col-span-12 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[4rem] p-10 md:p-16 space-y-10 overflow-hidden relative"
            >
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Box className="w-5 h-5 text-white/40" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">Module_05 // Design_Blueprints</span>
                  </div>
                  <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">Design<br />Manifest.</h3>
                </div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-white/20 max-w-xs text-right">
                  Iterative design phase captures, CAD exports, and early prototype documentation.
                </p>
              </div>

              {/* Horizontal Image Scroll */}
              <div className="relative z-10 flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x">
                {project.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="flex-shrink-0 w-[300px] md:w-[450px] aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/40 snap-center group relative transform-gpu"
                  >
                    <img
                      src={img}
                      alt={`Design ${i}`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black transition-opacity duration-700 opacity-40 group-hover:opacity-0" />
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[8px] font-mono uppercase tracking-widest">
                        Asset_0{i + 1} // 4000x2250
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ── CARD 4: SIMULATION LAB (TECHNICAL ANALYSIS) ── */}
          {project.id === 'sae-baja' && (
            <motion.section
              variants={cardVariants}
              className="lg:col-span-12 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[4rem] p-10 md:p-16 space-y-12 overflow-hidden relative"
            >
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-white/40" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/40">Module_06 // Analysis_Laboratory</span>
                  </div>
                  <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">Simulation<br />Lab.</h3>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                    ))}
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-white/20 max-w-xs text-right">
                    Real-time physics validation and multi-body dynamics processing.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
                {/* Primary Feed Hero */}
                <div className="lg:col-span-7">
                  {project.videos && project.videos.length > 0 ? (
                    <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 bg-black group transform-gpu">
                      <video
                        key={project.videos[activeVid].url}
                        src={project.videos[activeVid].url}
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video rounded-[3rem] bg-white/[0.02] border border-dashed border-white/10 flex flex-col items-center justify-center gap-4">
                      <Binary className="w-10 h-10 text-white/10" />
                      <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Physics_Data_Stream_Offline</p>
                    </div>
                  )}
                </div>

                {/* Data Summary & Video Selector */}
                <div className="lg:col-span-5 flex flex-col gap-8 py-4">
                  {/* Video Selector if multiple videos exist */}
                  {project.videos && project.videos.length > 1 && (
                    <div className="space-y-6">
                      <h5 className="text-[10px] font-mono uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">Select_Video_Feed</h5>
                      <div className="grid grid-cols-1 gap-3">
                        {project.videos.map((vid, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveVid(idx)}
                            className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${activeVid === idx ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'}`}
                          >
                            <div className="flex items-center justify-between relative z-10">
                              <div className="flex items-center gap-3">
                                <span className="text-[8px] font-mono opacity-40">CH_0{idx + 1}</span>
                                <span className="text-xs font-bold uppercase tracking-tight">{vid.title}</span>
                              </div>
                              {activeVid === idx ? (
                                <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                              ) : (
                                <Play className="w-3 h-3 opacity-20 group-hover:opacity-100 transition-all" />
                              )}
                            </div>
                            {activeVid === idx && (
                              <motion.div
                                layoutId="activeVidBg"
                                className="absolute inset-0 bg-white"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <h5 className="text-[10px] font-mono uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">Analysis_Summary</h5>
                    <div className="space-y-4">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex gap-4 group/item">
                          <span className="text-[8px] font-mono text-white/20 mt-1">0{i + 1}</span>
                          <p className="text-xs font-medium text-white/60 group-hover/item:text-white transition-colors uppercase tracking-tight leading-relaxed">{h}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Activity className="w-5 h-5 text-white/20" />
                        <div>
                          <p className="text-[9px] font-mono text-white/20 uppercase">Solver_Status</p>
                          <p className="text-sm font-bold uppercase tracking-tight">Converged_Active</p>
                        </div>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-white/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulation Feed (Horizontal) */}
              <div className="space-y-6 relative z-10 pt-4">
                <div className="flex flex-col md:flex-row justify-between items-center px-2 gap-4">
                  <div className="flex gap-4">
                    {project.simulations?.map((sim, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSim(idx)}
                        className={`px-4 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all border ${activeSim === idx ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30'}`}
                      >
                        {sim.category}
                      </button>
                    ))}
                  </div>
                  <div className="text-[9px] font-mono text-white/10 tracking-[0.2em]">SEQ_1.0.0 // SCR_LOCK</div>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
                  {project.simulations?.[activeSim]?.images.map((img, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="flex-shrink-0 w-[280px] md:w-[380px] aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/60 snap-center group relative transform-gpu"
                    >
                      <img src={img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt="sim" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all" />
                      <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <Maximize2 className="w-3 h-3" />
                      </div>
                      <div className="absolute bottom-6 left-6 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-all">
                        <span className="text-[8px] font-mono uppercase tracking-widest text-white/60">Plot_Node_0{i + 1}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

        </motion.div>
      </main>

      {/* Premium Quick Access Footer */}
      <footer className="mt-32 px-12 pb-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="h-[1px] w-full bg-white/10 mb-12" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-8">
              <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">System_v3.2.4_Stable</div>
              <div className="hidden md:flex gap-4 text-[9px] font-mono uppercase text-white/10 tracking-widest">
                <span>© 2026_VGP</span>
                <span>//</span>
                <span>SECURE_ENCRYPTION_ACTIVE</span>
              </div>
            </div>

            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden px-12 py-5 bg-white text-black rounded-full"
            >
              <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-[11px] font-mono uppercase tracking-[0.4em] font-black flex items-center gap-3">
                Exit.Main_Interface <ArrowLeft className="w-4 h-4 rotate-180" />
              </span>
            </motion.button>
          </div>
        </div>
      </footer>
    </div>
  );
}
