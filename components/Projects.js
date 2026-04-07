'use client';

import { useEffect, useState, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { useTheme } from '@/app/ThemeProvider';

const projects = [
  {
    title: "Zichara",
    desc: "Aplikasi Augmented Reality mobile untuk pembelajaran aksara Hanzi dan Pinyin secara interaktif. Menggunakan teknologi ARCore untuk menampilkan karakter 3D dan membantu pengguna memahami penulisan dengan cara yang lebih engaging.",
    tech: ["Unity", "C#", "ARCore", "AR"],
    role: "Full Stack Developer",
    category: "Mobile Development / AR",
    whatIDid: [
      "Merancang arsitektur aplikasi AR dan flow pembelajaran dari scan hingga interaksi karakter.",
      "Mengembangkan fitur render objek 3D Hanzi/Pinyin berbasis ARCore di Unity.",
      "Membuat halaman latihan interaktif dan validasi progres belajar pengguna.",
      "Kolaborasi dengan tim desain untuk optimasi UX agar mudah dipakai pemula."
    ],
    github: "https://github.com/",
    images: ["/images/zichara-1.png", "/images/zichara-2.png"]
  },
  {
    title: "Urunin",
    desc: "Platform web split bill dengan OCR API untuk scan struk otomatis. Bisa maintain utang piutang antar teman dan tracking pengeluaran pribadi dengan riwayat transaksi terstruktur.",
    tech: ["React.js", "Tailwind CSS", "Firebase", "JavaScript", "OCR API"],
    role: "Frontend Developer",
    category: "Web Development",
    whatIDid: [
      "Integrasi OCR API untuk scan dan parse struk belanja secara otomatis.",
      "Membangun sistem tracking utang piutang dengan perhitungan otomatis per anggota.",
      "Membuat dashboard pengeluaran pribadi dengan riwayat transaksi terstruktur.",
      "Mengintegrasikan Firebase real-time untuk sinkronisasi data antar pengguna."
    ],
    github: "https://github.com/",
    images: ["/images/urunin-1.png", "/images/urunin-2.png"]
  },
  {
    title: "Seluna",
    desc: "Prototype Figma aplikasi keamanan khusus perempuan. Ketika dalam bahaya, pengguna bisa langsung menelepon kontak darurat, mengirim alert ke semua kontak terpercaya, dan berbagi lokasi real-time secara otomatis.",
    tech: ["Figma", "UI/UX Design", "Prototyping"],
    role: "UI/UX Designer",
    category: "UI/UX Design / Safety App",
    whatIDid: [
      "Merancang user flow darurat yang bisa diakses dengan satu tap dalam situasi bahaya.",
      "Mendesain sistem alert otomatis ke kontak darurat beserta pengiriman lokasi real-time.",
      "Membuat prototype interaktif lengkap dari onboarding hingga fitur SOS.",
      "Riset UX untuk memastikan UI tetap mudah digunakan dalam kondisi panik."
    ],
    github: "https://github.com/",
    images: ["/images/seluna-1.png", "/images/seluna-2.png"]
  },
  {
    title: "Addicx",
    desc: "Prototype Figma platform untuk membantu orang yang ingin berhenti dari kecanduan. Dilengkapi fitur komunitas untuk sharing antar sesama, progress tracker, dan konsultasi langsung ke profesional.",
    tech: ["Figma", "UI/UX Design", "Prototyping"],
    role: "UI/UX Designer",
    category: "UI/UX Design / Health App",
    whatIDid: [
      "Mendesain fitur komunitas untuk sharing pengalaman dan saling support antar pengguna.",
      "Merancang sistem konsultasi dengan profesional kesehatan langsung dari aplikasi.",
      "Membuat progress tracker visual untuk memotivasi pengguna dalam perjalanan pemulihan.",
      "Mendesain onboarding personal berdasarkan jenis dan tingkat kecanduan pengguna."
    ],
    github: "https://github.com/",
    images: ["/images/addicx-1.png", "/images/addicx-2.png"]
  },
  {
    title: "Grammate",
    desc: "Web app latihan grammar bahasa Inggris berbasis LLM API. Setiap kalimat yang ditulis akan dinilai skornya, diberi feedback detail tentang kesalahan grammar, dan saran perbaikan secara real-time.",
    tech: ["React.js", "LLM API", "Tailwind CSS", "JavaScript"],
    role: "Full Stack Developer",
    category: "Web Development / AI",
    whatIDid: [
      "Integrasi LLM API untuk analisis grammar dan pemberian skor secara real-time.",
      "Membangun UI latihan interaktif dengan feedback langsung per kalimat.",
      "Merancang sistem scoring yang transparan dengan highlight bagian yang salah.",
      "Membuat riwayat latihan untuk tracking perkembangan grammar pengguna."
    ],
    github: "https://github.com/",
    images: ["/images/grammate-1.png", "/images/grammate-2.png"]
  },
  {
    title: "Tutor AI",
    desc: "Web chatbot khusus untuk mata kuliah Manajemen Proyek S2 Pertanian. Dilengkapi avatar 3D interaktif dan fitur speech-to-speech sehingga pengguna bisa belajar layaknya diskusi dengan tutor sungguhan.",
    tech: ["React.js", "Three.js", "Speech API", "LLM API", "Tailwind CSS"],
    role: "Full Stack Developer",
    category: "Web Development / AI",
    whatIDid: [
      "Membangun avatar 3D interaktif yang bergerak sinkron dengan respons audio chatbot.",
      "Integrasi Speech-to-Text dan Text-to-Speech untuk pengalaman belajar yang natural.",
      "Menghubungkan LLM API dengan knowledge base materi Manajemen Proyek S2 Pertanian.",
      "Merancang UI chat yang nyaman untuk sesi belajar panjang dengan konteks percakapan."
    ],
    github: "https://github.com/",
    images: ["/images/tutorai-1.png", "/images/tutorai-2.png"]
  },
  {
    title: "Color Palette Maker",
    desc: "Web tool untuk generate color palette dari gambar menggunakan algoritma K-Means Clustering. Upload foto, pilih jumlah warna, dan dapatkan palette warna dominan yang siap dipakai untuk desain.",
    tech: ["Python", "K-Means", "React.js", "Machine Learning"],
    role: "Full Stack Developer",
    category: "Web Development / ML",
    whatIDid: [
      "Implementasi algoritma K-Means Clustering untuk ekstraksi warna dominan dari gambar.",
      "Membangun UI upload gambar dengan preview palette yang dihasilkan secara real-time.",
      "Menambahkan fitur export palette dalam format HEX, RGB, dan HSL.",
      "Optimasi performa K-Means untuk hasil yang cepat bahkan pada gambar resolusi tinggi."
    ],
    github: "https://github.com/",
    images: ["/images/colorpalette-1.png", "/images/colorpalette-2.png"]
  },
];

export default function Projects() {
  const { isDark } = useTheme();
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [modalPhase, setModalPhase] = useState('closed'); // 'closed' | 'opening' | 'open' | 'closing'
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [clickOrigin, setClickOrigin] = useState({ x: '50%', y: '50%' });
  const [contentVisible, setContentVisible] = useState(false);
  const [cursorPreview, setCursorPreview] = useState({ visible: false, x: 0, y: 0, img: '', title: '' });
  const closeTimerRef = useRef(null);
  const openTimerRef = useRef(null);

  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null;
  const activeImages = activeProject?.images?.length ? activeProject.images : [];

  const openModal = (index, e) => {
    clearTimeout(closeTimerRef.current);
    clearTimeout(openTimerRef.current);

    // Capture click position as percentage of viewport for clip-path origin
    const x = `${((e.clientX / window.innerWidth) * 100).toFixed(1)}%`;
    const y = `${((e.clientY / window.innerHeight) * 100).toFixed(1)}%`;
    setClickOrigin({ x, y });
    setActiveProjectIndex(index);
    setActiveSlideIndex(0);
    setContentVisible(false);
    setModalPhase('closed');

    // Important: start from collapsed state first, then animate to expanded on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalPhase('opening'));
    });

    // After circle fully expands, mark as open & fade in content
    openTimerRef.current = setTimeout(() => {
      setModalPhase('open');
      setTimeout(() => setContentVisible(true), 60);
    }, 600);
  };

  const closeModal = () => {
    clearTimeout(closeTimerRef.current);
    clearTimeout(openTimerRef.current);

    setContentVisible(false);
    setModalPhase('closing');
    closeTimerRef.current = setTimeout(() => {
      setModalPhase('closed');
      setActiveProjectIndex(null);
      setActiveSlideIndex(0);
    }, 550);
  };

  useEffect(() => {
    return () => {
      clearTimeout(closeTimerRef.current);
      clearTimeout(openTimerRef.current);
    };
  }, []);

  const goToPrevSlide = () => setActiveSlideIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  const goToNextSlide = () => setActiveSlideIndex((prev) => (prev + 1) % activeImages.length);

  const handleMouseEnter = (img, title) => setCursorPreview(p => ({ ...p, visible: true, img, title }));
  const handleMouseLeave = () => setCursorPreview(p => ({ ...p, visible: false }));
  const handleMouseMove = (e) => {
    let x = e.clientX + 20, y = e.clientY - 20;
    if (x + 180 > window.innerWidth) x = e.clientX - 200;
    if (y + 130 > window.innerHeight) y = e.clientY - 150;
    setCursorPreview(p => ({ ...p, x, y }));
  };

  useEffect(() => {
    if (activeProjectIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') goToPrevSlide();
      if (e.key === 'ArrowRight') goToNextSlide();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeProjectIndex, activeImages.length]);

  // Compute clip-path values per phase
  const origin = `${clickOrigin.x} ${clickOrigin.y}`;
  const clipExpanded = `circle(150% at ${origin})`;
  const clipCollapsed = `circle(0% at ${origin})`;

  const overlayStyle = {
    clipPath: modalPhase === 'opening' || modalPhase === 'open' ? clipExpanded : clipCollapsed,
    transition: modalPhase === 'opening'
      ? 'clip-path 0.6s cubic-bezier(0.76, 0, 0.24, 1)'
      : modalPhase === 'closing'
      ? 'clip-path 0.55s cubic-bezier(0.76, 0, 0.24, 1)'
      : 'none',
  };

  const isModalVisible = activeProjectIndex !== null;

  return (
    <>
      <style>{`
        @keyframes content-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes panel-in {
          0% {
            opacity: 0;
            transform: translateY(22px) scale(0.98) rotateX(3deg);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0);
            filter: blur(0);
          }
        }
        @keyframes panel-out {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: translateY(18px) scale(0.985) rotateX(2deg);
            filter: blur(2px);
          }
        }
        .content-reveal {
          animation: content-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .modal-panel-fx-in {
          animation: panel-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-origin: 50% 60%;
          will-change: transform, opacity, filter;
        }
        .modal-panel-fx-out {
          animation: panel-out 0.35s cubic-bezier(0.4, 0, 1, 1) forwards;
          transform-origin: 50% 60%;
          will-change: transform, opacity, filter;
        }
      `}</style>

      <section id="projects" className="flex items-center min-h-screen px-6">
        <div className="w-full max-w-5xl mx-auto py-20">
          <h2 className={`text-sm font-semibold uppercase tracking-widest mb-16 ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}>
            Selected Projects
          </h2>

          <div>
            {projects.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => openModal(i, e)}
                onMouseEnter={() => handleMouseEnter(p.images[0], p.title)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                className={`group w-full flex items-center justify-between py-7 border-b text-left transition-all duration-300 ${
                  isDark
                    ? 'border-slate-700/60 hover:border-slate-500'
                    : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                <div className="flex items-baseline gap-5">
                  <span className={`text-sm font-mono tabular-nums ${
                    isDark ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-3xl md:text-4xl font-light tracking-tight transition-colors duration-300 ${
                    isDark
                      ? 'text-white group-hover:text-blue-400'
                      : 'text-slate-900 group-hover:text-blue-600'
                  }`}>
                    {p.title}
                  </span>
                </div>
                <span className={`hidden md:block text-sm transition-colors duration-300 ${
                  isDark
                    ? 'text-slate-500 group-hover:text-slate-300'
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}>
                  {p.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cursor Preview */}
      {cursorPreview.visible && (
        <div
          className="fixed pointer-events-none z-[9999] w-48 h-32 rounded-xl overflow-hidden border border-blue-500/20 shadow-2xl"
          style={{ left: cursorPreview.x, top: cursorPreview.y }}
        >
          <img src={cursorPreview.img} alt="" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-slate-900/80 text-blue-300 text-[10px] px-2 py-1 font-semibold">
            {cursorPreview.title}
          </div>
        </div>
      )}

      {/* ── Clip-path fullscreen overlay ── */}
      {isModalVisible && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-[2px]"
          style={{
            ...overlayStyle,
            willChange: 'clip-path',
          }}
        >
          {/* Inner modal panel — centered, sized */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            onClick={closeModal}
          >
            {activeProject && (
              <div
                className={`relative bg-[#0d0d14] border border-slate-800 overflow-hidden rounded-2xl shadow-[0_30px_120px_rgba(0,0,0,0.65)] ${
                  modalPhase === 'closing' ? 'modal-panel-fx-out' : 'modal-panel-fx-in'
                }`}
                style={{ width: '92vw', height: '90vh', maxWidth: '1100px' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={closeModal}
                  className={`absolute top-5 right-5 z-10 rounded-full w-9 h-9 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors ${
                    contentVisible ? 'content-reveal' : 'opacity-0'
                  }`}
                >
                  <X size={16} />
                </button>

                <div className="flex h-full">
                  {/* ── Left: image panel ── */}
                  <div
                    className={`w-[45%] flex-shrink-0 bg-[#080810] flex flex-col ${
                      contentVisible ? 'content-reveal' : 'opacity-0'
                    }`}
                  >
                    <div className="flex-1 flex items-center justify-center overflow-hidden p-4">
                      {activeImages.length > 0 ? (
                        <img
                          key={activeSlideIndex}
                          src={activeImages[activeSlideIndex]}
                          alt={`${activeProject.title} slide ${activeSlideIndex + 1}`}
                          className="w-full h-full object-contain rounded-xl"
                          style={{ animation: 'content-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-3 text-slate-600">
                          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl">🖼</div>
                          <p className="text-sm">Belum ada gambar</p>
                        </div>
                      )}
                    </div>

                    {/* Thumbnail strip + circle nav */}
                    {activeImages.length > 1 && (
                      <div className="flex items-center gap-2 px-4 pb-4">
                        {activeImages.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveSlideIndex(i)}
                            className={`w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                              i === activeSlideIndex
                                ? 'border-blue-500 opacity-100 scale-105'
                                : 'border-transparent opacity-40 hover:opacity-70'
                            }`}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                        <div className="ml-auto flex gap-1.5">
                          <button
                            onClick={goToPrevSlide}
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center text-base leading-none"
                          >
                            ‹
                          </button>
                          <button
                            onClick={goToNextSlide}
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center text-base leading-none"
                          >
                            ›
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Right: detail panel ── */}
                  <div
                    className={`flex-1 flex flex-col overflow-hidden border-l border-slate-800 ${
                      contentVisible ? 'content-reveal' : 'opacity-0'
                    }`}
                    style={{ animationDelay: contentVisible ? '60ms' : '0ms' }}
                  >
                    {/* Top bar */}
                    <div className="px-8 py-6 border-b border-slate-800">
                      <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">
                        {activeProject.category}
                      </p>
                      <h3 className="text-3xl font-light text-white tracking-tight">
                        {activeProject.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">{activeProject.role}</p>
                    </div>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-7">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-3">Tentang</p>
                        <p className="text-base leading-relaxed text-slate-300">{activeProject.desc}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-3">Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tech.map((t) => (
                            <span key={t} className="text-xs px-3 py-1.5 rounded-full font-medium bg-blue-900/30 text-blue-300 border border-blue-800/60">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-3">Kontribusi</p>
                        <ul className="flex flex-col gap-3">
                          {activeProject.whatIDid.map((item, i) => (
                            <li key={i} className="flex gap-3 items-start">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                              <span className="text-sm leading-relaxed text-slate-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-5 border-t border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-600">
                          {activeProjectIndex + 1} / {projects.length}
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => { setActiveProjectIndex((activeProjectIndex - 1 + projects.length) % projects.length); setActiveSlideIndex(0); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white/70 hover:bg-white/10 text-xs transition-all"
                          >
                            ← Prev
                          </button>
                          <button
                            onClick={() => { setActiveProjectIndex((activeProjectIndex + 1) % projects.length); setActiveSlideIndex(0); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white/70 hover:bg-white/10 text-xs transition-all"
                          >
                            Next →
                          </button>
                        </div>
                      </div>
                      
                      <a href={activeProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg bg-white text-slate-900 hover:bg-slate-100 transition-colors"
                      >
                        <ExternalLink size={14} /> Lihat GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}