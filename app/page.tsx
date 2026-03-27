import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import GradientBeam from '@/components/GradientBeam'

export default function Home() {
  return (
    <main className="relative bg-white min-h-screen">
      {/* Ambient gradient beam — loops forever behind all content */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <GradientBeam />
      </div>

      {/* Semua bagian web kamu dipanggil di sini */}
      <div className="relative z-10">
        <Hero />
        <Projects />
        <Experience />
      </div>
      
      {/* Footer Sederhana */}
      <footer className="py-10 text-center text-slate-400 text-sm">
        081380804108 #callMe #hireMe #infoLoker
      </footer>
    </main>
  )
}