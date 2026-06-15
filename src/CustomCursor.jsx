import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from './CursorContext';

export default function CustomCursor() {
  const { springCX, springCY } = useCursor();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(isCoarse || window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-16 h-16 bg-white rounded-full pointer-events-none z-[200] mix-blend-difference"
      style={{ 
        x: springCX, 
        y: springCY, 
        left: -32,
        top: -32,
        willChange: 'transform' 
      }}
    />
  );
}
