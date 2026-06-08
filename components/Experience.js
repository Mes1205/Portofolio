'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, MousePointerClick, Star, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_HOLD, EXP_SLIDE, EXP_HOLD } from '@/app/page';

const jobs = [
  {
    id: 'asprak',
    title: 'Lab Assistant',
    place: 'Universitas Padjadjaran',
    year: '2025 — Present',
    description: 'Mentored 30+ students/semester across Data Structures, Programming Algorithms, Database Systems, Analysis of Algorithm, and Digital Business (UI/UX). Conducted code reviews and debugging sessions.',
    skills: ['Technical Support', 'Problem Solving', 'Communication'],
    subjects: ['Algoritma Pemrograman', 'Struktur Data', 'Sistem Database', 'Analisis Algoritma'],
    images: [
      { src: '/images/asprak.png',   alt: 'Lab Session 1' },
      { src: '/images/asprak-1.jpg', alt: 'Lab Session 2' },
      { src: '/images/asprak-2.jpg', alt: 'Lab Session 3' },
      { src: '/images/asprak-3.jpg', alt: 'Lab Session 4' },
    ],
  },
  {
    id: 'pipp',
    title: 'Front End Developer Intern',
    place: 'PIPP UNPAD',
    year: '2025',
    description: 'Built an AI-powered 3D chatbot interface with React & Three.js. Integrated ElevenLabs TTS for real-time voice interaction.',
    skills: ['React.js', 'Tailwind CSS', 'JavaScript'],
    images: [
      { src: '/images/pipp-1.png', alt: 'PIPP Work 1' },
      { src: '/images/pipp-2.jpg', alt: 'PIPP Work 2' },
    ],
  },
  {
    id: 'hubin',
    title: 'Internal Relations Staff',
    place: 'HIMATIF UNPAD',
    year: '2024 — 2025',
    description: 'Created programs to strengthen relationships within the academic community. Initiated a student recognition system to appreciate high-achieving peers.',
    skills: ['Community Building', 'Event Planning', 'Communication'],
    images: [
      { src: '/images/hubin-1.png',  alt: 'HIMATIF Event 1' },
      { src: '/images/hubin-2.jpeg', alt: 'HIMATIF Event 2' },
      { src: '/images/hubin-3.jpeg', alt: 'HIMATIF Event 3' },
      { src: '/images/hubin-4.jpeg', alt: 'HIMATIF Event 4' },
      { src: '/images/hubin-5.jpeg', alt: 'HIMATIF Event 5' },
      { src: '/images/hubin-6.jpeg', alt: 'HIMATIF Event 6' },
    ],
  },
  {
    id: 'fasil',
    title: 'Facilitator',
    place: 'PRABU UNPAD',
    year: '2024',
    description: 'Facilitated transition for new student cohort. Directed mobilization and logistics for 170+ participants.',
    skills: ['Leadership', 'Logistics', 'Facilitation'],
    images: [
      { src: '/images/fasil-1.png', alt: 'PRABU 1' },
      { src: '/images/fasil-2.png', alt: 'PRABU 2' },
      { src: '/images/fasil-3.png', alt: 'PRABU 3' },
      { src: '/images/fasil-4.png', alt: 'PRABU 4' },
    ],
  },
  {
    id: 'ifest',
    title: 'Marketing & Social Media',
    place: 'IFEST — HIMATIF UNPAD',
    year: '2024',
    description: 'Produced 33+ promo videos, managed KOL collaborations, and developed 21 promotional assets across digital platforms.',
    skills: ['Content Creation', 'Social Media', 'Marketing'],
    images: [
      { src: '/images/ifest-1.png', alt: 'IFEST Content 1' },
      { src: '/images/ifest-2.jpg', alt: 'IFEST Content 2' },
      { src: '/images/ifest-3.jpg', alt: 'IFEST Content 3' },
    ],
  },
];

const N = jobs.length;

// ─────────────────────────────────────────────────────────────
// ExperienceHeader
// ─────────────────────────────────────────────────────────────
function ExperienceHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const headerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) / rect.width;
    const y = (e.clientY - rect.top  - rect.height / 2) / rect.height;
    setMousePos({ x: x * 15, y: y * 10 });
  }, []);

  return (
    <div
      ref={headerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      style={{
        position: 'absolute', top: '7%', left: 0,
        width: '100%', zIndex: 5,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'default',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : -16}px) translate(${mousePos.x}px, ${mousePos.y}px)`,
        transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s ease-out',
      }}>
        <div style={{ width: 50, height: 2, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3))', borderRadius: 1 }} />
        <h1 style={{
          margin: 0, fontSize: 'clamp(28px, 3.5vw, 44px)',
          fontWeight: 700, letterSpacing: '-0.02em',
          color: '#ffffff', fontFamily: "'Poppins', sans-serif",
          textShadow: '0 0 40px rgba(255,255,255,0.1)',
        }}>
          {'Experience'.split('').map((char, i) => (
            <span key={i} style={{
              display: 'inline-block',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s`,
            }}>{char}</span>
          ))}
        </h1>
        <div style={{ width: 50, height: 2, background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.3))', borderRadius: 1 }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PhotoGallery
// ─────────────────────────────────────────────────────────────
function PhotoGallery({ images, isVisible }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const autoPlayRef  = useRef(null);

  useEffect(() => {
    if (!isVisible || images.length <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isVisible, images.length]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) / rect.width;
    const y = (e.clientY - rect.top  - rect.height / 2) / rect.height;
    setMousePos({ x: x * 25, y: y * 25 });
  }, []);

  const positions = [
    { x: -80, y: -100, size: 300, rotate: -12, zIndex: 3, parallaxMult: 0.8 },
    { x: 140, y: -60,  size: 260, rotate: 8,   zIndex: 2, parallaxMult: 0.6 },
    { x: -60, y: 120,  size: 240, rotate: -5,  zIndex: 4, parallaxMult: 1.2 },
    { x: 100, y: 100,  size: 220, rotate: 10,  zIndex: 1, parallaxMult: 0.4 },
    { x: 180, y: 80,   size: 200, rotate: -8,  zIndex: 2, parallaxMult: 0.9 },
    { x: -120, y: 60,  size: 280, rotate: 6,   zIndex: 3, parallaxMult: 1.0 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      style={{ position: 'relative', width: '100%', height: '100%', minHeight: 480, overflow: 'visible' }}
    >
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: `translate(-50%, -50%) translate(${mousePos.x}px, ${mousePos.y}px) rotate(-2deg)`,
        width: 340, height: 255, zIndex: 10,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s ease-out',
        borderRadius: 16, overflow: 'hidden',
        boxShadow: isHovered
          ? '0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.15)'
          : '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
        cursor: 'pointer', background: '#111',
      }}>
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)',
          opacity: isHovered ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          display: 'flex', alignItems: 'center', gap: 8,
          opacity: isHovered ? 1 : 0.7, transition: 'opacity 0.3s ease',
        }}>
          <span style={{
            fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.8)',
            background: 'rgba(0,0,0,0.4)', padding: '4px 10px',
            borderRadius: 99, backdropFilter: 'blur(8px)',
          }}>
            {currentIndex + 1} / {images.length}
          </span>
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev - 1 + images.length) % images.length); }}
              style={{
                position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', opacity: isHovered ? 1 : 0, transition: 'all 0.3s ease', backdropFilter: 'blur(8px)',
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(prev => (prev + 1) % images.length); }}
              style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', opacity: isHovered ? 1 : 0, transition: 'all 0.3s ease', backdropFilter: 'blur(8px)',
              }}
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {images.map((img, i) => {
        if (i === currentIndex) return null;
        const pos = positions[i % positions.length];
        const isNear =
          Math.abs(i - currentIndex) === 1 ||
          (i === 0 && currentIndex === images.length - 1) ||
          (i === images.length - 1 && currentIndex === 0);
        return (
          <div key={img.src} style={{
            position: 'absolute',
            top:  `calc(50% + ${pos.y}px)`,
            left: `calc(50% + ${pos.x}px)`,
            transform: `translate(-50%, -50%) translate(${mousePos.x * pos.parallaxMult}px, ${mousePos.y * pos.parallaxMult}px) rotate(${pos.rotate}deg) scale(${isNear ? 0.9 : 0.75})`,
            width: pos.size, height: pos.size * 0.75, zIndex: pos.zIndex,
            opacity: isVisible ? (isNear ? 0.75 : 0.5) : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
            pointerEvents: 'none', background: '#111',
            filter: isNear ? 'brightness(0.85) blur(0.5px)' : 'brightness(0.7) blur(1px)',
          }}>
            <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        );
      })}

      {images.length > 1 && (
        <div style={{
          position: 'absolute', bottom: -40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 8, zIndex: 20,
        }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setCurrentIndex(i)} style={{
              width: i === currentIndex ? 24 : 6, height: 6, borderRadius: 99,
              background: i === currentIndex ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', padding: 0,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ScrollHint
// ─────────────────────────────────────────────────────────────
function ScrollHint({ isVisible }) {
  return (
    <div style={{
      position: 'absolute', bottom: '8%', left: 0, width: '100%', zIndex: 5,
      display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
      opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 22px', borderRadius: 99,
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(10px)',
      }}>
        <MousePointerClick size={14} style={{ color: 'rgba(255,255,255,0.35)' }} />
        <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>
          Scroll to explore
        </span>
        <ArrowRight size={14} style={{ color: 'rgba(255,255,255,0.35)', animation: 'scroll-bounce 2s ease-in-out infinite' }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// JobCard
// ─────────────────────────────────────────────────────────────
function JobCard({ job, index, isActive }) {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setContentVisible(true), 150);
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [isActive]);

  return (
    <div style={{
      flexShrink: 0,
      width: 'min(90vw, 1100px)',
      position: 'relative',
      padding: 'clamp(60px, 8vw, 100px) 0 clamp(20px, 4vw, 40px)',
      opacity: isActive ? 1 : 0.4,
      transform: isActive ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.97)',
      transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
      willChange: 'transform, opacity',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      minHeight: '75vh',
    }}>
      <div style={{
        position: 'relative',
        width: 'clamp(180px, 40vw, 48%)',
        height: 'clamp(320px, 40vh, 520px)',
        flexShrink: 0,
        zIndex: 5,
      }}>
        <PhotoGallery images={job.images} isVisible={isActive} />
      </div>

      <div style={{
        flex: 1,
        position: 'relative',
        zIndex: 5,
        paddingLeft: 'clamp(20px, 4vw, 60px)',
        minWidth: 0,
      }}>
        <div style={{
          fontFamily: 'monospace', fontSize: '0.75rem', color: 'rgba(255,255,255,0.18)',
          letterSpacing: '0.1em', marginBottom: 20,
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
        </div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20,
          padding: '6px 16px', borderRadius: 99,
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
        }}>
          <Zap size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
            {job.year}
          </span>
        </div>

        <h3 style={{
          fontWeight: 800,
          fontSize: 'clamp(24px, 4vw, 58px)',
          color: '#ffffff',
          lineHeight: 1.1, margin: '0 0 8px 0', letterSpacing: '-0.03em',
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
        }}>
          {job.title}
        </h3>

        <p style={{
          fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
          fontWeight: 500, color: 'rgba(255,255,255,0.4)',
          margin: '0 0 28px 0',
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
        }}>
          {job.place}
        </p>

        <p style={{
          fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
          lineHeight: 1.75, color: 'rgba(255,255,255,0.55)',
          maxWidth: 480, margin: '0 0 28px 0',
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
        }}>
          {job.description}
        </p>

        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: job.subjects ? 24 : 0,
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
        }}>
          {job.skills.map((skill) => (
            <span
              key={skill}
              style={{
                fontSize: '0.78rem', fontWeight: 600, padding: '6px 16px', borderRadius: 99,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.65)', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        {job.subjects && (
          <div style={{
            paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)',
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Star size={12} style={{ color: 'rgba(255,255,255,0.3)' }} />
              <p style={{
                fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.14em', color: 'rgba(255,255,255,0.3)', margin: 0,
              }}>
                Subjects Taught
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {job.subjects.map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: '0.75rem', fontWeight: 600, padding: '5px 14px', borderRadius: 99,
                    background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.18)',
                    color: 'rgba(250,204,21,0.75)', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(250,204,21,0.18)';
                    e.currentTarget.style.color = 'rgba(250,204,21,0.95)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(250,204,21,0.1)';
                    e.currentTarget.style.color = 'rgba(250,204,21,0.75)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ProgressBar
// ─────────────────────────────────────────────────────────────
function ProgressBar({ progress }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0,
      width: '100%', height: 2, zIndex: 10,
      background: 'rgba(255,255,255,0.03)',
    }}>
      <div style={{
        height: '100%',
        width: `${progress * 100}%`,
        background: 'linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.5))',
        transition: 'width 0.05s linear',
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPERIENCE COMPONENT (FIXED GRADIENT)
// ─────────────────────────────────────────────────────────────
export default function Experience({ mainWrapperRef, isReady }) {
  const sectionRef   = useRef(null);
  const scrollboxRef = useRef(null);
  const gradientRef  = useRef(null);
  const [activeIndex,    setActiveIndex]    = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showHint,       setShowHint]       = useState(true);

  useEffect(() => {
    const hintTimer = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(hintTimer);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const sectionEl  = sectionRef.current;
    const scrollbox  = scrollboxRef.current;
    const gradient   = gradientRef.current;
    const wrapper    = mainWrapperRef?.current;
    if (!sectionEl || !scrollbox || !wrapper || !gradient) return;

    let ctx;

    async function init() {
      const { gsap }          = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const IDS = ['exp-slide', 'exp-hscroll', 'exp-hide', 'exp-gradient'];
      ScrollTrigger.getAll()
        .filter(st => IDS.includes(st.vars.id))
        .forEach(st => st.kill());

      await document.fonts.ready;
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      await new Promise(r => setTimeout(r, 120));

      const vh = window.innerHeight;
      scrollbox.getBoundingClientRect();
      const maxX = Math.max(0, scrollbox.scrollWidth - window.innerWidth);

      const gradientStart = (HERO_HOLD + EXP_SLIDE) * vh;
      const gradientEnd   = (HERO_HOLD + EXP_SLIDE + EXP_HOLD) * vh + maxX + vh * 0.2;

      ctx = gsap.context(() => {

        // 1. Slide up Experience from below
        gsap.fromTo(
          sectionEl,
          { y: '100vh' },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              id:      'exp-slide',
              trigger: wrapper,
              start:   `top+=${HERO_HOLD * vh} top`,
              end:     `top+=${(HERO_HOLD + EXP_SLIDE) * vh} top`,
              scrub:   0.8,
              invalidateOnRefresh: true,
            },
          }
        );

        // 2. Horizontal scroll
        const proxy = { value: 0 };
        gsap.to(proxy, {
          value: maxX,
          ease:  'none',
          onUpdate: () => {
            scrollbox.scrollLeft = proxy.value;
            const progress = maxX > 0 ? proxy.value / maxX : 0;
            setScrollProgress(progress);
            setActiveIndex(Math.min(N - 1, Math.floor(progress * N)));
          },
          scrollTrigger: {
            id:      'exp-hscroll',
            trigger: wrapper,
            start:   `top+=${(HERO_HOLD + EXP_SLIDE + EXP_HOLD) * vh} top`,
            end:     `top+=${(HERO_HOLD + EXP_SLIDE + EXP_HOLD) * vh + maxX} top`,
            scrub:   0.8,
            invalidateOnRefresh: true,
          },
        });

        // 3. Gradient overlay moves from bottom (dark) to top (white)
        gsap.fromTo(
          gradient,
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              id:      'exp-gradient',
              trigger: wrapper,
              start:   `top+=${gradientStart} top`,
              end:     `top+=${gradientEnd} top`,
              scrub:   1.2,
              invalidateOnRefresh: true,
            },
          }
        );

        // 4. Slide Experience out to reveal Projects
        gsap.to(sectionEl, {
          y: '-100vh',
          ease: 'none',
          scrollTrigger: {
            id:      'exp-hide',
            trigger: wrapper,
            start:   `top+=${(HERO_HOLD + EXP_SLIDE + EXP_HOLD) * vh + maxX} top`,
            end:     `top+=${(HERO_HOLD + EXP_SLIDE + EXP_HOLD + 1) * vh + maxX} top`,
            scrub:   1.2,
            invalidateOnRefresh: true,
            onLeave:     () => { sectionEl.style.pointerEvents = 'none'; },
            onEnterBack: () => { sectionEl.style.pointerEvents = 'auto'; },
          },
        });

      }, sectionEl);

      ScrollTrigger.refresh();
    }

    init();
    return () => { ctx?.revert(); };
  }, [mainWrapperRef, isReady]);

  return (
    <>
      <style>{`
        @keyframes scroll-bounce {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(6px); }
        }
      `}</style>

      <div
        ref={sectionRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: 20,
          overflow: 'hidden',
          background: '#0a0a0a',
          willChange: 'transform',
          transform: 'translateY(100vh)',
        }}
      >
        {/* SEAMLESS GRADIENT OVERLAY */}
        <div
          ref={gradientRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
            willChange: 'transform',
            transform: 'translateY(100%)',
            background: `
              linear-gradient(
                to bottom,
                #0a0a0a 0%,
                #111827 15%,
                #1e3a5f 30%,
                #2563eb 45%,
                #3b82f6 55%,
                #60a5fa 65%,
                #93c5fd 75%,
                #bfdbfe 85%,
                #ffffff 95%,
                #ffffff 100%
              )
            `,
          }}
        />

        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.02, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          zIndex: 2,
        }} />

        <ExperienceHeader />
        <ScrollHint isVisible={showHint} />

        <div style={{
          position: 'absolute', top: '50%', right: 28,
          transform: 'translateY(-50%)', zIndex: 10,
          display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center',
        }}>
          {jobs.map((_, i) => (
            <div key={i} style={{
              width:  i === activeIndex ? 8 : 3,
              height: i === activeIndex ? 8 : 3,
              borderRadius: '50%',
              background: i === activeIndex ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.15)',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: i === activeIndex ? '0 0 10px rgba(255,255,255,0.3)' : 'none',
            }} />
          ))}
        </div>

        <div
          ref={scrollboxRef}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            overflowX: 'hidden', overflowY: 'hidden',
            zIndex: 3,
          }}
        >
          <div
            data-exp-track
            style={{
              display: 'flex', alignItems: 'center',
              height: '100%',
              gap: 'clamp(6vw, 10vw, 12vw)',
              paddingLeft: 'clamp(5vw, 10vw, 15vw)',
              paddingRight: 'clamp(15vw, 25vw, 30vw)',
              width: 'max-content',
            }}
          >
            {jobs.map((job, i) => (
              <JobCard key={job.id} job={job} index={i} isActive={i === activeIndex} />
            ))}
          </div>
        </div>

        <ProgressBar progress={scrollProgress} />
      </div>
    </>
  );
}