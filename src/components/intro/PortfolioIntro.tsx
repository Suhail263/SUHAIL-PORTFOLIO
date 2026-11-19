import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Shield, Terminal, Zap } from 'lucide-react';

interface PortfolioIntroProps {
  onComplete?: () => void;
}

/**
 * The Full AI Quantum Vault Scene.
 * Rendered in 100vw x 100vh coordinate space.
 * Both the Left and Right clipped doors render this exact scene.
 * Because coordinates are full-screen, the reactor core and button
 * are placed in the EXACT DEAD CENTER of the screen.
 */
function VaultScene({
  mousePos,
  isCracking,
}: {
  mousePos: { x: number; y: number };
  isCracking: boolean;
}) {
  return (
    <div className="relative w-screen h-screen bg-[#030509] text-white select-none overflow-hidden">
      {/* 1. Deep Space Cyber Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.16] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(91, 108, 255, 0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91, 108, 255, 0.14) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(circle at center, black 35%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 35%, transparent 85%)',
        }}
      />

      {/* 2. Central Atmospheric Nebula Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,720px)] h-[min(90vw,720px)] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(91, 108, 255, 0.24) 0%, rgba(77, 238, 234, 0.09) 35%, rgba(3, 5, 9, 0) 70%)',
        }}
      />

      {/* 3. Top-Left HUD Telemetry (Radar & Coordinates) */}
      <div className="absolute top-8 left-8 sm:top-12 sm:left-12 flex items-start gap-4 z-10 pointer-events-none">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#5b6cff]/30 flex items-center justify-center">
          <div className="absolute inset-1 rounded-full border border-dashed border-[#5b6cff]/20 animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-2.5 rounded-full border border-[#4deeea]/30 animate-[spin_10s_linear_infinite_reverse]" />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#4deeea]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="absolute top-1/2 left-1/2 w-7 h-px bg-gradient-to-r from-transparent via-[#4deeea] to-transparent -translate-y-1/2 animate-[spin_4s_linear_infinite]" />
        </div>
        <div className="font-mono text-[9px] sm:text-[10px] text-white/50 tracking-wider space-y-0.5 pt-1">
          <div className="flex items-center gap-1.5 text-[#4deeea]">
            <Terminal size={11} />
            <span className="font-semibold uppercase tracking-widest">SYS_AUTH // VERIFIED</span>
          </div>
          <p className="text-white/70">MODULE: NEURAL_VAULT_v2.6</p>
          <p>LOC: 13.0827° N / 80.2707° E</p>
          <p className="text-white/40">CLEARANCE: LEVEL_01 // GRANTED</p>
        </div>
      </div>

      {/* 4. Top-Right HUD Telemetry (Security Clearance) */}
      <div className="absolute top-8 right-8 sm:top-12 sm:right-12 text-right font-mono text-[9px] sm:text-[10px] text-white/50 tracking-wider space-y-0.5 z-10 pointer-events-none">
        <div className="flex items-center justify-end gap-1.5 text-[#5b6cff]">
          <Shield size={11} />
          <span className="font-semibold uppercase tracking-widest">CORE ENCRYPTION ACTIVE</span>
        </div>
        <p className="text-white/70">ARCH: AI & DATA SCIENCE</p>
        <p>SECTOR: CHENNAI · INDIA</p>
        <p className="text-white/40">PROTOCOL: QUANTUM_UNSEAL</p>
      </div>

      {/* 5. Bottom Metadata Corners */}
      <div className="absolute bottom-8 left-8 sm:bottom-10 sm:left-12 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 z-10 pointer-events-none">
        <p className="text-[#5b6cff]/80 font-medium">SUHAIL KHAN</p>
        <p className="text-white/30 text-[8px] tracking-[0.25em] mt-0.5">AI ENGINEER · FULL STACK</p>
      </div>
      <div className="absolute bottom-8 right-8 sm:bottom-10 sm:right-12 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 text-right z-10 pointer-events-none">
        <p className="text-white/70 font-medium">RELEASE // 2026</p>
        <p className="text-white/30 text-[8px] tracking-[0.25em] mt-0.5">PORTFOLIO v2.0</p>
      </div>

      {/* 6. DEAD-CENTER AI QUANTUM REACTOR CORE / IRIS */}
      <div
        className="absolute left-1/2 top-[46%] sm:top-[48%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))`,
          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] flex items-center justify-center">
          {/* Ring 1 — Outer Dotted Cyber Orbit Track */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-[#5b6cff]/35"
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#5b6cff] shadow-[0_0_12px_#5b6cff]" />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#4deeea] shadow-[0_0_12px_#4deeea]" />
            <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#5b6cff] shadow-[0_0_12px_#5b6cff]" />
            <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#4deeea] shadow-[0_0_12px_#4deeea]" />
          </motion.div>

          {/* Ring 2 — Middle Cyan/Blue Segmented Quantum Arcs */}
          <motion.div
            className="absolute inset-7 sm:inset-10 rounded-full border-2 border-transparent border-t-[#4deeea]/80 border-b-[#5b6cff]/80 border-l-[#5b6cff]/40"
            style={{
              filter: 'drop-shadow(0 0 16px rgba(77,238,234,0.45))',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {/* Ring 3 — Swirling Aperture Vortex Blades */}
          <motion.svg
            className="absolute inset-10 sm:inset-14 w-[calc(100%-5rem)] h-[calc(100%-5rem)] sm:w-[calc(100%-7rem)] sm:h-[calc(100%-7rem)] opacity-60"
            viewBox="0 0 200 200"
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <path
                key={deg}
                d="M 100 100 Q 135 55 170 85"
                fill="none"
                stroke="url(#vaultIrisGrad)"
                strokeWidth="1.6"
                transform={`rotate(${deg} 100 100)`}
              />
            ))}
            <defs>
              <linearGradient id="vaultIrisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4deeea" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#5b6cff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#7c88ff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Ring 4 — Telemetry Graduation Ticks */}
          <motion.div
            className="absolute inset-16 sm:inset-20 rounded-full border border-[#5b6cff]/45"
            animate={{ rotate: -360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-1 rounded-full border border-dotted border-white/25" />
          </motion.div>

          {/* Ring 5 — Central Obsidian Core Sphere with SK Monogram */}
          <motion.div
            className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center overflow-hidden border-2 border-[#5b6cff]/70"
            style={{
              background:
                'radial-gradient(circle at 35% 35%, #18223d 0%, #0c1220 55%, #04060a 100%)',
              boxShadow: isCracking
                ? '0 0 65px rgba(77,238,234,0.95), inset 0 0 35px rgba(77,238,234,0.7)'
                : '0 0 40px rgba(91,108,255,0.5), inset 0 0 25px rgba(91,108,255,0.25)',
            }}
            animate={
              isCracking
                ? { scale: [1, 1.15, 1.05] }
                : { scale: [1, 1.025, 1] }
            }
            transition={{ duration: isCracking ? 0.35 : 3.5, repeat: isCracking ? 0 : Infinity, ease: 'easeInOut' }}
          >
            {/* Core Lens Flare */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/12 rounded-full blur-lg pointer-events-none" />

            {/* Glowing Monogram */}
            <motion.span
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(180deg, #ffffff 0%, #a4b9ff 60%, #5b6cff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 18px rgba(91,108,255,0.85))',
              }}
            >
              SK
            </motion.span>

            {/* Micro Badge Label */}
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#4deeea] mt-1 font-semibold">
              QUANTUM AI CORE
            </span>

            {/* Glowing Pulse Dot */}
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#4deeea] mt-1.5 shadow-[0_0_8px_#4deeea]"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioIntro({ onComplete }: PortfolioIntroProps) {
  const [phase, setPhase] = useState<'idle' | 'cracking' | 'unsealing' | 'done'>(() => {
    if (typeof window !== 'undefined' && window.sessionStorage.getItem('portfolio_vault_unsealed')) {
      return 'done';
    }
    return 'idle';
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle Parallax float
  useEffect(() => {
    if (phase !== 'idle') return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [phase]);

  // Skip immediately
  const handleSkip = useCallback(() => {
    try {
      window.sessionStorage.setItem('portfolio_vault_unsealed', 'true');
    } catch {}
    setPhase('done');
    onComplete?.();
  }, [onComplete]);

  // Trigger crack & dual split unseal
  const handleUnseal = useCallback(() => {
    if (phase !== 'idle') return;

    // Stage 1: Core breach & laser fissure (0.35s)
    setPhase('cracking');

    // Stage 2: Dual door curtain split (0.95s)
    window.setTimeout(() => {
      setPhase('unsealing');
    }, 320);

    // Stage 3: Complete & cleanup
    window.setTimeout(() => {
      try {
        window.sessionStorage.setItem('portfolio_vault_unsealed', 'true');
      } catch {}
      setPhase('done');
      onComplete?.();
    }, 1300);
  }, [phase, onComplete]);

  // Input Listeners: Scroll, Touch swipe, Keys
  useEffect(() => {
    if (phase !== 'idle') return;

    // Scroll trigger (mouse wheel / trackpad)
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5 || Math.abs(e.deltaX) > 5) {
        handleUnseal();
      }
    };

    // Touch swipe trigger
    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = Math.abs(e.touches[0].clientY - startY);
      if (deltaY > 10) {
        handleUnseal();
      }
    };

    // Keyboard trigger (Enter, Space, ArrowDown, Esc)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (
        e.key === 'Enter' ||
        e.key === ' ' ||
        e.key === 'ArrowDown' ||
        e.key === 'PageDown'
      ) {
        e.preventDefault();
        handleUnseal();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [phase, handleUnseal, handleSkip]);

  if (phase === 'done') return null;

  const isCracking = phase === 'cracking';
  const isUnsealing = phase === 'unsealing';

  return (
    <div
      className="fixed inset-0 z-[99999] overflow-hidden select-none cursor-pointer"
      onClick={handleUnseal}
      role="button"
      tabIndex={0}
      aria-label="Click or scroll to crack and unseal the AI Quantum Vault"
    >
      {/* ==============================================================
          LEFT CYBER-GATE (Clipped to left 50%)
          On unseal: slides -100% to the left
      ============================================================== */}
      <motion.div
        className="fixed inset-0 z-20 pointer-events-none"
        style={{
          clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
          WebkitClipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
          willChange: 'transform',
        }}
        initial={{ x: 0 }}
        animate={isUnsealing ? { x: '-100%' } : { x: 0 }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      >
        <VaultScene mousePos={mousePos} isCracking={isCracking} />
      </motion.div>

      {/* ==============================================================
          RIGHT CYBER-GATE (Clipped to right 50%)
          On unseal: slides +100% to the right
      ============================================================== */}
      <motion.div
        className="fixed inset-0 z-20 pointer-events-none"
        style={{
          clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
          WebkitClipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
          willChange: 'transform',
        }}
        initial={{ x: 0 }}
        animate={isUnsealing ? { x: '100%' } : { x: 0 }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      >
        <VaultScene mousePos={mousePos} isCracking={isCracking} />
      </motion.div>

      {/* ==============================================================
          CENTER VERTICAL LASER CRACK LINE (The Breach Moment)
      ============================================================== */}
      {/* 1. Subtle Resting Seam Line */}
      {!isCracking && !isUnsealing && (
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[#5b6cff]/40 to-transparent z-30 pointer-events-none" />
      )}

      {/* 2. Intense High-Voltage Laser Beam on Crack */}
      <AnimatePresence>
        {isCracking && (
          <motion.div
            key="crack-laser"
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-white z-40 pointer-events-none"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: 1,
              opacity: [0, 1, 1, 0.8],
            }}
            exit={{ opacity: 0, scaleX: 3 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            style={{
              boxShadow:
                '0 0 20px #00f0ff, 0 0 45px #5b6cff, 0 0 80px #ffffff, 0 0 120px #4deeea',
            }}
          />
        )}
      </AnimatePresence>

      {/* 3. Core Breach Shockwave Ring */}
      <AnimatePresence>
        {isCracking && (
          <motion.div
            key="shockwave"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400 z-40 pointer-events-none"
            initial={{ width: 140, height: 140, opacity: 1 }}
            animate={{ width: 680, height: 680, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{
              boxShadow: '0 0 35px #00f0ff, inset 0 0 25px #5b6cff',
            }}
          />
        )}
      </AnimatePresence>

      {/* ==============================================================
          INTERACTIVE UNSEAL CAPSULE BUTTON
          Positioned directly below the reactor core on the center axis
      ============================================================== */}
      <AnimatePresence>
        {!isCracking && !isUnsealing && (
          <motion.div
            key="unseal-btn"
            className="absolute left-1/2 -translate-x-1/2 top-[calc(46%+180px)] sm:top-[calc(48%+230px)] md:top-[calc(48%+260px)] z-50 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUnseal();
              }}
              className="group relative px-6 py-2.5 rounded-full border border-[#5b6cff]/50 bg-[#0a0f1d]/90 hover:bg-[#10172e] hover:border-[#4deeea]/80 text-white transition-all shadow-[0_0_25px_rgba(91,108,255,0.3)] hover:shadow-[0_0_40px_rgba(77,238,234,0.5)] backdrop-blur-md flex items-center gap-2.5 cursor-pointer"
            >
              <Zap size={14} className="text-[#4deeea] group-hover:scale-110 transition-transform animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider font-semibold text-white/95 group-hover:text-white">
                Scroll to Crack & Unseal
              </span>
              <ChevronDown size={14} className="text-white/60 group-hover:text-[#4deeea] animate-bounce" />
            </button>
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
              OR CLICK ANYWHERE TO ENTER
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==============================================================
          SKIP BUTTON (Top-Right Quick Bypass)
      ============================================================== */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute top-6 right-6 z-[60] px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase border border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/30 text-white/70 hover:text-white transition-all backdrop-blur-md cursor-pointer"
        aria-label="Skip intro animation"
      >
        Skip [Esc]
      </button>
    </div>
  );
}
