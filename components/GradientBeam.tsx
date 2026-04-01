"use client";

import { useEffect, useRef } from "react";

interface Beam {
  yBase: number;       // base vertical position (0-1)
  progress: number;    // horizontal sweep progress
  speed: number;       // horizontal speed
  width: number;       // beam length
  opacity: number;
  delay: number;
  amplitude: number;   // how much it waves vertically (px)
  frequency: number;   // wave frequency
  phase: number;       // wave phase offset so each beam waves differently
  phaseSpeed: number;  // how fast the wave itself animates
}

const BEAMS_CONFIG: Beam[] = [
  { yBase: 0.10, progress: -0.15, speed: 0.0016, width: 1550, opacity: 0.65, delay: 0,    amplitude: 32, frequency: 0.011, phase: 0,    phaseSpeed: 0.017 },
  { yBase: 0.18, progress: 0.75, speed: 0.0014, width: 500, opacity: 0.75, delay: 0,  amplitude: 28, frequency: 0.012, phase: 1.2, phaseSpeed: 0.018 },
  { yBase: 0.26, progress: 0.05,  speed: 0.0011, width: 1600, opacity: 0.70, delay: 0,  amplitude: 35, frequency: 0.010, phase: 2.5, phaseSpeed: 0.015 },
  { yBase: 0.34, progress: 0.10,  speed: 0.0013, width: 480, opacity: 0.68, delay: 0,  amplitude: 26, frequency: 0.013, phase: 0.8, phaseSpeed: 0.019 },
  { yBase: 0.42, progress: 0.65,  speed: 0.0010, width: 1650, opacity: 0.60, delay: 0,  amplitude: 40, frequency: 0.009, phase: 2.1, phaseSpeed: 0.013 },
  { yBase: 0.50, progress: -0.10,  speed: 0.0015, width: 1520, opacity: 0.72, delay: 0,  amplitude: 30, frequency: 0.014, phase: 3.4, phaseSpeed: 0.020 },
  { yBase: 0.58, progress: 0.45,  speed: 0.0012, width: 580, opacity: 0.67, delay: 0,  amplitude: 38, frequency: 0.010, phase: 1.6, phaseSpeed: 0.016 },
  { yBase: 0.65, progress: 0.25,  speed: 0.0017, width: 1420, opacity: 0.70, delay: 0,  amplitude: 22, frequency: 0.015, phase: 4.3, phaseSpeed: 0.022 },
  { yBase: 0.73, progress: 0.45,  speed: 0.0013, width: 610, opacity: 0.63, delay: 0,  amplitude: 36, frequency: 0.011, phase: 2.8, phaseSpeed: 0.017 },
  { yBase: 0.81, progress: -0.05,  speed: 0.0011, width: 1500, opacity: 0.68, delay: 0,  amplitude: 24, frequency: 0.012, phase: 0.5, phaseSpeed: 0.014 },
  { yBase: 0.88, progress: 0.85,  speed: 0.0012, width: 1540, opacity: 0.62, delay: 0,  amplitude: 32, frequency: 0.013, phase: 3.1, phaseSpeed: 0.019 },
  { yBase: 0.94, progress: -0.15, speed: 0.0014, width: 1480, opacity: 0.65, delay: 0,  amplitude: 28, frequency: 0.012, phase: 1.5, phaseSpeed: 0.018 },
  { yBase: 1.00, progress: 0.35,  speed: 0.0013, width: 1600, opacity: 0.60, delay: 0,  amplitude: 30, frequency: 0.011, phase: 2.8, phaseSpeed: 0.016 },
  { yBase: 1.06, progress: 0.15,  speed: 0.0015, width: 1520, opacity: 0.68, delay: 0,  amplitude: 35, frequency: 0.010, phase: 0.9, phaseSpeed: 0.019 },
  { yBase: 1.15, progress: 0.55,  speed: 0.0012, width: 1600, opacity: 0.65, delay: 0,  amplitude: 32, frequency: 0.012, phase: 1.8, phaseSpeed: 0.017 },
  { yBase: 1.25, progress: -0.20,  speed: 0.0014, width: 1500, opacity: 0.63, delay: 0,  amplitude: 28, frequency: 0.011, phase: 3.2, phaseSpeed: 0.016 },
  { yBase: 1.35, progress: 0.40,  speed: 0.0013, width: 1550, opacity: 0.66, delay: 0,  amplitude: 33, frequency: 0.012, phase: 1.4, phaseSpeed: 0.018 },
  { yBase: 1.45, progress: 0.10,  speed: 0.0015, width: 1480, opacity: 0.64, delay: 0,  amplitude: 29, frequency: 0.011, phase: 2.7, phaseSpeed: 0.015 },
  { yBase: 1.55, progress: 0.60,  speed: 0.0012, width: 1620, opacity: 0.67, delay: 0,  amplitude: 34, frequency: 0.013, phase: 0.6, phaseSpeed: 0.019 },
  { yBase: 1.65, progress: -0.10,  speed: 0.0014, width: 1500, opacity: 0.62, delay: 0,  amplitude: 31, frequency: 0.010, phase: 3.0, phaseSpeed: 0.016 },
  { yBase: 2.10, progress: 0.35,  speed: 0.0013, width: 1560, opacity: 0.65, delay: 0,  amplitude: 27, frequency: 0.012, phase: 1.9, phaseSpeed: 0.017 },
];

export default function GradientBeam() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>(BEAMS_CONFIG.map(b => ({ ...b })));
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      timeRef.current += 1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      beamsRef.current.forEach((beam) => {
        if (elapsed < beam.delay) return;

        beam.progress += beam.speed;
        if (beam.progress > 1.2) beam.progress = -0.15;

        beam.phase += beam.phaseSpeed;

        const W = canvas.width;
        const H = canvas.height;

        // Center X of the beam
        const centerX = beam.progress * (W + beam.width) - beam.width * 0.5;
        const startX = centerX - beam.width / 2;
        const endX = centerX + beam.width / 2;

        // Build wavy path with many small segments
        const segments = 120;
        const stepX = beam.width / segments;

        // --- Glow layer (thick, soft) ---
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const x = startX + i * stepX;
          const y = beam.yBase * H + Math.sin(x * beam.frequency + beam.phase) * beam.amplitude;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        const glowGrad = ctx.createLinearGradient(startX, 0, endX, 0);
        glowGrad.addColorStop(0,    "rgba(0,0,0,0)");
        glowGrad.addColorStop(0.25, `rgba(139, 92, 246, ${beam.opacity * 0.30})`);
        glowGrad.addColorStop(0.5,  `rgba(217, 70, 239, ${beam.opacity * 0.35})`);
        glowGrad.addColorStop(0.75, `rgba(244, 114, 182, ${beam.opacity * 0.30})`);
        glowGrad.addColorStop(1,    "rgba(0,0,0,0)");

        ctx.strokeStyle = glowGrad;
        ctx.lineWidth = 18;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // --- Mid glow ---
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const x = startX + i * stepX;
          const y = beam.yBase * H + Math.sin(x * beam.frequency + beam.phase) * beam.amplitude;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        const midGrad = ctx.createLinearGradient(startX, 0, endX, 0);
        midGrad.addColorStop(0,    "rgba(0,0,0,0)");
        midGrad.addColorStop(0.2,  `rgba(96, 165, 250, ${beam.opacity * 0.55})`);
        midGrad.addColorStop(0.5,  `rgba(167, 139, 250, ${beam.opacity * 0.65})`);
        midGrad.addColorStop(0.8,  `rgba(244, 114, 182, ${beam.opacity * 0.55})`);
        midGrad.addColorStop(1,    "rgba(0,0,0,0)");

        ctx.strokeStyle = midGrad;
        ctx.lineWidth = 7;
        ctx.stroke();

        // --- Core line (sharp, bright) ---
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const x = startX + i * stepX;
          const y = beam.yBase * H + Math.sin(x * beam.frequency + beam.phase) * beam.amplitude;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        const coreGrad = ctx.createLinearGradient(startX, 0, endX, 0);
        coreGrad.addColorStop(0,    "rgba(0,0,0,0)");
        coreGrad.addColorStop(0.15, `rgba(147, 197, 253, ${beam.opacity})`);
        coreGrad.addColorStop(0.4,  `rgba(167, 139, 250, ${beam.opacity})`);
        coreGrad.addColorStop(0.6,  `rgba(232, 121, 249, ${beam.opacity})`);
        coreGrad.addColorStop(0.85, `rgba(249, 168, 212, ${beam.opacity})`);
        coreGrad.addColorStop(1,    "rgba(0,0,0,0)");

        ctx.strokeStyle = coreGrad;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 1 }}
    />
  );
}