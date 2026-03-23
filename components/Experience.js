// components/Experience.js
export default function Experience() {
  const jobs = [
    { title: "Laboratory Assistant", place: "Universitas Padjadjaran", year: "2025 - Present" },
    { title: "Front End Developer Intern", place: "PIPP UNPAD", year: "2025" },
  ];

  return (
    // Tambahkan bg-white atau slate-50 dan pastikan teksnya gelap (text-black atau slate-900)
    <section className="bg-slate-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-black">Experience</h2>
        <div className="space-y-8">
          {jobs.map((job, index) => (
            <div key={index} className="flex flex-col md:flex-row md:justify-between border-b border-slate-300 pb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
                <p className="text-slate-700 font-medium">{job.place}</p>
              </div>
              <p className="text-slate-500 font-mono mt-2 md:mt-0">{job.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}