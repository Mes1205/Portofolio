"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Send } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navLinks = [
    { label: 'Home',       href: '/' },
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

  // Update highlight position to match the active link element exactly
  useEffect(() => {
    const activeEl = linkRefs.current[activeIndex];
    const navEl = navRef.current;
    if (!activeEl || !navEl) return;

    const navRect = navEl.getBoundingClientRect();
    const linkRect = activeEl.getBoundingClientRect();

    setHighlightStyle({
      left: linkRect.left - navRect.left -350, // 12px padding offset
      width: linkRect.width + 24,
      opacity: 1,
    });
  }, [activeIndex]);

  const scrollToSection = (e: React.MouseEvent, href: string, index: number) => {
    setActiveIndex(index);
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(href);
    }
  };

  return (
    <nav className="fixed top-[12px] left-0 right-0 z-[100] flex justify-center px-4 transition-all duration-300">
      <div className="relative w-full max-w-[1000px] h-[53px]" ref={navRef}>

        {/* Glass Background */}
        <div
          className="absolute inset-0 rounded-[29px] border border-black/30 transition-all duration-300"
          style={{
            background: isScrolled ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px) saturate(180%)',
            WebkitBackdropFilter: 'blur(10px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
          }}
        />

        {/* Logo / Name */}
        <div
          className="absolute left-[30px] top-1/2 -translate-y-1/2 cursor-pointer font-black text-[20px] text-slate-900 tracking-tighter"
          onClick={() => {
            setActiveIndex(0);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          MARTHA<span className="text-blue-600">.</span>
        </div>

        {/* Navigation Links */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-[40px]">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              ref={(el) => { linkRefs.current[index] = el; }}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href, index)}
              className={`text-[14px] font-semibold transition-all duration-300 cursor-pointer relative z-10 ${
                activeIndex === index
                  ? 'text-slate-900 opacity-100'
                  : 'text-slate-800 opacity-60 hover:opacity-100'
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

        {/* Contact Button */}
        <div
          className="absolute right-[10px] top-1/2 -translate-y-1/2 h-[34px] px-5 rounded-[26px] flex items-center justify-center cursor-pointer transition-transform active:scale-95 hover:opacity-90"
          style={{ background: '#1e1b4b' }}
          onClick={() => window.location.href = 'mailto:emailkamu@gmail.com'}
        >
          <p className="text-[12px] font-bold text-white flex items-center gap-2">
            Let&apos;s Talk <Send size={14} />
          </p>
        </div>
      </div>
    </nav>
  );
}