'use client';

import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import GradientBeam from '@/components/GradientBeam';
import Hero from '@/components/Hero';
import Experience, { EXPERIENCE_IMAGE_SOURCES } from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';

export const HERO_HOLD = 1;
export const EXP_SLIDE = 1;
export const EXP_HOLD = 0.5;

function waitForPageLoad() {
  if (document.readyState === 'complete') return Promise.resolve();

  return new Promise<void>((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true });
  });
}

function waitForFonts() {
  return document.fonts?.ready ?? Promise.resolve();
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => {
      if ('decode' in image) {
        image.decode().then(() => resolve()).catch(() => resolve());
        return;
      }
      resolve();
    };
    image.onerror = () => resolve();
    image.src = src;
  });
}

export default function Home() {
  const { isDark } = useTheme();
  const [assetsReady, setAssetsReady] = useState(false);
  const [experienceReady, setExperienceReady] = useState(false);
  const isReady = assetsReady && experienceReady;

  useEffect(() => {
    let cancelled = false;

    async function preparePage() {
      await Promise.all([
        waitForPageLoad(),
        waitForFonts(),
        Promise.all(EXPERIENCE_IMAGE_SOURCES.map(preloadImage)),
      ]);

      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (!cancelled) setAssetsReady(true);
    }

    preparePage();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (isReady) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isReady]);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow-x: hidden; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-700"
        style={{ opacity: isDark ? 0.42 : 0.62 }}
      >
        <GradientBeam />
      </div>
      <div className={`fixed inset-0 z-[1] pointer-events-none ${
        isDark ? 'bg-slate-950/38' : 'bg-white/20'
      }`} />

      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100svh',
        zIndex: 10,
        pointerEvents: 'auto',
      }}>
        <Hero />
      </div>

      <div style={{ position: 'relative', zIndex: 30, pointerEvents: 'none' }}>
        <div style={{ height: `${HERO_HOLD * 100}svh`, pointerEvents: 'none' }} />

        <Experience onReady={() => setExperienceReady(true)} />

        <div
          style={{
            position: 'relative',
            background: '#ffffff',
            pointerEvents: 'auto',
            paddingTop: 'clamp(72px, 10vw, 140px)',
          }}
        >
          <Projects />

          <div
            aria-hidden="true"
            style={{
              height: 'clamp(320px, 28vw, 380px)',
              marginTop: 'clamp(24px, 4vw, 64px)',
              background: `
                radial-gradient(
                  ellipse 180% 110% at 50% 118%,
                  #0a0a0a    10%,
                  #0a0a0a    25%,
                  #0f0f1f   35%,
                  #1e1b4b   45%,
                  #1d4ed8   55%,
                  #3b82f6   65%,
                  #93c5fd   75%,
                  #dbeafe   85%,
                  #f0f9ff   90%,
                  #ffffff  100%
                )
              `,
            }}
          />

          <Skills />
        </div>
      </div>

      <div
        aria-hidden={isReady}
        className={`fixed inset-0 flex flex-col items-center justify-center bg-black z-[200] transition-opacity duration-500 ${
          isReady ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
        }`}
      >
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin border-t-transparent" />
        </div>
        <p className="mt-4 text-white/60 text-sm tracking-wider font-mono animate-pulse">
          LOADING PORTFOLIO...
        </p>
      </div>
    </>
  );
}
