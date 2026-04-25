import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const MagneticLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="hover:opacity-70 transition-opacity hover:text-y7x-accent px-4 py-2"
    >
      {children}
    </motion.a>
  );
};

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-4 md:px-8 md:py-5 text-white"
    >
      <div className="glass-panel rounded-2xl px-4 py-3 flex flex-col">
        <div className="text-xl font-bold tracking-tight font-display text-y7x-accent text-shimmer">
          &gt; QUIPIE_
        </div>
        <div className="text-[10px] font-display text-white/60 tracking-widest animate-pulse">
          powered by Y7X
        </div>
      </div>
      
      <div className="hidden md:flex items-center space-x-4 text-sm font-medium tracking-wide font-display glass-panel rounded-full px-4 py-2">
        <MagneticLink href="#playground">PLAYGROUND</MagneticLink>
        <MagneticLink href="#logic">LOGIC</MagneticLink>
        <MagneticLink href="#status">STATUS</MagneticLink>
      </div>

      <a 
        href="#status"
        className="glass-pill px-4 py-2 text-xs font-bold font-display uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300"
      >
        Let's Talk
      </a>
    </motion.nav>
  );
}
