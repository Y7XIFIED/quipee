import { useEffect, useRef } from 'react';

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const gridSize = 56;
    const points: { x: number; y: number; originX: number; originY: number }[] = [];

    for (let x = 0; x <= width; x += gridSize) {
      for (let y = 0; y <= height; y += gridSize) {
        points.push({ x, y, originX: x, originY: y });
      }
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let rafId = 0;
    let lastFrame = 0;
    const targetFrameMs = 1000 / 45;

    const animate = (time: number) => {
      if (time - lastFrame < targetFrameMs) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      lastFrame = time;
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;

      points.forEach(point => {
        const dx = mouseX - point.originX;
        const dy = mouseY - point.originY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        const force = Math.max(0, (maxDistance - distance) / maxDistance);
        const angle = Math.atan2(dy, dx);

        point.x = point.originX + Math.cos(angle) * force * -20;
        point.y = point.originY + Math.sin(angle) * force * -20;

        ctx.beginPath();
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
      });

      // Draw lines (simplified for performance)
      // Actually, just drawing dots is cleaner and faster for "heavy load"
      
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const nextDpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * nextDpr);
      canvas.height = Math.floor(height * nextDpr);
      ctx.setTransform(nextDpr, 0, 0, nextDpr, 0, 0);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
