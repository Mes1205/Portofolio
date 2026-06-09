'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, ArrowUpRight, MousePointer2, Hand } from 'lucide-react';
import { useTheme } from '@/app/ThemeProvider';

const projects = [
  {
    title: "Zichara",
    desc: "A mobile Augmented Reality app for learning Hanzi characters and Pinyin interactively. It uses ARCore to display 3D characters in the real world, helping users understand Chinese writing in a more engaging way.",
    tech: ["Unity", "C#", "ARCore", "AR"],
    role: "Full Stack Developer",
    category: "Mobile Development / AR",
    year: "2024",
    whatIDid: [
      "Designed the AR app architecture and learning flow from scan to character interaction.",
      "Developed 3D Hanzi and Pinyin rendering features using ARCore inside Unity.",
      "Built interactive practice pages with user progress validation.",
      "Collaborated with the design team to optimize UX for beginner users.",
    ],
    github: "https://github.com/Kelompok-2-IMK/zichara",
    images: ["/images/zichara-0.jpeg", "/images/zichara-1.jpeg", "/images/zichara-2.jpeg", "/images/zichara-3.jpeg", "/images/zichara-4.jpeg", "/images/zichara-5.jpeg"],
  },
  {
    title: "Urunin",
    desc: "A web-based split bill platform with OCR for automatic receipt scanning. It tracks debts between friends and keeps a structured transaction history so managing shared expenses is easier.",
    tech: ["React.js", "Tailwind CSS", "Firebase", "JavaScript", "OCR API"],
    role: "Frontend Developer",
    category: "Web Development",
    year: "2024",
    whatIDid: [
      "Integrated OCR API to scan and automatically parse shopping receipts.",
      "Built a debt tracking system with automatic calculations per group member.",
      "Created a personal expense dashboard with structured transaction history.",
      "Integrated Firebase real-time sync to keep data updated across users.",
    ],
    github: "https://github.com/Mes1205/Urunin",
    images: ["/images/urunin-1.png", "/images/urunin-2.png", "/images/urunin-3.png", "/images/urunin-4.png"],
  },
  {
    title: "Seluna",
    desc: "A Figma prototype for a women's safety app. In an emergency, users can instantly call a trusted contact, send alerts to all saved contacts, and automatically share their real-time location with one tap.",
    tech: ["Figma", "UI/UX Design", "Prototyping"],
    role: "UI/UX Designer",
    category: "UI/UX Design / Safety App",
    year: "2024",
    whatIDid: [
      "Designed an emergency user flow accessible with a single tap in dangerous situations.",
      "Created an automatic alert system to emergency contacts with real-time location sharing.",
      "Built a complete interactive prototype from onboarding to the SOS feature.",
      "Conducted UX research to ensure the UI stays usable even in a panic situation.",
    ],
    figma: "https://www.figma.com/proto/JvMTFzw8OcdHNpHPlAEOU9/SAFE-ROUTE?node-id=2448-2547&t=5FiRPWNG9AhMzt3b-1&show-proto-sidebar=1&starting-point-node-id=2448%3A2547",
    images: ["/images/seluna-0.jpeg", "/images/seluna-1.png", "/images/seluna-2.png", "/images/seluna-3.png", "/images/seluna-4.png"],
  },
  {
    title: "Addicx",
    desc: "A Figma prototype for a platform that helps people quit addiction. It includes a community feature for peer support, a progress tracker to keep users motivated, and direct consultation with health professionals.",
    tech: ["Figma", "UI/UX Design", "Prototyping"],
    role: "UI/UX Designer",
    category: "UI/UX Design / Health App",
    year: "2024",
    whatIDid: [
      "Designed a community feature for users to share experiences and support each other.",
      "Built a consultation flow connecting users directly with health professionals in the app.",
      "Created a visual progress tracker to keep users motivated during recovery.",
      "Designed personalized onboarding based on the type and level of addiction.",
    ],
    figma: "https://www.figma.com/proto/qgzar1T7KzT0bhf9XK6AZo/Gemastik?node-id=2982-17581&t=lUKgyPthXwiv5z3e-1&starting-point-node-id=2982%3A17745&show-proto-sidebar=1",
    images: ["/images/addicx-0.jpeg", "/images/addicx-1.png", "/images/addicx-2.png", "/images/addicx-3.png", "/images/addicx-4.png"],
  },
  {
    title: "Fingo",
    desc: "A financial assistant app built for gig workers in Indonesia. It predicts weekly income for up to 4 weeks ahead based on work history and profile, and includes an AI chat feature powered by Gemini for personalized financial advice.",
    tech: ["Python", "FastAPI", "TensorFlow", "Gemini API", "Streamlit", "Hugging Face"],
    role: "AI Engineer",
    category: "AI / Machine Learning",
    year: "2025",
    whatIDid: [
      "Built an income prediction pipeline using a custom deep learning model with ResidualBlock and HuberMAE loss, deployed via FastAPI on Hugging Face Spaces.",
      "Designed the prediction API to handle multi-output forecasting for 4-week income projections with trend direction probability.",
      "Integrated Gemini API for a context-aware financial chat assistant with user financial data as context.",
      "Iterated through LSTM, Ridge Regression, and deep learning approaches before finalizing the best-performing architecture.",
    ],
    github: "https://github.com/Mes1205/Fingo",
    images: ["images/fingo-1.png", "images/fingo-2.png", "images/fingo-3.png"],
  },
  {
    title: "Papan",
    desc: "A property listing platform for buying, renting, and finding kos in Indonesia. It comes with a smart decision support system that matches properties to users based on their priorities like budget, location, facilities, and gender preference.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "NextAuth.js", "Midtrans", "Cloudinary", "Leaflet"],
    role: "Frontend Developer",
    category: "Web Development",
    year: "2025",
    whatIDid: [
      "Built frontend pages and components for property listing, search, and user dashboard using Next.js App Router.",
      "Integrated Leaflet.js for interactive map-based property search.",
      "Implemented the DSS recommendation UI that displays personalized property matches based on weighted criteria.",
      "Collaborated in a team with a full CI/CD pipeline using GitHub Actions and Vercel deployment.",
    ],
    github: "https://github.com/Mes1205/PAPAN-PPL1",
    images: ["images/papan-1.png", "images/papan-2.png", "images/papan-3.png", "images/papan-4.png"],
  },
  {
    title: "Grammate",
    desc: "A web app for practicing English grammar using an LLM API. Every sentence written gets a score, detailed feedback on grammar mistakes, and real-time improvement suggestions.",
    tech: ["Python (Streamlit)", "NLP (SBERT)", "LLM (Qwen)", "Scikit-Learn"],
    role: "Full Stack Developer",
    category: "Web Development / AI",
    year: "2024",
    whatIDid: [
      "Integrated an LLM API for real-time grammar analysis and scoring.",
      "Built an interactive practice UI with per-sentence feedback.",
      "Designed a transparent scoring system that highlights incorrect parts.",
      "Added a practice history feature to track the user's grammar improvement over time.",
    ],
    github: "https://github.com/Mes1205/Grammate",
    images: ["/images/grammate-1.png", "/images/grammate-2.png"],
  },
  {
    title: "Kkotkata",
    desc: "A Korean vocabulary dictionary app built with Semantic Web principles. It uses RDF and Turtle to structure vocabulary data and provides a web interface for searching and browsing words.",
    tech: ["Python", "RDF", "Turtle", "Semantic Web", "JavaScript", "CSS"],
    role: "Full Stack Developer",
    category: "Web Development / Semantic Web",
    year: "2024",
    whatIDid: [
      "Structured Korean vocabulary data in RDF/Turtle format using Semantic Web principles.",
      "Built a Python script to convert CSV vocabulary datasets into Turtle triples.",
      "Developed a web-based dictionary interface for searching and displaying vocabulary.",
      "Designed the data schema to support relational querying between vocabulary entries.",
    ],
    github: "https://github.com/Mes1205/Kkotkata",
    images: ["images/kkotkata-1.png", "images/kkotkata-2.png", "images/kkotkata-3.png"],
  },
  {
    title: "Basic Shooting Game",
    desc: "A simple 3D shooting game built in Unity. Players can move, aim, and shoot targets in a basic game environment. Built as a hands-on project to learn game development fundamentals.",
    tech: ["Unity", "C#", "ShaderLab"],
    role: "Game Developer",
    category: "Game Development",
    year: "2025",
    whatIDid: [
      "Implemented player movement, shooting mechanics, and basic enemy behavior in Unity.",
      "Wrote game logic scripts in C# for player controls and game state management.",
      "Packaged and released the first playable build via GitHub Releases.",
    ],
    github: "https://github.com/Mes1205/BasicShootingGame",
    images: ["/images/basic-shooting-game-1.png", "/images/basic-shooting-game-2.png"],
  },
  {
    title: "Tutor AI",
    desc: "A web chatbot built for a graduate-level Project Management course. It has an interactive 3D avatar and speech-to-speech features so users can learn as if they are having a real conversation with a tutor.",
    tech: ["React.js", "Three.js", "Speech API", "LLM API", "Tailwind CSS"],
    role: "Full Stack Developer",
    category: "Web Development / AI",
    year: "2024",
    whatIDid: [
      "Built an interactive 3D avatar that moves in sync with the chatbot's audio responses.",
      "Integrated Speech-to-Text and Text-to-Speech for a natural learning experience.",
      "Connected an LLM API with a knowledge base tailored to the S2 Agriculture Project Management course.",
      "Designed a comfortable chat UI for long study sessions with conversation context.",
    ],
    github: "https://github.com/pipptutorai/TutorAI-Final",
    images: ["/images/tutorai-1.png", "/images/tutorai-2.png"],
  },
  {
    title: "Garbage Classification",
    desc: "A deep learning model for classifying waste images into 6 categories using CNN and EfficientNetV2S with transfer learning. The model is exported in SavedModel, TF-Lite, and TensorFlow.js formats for flexible deployment.",
    tech: ["Python", "TensorFlow", "EfficientNetV2S", "CNN", "Jupyter Notebook"],
    role: "ML Engineer",
    category: "Machine Learning / Computer Vision",
    year: "2025",
    whatIDid: [
      "Built a CNN image classification model using EfficientNetV2S as the backbone with selective fine-tuning.",
      "Applied data augmentation and class weight balancing to handle dataset imbalance.",
      "Evaluated the model with confusion matrix and classification report across train, validation, and test sets.",
      "Exported the model in SavedModel, TF-Lite, and TF.js formats for multi-platform deployment.",
    ],
    github: "https://github.com/Mes1205/Garbage-Classification",
    images: ["images/GarbageClassification-1.png", "images/GarbageClassification-2.png"],
  },
  {
    title: "Sentiment Analysis (ANFIS)",
    desc: "A sentiment analysis project on Indonesian TikTok comments about women's train carriages. It classifies comments into Negative, Neutral, and Positive using an ANFIS model built on top of TF-IDF features, with a Streamlit app for live prediction.",
    tech: ["Python", "ANFIS", "TF-IDF", "Streamlit", "Scikit-Learn"],
    role: "ML Engineer",
    category: "Machine Learning / NLP",
    year: "2025",
    whatIDid: [
      "Built a full preprocessing and feature extraction pipeline using TF-IDF with Logistic Regression probability features as ANFIS inputs.",
      "Trained an ANFIS model for 3-class Indonesian sentiment classification.",
      "Handled class imbalance issues and debugged model artifacts to fix biased predictions.",
      "Deployed the final model as an interactive Streamlit app for live comment classification.",
    ],
    github: "https://github.com/Mes1205/Analisis-Sentimen-Peron-Wanita",
    images: ["images/analisisSentPeron-1.png", "images/analisisSentPeron-2.png"],
  },
  {
    title: "Data Warehouse Mandiri",
    desc: "A data warehouse project simulating Bank Mandiri transaction analytics. It uses a Star Schema design with ETL pipelines in Python, Materialized Views in PostgreSQL, and a dashboard for business insights.",
    tech: ["Python", "PostgreSQL", "ETL", "Star Schema", "Google Data Studio"],
    role: "Data Engineer",
    category: "Data Engineering",
    year: "2025",
    whatIDid: [
      "Designed a Star Schema data warehouse for Bank Mandiri transaction data.",
      "Built ETL pipelines in Python to extract, clean, and load dimension and fact tables.",
      "Created Materialized Views in PostgreSQL (Aiven) for efficient analytical queries.",
      "Connected the warehouse to Google Data Studio for an interactive business dashboard.",
    ],
    github: "https://github.com/Mes1205/DataWarehouse_Mandiri",
    images: ["images/Datwer-1.png", "images/Datwer-2.png"],
  },
  {
    title: "Loan Prediction",
    desc: "A loan approval prediction app using Soft Computing techniques. It combines a Fuzzy Inference System, Genetic Algorithm optimization, and a Neural Network to improve prediction accuracy, with a Streamlit interface for uploading data and viewing results.",
    tech: ["Python", "Fuzzy Logic", "Genetic Algorithm", "ANN", "Streamlit"],
    role: "ML Engineer",
    category: "Machine Learning",
    year: "2025",
    whatIDid: [
      "Implemented a Fuzzy Inference System for rule-based loan eligibility scoring.",
      "Used a Genetic Algorithm to optimize fuzzy membership function parameters.",
      "Built and trained an ANN model on top of the fuzzy features for final prediction.",
      "Developed a Streamlit app with file upload, analysis pipeline, and result visualization.",
    ],
    github: "https://github.com/Mes1205/Loan-Prediction",
    images: ["images/loanPrediction-1.png", "images/loanPrediction-2.png", "images/loanPrediction-3.png", "images/loanPrediction-4.png", "images/loanPrediction-5.png"],
  },
  {
    title: "Color Palette Maker",
    desc: "A web tool for generating color palettes from images using K-Means Clustering. Upload a photo, choose how many colors you want, and get the dominant palette ready to use in your design.",
    tech: ["Python", "K-Means", "React.js", "Machine Learning"],
    role: "Full Stack Developer",
    category: "Web Development / ML",
    year: "2024",
    whatIDid: [
      "Implemented K-Means Clustering to extract dominant colors from images.",
      "Built an image upload UI with a real-time palette preview.",
      "Added export functionality for HEX, RGB, and HSL color formats.",
      "Optimized K-Means performance for fast results even on high-resolution images.",
    ],
    github: "https://github.com/Mes1205/colorPickerMartha",
    images: ["/images/colorpicker.png"],
  },
];

const N = projects.length;
const X_SPACING    = 400;
const ROT_Y_STEP   = 45;
const SCALE_X_STEP = 0.12;
const SCALE_STEP   = 0.06;
const OPACITY_STEP = 0.18;
const VISIBLE_SIDE = 2;
const CAROUSEL_STEP_MS = 120;

const C = {
  bg:          '#ffffff',
  bgSurface:   '#f5f5f7',
  bgCard:      '#fafafa',
  border:      'rgba(0,0,0,0.08)',
  borderMed:   'rgba(0,0,0,0.14)',
  text:        '#0a0a0a',
  textSub:     '#555560',
  textMuted:   '#999aaa',
  accent:      '#0a0a0a',
  accentHover: '#1a1a2e',
  pill:        'rgba(0,0,0,0.06)',
  pillBorder:  'rgba(0,0,0,0.10)',
  pillText:    '#333340',
  dot:         'rgba(0,0,0,0.18)',
  dotActive:   '#0a0a0a',
  arrow:       'rgba(0,0,0,0.06)',
  arrowBorder: 'rgba(0,0,0,0.12)',
  arrowIcon:   'rgba(0,0,0,0.35)',
  arrowHover:  'rgba(0,0,0,0.10)',
  arrowIconH:  'rgba(0,0,0,0.80)',
};

function ProjectsHeader() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setIsVisible(true), 300); return () => clearTimeout(t); }, []);

  return (
    <div style={{
      position: 'absolute', top: '8%', left: 0, width: '100%',
      zIndex: 25, display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-16px)',
        transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{ width: 50, height: 2, background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.15))', borderRadius: 1 }} />
        <h1 style={{
          margin: 0, fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700,
          letterSpacing: '-0.02em', color: C.text,
          fontFamily: "'Poppins', sans-serif",
        }}>
          {'Projects'.split('').map((char, i) => (
            <span key={i} style={{
              display: 'inline-block',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s`,
            }}>{char}</span>
          ))}
        </h1>
        <div style={{ width: 50, height: 2, background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.15))', borderRadius: 1 }} />
      </div>
    </div>
  );
}

function CurvedCarousel({ activeIndex, onActivate, onClick }) {
  const stageRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const update = () => { if (stageRef.current) {} };
    update();
    window.addEventListener('resize', update);
    const ro = new ResizeObserver(update);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => { window.removeEventListener('resize', update); ro.disconnect(); };
  }, []);

  useEffect(() => {
    projects.forEach(p => p.images.forEach(src => { const img = new Image(); img.src = src; }));
  }, []);

  const cards = [];
  for (let i = 0; i < N; i++) {
    let slot = i - activeIndex;
    if (slot > N / 2) slot -= N;
    if (slot < -N / 2) slot += N;
    const absSlot = Math.abs(slot);
    if (absSlot > VISIBLE_SIDE + 0.5) continue;

    const p        = projects[i];
    const isActive = i === activeIndex;
    const isHov    = hoveredIndex === i;
    const sign     = Math.sign(slot) || 0;
    const W = 420, H = 280;

    const offsetX = sign * absSlot * X_SPACING;
    const rotY    = -sign * absSlot * ROT_Y_STEP;
    const scaleX  = Math.max(0.30, 1 - absSlot * SCALE_X_STEP);
    const scale   = 1 - absSlot * SCALE_STEP;
    const opacity = Math.max(0.20, 1 - absSlot * OPACITY_STEP);
    const zIdx    = 20 - absSlot * 4;

    const hoverScale = isActive && isHov ? 1.04 : 1;
    const hoverLift  = isActive && isHov ? -8   : 0;

    const innerR = 18;
    const outerR = isActive ? 18 : 18 + absSlot * 22;
    const borderRadius = slot === 0
      ? `${innerR}px`
      : slot < 0
        ? `${outerR}px ${innerR}px ${innerR}px ${outerR}px`
        : `${innerR}px ${outerR}px ${outerR}px ${innerR}px`;

    const shadow = isActive
      ? isHov
        ? '0 24px 60px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06)'
        : '0 16px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)'
      : '0 4px 16px rgba(0,0,0,0.06)';

    cards.push(
      <div
        key={i}
        onMouseEnter={() => { if (!isActive) onActivate(i); setHoveredIndex(i); }}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={(e) => {
          if (isActive) { onClick(i, e); } else { onActivate(i); }
        }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          width: W, height: H,
          marginLeft: -W / 2, marginTop: -H / 2,
          cursor: 'pointer', zIndex: zIdx,
          transform: `translateX(${offsetX}px) translateY(${hoverLift}px) perspective(1200px) rotateY(${rotY}deg) scaleX(${scaleX}) scale(${scale * hoverScale})`,
          transformOrigin: 'center center',
          opacity, borderRadius,
          overflow: 'hidden',
          boxShadow: shadow,
          transition: `transform 2.35s cubic-bezier(0.16,1,0.3,1), opacity 2.35s cubic-bezier(0.16,1,0.3,1), border-radius 1.7s ease, box-shadow 1.7s ease`,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          background: C.bgCard,
          border: `1px solid ${C.border}`,
        }}
      >
        <img
          src={p.images[0]} alt={p.title}
          style={{
            width: '100%', height: '100%',
            objectFit: 'contain', objectPosition: 'center', display: 'block',
            background: C.bgSurface,
            filter: isActive ? 'none' : `brightness(${Math.max(0.75, 0.95 - absSlot * 0.1)})`,
            transition: 'filter 2.2s cubic-bezier(0.16,1,0.3,1), transform 2.2s cubic-bezier(0.16,1,0.3,1)',
            transform: isActive && isHov ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.10) 45%, transparent 60%)',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 2.1s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '18px 20px',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 2.1s cubic-bezier(0.16,1,0.3,1), transform 2.1s cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, transition: 'transform 0.8s cubic-bezier(0.34,1.56,0.64,1)', transform: isHov ? 'translateX(4px)' : 'translateX(0)' }}>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: isHov ? '0.04em' : '-0.02em', transition: 'letter-spacing 0.8s ease' }}>{p.title}</p>
            {isActive && isHov && (
              <ArrowUpRight size={16} style={{ color: 'rgba(255,255,255,0.6)', animation: 'arrow-pop 0.8s cubic-bezier(0.34,1.56,0.64,1) infinite alternate' }} />
            )}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, transform: isHov ? 'translateX(8px)' : 'translateX(0)', transition: 'all 0.8s ease' }}>
            {p.category}
          </p>
          <div style={{ margin: '12px 0 0', display: 'flex', alignItems: 'center', gap: 8, opacity: isHov ? 1 : 0, transform: isHov ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)', transition: 'all 0.6s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'float-gentle 2s ease-in-out infinite' }}>
              <MousePointer2 size={12} style={{ color: 'rgba(255,255,255,0.7)' }} />
            </div>
            <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500, letterSpacing: '0.02em' }}>Click to explore</p>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'float-gentle 2s ease-in-out infinite 0.3s' }}>
              <Hand size={10} style={{ color: 'rgba(255,255,255,0.6)' }} />
            </div>
          </div>
        </div>
        {isActive && <div style={{ position: 'absolute', inset: 0, borderRadius: innerR, border: `1.5px solid ${C.border}`, pointerEvents: 'none' }} />}
      </div>
    );
  }

  return (
    <div ref={stageRef} style={{ position: 'absolute', top: '64%', left: 0, width: '100%', height: 440, transform: 'translateY(-50%)', zIndex: 20, pointerEvents: 'auto', overflow: 'visible' }}>
      {cards}
    </div>
  );
}

function CarouselDots({ activeIndex, onDotClick }) {
  return (
    <div style={{
      position: 'absolute', bottom: '4%', left: 0, width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 10, zIndex: 30, pointerEvents: 'auto',
    }}>
      {projects.map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <button key={i} onClick={() => onDotClick(i)} style={{
            padding: 0, border: 'none', cursor: 'pointer',
            width: isActive ? 32 : 8, height: 8, borderRadius: 99,
            background: isActive ? C.dotActive : 'rgba(0,0,0,0.25)',
            transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
            transform: isActive ? 'scale(1.05)' : 'scale(1)',
            boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.25)' : 'none',
          }} />
        );
      })}
    </div>
  );
}

function ArrowBtn({ direction, onClick }) {
  const isLeft = direction === 'left';
  const [isHov, setIsHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHov(true)}
      onMouseLeave={() => setIsHov(false)}
      style={{
        position: 'absolute', top: '64%',
        transform: `translateY(-50%) ${isHov ? 'scale(1.12)' : 'scale(1)'}`,
        [isLeft ? 'left' : 'right']: '2.5vw',
        zIndex: 30, width: 48, height: 48, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isHov ? C.arrowHover : C.arrow,
        border: `1px solid ${C.arrowBorder}`,
        color: isHov ? C.arrowIconH : C.arrowIcon,
        cursor: 'pointer',
        transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {isLeft ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
    </button>
  );
}

function AnimatedTitle({ text, isActive, isHovered, onHover, onLeave, onClick, index, activeIndex, measuredWidth }) {
  const [isAnimatingLetters, setIsAnimatingLetters] = useState(false);
  const [hasHoveredOnce, setHasHoveredOnce] = useState(false);

  const handleMouseEnter = () => {
    onHover(index);
    if (!hasHoveredOnce) {
      setHasHoveredOnce(true);
      setIsAnimatingLetters(true);
      setTimeout(() => setIsAnimatingLetters(false), text.length * 60 + 400);
    }
  };

  let dist = Math.abs(index - activeIndex);
  if (dist > N / 2) dist = N - dist;

  const baseOpacity = isActive ? 1 : Math.max(0.34, 0.68 - dist * 0.11);
  const finalOpacity = isHovered && !isActive ? 0.9 : baseOpacity;

  const SMALL = 'clamp(9px, 1.05vw, 13px)';
  const BIG   = 'clamp(18px, 2.0vw, 28px)';

  return (
    <div style={{
      position: 'relative',
      width: measuredWidth > 0 ? measuredWidth : 'auto',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 28,
      overflow: 'visible',
    }}>
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => { onLeave(); setIsAnimatingLetters(false); }}
        onClick={(e) => onClick(index, e)}
        style={{
          background: isActive ? C.bg : 'none',
          border: 'none',
          padding: '4px 6px',
          cursor: 'pointer',
          fontSize: isActive ? BIG : SMALL,
          fontWeight: 700,
          letterSpacing: isActive ? '-0.01em' : '0.07em',
          textTransform: 'uppercase',
          color: isActive ? C.text : `rgba(0,0,0,${finalOpacity})`,
          opacity: finalOpacity,
          transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1)',
          transform: isActive ? 'translateY(-2px)' : isHovered ? 'translateY(-2px)' : 'translateY(0)',
          whiteSpace: 'nowrap',
          lineHeight: 1,
          position: 'relative',
          zIndex: isActive ? 15 : isHovered ? 5 : 1,
          textShadow: isActive
            ? '0 4px 20px rgba(0,0,0,0.10)'
            : isHovered ? '0 0 16px rgba(0,0,0,0.12)' : 'none',
        }}
      >
        {isHovered && !isActive && (
          <span style={{
            position: 'absolute', top: -18, left: '50%',
            transform: 'translateX(-50%)', fontSize: 12,
            animation: 'emoji-bounce 0.6s cubic-bezier(0.34,1.56,0.64,1)',
            pointerEvents: 'none',
          }}>.....</span>
        )}
        {text.split('').map((char, i) => (
          <span key={i} style={{
            display: 'inline-block',
            transition: `all 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.05}s`,
            transform: isAnimatingLetters
              ? 'scale(1.3) translateY(-4px)'
              : isHovered && !isActive ? 'scale(1.15) translateY(-2px)' : 'scale(1) translateY(0)',
          }}>{char}</span>
        ))}
        {isActive && (
          <div style={{
            position: 'absolute', bottom: -8, left: '50%',
            transform: 'translateX(-50%)',
            width: 6, height: 6, borderRadius: '50%',
            background: C.dotActive,
            boxShadow: '0 0 8px rgba(0,0,0,0.15)',
          }} />
        )}
        {isHovered && !isActive && (
          <div style={{
            position: 'absolute', bottom: -6, left: '50%',
            transform: 'translateX(-50%)',
            width: 4, height: 4, borderRadius: '50%',
            background: 'rgba(0,0,0,0.3)',
            animation: 'pulse-dot 1.5s ease-in-out infinite',
          }} />
        )}
      </button>
    </div>
  );
}

function TitleStrip({ activeIndex, onHover, onLeave, onClick }) {
  const [hoveredTitle, setHoveredTitle] = useState(null);
  const ghostRefs = useRef([]);
  const [measuredWidths, setMeasuredWidths] = useState([]);

  useEffect(() => {
    const widths = ghostRefs.current.map(el => el ? el.getBoundingClientRect().width + 12 : 0);
    setMeasuredWidths(widths);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const widths = ghostRefs.current.map(el => el ? el.getBoundingClientRect().width + 12 : 0);
      setMeasuredWidths(widths);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', top: 0, left: 0, display: 'flex', gap: 0 }}>
        {projects.map((p, i) => (
          <span
            key={i}
            ref={el => { ghostRefs.current[i] = el; }}
            style={{
              fontSize: 'clamp(9px, 1.05vw, 13px)',
              fontWeight: 700,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              padding: '4px 6px',
            }}
          >
            {p.title}
          </span>
        ))}
      </div>

      <div style={{
        position: 'absolute',
        top: '18%',
        left: 0, width: '100%', zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 'clamp(2px, 0.8vw, 12px)',
        padding: '0 clamp(60px, 7vw, 110px)',
        pointerEvents: 'auto',
        height: '22%',
        rowGap: 'clamp(6px, 1.2vw, 14px)',
        alignContent: 'center',
        overflow: 'visible',
      }}>
        {projects.map((p, i) => (
          <AnimatedTitle
            key={i}
            text={p.title}
            isActive={i === activeIndex}
            isHovered={hoveredTitle === i}
            activeIndex={activeIndex}
            measuredWidth={measuredWidths[i] ?? 0}
            onHover={(idx) => { setHoveredTitle(idx); onHover(idx); }}
            onLeave={() => { setHoveredTitle(null); onLeave(); }}
            onClick={onClick}
            index={i}
          />
        ))}
      </div>
    </>
  );
}

function Label({ children }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: C.textMuted, margin: '0 0 12px' }}>
      {children}
    </p>
  );
}

function NavBtn({ onClick, label }) {
  const [isHov, setIsHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHov(true)}
      onMouseLeave={() => setIsHov(false)}
      style={{
        fontSize: 12, fontWeight: 600, padding: '8px 14px', borderRadius: 10, cursor: 'pointer',
        background: isHov ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)',
        border: `1px solid ${C.border}`,
        color: isHov ? C.text : C.textSub,
        transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
        transform: isHov ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      {label}
    </button>
  );
}

export default function Projects() {
  const { setProjectModalOpen } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);
  const [modal, setModal] = useState({
    index: null, phase: 'closed', slideIndex: 0,
    origin: { x: '50%', y: '50%' }, contentVisible: false,
  });
  const modalTimers = useRef({});

  const animateToIndex = useCallback((targetIndex) => {
    if (animationRef.current) { clearInterval(animationRef.current); animationRef.current = null; }
    if (targetIndex === activeIndex) return;
    setIsAnimating(true);
    let diff = targetIndex - activeIndex;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    const step = diff > 0 ? 1 : -1;
    const totalSteps = Math.abs(diff);
    let currentStep = 0;
    let current = activeIndex;
    const interval = setInterval(() => {
      currentStep++;
      let next = current + step;
      if (next < 0) next = N - 1;
      if (next >= N) next = 0;
      setActiveIndex(next);
      current = next;
      if (currentStep >= totalSteps) { clearInterval(interval); animationRef.current = null; setIsAnimating(false); }
    }, CAROUSEL_STEP_MS);
    animationRef.current = interval;
  }, [activeIndex]);

  useEffect(() => () => { if (animationRef.current) clearInterval(animationRef.current); }, []);

  const handlePrev     = useCallback(() => { if (!isAnimating) animateToIndex((activeIndex - 1 + N) % N); }, [activeIndex, isAnimating, animateToIndex]);
  const handleNext     = useCallback(() => { if (!isAnimating) animateToIndex((activeIndex + 1) % N); }, [activeIndex, isAnimating, animateToIndex]);
  const handleDotClick = useCallback((i) => { if (!isAnimating && i !== activeIndex) animateToIndex(i); }, [activeIndex, isAnimating, animateToIndex]);
  const handleActivate = useCallback((i) => { if (!isAnimating && i !== activeIndex) animateToIndex(i); }, [activeIndex, isAnimating, animateToIndex]);

  const openModal = useCallback((index, e) => {
    clearTimeout(modalTimers.current.open);
    clearTimeout(modalTimers.current.close);
    const ox = `${((e.clientX / window.innerWidth) * 100).toFixed(1)}%`;
    const oy = `${((e.clientY / window.innerHeight) * 100).toFixed(1)}%`;
    setModal({ index, phase: 'closed', slideIndex: 0, origin: { x: ox, y: oy }, contentVisible: false });
    requestAnimationFrame(() => requestAnimationFrame(() => setModal(p => ({ ...p, phase: 'opening' }))));
    modalTimers.current.open = setTimeout(() => {
      setModal(p => ({ ...p, phase: 'open' }));
      setTimeout(() => setModal(p => ({ ...p, contentVisible: true })), 60);
    }, 650);
  }, []);

  const handleProjectClick = useCallback((index, e) => {
    if (index !== activeIndex) { handleActivate(index); return; }
    openModal(index, e);
  }, [activeIndex, handleActivate, openModal]);

  const closeModal = useCallback(() => {
    clearTimeout(modalTimers.current.open);
    clearTimeout(modalTimers.current.close);
    setModal(p => ({ ...p, contentVisible: false, phase: 'closing' }));
    modalTimers.current.close = setTimeout(() => {
      setModal({ index: null, phase: 'closed', slideIndex: 0, origin: { x: '50%', y: '50%' }, contentVisible: false });
    }, 580);
  }, []);

  useEffect(() => { setProjectModalOpen(modal.index !== null); return () => setProjectModalOpen(false); }, [modal.index, setProjectModalOpen]);

  useEffect(() => {
    if (modal.index !== null) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); handleNext(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal.index, handlePrev, handleNext]);

  useEffect(() => {
    if (modal.index === null) return;
    const project = projects[modal.index];
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') setModal(p => ({ ...p, slideIndex: Math.max(0, p.slideIndex - 1) }));
      if (e.key === 'ArrowRight') setModal(p => ({ ...p, slideIndex: Math.min(project.images.length - 1, p.slideIndex + 1) }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal.index, closeModal]);

  useEffect(() => () => { clearTimeout(modalTimers.current.open); clearTimeout(modalTimers.current.close); }, []);

  const activeProject = modal.index !== null ? projects[modal.index] : null;
  const activeImages  = activeProject?.images ?? [];
  const origin        = `${modal.origin.x} ${modal.origin.y}`;
  const overlayStyle  = {
    clipPath: modal.phase === 'opening' || modal.phase === 'open'
      ? `circle(150% at ${origin})`
      : `circle(0% at ${origin})`,
    transition: modal.phase === 'opening'
      ? 'clip-path 0.65s cubic-bezier(0.76,0,0.24,1)'
      : modal.phase === 'closing'
      ? 'clip-path 0.58s cubic-bezier(0.76,0,0.24,1)'
      : 'none',
  };

  return (
    <>
      <style>{`
        @keyframes img-in { from { opacity:0; transform:scale(1.08) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes modal-in { from { opacity:0; transform:translateY(30px) scale(0.96); } to { opacity:1; transform:none; } }
        @keyframes modal-out { from { opacity:1; transform:none; } to { opacity:0; transform:translateY(20px) scale(0.98); } }
        @keyframes arrow-pop { from{transform:translate(0,0);} to{transform:translate(4px,-4px);} }
        @keyframes float-gentle { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-6px);} }
        @keyframes emoji-bounce { 0%{transform:translateX(-50%) scale(0) rotate(-20deg);opacity:0;} 60%{transform:translateX(-50%) scale(1.3) rotate(10deg);opacity:1;} 100%{transform:translateX(-50%) scale(1) rotate(0deg);opacity:1;} }
        @keyframes pulse-dot { 0%,100%{opacity:0.4;transform:translateX(-50%) scale(1);} 50%{opacity:1;transform:translateX(-50%) scale(1.5);} }
        .m-in { animation: modal-in 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
        .m-out { animation: modal-out 0.4s cubic-bezier(0.4,0,1,1) forwards; }
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 2px; }
        .modal-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.20); }
      `}</style>

      <section
        id="projects"
        style={{ position: 'relative', minHeight: '100vh', width: '100%', background: C.bg }}
      >
        <ProjectsHeader />
        <CurvedCarousel activeIndex={activeIndex} onActivate={handleActivate} onClick={openModal} />
        <ArrowBtn direction="left"  onClick={handlePrev} />
        <ArrowBtn direction="right" onClick={handleNext} />
        <CarouselDots activeIndex={activeIndex} onDotClick={handleDotClick} />
        <TitleStrip activeIndex={activeIndex} onHover={handleActivate} onLeave={() => {}} onClick={handleProjectClick} />

        {modal.index !== null && (
          <div
            className="fixed inset-0 z-50"
            style={{
              ...overlayStyle,
              background: 'rgba(240,240,245,0.92)',
              backdropFilter: 'blur(16px)',
              willChange: 'clip-path',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center" onClick={closeModal}>
              {activeProject && (
                <div
                  className={modal.phase === 'closing' ? 'm-out' : 'm-in'}
                  style={{
                    width: '92vw', maxWidth: 1100, height: '90vh',
                    background: C.bg,
                    border: `1px solid ${C.borderMed}`,
                    borderRadius: '28px 36px 32px 40px / 36px 28px 40px 32px',
                    overflow: 'hidden', position: 'relative',
                    boxShadow: '0 32px 100px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)',
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    onClick={closeModal}
                    style={{
                      position: 'absolute', top: 20, right: 20, zIndex: 10,
                      width: 40, height: 40, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(0,0,0,0.06)', border: `1px solid ${C.border}`,
                      color: C.textSub, cursor: 'pointer',
                      opacity: modal.contentVisible ? 1 : 0,
                      transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'scale(1) rotate(0deg)'; }}
                  >
                    <X size={16} />
                  </button>

                  <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{
                      width: '45%', flexShrink: 0, display: 'flex', flexDirection: 'column',
                      background: C.bgSurface,
                      opacity: modal.contentVisible ? 1 : 0,
                      transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1)',
                    }}>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, overflow: 'hidden' }}>
                        {activeImages.length > 0 ? (
                          <img
                            key={modal.slideIndex}
                            src={activeImages[modal.slideIndex]}
                            alt={`${activeProject.title} ${modal.slideIndex + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 18, animation: 'img-in 0.6s cubic-bezier(0.22,1,0.36,1) forwards' }}
                          />
                        ) : (
                          <p style={{ color: C.textMuted, fontSize: 13 }}>Belum ada gambar</p>
                        )}
                      </div>
                      {activeImages.length > 1 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 24px 24px' }}>
                          {activeImages.map((img, idx) => (
                            <button key={idx} onClick={() => setModal(p => ({ ...p, slideIndex: idx }))} style={{
                              width: 56, height: 40, borderRadius: 12, overflow: 'hidden', flexShrink: 0, cursor: 'pointer',
                              border: `2px solid ${idx === modal.slideIndex ? C.dotActive : 'transparent'}`,
                              opacity: idx === modal.slideIndex ? 1 : 0.35,
                              transform: idx === modal.slideIndex ? 'scale(1.08) translateY(-4px)' : 'scale(1)',
                              transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                              boxShadow: idx === modal.slideIndex ? '0 6px 20px rgba(0,0,0,0.12)' : 'none',
                            }}>
                              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </button>
                          ))}
                          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                            {(['‹', '›']).map((arrow, ai) => (
                              <button key={arrow} onClick={() => setModal(p => ({ ...p, slideIndex: ai === 0 ? (p.slideIndex - 1 + activeImages.length) % activeImages.length : (p.slideIndex + 1) % activeImages.length }))} style={{
                                width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: C.pill, border: `1px solid ${C.border}`, color: C.textSub, fontSize: 18, cursor: 'pointer',
                                transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                              }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'scale(1.15)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = C.pill; e.currentTarget.style.transform = 'scale(1)'; }}
                              >{arrow}</button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{
                      flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden',
                      borderLeft: `1px solid ${C.border}`,
                      opacity: modal.contentVisible ? 1 : 0,
                      transition: 'opacity 0.6s 100ms cubic-bezier(0.16,1,0.3,1)',
                    }}>
                      <div style={{ padding: '28px 36px', borderBottom: `1px solid ${C.border}` }}>
                        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: C.textMuted, margin: '0 0 8px' }}>
                          {activeProject.category}
                        </p>
                        <h3 style={{ fontSize: 40, fontWeight: 800, color: C.text, letterSpacing: '-0.02em', margin: 0 }}>
                          {activeProject.title}
                        </h3>
                        <p style={{ fontSize: 14, color: C.textSub, margin: '8px 0 0', fontWeight: 500 }}>
                          {activeProject.role}
                        </p>
                      </div>

                      <div className="modal-scroll" style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: 32 }}>
                        <div>
                          <Label>Tentang</Label>
                          <p style={{ fontSize: 15, lineHeight: 1.7, color: C.textSub, margin: 0 }}>{activeProject.desc}</p>
                        </div>
                        <div>
                          <Label>Tech Stack</Label>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                            {activeProject.tech.map((t) => (
                              <span key={t} style={{
                                fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 99,
                                background: C.pill, border: `1px solid ${C.pillBorder}`, color: C.pillText,
                                cursor: 'default', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                              }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.10)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = C.pill; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                              >{t}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Kontribusi</Label>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {activeProject.whatIDid.map((item, idx) => (
                              <li key={idx} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.textMuted, flexShrink: 0, marginTop: 8 }} />
                                <span style={{ fontSize: 14, lineHeight: 1.65, color: C.textSub }}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div style={{ padding: '22px 36px', borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <span style={{ fontSize: 13, color: C.textMuted, fontWeight: 600 }}>
                            {(modal.index ?? 0) + 1} / {projects.length}
                          </span>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <NavBtn label="← Prev" onClick={() => setModal(p => ({ ...p, index: ((p.index ?? 0) - 1 + projects.length) % projects.length, slideIndex: 0 }))} />
                            <NavBtn label="Next →" onClick={() => setModal(p => ({ ...p, index: ((p.index ?? 0) + 1) % projects.length, slideIndex: 0 }))} />
                          </div>
                        </div>
                        <a href={activeProject?.figma || activeProject?.github}
                          target="_blank" rel="noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 10,
                            fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em',
                            padding: '10px 20px', borderRadius: 14,
                            background: C.text, color: '#ffffff',
                            textDecoration: 'none',
                            transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#333'; e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.20)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = C.text; e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)'; }}
                        >
                          <ExternalLink size={14} />
                          {activeProject?.figma ? 'Lihat Figma' : 'Lihat GitHub'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}