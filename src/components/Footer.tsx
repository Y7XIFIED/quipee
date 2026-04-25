import { motion } from 'framer-motion';
import { ArrowUp, Activity, Cpu, Coffee } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import footerImage from '../../assets/footer.png';

const SystemStatus = () => {
  const [cpu, setCpu] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 30) + 70); // Random between 70-100
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 text-xs font-mono text-white/40 glass-pill px-4 py-2">
      <div className="flex items-center gap-2">
        <Cpu size={14} />
        <span>Cognitive Load: {cpu}%</span>
      </div>
      <div className="w-px h-4 bg-white/10" />
      <div className="flex items-center gap-2">
        <Activity size={14} className="text-y7x-accent animate-pulse" />
        <span>Execution Readiness: High</span>
      </div>
    </div>
  );
};

type FooterProps = {
  onCoffeeClick?: () => void;
};

export default function Footer({ onCoffeeClick }: FooterProps) {
  const footerRef = useRef<HTMLElement | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      id="status"
      className="relative w-full bg-black text-white px-6 md:px-12 py-16 md:py-20 border-t border-white/10 z-10 flex flex-col justify-start"
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 glass-pill text-xs font-bold uppercase tracking-wider text-y7x-accent">
              Status
            </span>
            <motion.div
              className="text-xl md:text-2xl font-light space-y-2 font-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p>Currently exploring tech.</p>
              <p className="text-white/50">Accidentally learning things.</p>
              <p className="text-y7x-accent text-sm mt-2 animate-pulse">
                &gt; Probably tweaking something right now_
              </p>
            </motion.div>

            <SystemStatus />
          </div>

          <motion.div
            className="glass-panel glow-soft rounded-2xl p-2 w-full md:w-[360px] lg:w-[420px] group"
          >
            <motion.img
              src={footerImage}
              alt="Footer visual"
              className="w-full h-48 md:h-56 object-cover rounded-xl grayscale group-hover:grayscale-0 transition-none anim-breathe"
              loading="lazy"
            />
          </motion.div>

          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-y7x-accent transition-colors hover:scale-110 inline-block">Twitter</a>
            <a href="#" className="hover:text-y7x-accent transition-colors hover:scale-110 inline-block">LinkedIn</a>
            <a href="#" className="hover:text-y7x-accent transition-colors hover:scale-110 inline-block">GitHub</a>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-white/10 pt-8">
          <div className="text-xs text-white/40 font-mono flex items-center gap-4">
            <span>© 2026 Y7XIFIED. CHAOTICALLY LOGICAL.</span>
            <button onClick={onCoffeeClick} className="hover:text-y7x-accent transition-colors" title="Refill Coffee">
              <Coffee size={14} />
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="p-4 glass-pill hover:bg-white hover:text-black transition-all duration-300 group hover:scale-110 active:scale-95"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-8"
        >
          <h1 className="text-[12vw] leading-none font-black tracking-tight font-display [font-variant-numeric:lining-nums] text-center md:text-left text-white/10 hover:text-white/100 transition-colors duration-700 cursor-default select-none">
            Y7XIFIED
          </h1>
        </motion.div>
      </div>
    </footer>
  );
}

