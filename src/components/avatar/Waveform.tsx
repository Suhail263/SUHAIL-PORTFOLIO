import { useEffect, useRef } from 'react';

interface WaveformProps {
  active: boolean;
}

const BAR_COUNT = 24;

export function Waveform({ active }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const barsRef = useRef<number[]>(Array.from({ length: BAR_COUNT }, () => 0.15));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const barWidth = width / BAR_COUNT;

      for (let i = 0; i < BAR_COUNT; i++) {
        const target = active ? 0.2 + Math.random() * 0.8 : 0.12;
        barsRef.current[i] += (target - barsRef.current[i]) * 0.25;
        const h = barsRef.current[i] * height;

        ctx.fillStyle = 'var(--color-accent)'.startsWith('var') ? '#5b6cff' : '#5b6cff';
        ctx.globalAlpha = active ? 0.9 : 0.35;
        const x = i * barWidth + barWidth * 0.25;
        const w = barWidth * 0.5;
        const y = (height - h) / 2;
        const radius = Math.min(w / 2, 3);

        ctx.beginPath();
        ctx.roundRect(x, y, w, h, radius);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active]);

  return <canvas ref={canvasRef} className="w-full h-8" aria-hidden="true" />;
}
