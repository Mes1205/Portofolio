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
              className={`flex flex-col md:flex-row md:justify-between py-10 border-b transition-colors ${
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
  );
}