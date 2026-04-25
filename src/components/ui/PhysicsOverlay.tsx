import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

export default function PhysicsOverlay() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  useEffect(() => {
    const handleTrigger = () => {
      if (!sceneRef.current) return;

      // Initialize engine if not already done
      if (!engineRef.current) {
        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const Runner = Matter.Runner;
        const World = Matter.World;
        const Bodies = Matter.Bodies;
        const MouseConstraint = Matter.MouseConstraint;
        const Mouse = Matter.Mouse;

        const engine = Engine.create();
        engineRef.current = engine;

        const render = Render.create({
          element: sceneRef.current,
          engine: engine,
          options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: 'transparent',
            wireframes: false,
          }
        });
        renderRef.current = render;

        // Boundaries
        const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, { isStatic: true, render: { visible: false } });
        const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true, render: { visible: false } });
        const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true, render: { visible: false } });

        World.add(engine.world, [ground, leftWall, rightWall]);

        // Mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: { visible: false }
          }
        });
        World.add(engine.world, mouseConstraint);

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);
      }

      // Spawn objects
      const Bodies = Matter.Bodies;
      const World = Matter.World;
      
      const shapes = [];
      for (let i = 0; i < 10; i++) {
        const x = Math.random() * window.innerWidth;
        const y = -Math.random() * 500 - 50;
        const size = Math.random() * 40 + 20;
      const color = Math.random() > 0.5 ? '#CFCFCF' : '#FFFFFF';
        
        const body = Bodies.polygon(x, y, Math.floor(Math.random() * 5) + 3, size, {
          restitution: 0.9,
          render: {
            fillStyle: color,
            strokeStyle: '#000',
            lineWidth: 2
          }
        });
        shapes.push(body);
      }
      
      World.add(engineRef.current.world, shapes);
    };

    window.addEventListener('trigger-physics', handleTrigger);
    return () => window.removeEventListener('trigger-physics', handleTrigger);
  }, []);

  return (
    <div ref={sceneRef} className="fixed inset-0 pointer-events-none z-[50] [&>canvas]:pointer-events-auto" />
  );
}
