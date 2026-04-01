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
    <main className={`relative transition-colors duration-300 ${
      isDark ? 'bg-slate-950' : 'bg-white'
    }`}>
      {/* Ambient gradient beam — loops forever behind all content */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <GradientBeam />
      </div>

      {/* Semua bagian web kamu dipanggil di sini */}
      <div className="relative z-10">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
      </div>
      
      {/* Footer Sederhana */}
      <footer className={`py-10 text-center text-sm transition-colors ${
        isDark ? 'text-slate-500' : 'text-slate-400'
      }`}>
        081380804108 #callMe #hireMe #infoLoker
      </footer>
    </main>
  )
}