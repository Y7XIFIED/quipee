import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const GoofyFactsMarquee = () => {
  const facts = [
    "Has more unfinished ideas than finished snacks",
    "Trusts the process even when it's on fire",
    "Celebrates tiny wins like boss fights",
    "Names things dramatically for no reason",
    "Says 'just one more tweak' and vanishes for 2 hours",
    "Treats errors like riddles",
    "Laughs first, debugs later"
  ];

  return (
    <div className="relative flex overflow-hidden py-6 bg-black border-y border-white/10">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        className="flex whitespace-nowrap"
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex">
            {facts.map((fact, index) => (
              <span key={index} className="text-xl md:text-2xl font-display text-white/50 mx-8 flex items-center anim-bob">
                <span className="w-2 h-2 bg-y7x-accent rounded-full mr-4 inline-block" />
                {fact}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Philosophy() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rules = [
    { title: 'Rule #1', body: "If it's broken, it's a learning opportunity. (Or a reason to cry, then learn)." },
    { title: 'Rule #2', body: "If it's confusing, it's interesting. Chaos is just undocumented features." },
    { title: 'Rule #3', body: 'Every problem is either a tech problem or will become one after I over-engineer it.' }
  ];

  return (
    <section id="logic" className="relative bg-black text-white overflow-hidden">
      <GoofyFactsMarquee />
      
      <div ref={containerRef} className="px-6 md:px-12 py-24 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-8 bg-white/5 anim-breathe">
              The Logic (or lack thereof)
            </span>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.1]">
              If it works, <span className="text-white/30 line-through decoration-y7x-accent decoration-4">it's good</span> <span className="text-white text-shimmer">it's suspicious.</span>
            </h2>
          </motion.div>

          <motion.div
            style={{ y }}
            className="text-lg md:text-xl leading-relaxed space-y-8 pt-4 font-mono"
          >
            {rules.map((rule, index) => (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="p-6 border border-white/10 rounded-xl hover:bg-white/10 transition-colors duration-300 glass-panel glow-soft anim-bob"
              >
                <h3 className="font-bold mb-2">{rule.title}</h3>
                <p>{rule.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
