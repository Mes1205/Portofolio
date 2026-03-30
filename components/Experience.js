// components/Experience.js
'use client';
import { useTheme } from '@/app/ThemeProvider';

export default function Experience() {
  const { isDark } = useTheme();
  const jobs = [
    { title: "Laboratory Assistant", place: "Universitas Padjadjaran", year: "2025 - Present" },
    { title: "Front End Developer Intern", place: "PIPP UNPAD", year: "2025" },
  ];

  return (
    <section id="experience" className={`py-20 px-6 scroll-mt-20 transition-colors ${
      isDark ? 'bg-slate-900/40' : 'bg-white/50'
    }`}>
      <div className="max-w-5xl mx-auto">
        <h2 className={`text-3xl font-bold mb-12 ${isDark ? 'text-white' : 'text-black'}`}>Experience</h2>
        <div className="space-y-8">
          {jobs.map((job, index) => (
            <div key={index} className={`flex flex-col md:flex-row md:justify-between pb-6 border-b transition-colors ${
              isDark ? 'border-slate-700' : 'border-slate-300'
            }`}>
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{job.title}</h3>
                <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>{job.place}</p>
              </div>
              <p className={`font-mono mt-2 md:mt-0 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{job.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}