import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Step = {
  id: string;
  command: string;
  doneAt: number;
};

const steps: Step[] = [
  { id: 'fs', command: 'mount /dev/ui-theme /mnt/runtime', doneAt: 12 },
  { id: 'cfg', command: 'load-config --profile=production', doneAt: 28 },
  { id: 'mods', command: 'init-modules --core --ui --motion', doneAt: 46 },
  { id: 'cache', command: 'warm-cache --assets --fonts', doneAt: 63 },
  { id: 'hooks', command: 'bind-hooks --input --scroll --cursor', doneAt: 78 },
  { id: 'render', command: 'start-renderer --target=webgl2', doneAt: 92 },
  { id: 'ready', command: 'echo READY', doneAt: 100 }
];

function formatUptime(ms: number): string {
  const sec = (ms / 1000).toFixed(2);
  return `${sec}s`;
}

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [uptimeMs, setUptimeMs] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();

    const timer = setInterval(() => {
      setUptimeMs(performance.now() - startedAt);
    }, 33);

    const progress = setInterval(() => {
      setCount((prev) => {
        const inc = prev < 20 ? 1 : prev < 45 ? 2 : prev < 70 ? 3 : prev < 90 ? 4 : 5;
        const next = Math.min(100, prev + inc);

        if (next >= 100) {
          clearInterval(progress);
          setTimeout(() => setIsLoading(false), 180);
        }

        return next;
      });
    }, 28);

    return () => {
      clearInterval(timer);
      clearInterval(progress);
    };
  }, []);

  const completedSteps = useMemo(() => steps.filter((s) => count >= s.doneAt), [count]);
  const activeStep = useMemo(() => steps.find((s) => count < s.doneAt), [count]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[10000] bg-black/90 text-white backdrop-blur-sm"
        >
          <div className="w-full h-full px-4 md:px-6 flex items-center justify-center">
            <motion.div
              className="w-full max-w-2xl border rounded-xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.10) 100%)",
                borderColor: "rgba(255,255,255,0.24)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
                backdropFilter: "blur(18px) saturate(120%)",
                WebkitBackdropFilter: "blur(18px) saturate(120%)",
              }}
              initial={{ scale: 0.96, opacity: 0.9 }}
              animate={{ scale: 0.96 + count * 0.0004, opacity: 0.9 + count * 0.001 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="flex items-center justify-between border-b border-white/25 px-3 py-2 text-xs text-white/80 bg-black/20" style={{ fontFamily: '"TerminalTest", monospace' }}>
                <span>quipie@boot:~</span>
                <span>BOOT CONSOLE v1.0</span>
              </div>

              <div className="text-sm md:text-base" style={{ fontFamily: '"TerminalTest", monospace' }}>
                <div className="px-3 py-3 leading-6 text-white/90">
                  <p className="text-white">$ ./boot.sh --theme=liquid-glass --mode=prod</p>
                  <p className="text-white/60">Starting boot pipeline...</p>

                  <div className="mt-3 space-y-1">
                    {steps.map((step) => {
                      const done = count >= step.doneAt;
                      const running = !done && activeStep?.id === step.id;

                      return (
                        <div key={step.id} className="flex items-start gap-3">
                          <span className={`w-14 ${done ? 'text-y7x-accent' : running ? 'text-white/70' : 'text-white/30'}`}>
                            {done ? '[ OK ]' : running ? '[....]' : '[    ]'}
                          </span>
                          <span className={done ? 'text-white' : running ? 'text-white/90' : 'text-white/40'}>{step.command}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 border-t border-white/20 pt-4 text-white/70">
                    <p>progress: {count}% ({completedSteps.length}/{steps.length} steps)</p>
                    <p>uptime: {formatUptime(uptimeMs)}</p>
                    <p>cursor: hardware accelerated</p>
                  </div>

                  <div className="mt-4 h-2 w-full border border-white/30 bg-black">
                    <div className="h-full bg-white" style={{ width: `${count}%` }} />
                  </div>

                  <p className="mt-4 text-white">
                    {count < 100 ? '$ waiting for init completion_' : '$ launch complete'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
