"use client";

import { useEffect, useState, useRef } from 'react';
import { Send, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/app/ThemeProvider';

export default function Navbar() {
  const { isDark, toggleTheme, isProjectModalOpen } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const linksWrapRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const themeToggleRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { label: 'Home',       href: '#hero' },
    { label: 'Projects',   href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills',     href: '#skills' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateSpotlightPosition = () => {
      if (!themeToggleRef.current) return;
      const rect = themeToggleRef.current.getBoundingClientRect();
      setSpotlightPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    };

    updateSpotlightPosition();
    window.addEventListener('resize', updateSpotlightPosition);
    return () => window.removeEventListener('resize', updateSpotlightPosition);
  }, []);

  const updateHighlight = () => {
    const activeEl = linkRefs.current[activeIndex];
    const wrapEl = linksWrapRef.current;
    if (!activeEl || !wrapEl) return;

    const wrapRect = wrapEl.getBoundingClientRect();
    const linkRect = activeEl.getBoundingClientRect();

    setHighlightStyle({
      left: linkRect.left - wrapRect.left - 12,
      width: linkRect.width + 24,
      opacity: 1,
    });
  };

  // Update highlight position to match the active link element exactly
  useEffect(() => {
    updateHighlight();
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [activeIndex]);

  // Follow active section while scrolling in <main>
  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const sectionToIndex = new Map(sectionIds.map((id, idx) => [id, idx]));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;
        const id = visible[0].target.id;
        const idx = sectionToIndex.get(id);
        if (typeof idx === 'number') setActiveIndex(idx);
      },
      {
        root: mainEl,
        threshold: [0.35, 0.5, 0.7],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent, href: string, index: number) => {
    setActiveIndex(index);
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[2] pointer-events-none transition-all duration-700 ease-in-out"
        style={{
          background: `radial-gradient(1900px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255,255,255,1) 0%, rgba(239,246,255,0.86) 22%, rgba(191,219,254,0.56) 42%, rgba(51,65,85,0.46) 70%, rgba(2,6,23,0.76) 100%), linear-gradient(rgba(2,6,23,0.4), rgba(2,6,23,0.4))`,
          opacity: isDark ? 0 : 0.86,
        }}
      />

      <nav
        className={`fixed top-[12px] left-0 right-0 z-[100] flex justify-center px-4 transition-all duration-300 ${
          isProjectModalOpen ? 'pointer-events-none opacity-0 -translate-y-2' : 'pointer-events-auto opacity-100 translate-y-0'
        }`}
        aria-hidden={isProjectModalOpen}
      >
      <div className="relative w-full max-w-[1000px] h-[53px]">

        {/* Glass Background */}
        <div
          className="absolute inset-0 rounded-[29px] border transition-all duration-300"
          style={{
            borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)',
            background: isDark 
              ? isScrolled ? 'rgba(20, 20, 20, 0.8)' : 'rgba(20, 20, 20, 0.5)'
              : isScrolled ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px) saturate(180%)',
            WebkitBackdropFilter: 'blur(10px) saturate(180%)',
            boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
          }}
        />

        {/* Logo / Name */}
        <div
          className={`absolute left-[30px] top-1/2 -translate-y-1/2 cursor-pointer font-black text-[20px] tracking-tighter transition-colors ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
          onClick={() => {
            setActiveIndex(0);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          MARTHA<span className="text-blue-600">.</span>
        </div>

        {/* Navigation Links */}
        <div ref={linksWrapRef} className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-[40px]">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              ref={(el) => { linkRefs.current[index] = el; }}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href, index)}
              className={`text-[14px] font-semibold transition-all duration-300 cursor-pointer relative z-10 ${
                activeIndex === index
                  ? isDark ? 'text-white opacity-100' : 'text-slate-900 opacity-100'
                  : isDark ? 'text-slate-300 opacity-60 hover:opacity-100' : 'text-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Sliding highlight — floats behind the links */}
          <div
            className="absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-in-out pointer-events-none"
            style={{
              left: highlightStyle.left,
              width: highlightStyle.width,
              height: '32px',
              background: 'rgba(0, 0, 0, 0.07)',
              opacity: highlightStyle.opacity,
            }}
          />
        </div>

        {/* Contact Button & Theme Toggle */}
        <div className="absolute right-[10px] top-1/2 -translate-y-1/2 flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            ref={themeToggleRef}
            onClick={toggleTheme}
            className={`h-[34px] w-[34px] rounded-full flex items-center justify-center transition-all hover:scale-110 ${
              isDark 
                ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                : 'bg-blue-500/20 text-blue-600 hover:bg-blue-500/30'
            }`}
            title={isDark ? 'Light Mode' : 'Dark Mode'}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Contact Button */}
          <div
            className="h-[34px] px-5 rounded-[26px] flex items-center justify-center cursor-pointer transition-transform active:scale-95 hover:opacity-90"
            style={{ background: isDark ? '#60a5fa' : '#1e1b4b' }}
            onClick={() => window.location.href = 'mailto:mmeslinafs@gmail.com'}
          >
            <p className="text-[12px] font-bold text-white flex items-center gap-2">
              Let&apos;s Talk <Send size={14} />
            </p>
          </div>
        </div>
      </div>
      </nav>
    </>
  );
}