"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, Send } from 'lucide-react'; // Tambah icon Send untuk contact

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { label: 'Home',       href: '/' },
    { label: 'Projects',   href: '#projects' }, // Pakai ID untuk scroll
    { label: 'Experience', href: '#experience' },
    { label: 'Skills',     href: '#skills' },
  ];

  // Efek ganti warna saat scroll agar tetap terbaca
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi untuk smooth scroll ke section
  const scrollToSection = (e: React.MouseEvent, href: string) => {
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
      <div className="relative w-full max-w-[1000px] h-[53px]">

        {/* Glass Background - Diambil dari style Urunin kamu */}
        <div
          className="absolute inset-0 rounded-[29px] border border-white/30"
          style={{
            background: isScrolled ? 'rgba(255, 255, 255, 0.7)' : 'rgba(176, 176, 199, 0.4)',
            backdropFilter: 'blur(10px) saturate(180%)',
            WebkitBackdropFilter: 'blur(10px) saturate(180%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
          }}
        />

        {/* Logo / Name */}
        <div
          className="absolute left-[30px] top-1/2 -translate-y-1/2 cursor-pointer font-black text-[20px] text-slate-900 tracking-tighter"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          MARTHA<span className="text-blue-600">.</span>
        </div>

        {/* Navigation Links */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-[40px]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[14px] font-semibold text-slate-800 opacity-60 hover:opacity-100 transition-all cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Contact Button (Pill Style ala Urunin) */}
        <div
          className="absolute right-[10px] top-1/2 -translate-y-1/2 h-[34px] px-5 rounded-[26px] flex items-center justify-center cursor-pointer transition-transform active:scale-95"
          style={{ background: '#1e1b4b' }}
          onClick={() => window.location.href = 'mailto:emailkamu@gmail.com'}
        >
          <p className="text-[12px] font-bold text-white flex items-center gap-2">
            Let's Talk <Send size={14} />
          </p>
        </div>
      </div>
    </nav>
  );
}