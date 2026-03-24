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
  return (
    // TAMBAHKAN id="projects" DI SINI
    <section id="projects" className="bg-white py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
      <h2 className="text-3xl font-bold mb-12 text-black">Featured Projects</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <div key={i} className="group border border-slate-200 p-6 rounded-2xl hover:shadow-lg transition-all bg-white">
            <h3 className="text-2xl font-bold mb-2 text-slate-900 group-hover:text-blue-600">
              {p.title}
            </h3>
            <p className="text-slate-700 mb-6 leading-relaxed">
              {p.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map(t => (
                <span key={t} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-semibold">
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