import { motion } from 'framer-motion';
import { useCursor } from './CursorContext';

export default function CustomCursor() {
  const { springCX, springCY } = useCursor();

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
