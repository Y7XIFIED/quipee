import { motion } from 'framer-motion';
import { Lightbulb, Bug, Zap, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const traits = [
  {
    id: "01",
    title: "Curiosity",
    description: "Runs on late-night ideas, random 'what if' thoughts, and the uncontrollable urge to poke systems.",
    icon: Lightbulb,
  },
  {
    id: "02",
    title: "Debugging",
    description: "Laughs first, debugs later. Finds unreasonable joy in fixing stuff that nobody else wants to touch.",
    icon: Bug,
  },
  {
    id: "03",
    title: "Automation",
    description: "Will spend 3 hours automating a 30-second task because it’s infinitely cooler that way.",
    icon: Zap,
  }
];

export default function Traits() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      id="playground" 
      className="relative min-h-screen bg-y7x-dark text-white px-6 md:px-12 py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24">
          <span className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-8 text-y7x-accent">
            Core Traits
          </span>
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight">
            Chaotically <br /> <span className="text-white/40">Logical.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {traits.map((trait, index) => (
            <motion.div
              key={trait.id}
              drag
              dragConstraints={containerRef}
              whileDrag={{ scale: 1.1, zIndex: 50 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group glass-panel glow-soft p-8 rounded-2xl cursor-grab active:cursor-grabbing"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="text-sm font-mono text-white/50">{trait.id}.</span>
                <div className="p-3 bg-white/5 rounded-full">
                  <trait.icon size={24} />
                </div>
              </div>
              
              <h3 className="text-2xl font-medium mb-4 text-white">{trait.title}</h3>
              <p className="text-white/60 leading-relaxed mb-8 min-h-[80px]">
                {trait.description}
              </p>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-y7x-accent">
                <span>Drag Me</span>
                <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
