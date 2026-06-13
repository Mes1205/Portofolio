'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import GradientBeam from '@/components/GradientBeam';
import Hero from '@/components/Hero';
import Experience, { EXPERIENCE_INITIAL_IMAGE_SOURCES } from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';

export const HERO_HOLD = 1;
export const EXP_SLIDE = 1;
export const EXP_HOLD = 0.5;

function waitForFonts() {
  return document.fonts?.ready ?? Promise.resolve();
}

function withTimeout<T>(promise: Promise<T>, ms: number) {
  return Promise.race([
    promise,
    new Promise<void>((resolve) => setTimeout(resolve, ms)),
  ]);
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new window.Image();
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
        withTimeout(waitForFonts(), 1200),
        withTimeout(Promise.all(EXPERIENCE_INITIAL_IMAGE_SOURCES.map(preloadImage)), 1800),
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
    const previousScrollRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = 'manual';
    document.body.style.overflow = 'hidden';
    if (!window.location.hash) window.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [isReady]);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow-x: hidden; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes loader-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(260%); }
        }
        @keyframes loader-pop {
          0%, 100% { transform: translateY(0); opacity: 0.38; }
          45% { transform: translateY(-7px); opacity: 1; }
        }
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
        className={`fixed inset-0 flex flex-col items-center justify-center z-[200] transition-opacity duration-500 ${
          isReady ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 38%, rgba(28, 70, 161, 0.22), transparent 32%), linear-gradient(180deg, #020617 0%, #050816 55%, #020617 100%)',
        }}
      >
        <div
          className="relative flex items-center justify-center rounded-[32px]"
          style={{
            width: 'min(280px, 70vw)',
            aspectRatio: '1 / 1',
            overflow: 'hidden',
          }}
        >
          <Image
            src="/loading.gif"
            alt=""
            width={500}
            height={500}
            priority
            unoptimized
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        <div className="-mt-3 flex items-center gap-2">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="rounded-full"
              style={{
                width: 7,
                height: 7,
                background: dot === 1 ? '#0073ff' : '#7db5ff',
                animation: `loader-pop 1s ease-in-out ${dot * 0.12}s infinite`,
              }}
            />
          ))}
        </div>

        <p className="mt-2 text-white/75 text-xs tracking-[0.22em] font-mono">
          WARMING UP THE PORTFOLIO ^^
        </p>

        <div
          className="mt-2 overflow-hidden rounded-full"
          style={{
            width: 'min(220px, 60vw)',
            height: 6,
            background: 'rgba(255,255,255,0.09)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            style={{
              width: '45%',
              height: '100%',
              borderRadius: 999,
              background: 'linear-gradient(90deg, #60a5fa, #159bfa, #a671fb)',
              animation: 'loader-scan 1.25s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </>
  );
}
