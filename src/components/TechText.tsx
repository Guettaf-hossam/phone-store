import { PointerEvent, useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
}

export function TechText() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, down: false, burst: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let frame = 0;
    let disposed = false;
    let particles: Particle[] = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      if (disposed) return;
      const rect = canvas.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      if (width < 20 || height < 20) return;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const off = offscreen.getContext('2d');
      if (!off) return;
      const size = Math.max(32, Math.min(width / 7.1, 136));
      off.font = `700 ${size}px "Geist", "Inter", sans-serif`;
      off.textAlign = 'center';
      off.textBaseline = 'middle';
      off.fillStyle = '#fff';
      off.fillText('PLANET PHONE', width / 2, height / 2);
      const data = off.getImageData(0, 0, width, height).data;
      particles = [];
      const step = width < 560 ? 5 : 6;
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          if (data[(y * width + x) * 4 + 3] > 120) {
            particles.push({ x, y, originX: x, originY: y, vx: 0, vy: 0 });
          }
        }
      }
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      context.clearRect(0, 0, rect.width, rect.height);
      const radius = pointer.current.down ? 130 : 92;
      const burst = pointer.current.burst;
      pointer.current.burst *= 0.85;
      pointer.current.vx *= 0.82;
      pointer.current.vy *= 0.82;

      for (const dot of particles) {
        const dx = dot.x - pointer.current.x;
        const dy = dot.y - pointer.current.y;
        const distance = Math.hypot(dx, dy) || 1;
        if (!reducedMotion && distance < radius) {
          const falloff = (radius - distance) / radius;
          const force = falloff * (pointer.current.down ? 7.5 : 3.2) + falloff * burst;
          dot.vx += (dx / distance) * force + pointer.current.vx * falloff * 0.22;
          dot.vy += (dy / distance) * force + pointer.current.vy * falloff * 0.22;
        }
        dot.vx += (dot.originX - dot.x) * 0.045;
        dot.vy += (dot.originY - dot.y) * 0.045;
        dot.vx *= 0.86;
        dot.vy *= 0.86;
        dot.x += dot.vx;
        dot.y += dot.vy;
        const displacement = Math.hypot(dot.x - dot.originX, dot.y - dot.originY);
        context.fillStyle =
          displacement > 10
            ? '#d9232e'
            : displacement > 3
              ? '#d9d9de'
              : 'rgba(255,255,255,0.9)';
        context.fillRect(dot.x, dot.y, 2.5, 2.5);
      }
      frame = requestAnimationFrame(draw);
    };

    resize();
    void document.fonts?.ready.then(resize);
    draw();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('resize', resize);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  const move = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = event.clientX - rect.left;
    const nextY = event.clientY - rect.top;
    if (pointer.current.x > -500) {
      pointer.current.vx = Math.max(-28, Math.min(28, nextX - pointer.current.x));
      pointer.current.vy = Math.max(-28, Math.min(28, nextY - pointer.current.y));
    }
    pointer.current.x = nextX;
    pointer.current.y = nextY;
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerMove={move}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        pointer.current.down = true;
        pointer.current.burst = 12;
        move(event);
      }}
      onPointerUp={() => { pointer.current.down = false; }}
      onPointerCancel={() => { pointer.current.down = false; }}
      onPointerLeave={() => { pointer.current.x = -1000; pointer.current.y = -1000; pointer.current.down = false; }}
      className="h-[220px] w-full cursor-grab select-none touch-none active:cursor-grabbing sm:h-[280px] md:h-[340px]"
      aria-label="Mot-symbole interactif PLANET PHONE. Cliquez ou faites glisser le pointeur pour disperser les pixels."
    />
  );
}
