import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springCX = useSpring(cursorX, { stiffness: 800, damping: 50 });
  const springCY = useSpring(cursorY, { stiffness: 800, damping: 50 });

  useEffect(() => {
    let rafId;
    const move = (e) => {
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      });
    };
    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY]);

  return (
    <CursorContext.Provider value={{ springCX, springCY }}>
      {children}
    </CursorContext.Provider>
  );
};
