
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { useTheme } from '@/app/ThemeProvider';

const projects = [
  {
    title: "Zichara",
    desc: "Aplikasi Augmented Reality mobile untuk pembelajaran aksara Hanzi dan Pinyin secara interaktif. Menggunakan teknologi ARCore untuk menampilkan karakter 3D dan membantu pengguna memahami penulisan dengan cara yang lebih engaging.",
    tech: ["Unity", "C#", "ARCore", "AR"],
    role: "Full Stack Developer",
    whatIDid: [
      "Merancang arsitektur aplikasi AR dan flow pembelajaran dari scan hingga interaksi karakter.",
      "Mengembangkan fitur render objek 3D Hanzi/Pinyin berbasis ARCore di Unity.",
      "Membuat halaman latihan interaktif dan validasi progres belajar pengguna.",
      "Kolaborasi dengan tim desain untuk optimasi UX agar mudah dipakai pemula."
    ],
    github: "https://github.com/",
    images: [
      "/images/zichara-1.png",
      "/images/zichara-2.png",
    ]
  },
  {
    title: "Urunin",
    desc: "Platform web untuk manajemen pengeluaran bersama dan pelacakan hutang antar teman. Fitur real-time sync, perhitungan otomatis, dan riwayat transaksi yang terstruktur untuk memudahkan penyelesaian hutang.",
    tech: ["React.js", "Tailwind CSS", "Firebase", "JavaScript"],
    role: "Frontend Developer",
    whatIDid: [
      "Membangun dashboard transaksi dan ringkasan hutang dengan komponen reusable.",
      "Mengintegrasikan data real-time Firebase untuk update saldo dan histori secara langsung.",
      "Menerapkan perhitungan otomatis split bill dan status pembayaran per anggota.",
      "Membuat UI responsif untuk mobile dan desktop agar tetap nyaman digunakan."
    ],
    github: "https://github.com/",
    images: [
      "/images/urunin-1.png",
      "/images/urunin-2.png",
    ]
  },
];

export default function Projects() {
  const { isDark } = useTheme();
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null;
  const activeImages = activeProject?.images?.length ? activeProject.images : [];

  const closeModal = () => {
    setActiveProjectIndex(null);
    setActiveSlideIndex(0);
  };

  const openModal = (index) => {
    setActiveProjectIndex(index);
    setActiveSlideIndex(0);
  };

  const goToPrevSlide = () => {
    if (!activeImages.length) return;
    setActiveSlideIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  const goToNextSlide = () => {
    if (!activeImages.length) return;
    setActiveSlideIndex((prev) => (prev + 1) % activeImages.length);
  };

  useEffect(() => {
    if (activeProjectIndex === null) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeModal();
      if (event.key === 'ArrowLeft') goToPrevSlide();
      if (event.key === 'ArrowRight') goToNextSlide();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeProjectIndex, activeImages.length]);
  
  return (
    <>
      <section id="projects" className="py-20 px-6 max-w-5xl mx-auto scroll-mt-20">
        <h2 className={`text-3xl font-bold mb-12 ${isDark ? 'text-white' : 'text-black'}`}>Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openModal(i)}
              className={`group border rounded-2xl p-6 hover:shadow-lg transition-all text-left cursor-pointer ${
                isDark
                  ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-400'
              }`}
            >
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
            </button>
          ))}
        </div>
      </section>

      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div
            className={`relative w-full max-w-3xl rounded-2xl border overflow-hidden ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex items-start justify-between px-6 py-4 border-b ${
              isDark ? 'border-slate-700' : 'border-slate-100'
            }`}>
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activeProject.title}
                </h3>
                <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {activeProject.role}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className={`rounded-full w-8 h-8 flex items-center justify-center transition-colors ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                }`}
                aria-label="Tutup"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body — 2 kolom */}
            <div className="grid md:grid-cols-2">

              {/* Kiri: gambar */}
              <div className={`flex flex-col border-b md:border-b-0 md:border-r ${
                isDark ? 'border-slate-700' : 'border-slate-100'
              }`}>
                <div className={`flex-1 flex items-center justify-center min-h-[220px] ${
                  isDark ? 'bg-slate-800' : 'bg-slate-50'
                }`}>
                  {activeImages.length > 0 ? (
                    <img
                      src={activeImages[activeSlideIndex]}
                      alt={`${activeProject.title} slide ${activeSlideIndex + 1}`}
                      className="w-full h-[220px] md:h-[260px] object-cover"
                    />
                  ) : (
                    <p className={`text-sm text-center px-6 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      Tambahkan gambar di <code className="text-xs">public/images</code>
                    </p>
                  )}
                </div>

                {/* Slide nav */}
                {activeImages.length > 1 && (
                  <div className={`flex items-center justify-between px-4 py-3 border-t ${
                    isDark ? 'border-slate-700' : 'border-slate-100'
                  }`}>
                    <button
                      type="button"
                      onClick={goToPrevSlide}
                      className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        isDark
                          ? 'border-slate-600 text-slate-400 hover:bg-slate-800'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <ChevronLeft size={12} /> Prev
                    </button>

                    <div className="flex items-center gap-1.5">
                      {activeImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveSlideIndex(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === activeSlideIndex
                              ? 'w-4 bg-blue-500'
                              : isDark
                                ? 'w-1.5 bg-slate-600'
                                : 'w-1.5 bg-slate-300'
                          }`}
                          aria-label={`Slide ${i + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={goToNextSlide}
                      className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        isDark
                          ? 'border-slate-600 text-slate-400 hover:bg-slate-800'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      Next <ChevronRight size={12} />
                    </button>
                  </div>
                )}
              </div>

              {/* Kanan: detail */}
              <div className="flex flex-col gap-5 px-6 py-5 overflow-y-auto max-h-[380px]">
                <div>
                  <p className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}>Tentang</p>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {activeProject.desc}
                  </p>
                </div>

                <div>
                  <p className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}>Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t) => (
                      <span key={t} className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        isDark
                          ? 'bg-blue-900/40 text-blue-300 border border-blue-800'
                          : 'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className={`text-[11px] font-semibold uppercase tracking-widest mb-2 ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}>Kontribusi</p>
                  <ul className="flex flex-col gap-2">
                    {activeProject.whatIDid.map((item, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                        <span className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={`flex items-center justify-between px-6 py-3.5 border-t ${
              isDark ? 'border-slate-700' : 'border-slate-100'
            }`}>
              <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                {activeProjectIndex + 1} dari {projects.length} project
              </span>

              <a
                href={activeProject.github}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                  isDark
                    ? 'bg-white text-slate-900 hover:bg-slate-100'
                    : 'bg-slate-900 text-white hover:bg-slate-700'
                }`}
              >
                <ExternalLink size={14} />
                Lihat GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}