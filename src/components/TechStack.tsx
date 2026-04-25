import { motion } from 'framer-motion';

const techs = [
  "React", "TypeScript", "Vite", "Tailwind", "Framer Motion", "Node.js", "Next.js", "Three.js", "Matter.js", "Rust", "Python", "Docker", "AWS", "GraphQL"
];

export default function TechStack() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="py-12 overflow-hidden relative z-10 glass-panel glow-soft anim-bob rounded-3xl mx-4 md:mx-8 my-8"
    >
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        className="flex whitespace-nowrap gap-16"
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-16">
            {techs.map((tech, index) => (
              <span key={index} className="text-2xl font-display text-white/40 font-bold uppercase tracking-widest hover:text-y7x-accent transition-colors cursor-default text-shimmer">
                {tech}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
