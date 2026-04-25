import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);

  const smoothX = useSpring(x, { stiffness: 600, damping: 45, mass: 0.2 });
  const smoothY = useSpring(y, { stiffness: 600, damping: 45, mass: 0.2 });
  const smoothScale = useSpring(scale, { stiffness: 500, damping: 35, mass: 0.15 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let hoverActive = false;

    const updateMousePosition = (e: MouseEvent) => {
      const size = hoverActive ? 32 : 16;
      x.set(e.clientX - size / 2);
      y.set(e.clientY - size / 2);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        hoverActive = true;
        scale.set(2);
      } else {
        hoverActive = false;
        scale.set(1);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [scale, x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-y7x-accent rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform"
      style={{
        x: smoothX,
        y: smoothY,
        scale: smoothScale,
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
}
