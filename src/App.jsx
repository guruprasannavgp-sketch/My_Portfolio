import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, Github, Linkedin, Cpu, Wrench,
  Settings, Layers, ChevronRight, Cog, Award,
  Factory, Crosshair, FileText, Phone, Gauge,
  ArrowUpRight, Zap, Activity
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

// Import our split data and css
import { SKILLS, PROJECTS, INTERNSHIPS, ACHIEVEMENTS, CERTIFICATIONS } from './data';
import Intro from './Intro';
import ProjectDetail from './ProjectDetail';
import { CursorProvider } from './CursorContext';
import CustomCursor from './CustomCursor';
import './App.css';

/* ─────────────────────────────────────────────────────────
   FLOATING PARTICLES BACKGROUND
───────────────────────────────────────────────────────── */
const Particles = React.memo(() => {
  const particleData = React.useMemo(() =>
    Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      moveY: -(Math.random() * 80 + 40),
      duration: Math.random() * 6 + 5,
      delay: Math.random() * 8,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleData.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/5"
          style={{
            width: p.width,
            height: p.height,
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: [0, p.moveY],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
});

/* ─────────────────────────────────────────────────────────
   ANIMATED GRID OVERLAY
───────────────────────────────────────────────────────── */
const GridOverlay = React.memo(() => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
    }}
  />
));

/* ─────────────────────────────────────────────────────────
   ANIMATED SKILL LIST ITEM
───────────────────────────────────────────────────────── */
const SkillItem = React.memo(({ skill, index }) => (
  <motion.li
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className="skill-item group relative overflow-hidden"
  >
    <span className="block text-2xl font-bold uppercase tracking-tighter leading-tight
                     group-hover:translate-x-3 transition-transform duration-300 ease-out">
      {skill}
    </span>
    {/* Sweep underline */}
    <motion.span
      className="absolute bottom-0 left-0 h-[2px] bg-white origin-left"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  </motion.li>
));

/* ─────────────────────────────────────────────────────────
   3D TILT PROJECT CARD
───────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const Icon = project.icon || Cpu;
  const cardRef = useRef(null);
  const rectRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e) => {
    if (!rectRef.current) return;
    const rect = rectRef.current;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -10);
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    rectRef.current = null;
  };

  return (
    <Link to={`/project/${project.slug}`}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d', perspective: 800 }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="min-w-[400px] h-[500px] bg-zinc-900 border border-white/5 rounded-3xl p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-500 relative overflow-hidden"
      >
        {/* Background Visual Accent */}
        <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
          <GridOverlay />
        </div>

        {/* Animated Corner Accents */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 45, x: 40, y: -40 }}
            className="absolute top-0 right-0 w-full h-[1px] bg-white/20"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="space-y-8">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-white"
                  />
                  <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40">Active_Node // 0{index + 1}</span>
                </div>
                <h3 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] group-hover:text-white transition-colors">
                  {project.title}
                </h3>
              </div>
              <div className="p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/5 group-hover:border-white/20 transition-all">
                <Icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors">
                <span className="shrink-0">Role</span>
                <div className="h-[1px] w-full bg-white/5" />
                <span className="shrink-0 text-white/60">{project.role}</span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3 font-medium">
                {project.description}
              </p>
            </div>

            {/* Technical Specs Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {project.specs.slice(0, 2).map((spec, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-all">
                  <p className="text-[8px] font-mono uppercase tracking-widest text-white/20 mb-1">{spec.label}</p>
                  <p className="text-[10px] font-bold uppercase tracking-tight text-white/70 line-clamp-1">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between pt-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                {(project.tags || []).slice(0, 2).map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-mono uppercase tracking-wider text-white/40 group-hover:text-white group-hover:border-white/20 transition-all">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-white/20" />
                    </div>
                  ))}
                </div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/10">System_Linked</span>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.1, backgroundColor: '#fff', color: '#000' }}
              className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center transition-all duration-500 text-white/40"
            >
              <ArrowUpRight className="w-6 h-6" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

/* ─────────────────────────────────────────────────────────
   MARQUEE TICKER
───────────────────────────────────────────────────────── */
const Marquee = React.memo(({ items, direction = 1 }) => (
  <div className="overflow-hidden whitespace-nowrap py-4 border-y border-white/5">
    <motion.div
      className="inline-flex gap-12 text-[11px] font-mono uppercase tracking-[0.4em] opacity-25"
      animate={{ x: direction === 1 ? [0, '-50%'] : ['-50%', 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      style={{ willChange: 'transform' }}
    >
      {[...items, ...items].map((item, i) => (
        <span key={i}>{item} &nbsp;·&nbsp;</span>
      ))}
    </motion.div>
  </div>
));

/* ─────────────────────────────────────────────────────────
   COUNTER STAT
───────────────────────────────────────────────────────── */
const CounterStat = ({ end, label }) => {
  const [val, setVal] = useState(0);
  const hasRun = useRef(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasRun.current) {
        hasRun.current = true;
        let start = 0;
        const step = end / 40;
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setVal(end); clearInterval(timer); }
          else setVal(Math.floor(start));
        }, 35);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="space-y-2">
      <p className="text-5xl font-black tracking-tighter">{val}+</p>
      <p className="text-[10px] font-mono uppercase tracking-widest opacity-40">{label}</p>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────────────── */
function Home({ showIntro, setShowIntro }) {
  const [scrolled, setScrolled] = useState(false);

  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setScrollWidth(containerRef.current.scrollWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -(scrollWidth - (typeof window !== 'undefined' ? window.innerWidth : 0))]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section || !containerRef.current || !targetRef.current) return;
    
    const offsetLeft = section.offsetLeft;
    const maxScrollHorizontal = scrollWidth - window.innerWidth;
    const ratio = maxScrollHorizontal > 0 ? offsetLeft / maxScrollHorizontal : 0;
    
    const maxScrollVertical = targetRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = targetRef.current.offsetTop + ratio * maxScrollVertical;
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const marqueeItems = ['SolidWorks', 'CATIA V5', 'Siemens NX', 'AutoCAD', 'FEA', 'GD&T', 'Machine Design', 'Engineering Graphics', 'Drafting', 'Simulation', 'Prototyping'];

  return (
    <div className="bg-black text-white font-sans selection:bg-white selection:text-black">

      <AnimatePresence>
        {showIntro && (
          <Intro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-xl' : 'bg-transparent py-8'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl font-extrabold tracking-tighter text-white"
            >
              VGP
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`flex items-center gap-8 transition-colors duration-500 ${scrolled ? 'text-white' : 'text-black'}`}
            >
              <div className={`hidden md:flex items-center gap-10 text-[11px] font-mono tracking-widest uppercase ${scrolled ? 'opacity-70' : 'opacity-80 font-bold'}`}>
                {[
                  { name: 'Start', target: 'hero' },
                  { name: 'Work', target: 'projects' },
                  { name: 'Connect', target: 'contact' }
                ].map((link) => (
                  <motion.a
                    key={link.name}
                    href={`#${link.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.target);
                    }}
                    whileHover={{ y: -2 }}
                    className="hover:text-rebirth-accent transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className={`px-6 py-2 border rounded-full text-[11px] font-mono uppercase tracking-widest transition-all ${scrolled ? 'border-white/40 hover:bg-white hover:text-black' : 'border-black/30 hover:bg-black hover:text-white'}`}
              >
                Hire Me
              </motion.a>
            </motion.div>
          </div>
        </nav>

        <main ref={targetRef} className="relative h-[600vh]">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <motion.div ref={containerRef} style={{ x }} className="flex">

              {/* ── SECTION 1: HERO ── */}
              <section id="hero" className="min-w-screen h-screen relative flex items-center shrink-0">
                <Particles />
                <GridOverlay />

                <div className="absolute inset-0 bg-black pointer-events-none overflow-hidden">
                  <div className="absolute inset-y-0 right-0 w-[60%] lg:w-[55%] hero-skew-bg hidden md:block" style={{ backgroundColor: '#ffffff' }} />
                  {/* Animated accent ring */}
                  <motion.div
                    className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5 pointer-events-none"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-2 items-center gap-12 relative z-10">
                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <motion.span
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900 border border-white/10 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase text-white"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Portfolio
                      </motion.span>
                    </motion.div>

                    <div className="overflow-hidden">
                      <motion.h1
                        initial={{ y: 120 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[5rem] xl:text-[6rem] font-bold leading-[0.85] tracking-tighter uppercase whitespace-nowrap"
                      >
                        Guru<br />
                        <span className="text-white">Prasanna </span>
                        <span className="text-white">V</span>
                      </motion.h1>
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 0.6, y: 0 }}
                      transition={{ duration: 0.8, delay: 1 }}
                      className="text-xl md:text-2xl font-medium tracking-tight max-w-lg leading-relaxed"
                    >
                      Fascinative Design & Simulation Enthusiast
                      <br />
                      <span className="text-sm opacity-50 mt-4 block font-mono uppercase tracking-widest">KIOT - Mechanical (2023-27)</span>
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      className="flex items-center gap-6"
                    >
                      <div className="flex gap-4">
                        {[
                          { Icon: Github, url: 'https://github.com/guruprasannavgp-sketch' },
                          { Icon: Linkedin, url: 'https://www.linkedin.com/in/guru-prasanna-v-a49b362a6?utm_source=share_via&utm_content=profile&utm_medium=member_android' }
                        ].map(({ Icon, url }, i) => (
                          <motion.a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all"
                          >
                            <Icon className="w-5 h-5" />
                          </motion.a>
                        ))}
                      </div>

                      <motion.a
                        href="/Guru cv.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest rounded-2xl font-black hover:bg-zinc-200 transition-colors flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Resume
                      </motion.a>
                    </motion.div>

                    {/* Live stats ticker */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                      className="flex gap-8 pt-4 border-t border-white/5"
                    >
                      {[['5+', 'Projects'], ['3+', 'Internships']].map(([num, label]) => (
                        <div key={label}>
                          <p className="text-2xl font-black tracking-tighter">{num}</p>
                          <p className="text-[9px] font-mono uppercase tracking-widest opacity-40">{label}</p>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Hero image */}
                <div className="hidden md:flex absolute bottom-0 right-0 w-[55%] h-[100vh] items-end justify-center z-20 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 60 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full flex items-end justify-center pointer-events-auto"
                  >
                    <motion.img
                      src="/images/guru1.jpeg"
                      alt="Guru Prasanna"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-[90%] md:w-[80%] max-w-3xl h-auto object-contain object-bottom translate-y-[15%] hover:scale-105 transition-transform duration-700 origin-center"
                      style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 95%)',
                        maskImage: 'linear-gradient(to bottom, black 70%, transparent 95%)'
                      }}
                    />
                  </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="absolute bottom-8 left-12 flex items-center gap-3 z-30"
                >
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5"
                  >
                    <div className="w-1 h-2 bg-white/60 rounded-full" />
                  </motion.div>
                  <span className="text-[9px] font-mono uppercase tracking-widest opacity-30">Scroll to explore</span>
                </motion.div>
              </section>

              {/* ── SECTION 2: ABOUT ── */}
              <section id="about" className="min-w-screen h-screen flex items-center shrink-0 px-12 lg:px-24 relative overflow-hidden">
                <GridOverlay />
                {/* Background glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.12 }}
                  transition={{ duration: 1.5 }}
                  viewport={{ once: true }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-[150px] pointer-events-none"
                />

                <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
                  <div className="space-y-12 pr-12 lg:pr-0">
                    <motion.div
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true, margin: '-100px' }}
                    >
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: 'auto' }}
                        viewport={{ once: true }}
                        className="text-[10px] font-mono tracking-[0.5em] uppercase text-white/50 block mb-8 overflow-hidden"
                      >
                        01 // THE SYSTEM
                      </motion.span>
                      <div className="overflow-hidden">
                        <motion.h2
                          initial={{ y: 80 }}
                          whileInView={{ y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                          className="text-6xl md:text-8xl lg:text-[5.7rem] font-bold uppercase leading-none tracking-tighter"
                        >
                          Engineered <br />
                          <span className="text-white/30 italic">for</span> Precision.
                        </motion.h2>
                      </div>
                    </motion.div>

                    <motion.p
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-50px' }}
                      variants={{
                        visible: { transition: { staggerChildren: 0.012, delayChildren: 0.3 } }
                      }}
                      className="text-xl md:text-2xl font-medium tracking-tight leading-snug"
                    >
                      {"I am a high-spirited mechanical engineering student, deeply passionate about applying theoretical physics and mechanical wisdom to real-world automotive and industrial challenges.".split("").map((char, index) => (
                        <motion.span
                          key={index}
                          variants={{
                            hidden: { color: "rgba(255,255,255,0.15)" },
                            visible: { color: "rgba(255,255,255,0.85)", transition: { duration: 0.08 } }
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </motion.p>

                    {/* Counter stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                      className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5"
                    >
                      <CounterStat end={5} label="Projects" />
                      <CounterStat end={3} label="Internships" />
                      <CounterStat end={6} label="Competitions" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="space-y-6 pt-4"
                    >
                      {[
                        { Icon: Cog, title: 'Engineering Core', sub: 'Mechanical Systems & Design' },
                        { Icon: Gauge, title: 'Motorsport Design', sub: 'SAE BAJA · Go-Kart · EV' },
                      ].map(({ Icon, title, sub }) => (
                        <motion.div
                          key={title}
                          whileHover={{ x: 6 }}
                          className="flex items-center gap-6 group"
                        >
                          <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all duration-300">
                            <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-all duration-300" />
                          </div>
                          <div>
                            <p className="text-lg font-bold uppercase tracking-tight group-hover:text-white transition-colors">{title}</p>
                            <p className="text-xs opacity-50 font-mono tracking-widest uppercase">{sub}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative hidden lg:block aspect-[4/3] w-full max-w-2xl mx-auto"
                  >
                    <motion.div
                      animate={{ rotate: [3, 1, 3] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-4 border border-white/20 rounded-[4rem] scale-105"
                    />
                    <div className="relative w-full h-full rounded-[4rem] overflow-hidden group border border-white/10">
                      <img
                        src="/images/car_design_blueprint.png"
                        alt="Engineering Systems"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 scale-100 hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700 pointer-events-none" />
                      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                        <div className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white">SYSTEM.AERO_DYNAMICS // ENG_0x1</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* ── SECTION 3: ARSENAL (SKILLS) ── */}
              <section id="skills" className="min-w-screen h-screen flex flex-col justify-center shrink-0 px-12 lg:px-24 relative overflow-hidden">
                <GridOverlay />
                {/* Ambient top glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.08 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2 }}
                  className="absolute left-1/2 -top-32 -translate-x-1/2 w-[700px] h-[400px] bg-white rounded-full blur-[120px] pointer-events-none"
                />

                {/* Marquee ticker */}
                <div className="absolute top-0 left-0 right-0">
                  <Marquee items={['SolidWorks', 'CATIA V5', 'Siemens NX', 'AutoCAD', 'Modelon Impact', 'Ansys', 'Solid Edge', 'Fusion 360']} />
                </div>

                <div className="grid md:grid-cols-3 gap-12 w-full max-w-7xl mx-auto relative z-10">
                  <div className="space-y-4">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-[10px] font-mono tracking-[0.5em] uppercase text-zinc-600 block mb-8"
                    >
                      02 // ARSENAL
                    </motion.span>
                    <div className="overflow-hidden">
                      <motion.h2
                        initial={{ y: 80 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl font-bold uppercase tracking-tighter pb-12 border-b border-white/5"
                      >
                        SKILLS
                      </motion.h2>
                    </div>

                    {/* Soft skill pills */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="flex flex-wrap gap-2 pt-4"
                    >
                      {SKILLS.soft.map((s, i) => (
                        <motion.span
                          key={s}
                          whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.4)' }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.08 }}
                          className="px-3 py-1.5 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-wider text-white/50"
                        >
                          {s}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>

                  <div className="md:col-span-2 flex flex-col lg:flex-row gap-x-24 gap-y-16">
                    <div className="flex-[2]">
                      <motion.h4
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.4 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-mono tracking-widest uppercase mb-8"
                      >
                        Design Core
                      </motion.h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
                        {SKILLS.cad.map((s, i) => (
                          <SkillItem key={s} skill={s} index={i} />
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1">
                      <motion.h4
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.4 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-mono tracking-widest uppercase mb-8"
                      >
                        Engineering Wisdom
                      </motion.h4>
                      <ul className="space-y-5">
                        {SKILLS.core.map((s, i) => (
                          <SkillItem key={s} skill={s} index={i + 1} />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom marquee */}
                <div className="absolute bottom-0 left-0 right-0">
                  <Marquee items={['Geometric Dimensioning', 'Tolerance Analysis', 'Mechanism Design', 'Structural FEA', 'Surface Modeling', 'Technical Drafting', 'Machine Elements']} direction={-1} />
                </div>
              </section>

              {/* ── SECTION 4: PROJECTS ── */}
              <section id="projects" className="min-w-fit h-screen flex items-center shrink-0 px-24 space-x-12 relative">
                <GridOverlay />
                <div className="max-w-md shrink-0 space-y-8 pr-12">
                  <motion.span
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-[10px] font-mono tracking-[0.5em] uppercase text-white/50 block"
                  >
                    03 // FIELD TESTS
                  </motion.span>
                  <div className="overflow-hidden">
                    <motion.h2
                      initial={{ y: 80 }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="text-8xl font-bold uppercase leading-none tracking-tighter"
                    >
                      The<br />Fleet.
                    </motion.h2>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-sm font-mono uppercase tracking-widest"
                  >
                    Award-winning projects that fuse engineering rigor with motorsport grit.
                  </motion.p>
                </div>

                <div className="flex gap-12">
                  {PROJECTS.map((p, i) => (
                    <ProjectCard key={i} project={p} index={i} />
                  ))}
                </div>
              </section>

              {/* ── SECTION 5: CREDENTIALS (TECHNICAL MANIFEST) ── */}
              <section id="credentials" className="min-w-screen h-screen shrink-0 px-24 py-20 relative bg-black overflow-y-auto scrollbar-hide">
                <GridOverlay />

                <div className="max-w-[1700px] w-full mx-auto space-y-12 relative z-10">
                  {/* Compact Header */}
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-white/10 pb-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-[1px] bg-white/40" />
                        <span className="text-[9px] font-mono tracking-[0.5em] uppercase text-white/40 block">
                          System_Validation // 04
                        </span>
                      </div>
                      <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-[6.5rem] font-black uppercase leading-[0.75] tracking-tighter"
                      >
                        Technical <br />
                        <span className="text-white/20 leading-none">Credentials <br />& Assets.</span>
                      </motion.h2>
                    </div>

                    <div className="lg:max-w-md space-y-6">
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-1">
                          <p className="text-[8px] font-mono uppercase tracking-widest text-white/20">Nodes</p>
                          <p className="text-3xl font-black uppercase">11</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[8px] font-mono uppercase tracking-widest text-white/20">Status</p>
                          <p className="text-3xl font-black uppercase text-white">Verified</p>
                        </div>
                      </div>
                      <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 leading-relaxed max-w-[280px]">
                        Technical validation of software proficiency, motorsport performance, and professional industrial experience nodes.
                      </p>
                    </div>
                  </div>

                  {/* Optimized Technical Board Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
                    {/* 01. SOFTWARE_SUITE */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h3 className="text-[12px] font-mono uppercase tracking-[0.6em] text-white/40 flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          01 // Software_Suite
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 gap-6">
                        {CERTIFICATIONS.software.map((cert, i) => (
                          <motion.a
                            key={i}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03, y: -5, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }}
                            className="p-8 bg-white/[0.03] border border-white/10 rounded-[2.5rem] flex flex-col justify-between group transition-all duration-500 min-h-[180px] relative overflow-hidden"
                          >
                            <div className="absolute -right-8 -top-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                              <Cpu className="w-32 h-32" />
                            </div>
                            <div className="flex justify-between items-start relative z-10">
                              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                <Award className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
                              </div>
                              <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all" />
                            </div>
                            <div className="space-y-2 relative z-10">
                              <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30">ID: PRF_00{i+1}X</p>
                              <h4 className="text-xl font-black uppercase tracking-tighter text-white group-hover:text-white leading-none">{cert.title}</h4>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* 02. INDUSTRIAL_VALIDATION */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h3 className="text-[12px] font-mono uppercase tracking-[0.6em] text-white/40 flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                          02 // Industrial
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {CERTIFICATIONS.internship.map((intern, i) => (
                          <motion.a
                            key={i}
                            href={intern.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.01, x: 8, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.2)' }}
                            className="p-6 bg-white/[0.03] border border-white/5 rounded-[2rem] flex flex-col gap-4 group transition-all duration-500"
                          >
                            <div className="flex items-center gap-4">
                              <div className="text-[10px] font-mono text-white/10 uppercase tracking-[0.4em]">Node_0{i + 1}</div>
                              <h5 className="text-lg font-black uppercase tracking-tighter text-white/80 group-hover:text-white leading-tight">{intern.title}</h5>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${intern.status === 'ongoing' ? 'bg-orange-500' : 'bg-green-500'}`} />
                              <span className={`text-[9px] font-mono uppercase tracking-widest font-bold ${intern.status === 'ongoing' ? 'text-orange-500' : 'text-green-500'}`}>
                                {intern.status === 'ongoing' ? 'Ongoing' : 'Authenticated'}
                              </span>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* 03. MOTORSPORT_RECORD */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h3 className="text-[12px] font-mono uppercase tracking-[0.6em] text-white/40 flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          03 // GO_KART
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {CERTIFICATIONS.gokart.map((cert, i) => (
                          <motion.a
                            key={i}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03, y: -5, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }}
                            className="p-6 bg-white/[0.03] border border-white/10 rounded-[2rem] flex flex-col justify-between group transition-all duration-500 min-h-[140px]"
                          >
                            <div className="flex justify-between items-start">
                              <Activity className="w-6 h-6 text-white/20 group-hover:text-white transition-colors" />
                              <div className="text-[8px] font-mono text-white/10 uppercase tracking-widest">0{i+1}</div>
                            </div>
                            <h4 className="text-md font-black uppercase tracking-tight text-white/70 group-hover:text-white leading-tight">{cert.title}</h4>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* 04. EV_SPECIALIZATION */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h3 className="text-[12px] font-mono uppercase tracking-[0.6em] text-white/40 flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                          04 // ELCTRIC_4_WHEELER
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {CERTIFICATIONS.electric.map((cert, i) => (
                          <motion.a
                            key={i}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' }}
                            className="p-6 bg-white/[0.04] border border-white/10 rounded-[2rem] flex flex-col gap-4 group transition-all duration-500 relative overflow-hidden"
                          >
                            <Zap className="absolute -right-4 -top-4 w-16 h-16 opacity-[0.05] group-hover:opacity-20 transition-opacity" />
                            <div className="flex justify-between items-start relative z-10">
                              <div className="p-2 bg-white/5 rounded-xl group-hover:bg-white group-hover:text-black transition-all">
                                <Zap className="w-5 h-5" />
                              </div>
                            </div>
                            <h4 className="text-lg font-black uppercase tracking-tighter text-white group-hover:text-white leading-none relative z-10">{cert.title}</h4>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── SECTION 6: FOOTER / CONTACT ── */}
              <section id="contact" className="min-w-screen h-screen flex flex-col justify-center shrink-0 px-24 bg-white text-black rounded-l-[5rem] relative overflow-hidden">
                {/* Animated background circles */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-black rounded-full pointer-events-none"
                />
                <motion.div
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.03, 0.07, 0.03] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-black rounded-full pointer-events-none"
                />

                <div className="max-w-6xl w-full mx-auto space-y-20 relative z-10">
                  <div className="space-y-4">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 0.4, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-[10px] font-mono tracking-[0.5em] uppercase block"
                    >
                      05 // NEXT MACHINE
                    </motion.span>

                    <div className="overflow-hidden">
                      <motion.h2
                        initial={{ y: 100 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-7xl md:text-9xl font-bold uppercase leading-none tracking-tighter"
                      >
                        Let's design <br />
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          the future.
                        </motion.span>
                      </motion.h2>
                    </div>

                    <div className="flex flex-col gap-4 mt-6">
                      <motion.a
                        href="mailto:guruprasannavgp@gmail.com"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        whileHover={{ scale: 1.02, x: 6 }}
                        className="inline-flex items-center gap-3 text-xl font-bold hover:underline underline-offset-4 w-fit"
                      >
                        <Mail className="w-5 h-5" />
                        guruprasannavgp@gmail.com
                      </motion.a>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mt-2"
                      >
                        <a href="tel:+917397056703" className="inline-flex items-center gap-3 text-lg font-bold hover:underline">
                          <Phone className="w-4 h-4" />
                          +91 73970 56703
                        </a>
                        <a href="tel:+917806980492" className="inline-flex items-center gap-3 text-lg font-bold hover:underline">
                          <Phone className="w-4 h-4" />
                          +91 78069 80492
                        </a>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="grid md:grid-cols-3 gap-12 pt-12 border-t border-black/10"
                  >
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase opacity-40 mb-4">Contact</p>
                      <div className="flex flex-col gap-2">
                        <a href="mailto:guruprasannavgp@gmail.com" className="text-xl font-bold hover:underline">guruprasannavgp@gmail.com</a>
                        <div className="text-sm opacity-60 font-semibold flex flex-col gap-1 mt-1">
                          <a href="tel:+917397056703" className="hover:underline">+91 73970 56703</a>
                          <a href="tel:+917806980492" className="hover:underline">+91 78069 80492</a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase opacity-40 mb-4">Social</p>
                      <div className="flex gap-4">
                        {[
                          { name: 'LinkedIn', url: 'https://www.linkedin.com/in/guru-prasanna-v-a49b362a6?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
                          { name: 'Github', url: 'https://github.com/guruprasannavgp-sketch' },
                          { name: 'CV / Resume', url: '/Guru cv.pdf' }
                        ].map((s) => (
                          <motion.a
                            key={s.name}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -3 }}
                            className="font-bold hover:underline"
                          >
                            {s.name}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-black uppercase tracking-tighter leading-none">VGP</p>
                      <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mt-2">Salem, Tamil Nadu // India</p>
                    </div>
                  </motion.div>
                </div>
              </section>

            </motion.div>
          </div>
        </main>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <CursorProvider>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home showIntro={showIntro} setShowIntro={setShowIntro} />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
      </Routes>
    </CursorProvider>
  );
}
