'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, Sparkles, ArrowUpRight, MousePointer2, Hand } from 'lucide-react';
import { useTheme } from '@/app/ThemeProvider';

const projects = [
  {
    title: "Zichara",
    desc: "Aplikasi Augmented Reality mobile untuk pembelajaran aksara Hanzi dan Pinyin secara interaktif. Menggunakan teknologi ARCore untuk menampilkan karakter 3D dan membantu pengguna memahami penulisan dengan cara yang lebih engaging.",
    tech: ["Unity", "C#", "ARCore", "AR"],
    role: "Full Stack Developer",
    category: "Mobile Development / AR",
    year: "2024",
    whatIDid: [
      "Merancang arsitektur aplikasi AR dan flow pembelajaran dari scan hingga interaksi karakter.",
      "Mengembangkan fitur render objek 3D Hanzi/Pinyin berbasis ARCore di Unity.",
      "Membuat halaman latihan interaktif dan validasi progres belajar pengguna.",
      "Kolaborasi dengan tim desain untuk optimasi UX agar mudah dipakai pemula.",
    ],
    github: "https://github.com/Kelompok-2-IMK/zichara",
    images: ["/images/zichara-0.jpeg", "/images/zichara-1.jpeg", "/images/zichara-2.jpeg"],
  },
  {
    title: "Urunin",
    desc: "Platform web split bill dengan OCR API untuk scan struk otomatis. Bisa maintain utang piutang antar teman dan tracking pengeluaran pribadi dengan riwayat transaksi terstruktur.",
    tech: ["React.js", "Tailwind CSS", "Firebase", "JavaScript", "OCR API"],
    role: "Frontend Developer",
    category: "Web Development",
    year: "2024",
    whatIDid: [
      "Integrasi OCR API untuk scan dan parse struk belanja secara otomatis.",
      "Membangun sistem tracking utang piutang dengan perhitungan otomatis per anggota.",
      "Membuat dashboard pengeluaran pribadi dengan riwayat transaksi terstruktur.",
      "Mengintegrasikan Firebase real-time untuk sinkronisasi data antar pengguna.",
    ],
    github: "https://github.com/Mes1205/Urunin",
    images: ["/images/urunin-1.png", "/images/urunin-2.png", "/images/urunin-3.png", "/images/urunin-4.png"],
  },
  {
    title: "Seluna",
    desc: "Prototype Figma aplikasi keamanan khusus perempuan. Ketika dalam bahaya, pengguna bisa langsung menelepon kontak darurat, mengirim alert ke semua kontak terpercaya, dan berbagi lokasi real-time secara otomatis.",
    tech: ["Figma", "UI/UX Design", "Prototyping"],
    role: "UI/UX Designer",
    category: "UI/UX Design / Safety App",
    year: "2024",
    whatIDid: [
      "Merancang user flow darurat yang bisa diakses dengan satu tap dalam situasi bahaya.",
      "Mendesain sistem alert otomatis ke kontak darurat beserta pengiriman lokasi real-time.",
      "Membuat prototype interaktif lengkap dari onboarding hingga fitur SOS.",
      "Riset UX untuk memastikan UI tetap mudah digunakan dalam kondisi panik.",
    ],
    figma: "https://www.figma.com/proto/JvMTFzw8OcdHNpHPlAEOU9/SAFE-ROUTE?node-id=2448-2547&t=5FiRPWNG9AhMzt3b-1&show-proto-sidebar=1&starting-point-node-id=2448%3A2547",
    images: ["/images/seluna-0.jpeg", "/images/seluna-1.png", "/images/seluna-2.png", "/images/seluna-3.png", "/images/seluna-4.png"],
  },
  {
    title: "Addicx",
    desc: "Prototype Figma platform untuk membantu orang yang ingin berhenti dari kecanduan. Dilengkapi fitur komunitas untuk sharing antar sesama, progress tracker, dan konsultasi langsung ke profesional.",
    tech: ["Figma", "UI/UX Design", "Prototyping"],
    role: "UI/UX Designer",
    category: "UI/UX Design / Health App",
    year: "2024",
    whatIDid: [
      "Mendesain fitur komunitas untuk sharing pengalaman dan saling support antar pengguna.",
      "Merancang sistem konsultasi dengan profesional kesehatan langsung dari aplikasi.",
      "Membuat progress tracker visual untuk memotivasi pengguna dalam perjalanan pemulihan.",
      "Mendesain onboarding personal berdasarkan jenis dan tingkat kecanduan pengguna.",
    ],
    figma: "https://www.figma.com/proto/qgzar1T7KzT0bhf9XK6AZo/Gemastik?node-id=2982-17581&t=lUKgyPthXwiv5z3e-1&starting-point-node-id=2982%3A17745&show-proto-sidebar=1",
    images: ["/images/addicx-0.jpeg", "/images/addicx-1.png", "/images/addicx-2.png", "/images/addicx-3.png", "/images/addicx-4.png"],
  },
  {
    title: "Grammate",
    desc: "Web app latihan grammar bahasa Inggris berbasis LLM API. Setiap kalimat yang ditulis akan dinilai skornya, diberi feedback detail tentang kesalahan grammar, dan saran perbaikan secara real-time.",
    tech: ["Python (Streamlit)", "NLP (SBERT)", "LLM (Qwen)", "Scikit-Learn"],
    role: "Full Stack Developer",
    category: "Web Development / AI",
    year: "2024",
    whatIDid: [
      "Integrasi LLM API untuk analisis grammar dan pemberian skor secara real-time.",
      "Membangun UI latihan interaktif dengan feedback langsung per kalimat.",
      "Merancang sistem scoring yang transparan dengan highlight bagian yang salah.",
      "Membuat riwayat latihan untuk tracking perkembangan grammar pengguna.",
    ],
    github: "https://github.com/Mes1205/Grammate",
    images: ["/images/grammate-1.png", "/images/grammate-2.png"],
  },
  {
    title: "Tutor AI",
    desc: "Web chatbot khusus untuk mata kuliah Manajemen Proyek S2 Pertanian. Dilengkapi avatar 3D interaktif dan fitur speech-to-speech sehingga pengguna bisa belajar layaknya diskusi dengan tutor sungguhan.",
    tech: ["React.js", "Three.js", "Speech API", "LLM API", "Tailwind CSS"],
    role: "Full Stack Developer",
    category: "Web Development / AI",
    year: "2024",
    whatIDid: [
      "Membangun avatar 3D interaktif yang bergerak sinkron dengan respons audio chatbot.",
      "Integrasi Speech-to-Text dan Text-to-Speech untuk pengalaman belajar yang natural.",
      "Menghubungkan LLM API dengan knowledge base materi Manajemen Proyek S2 Pertanian.",
      "Merancang UI chat yang nyaman untuk sesi belajar panjang dengan konteks percakapan.",
    ],
    github: "https://github.com/pipptutorai/TutorAI-Final",
    images: ["/images/tutorai-1.png", "/images/tutorai-2.png"],
  },
  {
    title: "Color Palette Maker",
    desc: "Web tool untuk generate color palette dari gambar menggunakan algoritma K-Means Clustering. Upload foto, pilih jumlah warna, dan dapatkan palette warna dominan yang siap dipakai untuk desain.",
    tech: ["Python", "K-Means", "React.js", "Machine Learning"],
    role: "Full Stack Developer",
    category: "Web Development / ML",
    year: "2024",
    whatIDid: [
      "Implementasi algoritma K-Means Clustering untuk ekstraksi warna dominan dari gambar.",
      "Membangun UI upload gambar dengan preview palette yang dihasilkan secara real-time.",
      "Menambahkan fitur export palette dalam format HEX, RGB, dan HSL.",
      "Optimasi performa K-Means untuk hasil yang cepat bahkan pada gambar resolusi tinggi.",
    ],
    github: "https://github.com/Mes1205/colorPickerMartha",
    images: ["/images/colorpicker.png"],
  },
];

const N = projects.length;
const X_SPACING    = 400;
const ROT_Y_STEP   = 45;
const SCALE_X_STEP = 0.12;
const SCALE_STEP   = 0.06;
const OPACITY_STEP = 0.18;
const VISIBLE_SIDE = 2;

const C = {
  bg:          '#ffffff',
  bgSurface:   '#f5f5f7',
  bgCard:      '#fafafa',
  border:      'rgba(0,0,0,0.08)',
  borderMed:   'rgba(0,0,0,0.14)',
  text:        '#0a0a0a',
  textSub:     '#555560',
  textMuted:   '#999aaa',
  accent:      '#0a0a0a',
  accentHover: '#1a1a2e',
  pill:        'rgba(0,0,0,0.06)',
  pillBorder:  'rgba(0,0,0,0.10)',
  pillText:    '#333340',
  dot:         'rgba(0,0,0,0.18)',
  dotActive:   '#0a0a0a',
  arrow:       'rgba(0,0,0,0.06)',
  arrowBorder: 'rgba(0,0,0,0.12)',
  arrowIcon:   'rgba(0,0,0,0.35)',
  arrowHover:  'rgba(0,0,0,0.10)',
  arrowIconH:  'rgba(0,0,0,0.80)',
};

// ── Header ───────────────────────────────────────────────────────────────────
function ProjectsHeader() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIsVisible(true), 300); return () => clearTimeout(t); }, []);

  return (
    <div style={{
      position: 'absolute', top: '5%', left: 0, width: '100%',
      zIndex: 25, display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-16px)',
        transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{ width: 50, height: 2, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.15))', borderRadius: 1 }} />
        <h1 style={{
          margin: 0, fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700,
          letterSpacing: '-0.02em', color: C.text,
          fontFamily: "'Poppins', sans-serif",
        }}>
          {'Projects'.split('').map((char, i) => (
            <span key={i} style={{
              display: 'inline-block',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s`,
            }}>{char}</span>
          ))}
        </h1>
        <div style={{ width: 50, height: 2, background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.15))', borderRadius: 1 }} />
      </div>
    </div>
  );
}

// ── Carousel ─────────────────────────────────────────────────────────────────
function CurvedCarousel({ activeIndex, onActivate, onClick }) {
  const stageRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const update = () => { if (stageRef.current) {} };
    update();
    window.addEventListener('resize', update);
    const ro = new ResizeObserver(update);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => { window.removeEventListener('resize', update); ro.disconnect(); };
  }, []);

  useEffect(() => {
    projects.forEach(p => p.images.forEach(src => { const img = new Image(); img.src = src; }));
  }, []);

  const cards = [];
  for (let i = 0; i < N; i++) {
    let slot = i - activeIndex;
    if (slot > N / 2) slot -= N;
    if (slot < -N / 2) slot += N;
    const absSlot = Math.abs(slot);
    if (absSlot > VISIBLE_SIDE + 0.5) continue;

    const p        = projects[i];
    const isActive = i === activeIndex;
    const isHov    = hoveredIndex === i;
    const sign     = Math.sign(slot) || 0;
    const W = 420, H = 280;

    const offsetX = sign * absSlot * X_SPACING;
    const rotY    = -sign * absSlot * ROT_Y_STEP;
    const scaleX  = Math.max(0.30, 1 - absSlot * SCALE_X_STEP);
    const scale   = 1 - absSlot * SCALE_STEP;
    const opacity = Math.max(0.20, 1 - absSlot * OPACITY_STEP);
    const zIdx    = 20 - absSlot * 4;

    const hoverScale = isActive && isHov ? 1.04 : 1;
    const hoverLift  = isActive && isHov ? -8   : 0;

    const innerR = 18;
    const outerR = isActive ? 18 : 18 + absSlot * 22;
    const borderRadius = slot === 0
      ? `${innerR}px`
      : slot < 0
        ? `${outerR}px ${innerR}px ${innerR}px ${outerR}px`
        : `${innerR}px ${outerR}px ${outerR}px ${innerR}px`;

    const shadow = isActive
      ? isHov
        ? '0 24px 60px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)'
        : '0 16px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)'
      : '0 4px 16px rgba(0,0,0,0.06)';

    cards.push(
      <div
        key={i}
        onMouseEnter={() => { if (!isActive) onActivate(i); setHoveredIndex(i); }}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={(e) => { isActive ? onClick(i, e) : onActivate(i); }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          width: W, height: H,
          marginLeft: -W / 2, marginTop: -H / 2,
          cursor: 'pointer', zIndex: zIdx,
          transform: `translateX(${offsetX}px) translateY(${hoverLift}px) perspective(1200px) rotateY(${rotY}deg) scaleX(${scaleX}) scale(${scale * hoverScale})`,
          transformOrigin: 'center center',
          opacity, borderRadius,
          overflow: 'hidden',
          boxShadow: shadow,
          transition: `transform 1.8s cubic-bezier(0.16,1,0.3,1), opacity 1.8s cubic-bezier(0.16,1,0.3,1), border-radius 1.2s ease, box-shadow 1.2s ease`,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          background: C.bgCard,
          border: `1px solid ${C.border}`,
        }}
      >
        <img
          src={p.images[0]} alt={p.title}
          style={{
            width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'center', display: 'block',
            background: C.bgSurface,
            filter: isActive ? 'none' : `brightness(${Math.max(0.75, 0.95 - absSlot * 0.1)})`,
            transition: 'filter 1.6s cubic-bezier(0.16,1,0.3,1), transform 1.6s cubic-bezier(0.16,1,0.3,1)',
            transform: isActive && isHov ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.10) 45%, transparent 60%)',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 1.6s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '18px 20px',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1.6s cubic-bezier(0.16,1,0.3,1), transform 1.6s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, transition: 'transform 0.8s cubic-bezier(0.34,1.56,0.64,1)', transform: isHov ? 'translateX(4px)' : 'translateX(0)' }}>
            {isActive && isHov && (
              <Sparkles size={16} style={{ color: 'rgba(255,255,255,0.7)', animation: 'sparkle-bounce 1.5s ease-in-out infinite' }} />
            )}
            <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: isHov ? '0.04em' : '-0.02em', transition: 'letter-spacing 0.8s ease' }}>{p.title}</p>
            {isActive && isHov && (
              <ArrowUpRight size={16} style={{ color: 'rgba(255,255,255,0.6)', animation: 'arrow-pop 0.8s cubic-bezier(0.34,1.56,0.64,1) infinite alternate' }} />
            )}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, transform: isHov ? 'translateX(8px)' : 'translateX(0)', transition: 'all 0.8s ease' }}>
            {p.category}
          </p>
          <div style={{ margin: '12px 0 0', display: 'flex', alignItems: 'center', gap: 8, opacity: isHov ? 1 : 0, transform: isHov ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)', transition: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'float-gentle 2s ease-in-out infinite' }}>
              <MousePointer2 size={12} style={{ color: 'rgba(255,255,255,0.7)' }} />
            </div>
            <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500, letterSpacing: '0.02em' }}>Click to explore</p>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'float-gentle 2s ease-in-out infinite 0.3s' }}>
              <Hand size={10} style={{ color: 'rgba(255,255,255,0.6)' }} />
            </div>
          </div>
        </div>
        {isActive && <div style={{ position: 'absolute', inset: 0, borderRadius: innerR, border: `1.5px solid ${C.border}`, pointerEvents: 'none' }} />}
      </div>
    );
  }

  return (
    <div ref={stageRef} style={{ position: 'absolute', top: '52%', left: 0, width: '100%', height: 440, transform: 'translateY(-50%)', zIndex: 20, pointerEvents: 'auto', overflow: 'visible' }}>
      {cards}
    </div>
  );
}

// ── Dots ─────────────────────────────────────────────────────────────────────
function CarouselDots({ activeIndex, onDotClick }) {
  return (
    <div style={{
      position: 'absolute', bottom: '4%', left: 0, width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 10, zIndex: 30, pointerEvents: 'auto',
    }}>
      {projects.map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <button key={i} onClick={() => onDotClick(i)} style={{
            padding: 0, border: 'none', cursor: 'pointer',
            width: isActive ? 32 : 8, height: 8, borderRadius: 99,
            background: isActive ? C.dotActive : 'rgba(0,0,0,0.25)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
            transform: isActive ? 'scale(1.05)' : 'scale(1)',
            boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
          }} />
        );
      })}
    </div>
  );
}

// ── Arrows ────────────────────────────────────────────────────────────────────
function ArrowBtn({ direction, onClick }) {
  const isLeft = direction === 'left';
  const [isHov, setIsHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHov(true)}
      onMouseLeave={() => setIsHov(false)}
      style={{
        position: 'absolute', top: '52%',
        transform: `translateY(-50%) ${isHov ? 'scale(1.12)' : 'scale(1)'}`,
        [isLeft ? 'left' : 'right']: '2.5vw',
        zIndex: 30, width: 48, height: 48, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isHov ? C.arrowHover : C.arrow,
        border: `1px solid ${C.arrowBorder}`,
        color: isHov ? C.arrowIconH : C.arrowIcon,
        cursor: 'pointer',
        transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {isLeft ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
    </button>
  );
}

// ── Title Strip ───────────────────────────────────────────────────────────────
function AnimatedTitle({ text, isActive, isHovered, onHover, onLeave, onClick, index, activeIndex }) {
  const [isAnimatingLetters, setIsAnimatingLetters] = useState(false);
  const [hasHoveredOnce, setHasHoveredOnce] = useState(false);

  const handleMouseEnter = () => {
    onHover(index);
    if (!hasHoveredOnce) {
      setHasHoveredOnce(true);
      setIsAnimatingLetters(true);
      setTimeout(() => setIsAnimatingLetters(false), text.length * 60 + 400);
    }
  };

  // Jarak dari active index — makin jauh makin redup
  let dist = Math.abs(index - activeIndex);
  if (dist > N / 2) dist = N - dist;

  // opacity: active=1, jarak 1=0.35, jarak 2=0.18, dst — kontras jelas
  const baseOpacity = isActive ? 1 : Math.max(0.12, 0.45 - dist * 0.15);
  const finalOpacity = isHovered && !isActive ? 0.75 : baseOpacity;

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => { onLeave(); setIsAnimatingLetters(false); }}
      onClick={(e) => onClick(index, e)}
      style={{
        background: 'none', border: 'none', padding: '6px 10px', cursor: 'pointer',
        fontSize: isActive ? 'clamp(32px,4.5vw,60px)' : 'clamp(14px,1.4vw,20px)',
        fontWeight: isActive ? 300 : 600,
        letterSpacing: isActive ? '-0.03em' : '0.08em',
        textTransform: isActive ? 'none' : 'uppercase',
        color: isActive ? C.text : `rgba(0,0,0,${finalOpacity})`,
        opacity: finalOpacity,
        transition: 'all 1.4s cubic-bezier(0.16,1,0.3,1)',
        transform: isActive ? 'translateY(-8px)' : isHovered ? 'translateY(-4px) scale(1.08)' : 'translateY(0)',
        whiteSpace: 'nowrap', lineHeight: 1, flexShrink: 0, position: 'relative',
        textShadow: isHovered && !isActive ? '0 0 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      {isHovered && !isActive && (
        <span style={{ position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)', fontSize: 18, animation: 'emoji-bounce 0.6s cubic-bezier(0.34,1.56,0.64,1)', pointerEvents: 'none' }}>✨</span>
      )}
      {text.split('').map((char, i) => (
        <span key={i} style={{
          display: 'inline-block',
          transition: `all 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.05}s`,
          transform: isAnimatingLetters
            ? 'scale(1.3) translateY(-4px)'
            : isHovered && !isActive ? 'scale(1.15) translateY(-2px)' : 'scale(1) translateY(0)',
          color: isAnimatingLetters ? C.text : isHovered && !isActive ? 'rgba(0,0,0,0.65)' : undefined,
        }}>{char}</span>
      ))}
      {isActive && (
        <div style={{ position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: C.dotActive, boxShadow: '0 0 8px rgba(0,0,0,0.15)' }} />
      )}
      {isHovered && !isActive && (
        <div style={{ position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,0,0,0.3)', animation: 'pulse-dot 1.5s ease-in-out infinite' }} />
      )}
    </button>
  );
}

function TitleStrip({ activeIndex, onHover, onLeave, onClick }) {
  const [hoveredTitle, setHoveredTitle] = useState(null);
  return (
    // top: 18% — lebih bawah dari sebelumnya (12%) supaya tidak terlalu deket sama header "Projects"
    <div style={{
      position: 'absolute', top: '18%', left: 0, width: '100%', zIndex: 30,
      display: 'flex', alignItems: 'baseline', justifyContent: 'center',
      gap: '3.5vw', padding: '0 5vw', pointerEvents: 'auto',
      flexWrap: 'nowrap', overflow: 'hidden',
    }}>
      {projects.map((p, i) => (
        <AnimatedTitle
          key={i}
          text={p.title}
          isActive={i === activeIndex}
          isHovered={hoveredTitle === i}
          activeIndex={activeIndex}
          onHover={(idx) => { setHoveredTitle(idx); onHover(idx); }}
          onLeave={() => { setHoveredTitle(null); onLeave(); }}
          onClick={onClick}
          index={i}
        />
      ))}
    </div>
  );
}

// ── Modal helpers ─────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: C.textMuted, margin: '0 0 12px' }}>
      {children}
    </p>
  );
}

function NavBtn({ onClick, label }) {
  const [isHov, setIsHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHov(true)}
      onMouseLeave={() => setIsHov(false)}
      style={{
        fontSize: 12, fontWeight: 600, padding: '8px 14px', borderRadius: 10, cursor: 'pointer',
        background: isHov ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)',
        border: `1px solid ${C.border}`,
        color: isHov ? C.text : C.textSub,
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        transform: isHov ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      {label}
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Projects() {
  const { setProjectModalOpen } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);
  const [modal, setModal] = useState({
    index: null, phase: 'closed', slideIndex: 0,
    origin: { x: '50%', y: '50%' }, contentVisible: false,
  });
  const modalTimers = useRef({});

  const animateToIndex = useCallback((targetIndex) => {
    if (animationRef.current) { clearInterval(animationRef.current); animationRef.current = null; }
    if (targetIndex === activeIndex) return;
    setIsAnimating(true);
    let diff = targetIndex - activeIndex;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    const step = diff > 0 ? 1 : -1;
    const totalSteps = Math.abs(diff);
    let currentStep = 0;
    let current = activeIndex;
    const interval = setInterval(() => {
      currentStep++;
      let next = current + step;
      if (next < 0) next = N - 1;
      if (next >= N) next = 0;
      setActiveIndex(next);
      current = next;
      if (currentStep >= totalSteps) { clearInterval(interval); animationRef.current = null; setIsAnimating(false); }
    }, 350);
    animationRef.current = interval;
  }, [activeIndex]);

  useEffect(() => () => { if (animationRef.current) clearInterval(animationRef.current); }, []);

  const handlePrev     = useCallback(() => { if (!isAnimating) animateToIndex((activeIndex - 1 + N) % N); }, [activeIndex, isAnimating, animateToIndex]);
  const handleNext     = useCallback(() => { if (!isAnimating) animateToIndex((activeIndex + 1) % N); }, [activeIndex, isAnimating, animateToIndex]);
  const handleDotClick = useCallback((i) => { if (!isAnimating && i !== activeIndex) animateToIndex(i); }, [activeIndex, isAnimating, animateToIndex]);
  const handleTitleHover = useCallback((i) => { if (!isAnimating) setActiveIndex(i); }, [isAnimating]);

  const openModal = useCallback((index, e) => {
    clearTimeout(modalTimers.current.open);
    clearTimeout(modalTimers.current.close);
    const ox = `${((e.clientX / window.innerWidth) * 100).toFixed(1)}%`;
    const oy = `${((e.clientY / window.innerHeight) * 100).toFixed(1)}%`;
    setModal({ index, phase: 'closed', slideIndex: 0, origin: { x: ox, y: oy }, contentVisible: false });
    requestAnimationFrame(() => requestAnimationFrame(() => setModal(p => ({ ...p, phase: 'opening' }))));
    modalTimers.current.open = setTimeout(() => {
      setModal(p => ({ ...p, phase: 'open' }));
      setTimeout(() => setModal(p => ({ ...p, contentVisible: true })), 60);
    }, 650);
  }, []);

  const closeModal = useCallback(() => {
    clearTimeout(modalTimers.current.open);
    clearTimeout(modalTimers.current.close);
    setModal(p => ({ ...p, contentVisible: false, phase: 'closing' }));
    modalTimers.current.close = setTimeout(() => {
      setModal({ index: null, phase: 'closed', slideIndex: 0, origin: { x: '50%', y: '50%' }, contentVisible: false });
    }, 580);
  }, []);

  useEffect(() => { setProjectModalOpen(modal.index !== null); return () => setProjectModalOpen(false); }, [modal.index, setProjectModalOpen]);

  useEffect(() => {
    if (modal.index !== null) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal.index, handlePrev, handleNext]);

  useEffect(() => {
    if (modal.index === null) return;
    const project = projects[modal.index];
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') setModal(p => ({ ...p, slideIndex: Math.max(0, p.slideIndex - 1) }));
      if (e.key === 'ArrowRight') setModal(p => ({ ...p, slideIndex: Math.min(project.images.length - 1, p.slideIndex + 1) }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal.index, closeModal]);

  useEffect(() => () => { clearTimeout(modalTimers.current.open); clearTimeout(modalTimers.current.close); }, []);

  const activeProject = modal.index !== null ? projects[modal.index] : null;
  const activeImages  = activeProject?.images ?? [];
  const origin        = `${modal.origin.x} ${modal.origin.y}`;
  const overlayStyle  = {
    clipPath: modal.phase === 'opening' || modal.phase === 'open'
      ? `circle(150% at ${origin})`
      : `circle(0% at ${origin})`,
    transition: modal.phase === 'opening'
      ? 'clip-path 0.65s cubic-bezier(0.76,0,0.24,1)'
      : modal.phase === 'closing'
      ? 'clip-path 0.58s cubic-bezier(0.76,0,0.24,1)'
      : 'none',
  };

  return (
    <>
      <style>{`
        @keyframes img-in { from { opacity:0; transform:scale(1.08) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes modal-in { from { opacity:0; transform:translateY(30px) scale(0.96); } to { opacity:1; transform:none; } }
        @keyframes modal-out { from { opacity:1; transform:none; } to { opacity:0; transform:translateY(20px) scale(0.98); } }
        @keyframes sparkle-bounce { 0%,100%{transform:scale(1) rotate(0deg);} 25%{transform:scale(1.3) rotate(-10deg);} 50%{transform:scale(0.9) rotate(5deg);} 75%{transform:scale(1.2) rotate(-5deg);} }
        @keyframes arrow-pop { from{transform:translate(0,0);} to{transform:translate(4px,-4px);} }
        @keyframes float-gentle { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
        @keyframes emoji-bounce { 0%{transform:translateX(-50%) scale(0) rotate(-20deg);opacity:0;} 60%{transform:translateX(-50%) scale(1.3) rotate(10deg);opacity:1;} 100%{transform:translateX(-50%) scale(1) rotate(0deg);opacity:1;} }
        @keyframes pulse-dot { 0%,100%{opacity:0.4;transform:translateX(-50%) scale(1);} 50%{opacity:1;transform:translateX(-50%) scale(1.5);} }
        .m-in { animation: modal-in 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
        .m-out { animation: modal-out 0.4s cubic-bezier(0.4,0,1,1) forwards; }
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 2px; }
        .modal-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.20); }
      `}</style>

      <section
        id="projects"
        style={{ position: 'relative', minHeight: '100vh', width: '100%', background: C.bg }}
      >
        <ProjectsHeader />
        <CurvedCarousel activeIndex={activeIndex} onActivate={setActiveIndex} onClick={openModal} />
        <ArrowBtn direction="left"  onClick={handlePrev} />
        <ArrowBtn direction="right" onClick={handleNext} />
        <CarouselDots activeIndex={activeIndex} onDotClick={handleDotClick} />
        <TitleStrip activeIndex={activeIndex} onHover={handleTitleHover} onLeave={() => {}} onClick={openModal} />

        {/* Modal */}
        {modal.index !== null && (
          <div
            className="fixed inset-0 z-50"
            style={{
              ...overlayStyle,
              background: 'rgba(240,240,245,0.92)',
              backdropFilter: 'blur(16px)',
              willChange: 'clip-path',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center" onClick={closeModal}>
              {activeProject && (
                <div
                  className={modal.phase === 'closing' ? 'm-out' : 'm-in'}
                  style={{
                    width: '92vw', maxWidth: 1100, height: '90vh',
                    background: C.bg,
                    border: `1px solid ${C.borderMed}`,
                    borderRadius: '28px 36px 32px 40px / 36px 28px 40px 32px',
                    overflow: 'hidden', position: 'relative',
                    boxShadow: '0 32px 100px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)',
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={closeModal}
                    style={{
                      position: 'absolute', top: 20, right: 20, zIndex: 10,
                      width: 40, height: 40, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(0,0,0,0.06)', border: `1px solid ${C.border}`,
                      color: C.textSub, cursor: 'pointer',
                      opacity: modal.contentVisible ? 1 : 0,
                      transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'scale(1) rotate(0deg)'; }}
                  >
                    <X size={16} />
                  </button>

                  <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{
                      width: '45%', flexShrink: 0, display: 'flex', flexDirection: 'column',
                      background: C.bgSurface,
                      opacity: modal.contentVisible ? 1 : 0,
                      transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1)',
                    }}>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, overflow: 'hidden' }}>
                        {activeImages.length > 0 ? (
                          <img
                            key={modal.slideIndex}
                            src={activeImages[modal.slideIndex]}
                            alt={`${activeProject.title} ${modal.slideIndex + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 18, animation: 'img-in 0.6s cubic-bezier(0.22,1,0.36,1) forwards' }}
                          />
                        ) : (
                          <p style={{ color: C.textMuted, fontSize: 13 }}>Belum ada gambar</p>
                        )}
                      </div>
                      {activeImages.length > 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 24px 24px' }}>
                          {activeImages.map((img, idx) => (
                            <button key={idx} onClick={() => setModal(p => ({ ...p, slideIndex: idx }))} style={{
                              width: 56, height: 40, borderRadius: 12, overflow: 'hidden', flexShrink: 0, cursor: 'pointer',
                              border: `2px solid ${idx === modal.slideIndex ? C.dotActive : 'transparent'}`,
                              opacity: idx === modal.slideIndex ? 1 : 0.35,
                              transform: idx === modal.slideIndex ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
                              transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                              boxShadow: idx === modal.slideIndex ? '0 6px 20px rgba(0,0,0,0.12)' : 'none',
                            }}>
                              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </button>
                          ))}
                          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                            {(['‹', '›']).map((arrow, ai) => (
                              <button key={arrow} onClick={() => setModal(p => ({ ...p, slideIndex: ai === 0 ? (p.slideIndex - 1 + activeImages.length) % activeImages.length : (p.slideIndex + 1) % activeImages.length }))} style={{
                                width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: C.pill, border: `1px solid ${C.border}`, color: C.textSub, fontSize: 18, cursor: 'pointer',
                                transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                              }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'scale(1.15)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = C.pill; e.currentTarget.style.transform = 'scale(1)'; }}
                              >{arrow}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{
                      flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden',
                      borderLeft: `1px solid ${C.border}`,
                      opacity: modal.contentVisible ? 1 : 0,
                      transition: 'opacity 0.6s 100ms cubic-bezier(0.16,1,0.3,1)',
                    }}>
                      <div style={{ padding: '28px 36px', borderBottom: `1px solid ${C.border}` }}>
                        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: C.textMuted, margin: '0 0 8px' }}>
                          {activeProject.category}
                        </p>
                        <h3 style={{ fontSize: 40, fontWeight: 800, color: C.text, letterSpacing: '-0.02em', margin: 0 }}>
                          {activeProject.title}
                        </h3>
                        <p style={{ fontSize: 14, color: C.textSub, margin: '8px 0 0', fontWeight: 500 }}>
                          {activeProject.role}
                        </p>
                      </div>

                      <div className="modal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: 32 }}>
                        <div>
                          <Label>Tentang</Label>
                          <p style={{ fontSize: 15, lineHeight: 1.7, color: C.textSub, margin: 0 }}>{activeProject.desc}</p>
                        </div>
                        <div>
                          <Label>Tech Stack</Label>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                            {activeProject.tech.map((t) => (
                              <span key={t} style={{
                                fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 99,
                                background: C.pill, border: `1px solid ${C.pillBorder}`, color: C.pillText,
                                cursor: 'default', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                              }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.10)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = C.pill; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                              >{t}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Kontribusi</Label>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {activeProject.whatIDid.map((item, idx) => (
                              <li key={idx} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.textMuted, flexShrink: 0, marginTop: 8 }} />
                                <span style={{ fontSize: 14, lineHeight: 1.65, color: C.textSub }}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div style={{ padding: '22px 36px', borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <span style={{ fontSize: 13, color: C.textMuted, fontWeight: 600 }}>
                            {(modal.index ?? 0) + 1} / {projects.length}
                          </span>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <NavBtn label="← Prev" onClick={() => setModal(p => ({ ...p, index: ((p.index ?? 0) - 1 + projects.length) % projects.length, slideIndex: 0 }))} />
                            <NavBtn label="Next →" onClick={() => setModal(p => ({ ...p, index: ((p.index ?? 0) + 1) % projects.length, slideIndex: 0 }))} />
                          </div>
                        </div>
                        <a href={activeProject?.figma || activeProject?.github}
                          target="_blank" rel="noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 10,
                            fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em',
                            padding: '10px 20px', borderRadius: 14,
                            background: C.text, color: '#ffffff',
                            textDecoration: 'none',
                            transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#333'; e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.20)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = C.text; e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; }}
                        >
                          <ExternalLink size={14} />
                          {activeProject?.figma ? 'Lihat Figma' : 'Lihat GitHub'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}