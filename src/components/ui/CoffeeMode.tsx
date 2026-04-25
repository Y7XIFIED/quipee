import { motion, AnimatePresence } from 'framer-motion';

export default function CoffeeMode({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="fixed inset-0 z-[9998] bg-[#6F4E37] opacity-90 pointer-events-none flex items-center justify-center"
        >
          <div className="text-white text-9xl font-bold animate-pulse">
            CAFFEINE OVERLOAD
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
