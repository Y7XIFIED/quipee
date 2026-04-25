import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Traits from './components/Traits';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import Noise from './components/ui/Noise';
import ScrollProgress from './components/ui/ScrollProgress';
import PhysicsOverlay from './components/ui/PhysicsOverlay';
import HackerMode from './components/ui/HackerMode';
import ClickParticles from './components/ui/ClickParticles';
import CoffeeMode from './components/ui/CoffeeMode';
import GridBackground from './components/ui/GridBackground';
import TerminalModal from './components/ui/TerminalModal';
import Spotlight from './components/ui/Spotlight';
import TechStack from './components/TechStack';
import CodeShowcase from './components/CodeShowcase';
import { useKonamiCode } from './hooks/useKonamiCode';

function App() {
  const [hackerMode, setHackerMode] = useState(false);
  const [coffeeMode, setCoffeeMode] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);

  useKonamiCode(() => {
    setHackerMode(prev => !prev);
  });

  useEffect(() => {
    console.log(
      "%c HELLO THERE! %c \n\nIf you're reading this, you're probably looking for bugs. \nGood news: I made them myself! \n\nWelcome to Quipie.",
      "background: #CFCFCF; color: #000; font-size: 24px; font-weight: bold; padding: 10px;",
      "color: #fff; font-size: 14px;"
    );

    const lowPowerDevice =
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4 ||
      navigator.hardwareConcurrency <= 6 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setPerformanceMode(lowPowerDevice);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="animated-bg min-h-screen w-full overflow-x-hidden selection:bg-y7x-accent selection:text-black">
      {!performanceMode && <CustomCursor />}
      {!performanceMode && <Noise />}
      <ScrollProgress />
      {!performanceMode && <PhysicsOverlay />}
      <HackerMode active={hackerMode} />
      <ClickParticles />
      <CoffeeMode active={coffeeMode} />
      {!performanceMode && <GridBackground />}
      <TerminalModal />
      {!performanceMode && <Spotlight />}
      
      <Navbar />
      
      {/* Content Wrapper for Footer Reveal */}
      <div
        className="relative z-10 bg-y7x-dark shadow-2xl"
      >
        <Hero />
        <TechStack />
        <Philosophy />
        <CodeShowcase />
        <Traits />
      </div>
      
      <Footer
        onCoffeeClick={() => setCoffeeMode(prev => !prev)}
      />
    </main>
  );
}

export default App;
