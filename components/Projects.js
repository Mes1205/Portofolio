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
    github: "https://github.com/Kelompok-2-IMK/zichara",
    images: ["/images/zichara-1.jpeg", "/images/zichara-2.jpeg"]
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
    github: "https://github.com/Mes1205/Urunin",
    images: ["/images/urunin-1.png", "/images/urunin-2.png", "/images/urunin-3.png", "/images/urunin-4.png"]
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
    figma: "https://www.figma.com/proto/JvMTFzw8OcdHNpHPlAEOU9/SAFE-ROUTE?node-id=2448-2547&t=5FiRPWNG9AhMzt3b-1&show-proto-sidebar=1&starting-point-node-id=2448%3A2547",
    images: ["/images/seluna-1.png", "/images/seluna-2.png", "/images/seluna-3.png", "/images/seluna-4.png"]
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
    figma: "https://www.figma.com/proto/qgzar1T7KzT0bhf9XK6AZo/Gemastik?node-id=2982-17581&t=lUKgyPthXwiv5z3e-1&starting-point-node-id=2982%3A17745&show-proto-sidebar=1",
    images: ["/images/addicx-1.png", "/images/addicx-2.png", "/images/addicx-3.png", "/images/addicx-4.png"]
  },
  {
    title: "Grammate",
    desc: "Web app latihan grammar bahasa Inggris berbasis LLM API. Setiap kalimat yang ditulis akan dinilai skornya, diberi feedback detail tentang kesalahan grammar, dan saran perbaikan secara real-time.",
    tech: ["Python (Streamlit)", "NLP (SBERT)", "LLM (Qwen)", "Scikit-Learn"],
    role: "Full Stack Developer",
    category: "Web Development / AI",
    whatIDid: [
      "Integrasi LLM API untuk analisis grammar dan pemberian skor secara real-time.",
      "Membangun UI latihan interaktif dengan feedback langsung per kalimat.",
      "Merancang sistem scoring yang transparan dengan highlight bagian yang salah.",
      "Membuat riwayat latihan untuk tracking perkembangan grammar pengguna."
    ],
    github: "https://github.com/Mes1205/Grammate",
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
    github: "https://github.com/pipptutorai/TutorAI-Final",
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
    github: "https://github.com/Mes1205/colorPickerMartha",
    images: ["/images/colorpicker.png"]
  },
];

export default function Projects() {
  const { isDark, setProjectModalOpen } = useTheme();
  const [activeProjectIndex, setActiveProjectIndex] = useState(null);
  const [modalPhase, setModalPhase] = useState('closed');
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [clickOrigin, setClickOrigin] = useState({ x: '50%', y: '50%' });
  const [contentVisible, setContentVisible] = useState(false);

  // Smooth cursor preview with lerp
  const [cursorPreview, setCursorPreview] = useState({
    visible: false,
    renderX: -999,
    renderY: -999,
    targetX: 0,
    targetY: 0,
    img: '',
    width: 192,
    height: 128,
  });
  const cursorAnimRef = useRef(null);
  const cursorStateRef = useRef({ renderX: -999, renderY: -999, targetX: 0, targetY: 0, visible: false });

  const closeTimerRef = useRef(null);
  const openTimerRef = useRef(null);

  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null;
  const activeImages = activeProject?.images?.length ? activeProject.images : [];
  const isModalVisible = activeProjectIndex !== null;

  // ── Lerp cursor animation loop ──
  useEffect(() => {
    const LERP = 0.10; // lower = more lag, 0.10 feels like butter

    const loop = () => {
      const s = cursorStateRef.current;
      const dx = s.targetX - s.renderX;
      const dy = s.targetY - s.renderY;

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        s.renderX += dx * LERP;
        s.renderY += dy * LERP;
        setCursorPreview(p => ({ ...p, renderX: s.renderX, renderY: s.renderY }));
      }

      cursorAnimRef.current = requestAnimationFrame(loop);
    };

    cursorAnimRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(cursorAnimRef.current);
  }, []);

  const openModal = (index, e) => {
    clearTimeout(closeTimerRef.current);
    clearTimeout(openTimerRef.current);

    const x = `${((e.clientX / window.innerWidth) * 100).toFixed(1)}%`;
    const y = `${((e.clientY / window.innerHeight) * 100).toFixed(1)}%`;
    setClickOrigin({ x, y });
    setActiveProjectIndex(index);
    setActiveSlideIndex(0);
    setContentVisible(false);
    setModalPhase('closed');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalPhase('opening'));
    });

    openTimerRef.current = setTimeout(() => {
      setModalPhase('open');
      setTimeout(() => setContentVisible(true), 60);
    }, 650);
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
    }, 580);
  };

  useEffect(() => () => {
    clearTimeout(closeTimerRef.current);
    clearTimeout(openTimerRef.current);
  }, []);

  useEffect(() => {
    setProjectModalOpen(isModalVisible);
    return () => setProjectModalOpen(false);
  }, [isModalVisible, setProjectModalOpen]);

  const goToPrevSlide = () => setActiveSlideIndex((p) => (p - 1 + activeImages.length) % activeImages.length);
  const goToNextSlide = () => setActiveSlideIndex((p) => (p + 1) % activeImages.length);

  const handleMouseEnter = (img) => {
    const fallback = { width: 192, height: 128 };
    const previewImg = new window.Image();
    previewImg.onload = () => {
      const naturalW = previewImg.naturalWidth || fallback.width;
      const naturalH = previewImg.naturalHeight || fallback.height;
      const scale = Math.min(280 / naturalW, 280 / naturalH, 1);
      const width = Math.max(120, Math.round(naturalW * scale));
      const height = Math.max(90, Math.round(naturalH * scale));
      setCursorPreview(p => ({ ...p, visible: true, img, width, height }));
      cursorStateRef.current.visible = true;
    };
    previewImg.onerror = () => {
      setCursorPreview(p => ({ ...p, visible: true, img, ...fallback }));
      cursorStateRef.current.visible = true;
    };
    previewImg.src = img;
  };

  const handleMouseLeave = () => {
    setCursorPreview(p => ({ ...p, visible: false }));
    cursorStateRef.current.visible = false;
  };

  const handleMouseMove = (e) => {
    const s = cursorStateRef.current;
    // Compute desired position (will be lerped toward in the animation loop)
    const w = cursorPreview.width;
    const h = cursorPreview.height;
    let tx = e.clientX + 24;
    let ty = e.clientY - 24;
    if (tx + w > window.innerWidth) tx = e.clientX - w - 24;
    if (ty + h > window.innerHeight) ty = e.clientY - h - 24;
    s.targetX = tx;
    s.targetY = ty;
    // Snap on first appearance so it doesn't fly in from offscreen
    if (!s.visible) {
      s.renderX = tx;
      s.renderY = ty;
    }
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

  const origin = `${clickOrigin.x} ${clickOrigin.y}`;
  const clipExpanded = `circle(150% at ${origin})`;
  const clipCollapsed = `circle(0% at ${origin})`;

  const overlayStyle = {
    clipPath: modalPhase === 'opening' || modalPhase === 'open' ? clipExpanded : clipCollapsed,
    transition: modalPhase === 'opening'
      ? 'clip-path 0.65s cubic-bezier(0.76, 0, 0.24, 1)'
      : modalPhase === 'closing'
      ? 'clip-path 0.58s cubic-bezier(0.76, 0, 0.24, 1)'
      : 'none',
  };

  return (
    <>
      <style>{`
        @keyframes content-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes panel-in {
          0%   { opacity: 0; transform: translateY(28px) scale(0.97); filter: blur(3px); }
          100% { opacity: 1; transform: translateY(0) scale(1);       filter: blur(0); }
        }
        @keyframes panel-out {
          0%   { opacity: 1; transform: translateY(0) scale(1);        filter: blur(0); }
          100% { opacity: 0; transform: translateY(20px) scale(0.975); filter: blur(2px); }
        }
        .content-reveal {
          animation: content-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .modal-panel-fx-in {
          animation: panel-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-origin: 50% 55%;
          will-change: transform, opacity, filter;
        }
        .modal-panel-fx-out {
          animation: panel-out 0.38s cubic-bezier(0.4, 0, 1, 1) forwards;
          transform-origin: 50% 55%;
          will-change: transform, opacity, filter;
        }

        /* Organic blob shape for modal using clip-path */
        .modal-blob {
          /* Slightly irregular rounded rectangle — feels organic, not stiff */
          border-radius: 28px 36px 32px 40px / 36px 28px 40px 32px;
          overflow: hidden;
        }

        /* Cursor preview: pill/blob shape */
        .cursor-preview-blob {
          border-radius: 18px 22px 18px 22px / 22px 18px 22px 18px;
        }

        /* Scrollbar styling inside modal */
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }
        .modal-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }
      `}</style>

      <section id="projects" className="flex items-center min-h-screen px-6">
        <div className="w-full max-w-5xl mx-auto py-20">
          <h2 className={`text-sm font-semibold uppercase tracking-widest mb-16 ${
            isDark ? 'text-slate-500' : 'text-slate-700'
          }`}>
            Selected Projects
          </h2>

          <div>
            {projects.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => openModal(i, e)}
                onMouseEnter={() => handleMouseEnter(p.images[0])}
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
                    isDark ? 'text-slate-600' : 'text-slate-600'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-3xl md:text-4xl font-light tracking-tight transition-colors duration-300 ${
                    isDark
                      ? 'text-white group-hover:text-slate-300'
                      : 'text-slate-900 group-hover:text-slate-600'
                  }`}>
                    {p.title}
                  </span>
                </div>
                <span className={`hidden md:block text-sm transition-colors duration-300 ${
                  isDark
                    ? 'text-slate-500 group-hover:text-slate-300'
                    : 'text-slate-600 group-hover:text-slate-800'
                }`}>
                  {p.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Smooth lerp cursor preview ── */}
      {cursorPreview.visible && (
        <div
          className="fixed pointer-events-none z-[9999] shadow-2xl cursor-preview-blob overflow-hidden"
          style={{
            left: cursorPreview.renderX,
            top: cursorPreview.renderY,
            width: cursorPreview.width,
            height: cursorPreview.height,
            border: '1px solid rgba(255,255,255,0.14)',
          }}
        >
          <img src={cursorPreview.img} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* ── Clip-path fullscreen overlay ── */}
      {isModalVisible && (
        <div
          className="fixed inset-0 z-50 bg-black/88 backdrop-blur-[2px]"
          style={{ ...overlayStyle, willChange: 'clip-path' }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            onClick={closeModal}
          >
            {activeProject && (
              <div
                className={`relative modal-blob shadow-[0_40px_140px_rgba(0,0,0,0.80)] ${
                  modalPhase === 'closing' ? 'modal-panel-fx-out' : 'modal-panel-fx-in'
                }`}
                style={{
                  width: '92vw',
                  height: '90vh',
                  maxWidth: '1100px',
                  background: '#0e0e0e',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={closeModal}
                  className={`absolute top-5 right-5 z-10 rounded-full w-9 h-9 flex items-center justify-center transition-colors ${
                    contentVisible ? 'content-reveal' : 'opacity-0'
                  }`}
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                >
                  <X size={15} />
                </button>

                <div className="flex h-full">
                  {/* ── Left: image panel ── */}
                  <div
                    className={`w-[45%] flex-shrink-0 flex flex-col ${contentVisible ? 'content-reveal' : 'opacity-0'}`}
                    style={{ background: '#080808' }}
                  >
                    <div className="flex-1 flex items-center justify-center overflow-hidden p-5">
                      {activeImages.length > 0 ? (
                        <img
                          key={activeSlideIndex}
                          src={activeImages[activeSlideIndex]}
                          alt={`${activeProject.title} slide ${activeSlideIndex + 1}`}
                          className="w-full h-full object-contain rounded-2xl"
                          style={{ animation: 'content-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>🖼</div>
                          <p className="text-sm">Belum ada gambar</p>
                        </div>
                      )}
                    </div>

                    {/* Thumbnail strip */}
                    {activeImages.length > 1 && (
                      <div className="flex items-center gap-2 px-4 pb-4">
                        {activeImages.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveSlideIndex(i)}
                            className={`w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200`}
                            style={{
                              border: `2px solid ${i === activeSlideIndex ? 'rgba(255,255,255,0.7)' : 'transparent'}`,
                              opacity: i === activeSlideIndex ? 1 : 0.3,
                              transform: i === activeSlideIndex ? 'scale(1.05)' : 'scale(1)',
                            }}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                        <div className="ml-auto flex gap-1.5">
                          <button
                            onClick={goToPrevSlide}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-base leading-none transition-all"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.45)' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'white'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                          >‹</button>
                          <button
                            onClick={goToNextSlide}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-base leading-none transition-all"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.45)' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'white'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; }}
                          >›</button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Right: detail panel ── */}
                  <div
                    className={`flex-1 flex flex-col overflow-hidden ${contentVisible ? 'content-reveal' : 'opacity-0'}`}
                    style={{ borderLeft: '1px solid rgba(255,255,255,0.07)', animationDelay: contentVisible ? '60ms' : '0ms' }}
                  >
                    {/* Top bar */}
                    <div className="px-8 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>
                        {activeProject.category}
                      </p>
                      <h3 className="text-4xl font-bold text-white tracking-tight" style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                        {activeProject.title}
                      </h3>
                      <p className="text-sm mt-1.5 font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>{activeProject.role}</p>
                    </div>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-7 modal-scroll">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.14em' }}>Tentang</p>
                        <p className="text-base leading-relaxed font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>{activeProject.desc}</p>
                      </div>

                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.14em' }}>Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tech.map((t) => (
                            <span
                              key={t}
                              className="text-xs px-3 py-1.5 rounded-full font-semibold"
                              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.14em' }}>Kontribusi</p>
                        <ul className="flex flex-col gap-3">
                          {activeProject.whatIDid.map((item, i) => (
                            <li key={i} className="flex gap-3 items-start">
                              <span className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'rgba(255,255,255,0.4)' }} />
                              <span className="text-sm leading-relaxed font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer */}
                    <div
                      className="px-8 py-5 flex items-center justify-between"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>
                          {activeProjectIndex + 1} / {projects.length}
                        </span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => { setActiveProjectIndex((activeProjectIndex - 1 + projects.length) % projects.length); setActiveSlideIndex(0); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all font-medium"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.38)' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.11)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; }}
                          >
                            ← Prev
                          </button>
                          <button
                            onClick={() => { setActiveProjectIndex((activeProjectIndex + 1) % projects.length); setActiveSlideIndex(0); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all font-medium"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.38)' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.11)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; }}
                          >
                            Next →
                          </button>
                        </div>
                      </div>

                      <a
                        href={activeProject.figma || activeProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all"
                        style={{ background: 'white', color: '#0e0e0e', letterSpacing: '-0.01em' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#e5e5e5'}
                        onMouseLeave={e => e.currentTarget.style.background = 'white'}
                      >
                        <ExternalLink size={14} /> {activeProject.figma ? 'Lihat Figma' : 'Lihat GitHub'}
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