'use client';

import { useState } from 'react';
import { useTheme } from '@/app/ThemeProvider';

export default function Hero() {
  const [showCV, setShowCV] = useState(false);
  const { isDark } = useTheme();

  return (
    <>
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
                Hi, I'm <span className="text-blue-500">Martha.</span>
              </h1>
              <p className={`text-lg md:text-xl max-w-xl leading-relaxed mb-10 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Seorang Informatics Engineering student yang berfokus pada{' '}
                <span className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>
                  Web Development
                </span>{' '}
                dan{' '}
                <span className={isDark ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>
                  Artificial Intelligence
                </span>.
                Suka membangun antarmuka yang intuitif dan sistem yang cerdas.
              </p>
              <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                <button
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
                  className="px-8 py-3 rounded-full font-semibold text-sm tracking-wide text-white bg-blue-500 hover:bg-blue-400 border border-blue-400 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                >
                  Lihat CV
                </button>
              </div>
            </div>

            {/* Kanan: foto */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <div className={`w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 shadow-xl ${
                isDark
                  ? 'border-blue-500/20 shadow-blue-500/10'
                  : 'border-slate-200 shadow-slate-200/50'
              }`}>
                <img
                  src="/images/foto-martha.jpg"
                  alt="Martha Meslina Florencia"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex gap-3">
                <a
                  href="https://github.com/Mes1205"
                  target="_blank"
                  rel="noreferrer"
                  className={`text-xs px-4 py-1.5 rounded-full border transition-all font-medium ${
                    isDark
                      ? 'text-blue-400 border-blue-500/30 hover:bg-blue-500/10'
                      : 'text-slate-600 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/martha-meslina"
                  target="_blank"
                  rel="noreferrer"
                  className={`text-xs px-4 py-1.5 rounded-full border transition-all font-medium ${
                    isDark
                      ? 'text-blue-400 border-blue-500/30 hover:bg-blue-500/10'
                      : 'text-slate-600 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  LinkedIn
                </a>
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