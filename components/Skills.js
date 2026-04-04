'use client';
import { useTheme } from '@/app/ThemeProvider';

export default function Skills() {
  const { isDark } = useTheme();

  const skills = {
    "Frontend": ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "JavaScript", "HTML/CSS"],
    "Backend": ["Node.js", "Firebase", "REST API", "Database Design"],
    "Mobile": ["React Native", "Unity", "C#"],
    "AI/ML": ["Python", "Machine Learning", "Data Analysis"],
    "Tools & Others": ["Git", "Figma", "Arduino", "Blender"]
  };

  return (
    <section id="skills" className="flex items-center min-h-screen px-6">
      <div className="w-full max-w-5xl mx-auto py-20">
        <h2 className={`text-3xl font-bold mb-16 ${isDark ? 'text-white' : 'text-black'}`}>
          Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, items], index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border transition-all ${
                isDark
                  ? 'bg-slate-800/30 border-slate-700/40 hover:border-blue-500/40'
                  : 'bg-slate-50/80 border-slate-200/60 hover:border-blue-400/50'
              }`}
            >
              <h3 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-default ${
                      isDark
                        ? 'bg-slate-700/80 text-slate-200 hover:bg-blue-600 hover:text-white'
                        : 'bg-slate-200 text-slate-700 hover:bg-blue-500 hover:text-white'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}