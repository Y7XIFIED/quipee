import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';

export default function TerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to Quipie Terminal v1.0.0",
    "Type 'help' for available commands."
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `> ${input}`];

    switch (cmd) {
      case 'help':
        newHistory.push("Available commands: help, clear, about, contact, exit");
        break;
      case 'clear':
        setHistory([]);
        setInput("");
        return;
      case 'about':
        newHistory.push("Quipie: A chaotic entity converting caffeine into code.");
        break;
      case 'contact':
        newHistory.push("Email: hello@quipie.dev");
        break;
      case 'exit':
        setIsOpen(false);
        break;
      default:
        newHistory.push(`Command not found: ${cmd}`);
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-2xl bg-black border border-y7x-accent/50 rounded-lg shadow-2xl overflow-hidden font-mono text-sm md:text-base">
            <div className="flex justify-between items-center px-4 py-2 bg-y7x-accent/10 border-b border-y7x-accent/20">
              <div className="flex items-center gap-2 text-y7x-accent">
                <TerminalIcon size={16} />
                <span>TERMINAL</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                <X size={16} />
              </button>
            </div>
          <div className="p-4 h-[400px] overflow-y-auto text-y7x-accent space-y-2" onClick={() => document.getElementById('terminal-input')?.focus()}>
              {history.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
              <form onSubmit={handleCommand} className="flex gap-2">
                <span className="text-y7x-accent">{'>'}</span>
                <input
                  id="terminal-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-y7x-accent focus:ring-0"
                  autoFocus
                />
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
