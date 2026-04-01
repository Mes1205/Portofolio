// components/Skills.js
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
    <section id="skills" className={`px-6 py-20 scroll-mt-20 transition-colors`}>
      <div className="max-w-5xl mx-auto">
        <h2 className={`text-3xl font-bold mb-12 ${isDark ? 'text-white' : 'text-black'}`}>Skills</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(skills).map((category, index) => (
            <div key={index} className={`p-6 rounded-xl transition-all backdrop-blur-sm ${
              isDark 
                ? 'bg-slate-800/10 border border-slate-700/20 hover:border-blue-500/50' 
                : 'bg-slate-50/10 border border-slate-200/20 hover:border-blue-400/50'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {category[0]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category[1].map((skill, idx) => (
                  <span 
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      isDark
                        ? 'bg-slate-700 text-slate-200 hover:bg-blue-600 hover:text-white'
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
