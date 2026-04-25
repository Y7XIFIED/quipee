import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeSnippet = `const Quipie = {
  status: "Caffeinated",
  skills: ["Breaking things", "Fixing things"],
  philosophy: () => {
    while (alive) {
      learn();
      create();
      sleep(optional);
    }
  }
};`;

export default function CodeShowcase() {
  const [displayedCode, setDisplayedCode] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedCode(codeSnippet.slice(0, i));
      i++;
      if (i > codeSnippet.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-y7x-dark relative z-10 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <div
          className="glass-panel glow-soft rounded-xl overflow-hidden shadow-2xl"
          style={{ fontFamily: '"TerminalTest", monospace' }}
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-black/30 border-b border-white/10">
            <motion.div className="w-3 h-3 rounded-full bg-white/45" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
            <motion.div className="w-3 h-3 rounded-full bg-white/60" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.2 }} />
            <motion.div className="w-3 h-3 rounded-full bg-white/80" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }} />
            <span className="ml-2 text-xs text-white/40 font-display">brain_dump.ts</span>
          </div>
          <div className="p-6 text-sm md:text-base text-gray-300 overflow-x-auto">
            <pre>
              <code>{displayedCode}<span className="animate-pulse text-y7x-accent">_</span></code>
            </pre>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
