// components/Experience.js
'use client';
import { useTheme } from '@/app/ThemeProvider';

export default function Experience() {
  const { isDark } = useTheme();
  const jobs = [
    { 
      title: "Laboratory Assistant", 
      place: "Universitas Padjadjaran", 
      year: "2025 - Present",
      skills: ["Technical Support", "Problem Solving", "Communication"]
    },
    { 
      title: "Front End Developer Intern", 
      place: "PIPP UNPAD", 
      year: "2025",
      skills: ["React.js", "Tailwind CSS", "JavaScript"]
    },
  ];

  return (
    <section id="experience" className={`px-6 scroll-mt-20 transition-colors ${
      isDark ? 'bg-slate-900/40' : 'bg-white/50'
    }`}>
      <div className="max-w-5xl mx-auto">
        <h2 className={`text-3xl font-bold mb-12 ${isDark ? 'text-white' : 'text-black'}`}>Experience</h2>
        <div className="space-y-8">
          {jobs.map((job, index) => (
            <div key={index} className={`flex flex-col md:flex-row md:justify-between pb-6 border-b transition-colors ${
              isDark ? 'border-slate-700' : 'border-slate-300'
            }`}>
              <div className="flex-1">
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{job.title}</h3>
                <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>{job.place}</p>
                {job.skills && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className={`text-xs px-2 py-1 rounded-full ${
                        isDark
                          ? 'bg-blue-900/30 text-blue-300 border border-blue-700/50'
                          : 'bg-blue-100 text-blue-700 border border-blue-300'
                      }`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p className={`font-mono mt-4 md:mt-0 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{job.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}