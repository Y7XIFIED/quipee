import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const heroName = 'Y7XIFIED';
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  const triggerPhysics = () => {
    window.dispatchEvent(new CustomEvent('trigger-physics'));
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] bg-y7x-dark text-white px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-36 overflow-hidden flex items-center"
    >
      <motion.div style={{ y, opacity }} className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs md:text-sm uppercase tracking-[0.2em] text-y7x-accent mb-6"
        >
          quipie // terminal build
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight font-bold"
          whileHover={{ scale: 1.01 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.06,
                delayChildren: 0.08,
              },
            },
          }}
        >
          {heroName.split('').map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 26, filter: 'blur(4px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14 }}
          className="mt-8 max-w-2xl text-base md:text-xl text-white/70 leading-relaxed"
        >
          Retro-coded web experiences with clean systems, strong motion, and terminal-first personality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <motion.button
            onClick={triggerPhysics}
            className="glass-pill inline-flex items-center gap-3 px-6 py-3 text-xs md:text-sm font-bold uppercase tracking-[0.14em] hover:bg-y7x-accent hover:text-black transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Poke the System</span>
            <motion.span>
              <Terminal size={16} />
            </motion.span>
          </motion.button>
          <motion.span
            className="glass-pill px-4 py-2 text-[11px] md:text-xs uppercase tracking-[0.12em] text-white/70"
          >
            Shipping fast since 2026
          </motion.span>
          <motion.span
            className="glass-pill px-4 py-2 text-[11px] md:text-xs uppercase tracking-[0.12em] text-white/70"
          >
            Performance-first builds
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <motion.div
            className="glass-panel rounded-2xl p-5"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-xs uppercase tracking-[0.14em] text-white/50">Build Cadence</p>
            <p className="mt-2 text-2xl font-bold text-y7x-accent">Rapid</p>
            <p className="mt-1 text-sm text-white/65">From idea to live ship in relentless short cycles.</p>
          </motion.div>
          <motion.div
            className="glass-panel rounded-2xl p-5"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-xs uppercase tracking-[0.14em] text-white/50">Architecture</p>
            <p className="mt-2 text-2xl font-bold text-y7x-accent">Structured</p>
            <p className="mt-1 text-sm text-white/65">Composable modules with clear intent and readable flow.</p>
          </motion.div>
          <motion.div
            className="glass-panel rounded-2xl p-5"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-xs uppercase tracking-[0.14em] text-white/50">Interaction Layer</p>
            <p className="mt-2 text-2xl font-bold text-y7x-accent">Precise</p>
            <p className="mt-1 text-sm text-white/65">Motion and visuals tuned to feel sharp, legible, and intentional.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
