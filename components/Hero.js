'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useTheme } from '@/app/ThemeProvider';

const keyframes = `
  @keyframes wave {
    0%   { transform: rotate(0deg); }
    15%  { transform: rotate(18deg); }
    30%  { transform: rotate(-8deg); }
    45%  { transform: rotate(16deg); }
    60%  { transform: rotate(-4deg); }
    75%  { transform: rotate(12deg); }
    100% { transform: rotate(0deg); }
  }

  @keyframes spinEnterRight {
    0%   { opacity: 0; transform: rotate(-360deg) scale(0.2) translateX(-40px); }
    60%  { opacity: 1; transform: rotate(20deg) scale(1.15) translateX(4px); }
    80%  { transform: rotate(-8deg) scale(0.97) translateX(0px); }
    100% { opacity: 1; transform: rotate(0deg) scale(1) translateX(0px); }
  }

  @keyframes spinEnterLeft {
    0%   { opacity: 0; transform: scaleX(-1) rotate(-360deg) scale(0.2) translateX(-40px); }
    60%  { opacity: 1; transform: scaleX(-1) rotate(20deg) scale(1.15) translateX(4px); }
    80%  { transform: scaleX(-1) rotate(-8deg) scale(0.97) translateX(0px); }
    100% { opacity: 1; transform: scaleX(-1) rotate(0deg) scale(1) translateX(0px); }
  }

  .wave-hand-right {
    display: inline-block;
    font-size: 5rem;
    line-height: 1;
    user-select: none;
    transform-origin: 10% 70%;
    will-change: transform;
    animation:
      spinEnterRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both,
      wave 2s ease-in-out 1.2s infinite;
  }

  .wave-hand-left {
    display: inline-block;
    font-size: 5rem;
    line-height: 1;
    user-select: none;
    transform-origin: 10% 70%;
    will-change: transform;
    animation:
      spinEnterLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both,
      wave 2s ease-in-out 1.5s infinite;
  }
`;

export default function Hero() {
  const [showCV, setShowCV] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const { isDark } = useTheme();

  return (
    <>
      <style>{keyframes}</style>

      {showCV && (
        <style>{`body { overflow: hidden; } nav { visibility: hidden !important; pointer-events: none; } .custom-cursor { display: none !important; }`}</style>
      )}

      <section
        id="hero"
        className={`flex items-center min-h-screen px-6 transition-colors ${
          isDark ? 'bg-transparent' : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16 text-center md:text-left">

            {/* Kiri: teks */}
            <div className="flex-1">
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Hi, I&apos;m{' '}
                <span
                  className={isProfileHovered ? 'text-transparent' : 'text-blue-500'}
                  style={isProfileHovered ? { WebkitTextStroke: '1px #3b82f6' } : undefined}
                  onMouseEnter={() => setIsProfileHovered(true)}
                  onMouseLeave={() => setIsProfileHovered(false)}
                >
                  Martha.
                </span>
              </h1>
              <p className={`text-lg md:text-xl max-w-xl leading-relaxed mb-10 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Crafting the future of web and AI. From developing educational chatbots to AR-based learning, I'm passionate about building tech that enhances user experiences.
              </p>
              <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`px-8 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 text-white ${
                    isDark
                      ? 'bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/40'
                      : 'bg-slate-900 hover:bg-slate-700 hover:shadow-lg hover:shadow-slate-900/30'
                  }`}
                >
                  Lihat Project
                </button>
                <button
                  onClick={() => setShowCV(true)}
                  className="px-8 py-3 rounded-full font-semibold text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-500 border border-blue-500 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                >
                  Lihat CV
                </button>
              </div>
            </div>

            {/* Kanan: foto + waving hands */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">

              {/* Foto + tangan kiri & kanan */}
              <div className="flex items-center gap-3">

                {/* Tangan kiri — spin masuk lebih lambat */}
                <span className="wave-hand-left" aria-hidden="true">👋</span>

                {/* Foto */}
                <div
                  onMouseEnter={() => setIsProfileHovered(true)}
                  onMouseLeave={() => setIsProfileHovered(false)}
                  className={`w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 shadow-xl ${
                    isDark
                      ? 'border-blue-500/20 shadow-blue-500/10'
                      : 'border-slate-200 shadow-slate-200/50'
                  }`}
                >
                  <img
                    src={isProfileHovered ? '/images/informal.png' : '/images/formal.png'}
                    alt="Martha Meslina Florencia"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Tangan kanan — spin masuk duluan */}
                <span className="wave-hand-right" aria-hidden="true">👋</span>

              </div>

              {/* Social links */}
              <div className="w-full max-w-[330px]">
                <p className={`text-[11px] uppercase tracking-[0.2em] mb-2 text-center ${
                  isDark ? 'text-slate-500' : 'text-slate-700'
                }`}>
                  My Socials
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href="https://github.com/Mes1205"
                    target="_blank"
                    rel="noreferrer"
                    className={`group rounded-xl border px-3 py-2.5 transition-all duration-300 ${
                      isDark
                        ? 'border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-400/50'
                        : 'border-slate-300 bg-white/80 hover:bg-slate-50 hover:border-slate-400'
                    }`}
                    aria-label="GitHub profile Martha Meslina"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}>
                        <span className={`w-5 h-5 rounded-full border inline-flex items-center justify-center text-[10px] ${
                          isDark ? 'border-slate-500 text-slate-200' : 'border-slate-500 text-slate-800'
                        }`}>GH</span>
                        GitHub
                      </span>
                      <ExternalLink size={12} className={`opacity-70 group-hover:opacity-100 transition-opacity ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`} />
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>@Mes1205</p>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/martha-meslina"
                    target="_blank"
                    rel="noreferrer"
                    className={`group rounded-xl border px-3 py-2.5 transition-all duration-300 ${
                      isDark
                        ? 'border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-400/50'
                        : 'border-slate-300 bg-white/80 hover:bg-slate-50 hover:border-slate-400'
                    }`}
                    aria-label="LinkedIn profile Martha Meslina"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}>
                        <span className={`w-5 h-5 rounded-full border inline-flex items-center justify-center text-[10px] ${
                          isDark ? 'border-slate-500 text-slate-200' : 'border-slate-500 text-slate-800'
                        }`}>in</span>
                        LinkedIn
                      </span>
                      <ExternalLink size={12} className={`opacity-70 group-hover:opacity-100 transition-opacity ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`} />
                    </div>
                    <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>/in/martha-meslina</p>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CV Modal */}
      {showCV && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCV(false)}
        >
          <div
            className={`rounded-lg flex flex-col w-full max-w-2xl h-[95vh] ${
              isDark ? 'bg-slate-800' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex justify-between items-center p-6 border-b ${
              isDark ? 'border-slate-700' : 'border-slate-200'
            }`}>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                CV - Martha Meslina Florencia
              </h2>
              <button
                onClick={() => setShowCV(false)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition cursor-pointer ${
                  isDark
                    ? 'text-slate-400 hover:text-white hover:bg-slate-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                ✕
              </button>
            </div>
            <div className={`flex-1 overflow-auto ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
              <iframe
                src="/cv/CV_MarthaMeslinaFlorencia.pdf"
                className="w-full h-full"
                title="CV"
              />
            </div>
            <div className={`flex justify-between items-center p-6 border-t ${
              isDark ? 'border-slate-700' : 'border-slate-200'
            }`}>
              <button
                onClick={() => setShowCV(false)}
                className={`px-4 py-2 rounded-lg transition text-sm ${
                  isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tutup
              </button>
              <a
                href="/cv/CV_MarthaMeslinaFlorencia.pdf"
                download
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                ⬇ Download
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}