'use client';

import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import GradientBeam from '@/components/GradientBeam'
import { useTheme } from './ThemeProvider';

export default function Home() {
  const { isDark } = useTheme();

  return (
    <main
      className={`relative transition-colors duration-700 ease-in-out ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
      }}
    >
      {/* GradientBeam */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-700 ease-in-out"
        style={{ opacity: isDark ? 0.42 : 0.62 }}
      >
        <GradientBeam />
      </div>

      {/* Overlay biar teks terbaca */}
      <div className={`fixed inset-0 z-[1] pointer-events-none transition-colors duration-700 ease-in-out ${
        isDark ? 'bg-slate-950/38' : 'bg-white/20'
      }`} />

      <div className="relative z-10">
        <div style={{ scrollSnapAlign: 'start', minHeight: '100vh' }}>
          <Hero />
        </div>
        <div style={{ scrollSnapAlign: 'start', minHeight: '100vh' }}>
          <Experience />
        </div>
        <div style={{ scrollSnapAlign: 'start', minHeight: '100vh' }}>
          <Projects />
        </div>
        <div style={{ scrollSnapAlign: 'start', minHeight: '100vh' }}>
          <Skills />
        </div>
      </div>
    </main>
  );
}