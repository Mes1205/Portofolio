'use client';
import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const container = document.querySelector('main');
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const winH = container.clientHeight;
      const mid = scrollTop + winH * 0.5;

      let closest = sectionIds[0];
      let minDist = Infinity;

      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        // offsetTop relatif ke parent — kalau nested, pakai getBoundingClientRect
        const rect = el.getBoundingClientRect();
        const elCenter = scrollTop + rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - mid);
        if (dist < minDist) { minDist = dist; closest = id; }
      });

      setActiveId(closest);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return activeId;
}