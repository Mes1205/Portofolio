// components/Hero.js
'use client';

import { useState } from 'react';
import { useTheme } from '@/app/ThemeProvider';

export default function Hero() {
  const [showCV, setShowCV] = useState(false);
  const { isDark } = useTheme();

  return (
    <>
      {/* Hide navbar saat CV modal muncul */}
      {showCV && <style>{`body { overflow: hidden; } nav { visibility: hidden !important; pointer-events: none; } .custom-cursor { display: none !important; }`}</style>}
      
      <section className={`py-32 px-6 max-w-5xl mx-auto text-center md:text-left transition-colors ${
        isDark ? 'bg-slate-900/30' : 'bg-white/50'
      }`}>
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Hi, I'm <span className="text-blue-600">Martha.</span>
        </h1>
        <p className={`text-xl max-w-2xl leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          Seorang Informatics Engineering student yang berfokus pada **Web Development** dan **Artificial Intelligence**. Suka membangun antarmuka yang intuitif dan sistem yang cerdas.
        </p>
        <div className="mt-8 flex gap-4 justify-center md:justify-start flex-wrap">
          <button className={`bg-gradient-to-r px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-semibold tracking-wide text-white ${
            isDark 
              ? 'from-blue-600 to-blue-500 hover:shadow-blue-600/50' 
              : 'from-slate-900 to-slate-700 hover:shadow-slate-900/30'
          }`}>
            Lihat Project
          </button>
          <button 
            onClick={() => setShowCV(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300 font-semibold tracking-wide border-2 border-blue-400"
          >
            Lihat CV
          </button>
        </div>
      </section>

      {/* CV Modal */}
      {showCV && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCV(false)}
        >
          <div 
            className={`rounded-lg flex flex-col transition-all duration-300 w-full max-w-2xl h-[95vh] ${
              isDark ? 'bg-slate-800' : 'bg-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex justify-between items-center p-6 border-b ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>CV - Martha Meslina Florencia</h2>
              <button 
                onClick={() => setShowCV(false)}
                className={`text-2xl w-8 h-8 flex items-center justify-center rounded-lg transition cursor-pointer ${
                  isDark 
                    ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                ✕
              </button>
            </div>
            
            {/* PDF Viewer */}
            <div className={`flex-1 overflow-auto ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
              <iframe
                src="/cv/CV_MarthaMeslinaFlorencia.pdf"
                className="w-full h-full"
                title="CV"
              />
            </div>

            {/* Footer with Download Option */}
            <div className={`flex justify-between items-center p-6 border-t ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <button 
                onClick={() => setShowCV(false)}
                className={`px-4 py-2 rounded-lg transition ${
                  isDark 
                    ? 'text-slate-300 hover:bg-slate-700' 
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tutup
              </button>
              <a 
                href="/cv/CV_MarthaMeslinaFlorencia.pdf" 
                download
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                ⬇ Download
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}