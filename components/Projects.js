

import { useTheme } from '@/app/ThemeProvider';

const projects = [
  {
    title: "Zichara",
    desc: "Aplikasi Augmented Reality untuk belajar Hanzi & Pinyin.",
    tech: ["Unity", "C#", "ARCore"],
  },
  {
    title: "Urunin",
    desc: "Web app untuk manajemen split-bill dan pelacakan hutang.",
    tech: ["React.js", "Tailwind", "Firebase"],
  },
];
export default function Projects() {
  const { isDark } = useTheme();
  
  return (
    <section id="projects" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
      <h2 className={`text-3xl font-bold mb-12 ${isDark ? 'text-white' : 'text-black'}`}>Featured Projects</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <div key={i} className={`group border rounded-2xl p-6 hover:shadow-lg transition-all ${
            isDark 
              ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500' 
              : 'bg-slate-50 border-slate-200 hover:border-blue-400'
          }`}>
            <h3 className={`text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {p.title}
            </h3>
            <p className={`mb-6 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {p.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map(t => (
                <span key={t} className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  isDark 
                    ? 'bg-blue-900/50 text-blue-300 border border-blue-700' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}