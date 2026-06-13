import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Intro({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Corner brackets */}
      {[
        'top-8 left-8 border-t border-l',
        'top-8 right-8 border-t border-r',
        'bottom-8 left-8 border-b border-l',
        'bottom-8 right-8 border-b border-r',
      ].map((classes, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
          className={`absolute w-8 h-8 border-white/20 ${classes}`}
        />
      ))}

      {/* Rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[340px] h-[340px] rounded-full border border-white/5"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute w-[240px] h-[240px] rounded-full border border-white/5"
      />

      {/* Pulsing center dot */}
      <motion.div
        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-3 h-3 rounded-full bg-white/30"
      />

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Loading bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-white/30 w-64 mb-10 mx-auto origin-left"
        />

        <div className="overflow-hidden mb-4">
          <motion.div
            initial={{ y: 110 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h1 className="editorial-header text-7xl md:text-[9rem] font-extrabold uppercase tracking-tighter text-white leading-none">
              VGP
            </h1>
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] font-mono tracking-[0.6em] uppercase text-white/40">
              Design Engineer · KIOT
            </p>
          </motion.div>
        </div>

        {/* Bottom line sweep */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-white/20 w-64 mt-10 mx-auto origin-right"
        />

        <div className="mt-6 flex justify-between items-center w-64 mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.2 }}
            className="mono-label"
          >
            Mechanical Engineer
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.4 }}
            className="mono-label"
          >
            Salem // TN
          </motion.span>
        </div>
      </div>

      {/* Scanline film grain overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.12)_50%)] bg-[size:100%_4px] pointer-events-none opacity-[0.08]" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)'
        }}
      />
    </motion.div>
  );
}
