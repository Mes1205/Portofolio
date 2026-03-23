import Hero from '@/components/Hero'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Semua bagian web kamu dipanggil di sini */}
      <Hero />
      <Projects />
      <Experience />
      
      {/* Footer Sederhana */}
      <footer className="py-10 text-center text-slate-400 text-sm">
        © 2026 Portofolio. Built with Next.js
      </footer>
    </main>
  )
}