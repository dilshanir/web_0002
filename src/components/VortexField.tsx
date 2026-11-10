import { useEffect, useRef } from 'react';

/**
 * The studio's signature: a slow field of particles spiralling inward
 * behind the hero. Drawn on canvas, paused when off screen, and rendered
 * as a single still frame when the visitor prefers reduced motion.
 */
export default function VortexField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let maxR = 0;
    let minR = 0;
    let raf = 0;
    let visible = true;

    type P = { angle: number; radius: number; speed: number; size: number; alpha: number; tail: number };
    let particles: P[] = [];

    const spawn = (anywhere: boolean): P => ({
      angle: Math.random() * Math.PI * 2,
      radius: anywhere ? minR + Math.random() * (maxR - minR) : maxR,
      speed: 0.5 + Math.random() * 0.9,
      size: 0.8 + Math.random() * 1.8,
      alpha: 0.12 + Math.random() * 0.4,
      tail: 0.05 + Math.random() * 0.16,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      maxR = Math.hypot(width, height) / 2;
      minR = Math.max(250, Math.min(width, 1100) * 0.24);
      const count = Math.round(Math.min(220, Math.max(70, width / 6)));
      particles = Array.from({ length: count }, () => spawn(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height * 0.42;
      ctx.lineCap = 'round';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduce) {
          // angular speed rises toward the centre, like water round a drain
          p.angle += (p.speed * 1.1) / p.radius;
          p.radius -= p.speed * 0.16;
          if (p.radius < minR) particles[i] = spawn(false);
        }
        const fade = Math.min(1, (p.radius - minR) / 120) * Math.min(1, (maxR - p.radius) / 160 + 0.25);
        ctx.strokeStyle = `rgba(5, 26, 36, ${p.alpha * Math.max(0, fade)})`;
        ctx.lineWidth = p.size;
        ctx.beginPath();
        // flatten vertically so the field reads as a tilted disc
        ctx.ellipse(cx, cy, p.radius, p.radius * 0.72, 0, p.angle - p.tail, p.angle);
        ctx.stroke();
      }
    };

    const loop = () => {
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw();
    if (!reduce) raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
