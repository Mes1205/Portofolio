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
      className={`relative transition-colors duration-300 ${
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
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.35 }}>
        <GradientBeam />
      </div>

      {/* Overlay biar teks terbaca */}
      <div className={`fixed inset-0 z-[1] pointer-events-none ${
        isDark ? 'bg-slate-950/40' : 'bg-white/50'
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