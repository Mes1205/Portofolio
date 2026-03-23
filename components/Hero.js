// components/Hero.js
export default function Hero() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto text-center md:text-left">
      <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
        Hi, I'm <span className="text-blue-600">Martha.</span>
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
        Seorang Informatics Engineering student yang berfokus pada **Web Development** dan **Artificial Intelligence**. Suka membangun antarmuka yang intuitif dan sistem yang cerdas.
      </p>
      <div className="mt-8 flex gap-4 justify-center md:justify-start">
        <button className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition">
          Lihat Project
        </button>
        <button className="border border-slate-300 px-6 py-3 rounded-lg hover:bg-slate-50 transition">
          Download CV
        </button>
      </div>
    </section>
  )
}