'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';
import GradientBeam from '@/components/GradientBeam';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';

export const HERO_HOLD = 1;
export const EXP_SLIDE = 1;
export const EXP_HOLD  = 0.5;

export default function Home() {
  const { isDark } = useTheme();
  const mainWrapperRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const [wrapperHeight, setWrapperHeight] = useState<string>('600vh');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let rafId: number;
    let attempts = 0;
    const MAX_ATTEMPTS = 20;

    async function computeHeight(): Promise<void> {
      // Wait for fonts to load first — this affects scrollWidth measurements
      await document.fonts.ready;

      const vh = window.innerHeight;
      const expTrack = document.querySelector<HTMLDivElement>('[data-exp-track]');
      const trackMaxX = expTrack
        ? Math.max(0, expTrack.scrollWidth - window.innerWidth)
        : 0;

      // If track not found yet, retry
      if (!expTrack && attempts < MAX_ATTEMPTS) {
        attempts++;
        setTimeout(computeHeight, 200);
        return;
      }

      const totalPx =
        (HERO_HOLD + EXP_SLIDE + EXP_HOLD + 1) * vh +
        trackMaxX;

      setWrapperHeight(`${totalPx}px`);
      setIsReady(true);

      // Defer ScrollTrigger.refresh until after paint
      requestAnimationFrame(() => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      });
    }

    // Wait for initial paint + layout
    rafId = requestAnimationFrame(() => {
      setTimeout(computeHeight, 150);
    });

    // Also run on resize
    const ro = new ResizeObserver(() => {
      attempts = 0;
      computeHeight();
    });
    ro.observe(document.body);

    window.addEventListener('resize', computeHeight);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', computeHeight);
    };
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow-x: hidden; }
      `}</style>

      {/* Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-700"
        style={{ opacity: isDark ? 0.42 : 0.62 }}
      >
        <GradientBeam />
      </div>
      <div className={`fixed inset-0 z-[1] pointer-events-none ${
        isDark ? 'bg-slate-950/38' : 'bg-white/20'
      }`} />

      {/* Hero + Experience scroll wrapper */}
      <div
        ref={mainWrapperRef}
        style={{ position: 'relative', width: '100%', height: wrapperHeight }}
      >
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: 10,
        }}>
          <Hero />
        </div>

        <Experience mainWrapperRef={mainWrapperRef} isReady={isReady} />
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 30,
          width: '100%',
          marginTop: 0,
          background: '#ffffff',
        }}
      >
        <Projects />
        <Skills />
      </div>
    </>
  );
}