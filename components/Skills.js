'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '@/app/ThemeProvider';
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript,
  SiHtml5, SiNodedotjs, SiSupabase, SiPostgresql, SiUnity,
  SiPython, SiScikitlearn, SiGit, SiFigma,
  SiGooglecolab, SiVercel, SiHuggingface,
  SiStreamlit, SiFirebase, SiThreedotjs,
} from 'react-icons/si';
import { TbApi, TbChartBar, TbBrandCSharp, TbBrandVscode } from 'react-icons/tb';

const skillsData = [
  {
    category: "Frontend",
    items: [
      { name: "React",       Icon: SiReact,          color: "#61DAFB", bg: "rgba(97,218,251,0.12)" },
      { name: "Next.js",     Icon: SiNextdotjs,      color: "#000000", bg: "rgba(0,0,0,0.08)" },
      { name: "Tailwind",    Icon: SiTailwindcss,    color: "#38BDF8", bg: "rgba(56,189,248,0.12)" },
      { name: "TypeScript",  Icon: SiTypescript,     color: "#3178C6", bg: "rgba(49,120,198,0.12)" },
      { name: "JavaScript",  Icon: SiJavascript,     color: "#F7DF1E", bg: "rgba(247,223,30,0.12)" },
      { name: "HTML5",       Icon: SiHtml5,          color: "#E34F26", bg: "rgba(227,79,38,0.12)" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js",     Icon: SiNodedotjs,   color: "#339933", bg: "rgba(51,153,51,0.12)" },
      { name: "Supabase",    Icon: SiSupabase,    color: "#3ECF8E", bg: "rgba(62,207,142,0.12)" },
      { name: "PostgreSQL",  Icon: SiPostgresql,  color: "#336791", bg: "rgba(51,103,145,0.12)" },
      { name: "REST API",    Icon: TbApi,         color: "#FF6B6B", bg: "rgba(255,107,107,0.12)" },
      { name: "Firebase",    Icon: SiFirebase,    color: "#FFCA28", bg: "rgba(255,202,40,0.12)" },
    ],
  },
  {
    category: "Mobile / 3D",
    items: [
      { name: "Unity",       Icon: SiUnity,       color: "#000000", bg: "rgba(0,0,0,0.08)" },
      { name: "C#",          Icon: TbBrandCSharp, color: "#68217A", bg: "rgba(104,33,122,0.12)" },
      { name: "Three.js",    Icon: SiThreedotjs,  color: "#000000", bg: "rgba(0,0,0,0.08)" },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "Python",         Icon: SiPython,       color: "#3776AB", bg: "rgba(55,118,171,0.12)" },
      { name: "Scikit-Learn",   Icon: SiScikitlearn,  color: "#F7931E", bg: "rgba(247,147,30,0.12)" },
      { name: "Data Analysis",  Icon: TbChartBar,     color: "#2ECC71", bg: "rgba(46,204,113,0.12)" },
      { name: "Hugging Face",   Icon: SiHuggingface,  color: "#FFD21E", bg: "rgba(255,210,30,0.12)" },
      { name: "Streamlit",      Icon: SiStreamlit,    color: "#FF4B4B", bg: "rgba(255,75,75,0.12)" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git",            Icon: SiGit,         color: "#F05032", bg: "rgba(240,80,50,0.12)" },
      { name: "Figma",          Icon: SiFigma,       color: "#F24E1E", bg: "rgba(242,78,30,0.12)" },
      { name: "Google Colab",   Icon: SiGooglecolab, color: "#F9AB00", bg: "rgba(249,171,0,0.12)" },
      { name: "VS Code",        Icon: TbBrandVscode, color: "#007ACC", bg: "rgba(0,122,204,0.12)" },
      { name: "Vercel",         Icon: SiVercel,      color: "#000000", bg: "rgba(0,0,0,0.08)" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SKILL CARD
// ─────────────────────────────────────────────────────────────────────────────

function SkillCard({ skill, index, isHovered, onHover, onLeave, isDark }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef(null);
  const { Icon } = skill;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), index * 60 + 100);
    return () => clearTimeout(t);
  }, [index]);

  const angle = (index / 20) * Math.PI * 2;
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.dataset.cosA = String(cosA);
    card.dataset.sinA = String(sinA);
  }, [cosA, sinA]);

  const organicRadius = `${20 + (index % 3) * 4}px ${16 + (index % 5) * 3}px ${24 + (index % 2) * 2}px ${18 + (index % 4) * 3}px`;

  const baseTransform = (() => {
    if (!mounted) return 'scale(0.7)';
    if (!isVisible) return 'scale(0.7)';
    if (isPressed) return 'translate(var(--ox, 0px), var(--oy, 0px)) scale(0.95)';
    if (isHovered) return 'translate(var(--ox, 0px), var(--oy, 0px)) scale(1.08) translateY(-6px)';
    return 'translate(var(--ox, 0px), var(--oy, 0px)) scale(1)';
  })();

  return (
    <div
      ref={cardRef}
      onMouseEnter={useCallback(() => onHover(skill.name), [onHover, skill.name])}
      onMouseLeave={useCallback(() => onLeave(), [onLeave])}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '24px 18px',
        minWidth: 120,
        minHeight: 120,
        borderRadius: organicRadius,
        background: isHovered
          ? isDark
            ? `linear-gradient(135deg, ${skill.bg}, rgba(255,255,255,0.05))`
            : `linear-gradient(135deg, ${skill.bg}, rgba(255,255,255,0.9))`
          : isDark
            ? 'rgba(255,255,255,0.03)'
            : 'rgba(0,0,0,0.02)',
        border: isHovered
          ? `2px solid ${skill.color}`
          : isDark
            ? '1px solid rgba(255,255,255,0.08)'
            : '1px solid rgba(0,0,0,0.08)',
        opacity: mounted ? (isVisible ? 1 : 0) : 0,
        transform: baseTransform,
        transition: [
          'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          'opacity 0.4s ease',
          'background 0.3s ease',
          'border-color 0.3s ease',
          'box-shadow 0.3s ease',
        ].join(', '),
        cursor: 'pointer',
        boxShadow: isHovered
          ? `0 12px 40px ${skill.bg}, 0 0 0 1px ${skill.color}40`
          : isDark
            ? '0 2px 8px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.06)',
        willChange: isHovered ? 'transform' : 'auto',
      }}
    >
      {isHovered && (
        <div style={{
          position: 'absolute',
          inset: -2,
          borderRadius: 'inherit',
          background: `linear-gradient(135deg, ${skill.color}20, transparent)`,
          opacity: 0.5,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
        }} />
      )}

      <div style={{
        filter: isHovered ? `drop-shadow(0 0 8px ${skill.color}60)` : 'none',
        transition: 'filter 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        transform: isHovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0deg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={36} color={skill.color} />
      </div>

      <span style={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.04em',
        color: isHovered ? skill.color : isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
        transition: 'color 0.3s ease',
        textAlign: 'center',
        whiteSpace: 'nowrap',
      }}>
        {skill.name}
      </span>

      <div style={{
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: isHovered ? skill.color : isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
        transition: 'background 0.3s ease, transform 0.3s ease',
        transform: isHovered ? 'scale(1.5)' : 'scale(1)',
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILL CATEGORY
// ─────────────────────────────────────────────────────────────────────────────

function SkillCategory({ category, items, isDark, hoveredSkill, onHover, onLeave, startIndex }) {
  const [catVisible, setCatVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCatVisible(true), startIndex * 60 + 100);
    return () => clearTimeout(t);
  }, [startIndex]);

  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
        opacity: catVisible ? 1 : 0,
        transform: catVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{
          width: 24, height: 2, borderRadius: 1,
          background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
        }} />
        <h3 style={{
          fontSize: 11, fontWeight: 800, textTransform: 'uppercase',
          letterSpacing: '0.2em', margin: 0,
          color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
        }}>
          {category}
        </h3>
        <div style={{
          flex: 1, height: 1, borderRadius: 1,
          background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        }} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
        {items.map((skill, i) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={startIndex + i}
            isHovered={hoveredSkill === skill.name}
            onHover={onHover}
            onLeave={onLeave}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING PARTICLES
// ─────────────────────────────────────────────────────────────────────────────

function FloatingParticles({ isDark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let active = true;

    const handleVisibility = () => {
      active = !document.hidden;
      if (active) loop();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: 1 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      opacity: 0.08 + Math.random() * 0.12,
      pulse: Math.random() * Math.PI * 2,
    }));

    const loop = () => {
      if (!active) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.015;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(255,255,255,${0.03 * (1 - dist / 80)})`
              : `rgba(0,0,0,${0.03 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      active = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default function Skills() {
  const { isDark } = useTheme();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateCards = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      const start = rect.top - vh;
      const end = rect.top + rect.height * 0.5;
      const total = end - start;
      const current = -start;
      const p = Math.max(0, Math.min(1, current / total));
      const scatterRadius = 150 * (1 - p);

      const cards = section.querySelectorAll('[data-cos-a]');
      for (const card of cards) {
        const cosA = parseFloat(card.dataset.cosA ?? '0');
        const sinA = parseFloat(card.dataset.sinA ?? '0');
        const ox = cosA * scatterRadius;
        const oy = sinA * scatterRadius;
        card.style.setProperty('--ox', `${ox}px`);
        card.style.setProperty('--oy', `${oy}px`);
      }

      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(updateCards);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateCards();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  let globalIndex = 0;

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: isDark ? '#0a0a0a' : '#fafafa',
        transition: 'background 0.6s ease',
      }}
    >
      <FloatingParticles isDark={isDark} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 1200,
        margin: '0 auto',
        padding: '100px 24px 80px',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 60,
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div style={{
            width: 50, height: 2, borderRadius: 1,
            background: isDark
              ? 'linear-gradient(to right, transparent, rgba(255,255,255,0.3))'
              : 'linear-gradient(to right, transparent, rgba(0,0,0,0.2))',
          }} />
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: isDark ? '#ffffff' : '#0a0a0a',
            fontFamily: "'Poppins', sans-serif",
            margin: 0,
          }}>
            {'Skills'.split('').map((char, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: headerVisible ? 1 : 0,
                  transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`,
                }}
              >
                {char}
              </span>
            ))}
          </h2>
          <div style={{
            width: 50, height: 2, borderRadius: 1,
            background: isDark
              ? 'linear-gradient(to left, transparent, rgba(255,255,255,0.3))'
              : 'linear-gradient(to left, transparent, rgba(0,0,0,0.2))',
          }} />
        </div>

        {/* Skill categories */}
        {skillsData.map((cat) => {
          const start = globalIndex;
          globalIndex += cat.items.length;
          return (
            <SkillCategory
              key={cat.category}
              category={cat.category}
              items={cat.items}
              isDark={isDark}
              hoveredSkill={hoveredSkill}
              onHover={setHoveredSkill}
              onLeave={() => setHoveredSkill(null)}
              startIndex={start}
            />
          );
        })}

        {/* Bottom line */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginTop: 40,
          opacity: headerVisible ? 1 : 0,
          transition: 'opacity 1s ease 1s',
        }}>
          <div style={{
            flex: 1, height: 1, borderRadius: 1,
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          }} />
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
            color: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
          }}>
            Always learning
          </span>
          <div style={{
            flex: 1, height: 1, borderRadius: 1,
            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          }} />
        </div>
      </div>
    </section>
  );
}