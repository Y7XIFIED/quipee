import { useEffect, useRef } from 'react';

export default function Spotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        if (!spotlightRef.current) return;
        spotlightRef.current.style.background = `radial-gradient(520px at ${mouseRef.current.x}px ${mouseRef.current.y}px, rgba(212, 242, 104, 0.04), transparent 80%)`;
      });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ background: 'radial-gradient(520px at 50% 50%, rgba(212, 242, 104, 0.03), transparent 80%)' }}
    />
  );
}
