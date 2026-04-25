import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function ClickParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = Date.now();
      setParticles(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <AnimatePresence>
      {particles.map(particle => (
        <ParticleGroup key={particle.id} x={particle.x} y={particle.y} />
      ))}
    </AnimatePresence>
  );
}

const ParticleGroup = ({ x, y }: { x: number, y: number }) => {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x, y, scale: 1, opacity: 1 }}
          animate={{
            x: x + (Math.random() - 0.5) * 100,
            y: y + (Math.random() - 0.5) * 100,
            opacity: 0,
            scale: 0
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed w-2 h-2 bg-y7x-accent rounded-full pointer-events-none z-[9999]"
        />
      ))}
    </>
  );
};
