'use client';
import { useState } from 'react';
import { useTheme } from '@/app/ThemeProvider';

export default function Experience() {
  const { isDark } = useTheme();
  const [linePreview, setLinePreview] = useState({ visible: false, x: 0, y: 0 });

  const jobs = [
    {
      title: "Laboratory Assistant",
      place: "Universitas Padjadjaran",
      year: "2025 - Present",
      skills: ["Technical Support", "Problem Solving", "Communication"],
      subjects: ["Matkul 1", "Matkul 2", "Matkul 3", "Matkul 4"]
    },
    {
      title: "Front End Developer Intern",
      place: "PIPP UNPAD",
      year: "2025",
      skills: ["React.js", "Tailwind CSS", "JavaScript"]
    },
  ];

  const handleLinePreviewEnter = () => {
    setLinePreview((prev) => ({ ...prev, visible: true }));
  };

  const handleLinePreviewLeave = () => {
    setLinePreview((prev) => ({ ...prev, visible: false }));
  };

  const handleLinePreviewMove = (e) => {
    setLinePreview((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
  };

  return (
    <>
      <style>{`
        @keyframes line-draw {
          to { stroke-dashoffset: 0; }
        }
        .line-preview-path {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: line-draw 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <section
        id="experience"
        className="flex items-center min-h-screen px-6 transition-colors"
      >
        <div className="w-full max-w-5xl mx-auto py-20">
          <h2 className={`text-3xl font-bold mb-16 ${isDark ? 'text-white' : 'text-black'}`}>
            Experience
          </h2>
          <div className="space-y-0">
            {jobs.map((job, index) => (
              <div
                key={index}
                onMouseEnter={job.subjects ? handleLinePreviewEnter : undefined}
                onMouseLeave={job.subjects ? handleLinePreviewLeave : undefined}
                onMouseMove={job.subjects ? handleLinePreviewMove : undefined}
                className={`group flex flex-col md:flex-row md:justify-between py-10 border-b transition-colors ${
                  isDark ? 'border-slate-700/60' : 'border-slate-200'
                }`}
              >
                <div className="flex-1">
                  <h3 className={`text-2xl font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {job.title}
                  </h3>
                  <p className={`text-base mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {job.place}
                  </p>
                  {job.skills && (
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            isDark
                              ? 'bg-blue-900/30 text-blue-300 border border-blue-700/50'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p className={`font-mono text-sm mt-4 md:mt-0 md:ml-8 ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}>
                  {job.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {linePreview.visible && (
        <div className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true">
          <svg
            viewBox="0 0 420 320"
            className="absolute"
            style={{
              left: linePreview.x,
              top: linePreview.y,
              width: '420px',
              height: '320px',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <circle cx="210" cy="160" r="6" fill={isDark ? 'rgba(59,130,246,0.98)' : 'rgba(37,99,235,0.95)'} />

            <path d="M210 160 C246 108, 306 92, 385 52" fill="none" stroke={isDark ? 'rgba(96,165,250,0.9)' : 'rgba(37,99,235,0.85)'} strokeWidth="1.8" className="line-preview-path" />
            <path d="M210 160 C256 140, 332 140, 402 136" fill="none" stroke={isDark ? 'rgba(96,165,250,0.78)' : 'rgba(37,99,235,0.75)'} strokeWidth="1.7" className="line-preview-path" style={{ animationDelay: '70ms' }} />
            <path d="M210 160 C238 192, 304 218, 362 270" fill="none" stroke={isDark ? 'rgba(96,165,250,0.7)' : 'rgba(37,99,235,0.68)'} strokeWidth="1.6" className="line-preview-path" style={{ animationDelay: '120ms' }} />
            <path d="M210 160 C184 220, 128 250, 60 286" fill="none" stroke={isDark ? 'rgba(147,197,253,0.65)' : 'rgba(59,130,246,0.62)'} strokeWidth="1.5" className="line-preview-path" style={{ animationDelay: '170ms' }} />

            <circle cx="385" cy="52" r="2.5" fill={isDark ? 'rgba(147,197,253,0.9)' : 'rgba(37,99,235,0.85)'} />
            <circle cx="402" cy="136" r="2.5" fill={isDark ? 'rgba(147,197,253,0.85)' : 'rgba(37,99,235,0.8)'} />
            <circle cx="362" cy="270" r="2.5" fill={isDark ? 'rgba(147,197,253,0.8)' : 'rgba(37,99,235,0.75)'} />
            <circle cx="60" cy="286" r="2.5" fill={isDark ? 'rgba(147,197,253,0.75)' : 'rgba(37,99,235,0.7)'} />

            <g>
              <rect x="278" y="34" width="126" height="20" rx="10" fill={isDark ? 'rgba(15,23,42,0.92)' : 'rgba(239,246,255,0.96)'} stroke={isDark ? 'rgba(59,130,246,0.45)' : 'rgba(59,130,246,0.35)'} />
              <text x="341" y="47" textAnchor="middle" fontSize="9" fontWeight="600" fill={isDark ? 'rgba(248,250,252,0.98)' : 'rgba(15,23,42,0.95)'}>Algoritma Pemrograman</text>
            </g>
            <g>
              <rect x="310" y="118" width="92" height="20" rx="10" fill={isDark ? 'rgba(15,23,42,0.92)' : 'rgba(239,246,255,0.96)'} stroke={isDark ? 'rgba(59,130,246,0.45)' : 'rgba(59,130,246,0.35)'} />
              <text x="356" y="131" textAnchor="middle" fontSize="9" fontWeight="600" fill={isDark ? 'rgba(248,250,252,0.98)' : 'rgba(15,23,42,0.95)'}>Struktur Data</text>
            </g>
            <g>
              <rect x="258" y="252" width="104" height="20" rx="10" fill={isDark ? 'rgba(15,23,42,0.92)' : 'rgba(239,246,255,0.96)'} stroke={isDark ? 'rgba(59,130,246,0.45)' : 'rgba(59,130,246,0.35)'} />
              <text x="310" y="265" textAnchor="middle" fontSize="9" fontWeight="600" fill={isDark ? 'rgba(248,250,252,0.98)' : 'rgba(15,23,42,0.95)'}>Sistem Database</text>
            </g>
            <g>
              <rect x="12" y="290" width="116" height="20" rx="10" fill={isDark ? 'rgba(15,23,42,0.92)' : 'rgba(239,246,255,0.96)'} stroke={isDark ? 'rgba(59,130,246,0.45)' : 'rgba(59,130,246,0.35)'} />
              <text x="70" y="303" textAnchor="middle" fontSize="9" fontWeight="600" fill={isDark ? 'rgba(248,250,252,0.98)' : 'rgba(15,23,42,0.95)'}>Analisis Algoritma</text>
            </g>
          </svg>
        </div>
      )}
    </>
  );
}