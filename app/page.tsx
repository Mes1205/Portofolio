'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';
import GradientBeam from '@/components/GradientBeam';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';

export const HERO_HOLD = 1;
export const EXP_SLIDE = 1;
export const EXP_HOLD = 0.5;

export default function Home() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-[60]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <p className="mt-4 text-white/60 text-sm tracking-wider font-mono animate-pulse">
          LOADING PORTFOLIO...
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Global styles */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow-x: hidden; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Gradient background layer */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-700"
        style={{ opacity: isDark ? 0.42 : 0.62 }}
      >
        <GradientBeam />
      </div>
      <div className={`fixed inset-0 z-[1] pointer-events-none ${
        isDark ? 'bg-slate-950/38' : 'bg-white/20'
      }`} />

      {/* Fixed Hero layer */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 10,
        pointerEvents: 'auto',
      }}>
        <Hero />
      </div>

      {/* ==================== SCROLLABLE CONTENT ==================== */}
      <div style={{ position: 'relative', zIndex: 30 }}>
        {/* Spacer: scroll past Hero */}
        <div style={{ height: `${HERO_HOLD * 100}vh` }} />

        {/* Experience — wrapper & sticky logic di dalam komponen */}
        <Experience />

        {/* Projects + Skills */}
        <div style={{ position: 'relative', background: '#ffffff', pointerEvents: 'auto' }}>
          <Projects />
          <Skills />
        </div>
      </div>
    </>
  );
}