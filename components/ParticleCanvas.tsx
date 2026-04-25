"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  originX: number; originY: number;
  char: string;
  size: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  nx: number; ny: number; nspeed: number;
  glow: boolean;
}

const CHARS = [
  "·","·","·","·","·","∘","∘","○","◦","•",
  "∙","*","+","~","-","=",":",";"," /"," \\",
  "|",">","<","%","·","∘","·",
];

const C_DIM    = ["#252525","#292929","#2e2e2e","#303030"];
const C_MID    = ["#3c3c3c","#424242","#484848","#505050","#555"];
const C_BRIGHT = ["#606060","#676767","#707070","#777","#808080","#888"];
const C_GLOW   = ["#a084cc","#9b7bbf","#b090d8","#a878cc","#c0a0e0"];

function rand(a: number, b: number) { return a + Math.random() * (b - a); }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function spawn(w: number, h: number, count: number): Particle[] {
  return Array.from({ length: count }, () => {
    const glow = Math.random() < 0.25;
    const tier = Math.random();
    const color = glow
      ? pick(C_GLOW)
      : tier < 0.38 ? pick(C_DIM)
      : tier < 0.76 ? pick(C_MID)
      : pick(C_BRIGHT);
    const x = rand(12, w - 12);
    const y = rand(12, h - 12);
    const base = rand(0.38, 1.0);
    return {
      x, y,
      vx: rand(-0.12, 0.12),
      vy: rand(-0.12, 0.12),
      originX: x, originY: y,
      char: pick(CHARS),
      size: rand(13, 19),
      opacity: base,
      baseOpacity: base,
      color,
      nx: rand(0, Math.PI * 2),
      ny: rand(0, Math.PI * 2),
      nspeed: rand(0.003, 0.013),
      glow,
    };
  });
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef(0);
  const tRef      = useRef(0);
  const partsRef  = useRef<Particle[]>([]);
  const dimRef    = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 640;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      dimRef.current = { w, h };
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
      partsRef.current = spawn(w, h, isMobile ? 69 : 178);
    };

    resize();

    const onResize = () => resize();
    const onMove   = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      const { w, h } = dimRef.current;
      const { x: mx, y: my } = mouseRef.current;
      const t = ++tRef.current;

      ctx.clearRect(0, 0, w, h);

      for (const p of partsRef.current) {
        // Noise drift
        p.vx +=
          Math.sin(p.nx + t * p.nspeed) * 0.11 +
          Math.sin(p.nx * 1.7 + t * p.nspeed * 2.1) * 0.055;
        p.vy +=
          Math.cos(p.ny + t * p.nspeed * 0.9) * 0.11 +
          Math.cos(p.ny * 2.3 + t * p.nspeed * 1.6) * 0.055;

        // Return to origin
        p.vx += (p.originX - p.x) * 0.0018;
        p.vy += (p.originY - p.y) * 0.0018;

        // Cursor repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 120 && d > 0.5) {
          const f = ((1 - d / 120) ** 1.4) * 2.2;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }

        // Damping + integrate
        p.vx *= 0.935;
        p.vy *= 0.935;
        p.x  += p.vx;
        p.y  += p.vy;

        // Soft walls
        if (p.x < 10)     p.vx += 0.1;
        if (p.x > w - 10) p.vx -= 0.1;
        if (p.y < 10)     p.vy += 0.1;
        if (p.y > h - 10) p.vy -= 0.1;

        // Draw
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        if (p.glow) {
          ctx.shadowColor = "rgba(170, 90, 255, 0.9)";
          ctx.shadowBlur = 18;
        }
        ctx.font = `${p.size}px "JetBrains Mono","Fira Code",ui-monospace,monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        display: "block",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
