import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';

interface PortfolioIntroProps {
  onComplete?: () => void;
}

/**
 * High-Definition AI Quantum Vault Visual Scene.
 * Rendered at 100% x 100% coordinate space.
 *
 * Mathematical guarantee of Dead-Center Alignment:
 * - Left Gate container is 50% screen width (0 to 50%).
 *   Inner scene container has width: 200%, left: 0%.
 *   -> Exactly spans 0% to 100% of the screen.
 * - Right Gate container is 50% screen width (50% to 100%).
 *   Inner scene container has width: 200%, left: -100%.
 *   -> Exactly spans 0% to 100% of the screen.
 *
 * Any element centered in this scene sits at the exact screen meridian (x = 50%, y = 50%).
 * The central core is firmly locked at x = 0 (no horizontal parallax drift),
 * guaranteeing that Left Gate and Right Gate meet seamlessly with 0 subpixel offset,
 * and part smoothly down the center on scroll.
 */
function VaultScene({
  mousePos,
  isCracking,
}: {
  mousePos: { x: number; y: number };
  isCracking: boolean;
}) {
  return (
    <div className="relative w-full h-full bg-[#030509] text-white select-none overflow-hidden">
      {/* 1. Deep Space Cybernetic Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
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

      {/* 2. Ambient Deep-Space Nebula Glow (With subtle parallax) */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,860px)] h-[min(92vw,860px)] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(91, 108, 255, 0.28) 0%, rgba(77, 238, 234, 0.12) 28%, rgba(139, 92, 246, 0.08) 55%, transparent 72%)',
          filter: 'blur(32px)',
          transform: `translate(calc(-50% + ${mousePos.x * 0.4}px), calc(-50% + ${mousePos.y * 0.4}px))`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* 3. Ambient Starlight Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: '16%', y: '22%', s: 2.2, o: 0.65, d: 2.6 },
          { x: '84%', y: '20%', s: 2.5, o: 0.7, d: 3.2 },
          { x: '22%', y: '80%', s: 1.8, o: 0.5, d: 2.8 },
          { x: '78%', y: '78%', s: 2.4, o: 0.65, d: 3.4 },
          { x: '34%', y: '28%', s: 1.5, o: 0.45, d: 2.0 },
          { x: '68%', y: '32%', s: 2.0, o: 0.55, d: 2.9 },
          { x: '30%', y: '70%', s: 2.2, o: 0.6, d: 3.1 },
          { x: '66%', y: '68%', s: 1.6, o: 0.45, d: 2.3 },
          { x: '48%', y: '15%', s: 2.0, o: 0.5, d: 2.5 },
          { x: '52%', y: '85%', s: 2.0, o: 0.5, d: 2.7 },
        ].map((pt, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#4deeea]"
            style={{
              left: pt.x,
              top: pt.y,
              width: pt.s,
              height: pt.s,
              boxShadow: '0 0 8px #4deeea',
            }}
            animate={{
              opacity: [pt.o * 0.35, pt.o, pt.o * 0.35],
              scale: [0.85, 1.25, 0.85],
            }}
            transition={{
              duration: pt.d,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.25,
            }}
          />
        ))}
      </div>

      {/* ==============================================================
          4. DEAD-CENTER AI QUANTUM REACTOR CORE & MULTI-LAYER VORTEX
          Pure Flexbox centering guarantees absolute center of screen.
          Position is mathematically anchored to x = 50%, y = 50%.
      ============================================================== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Main Vortex Engine Box: 340px mobile, 480px tablet, 560px desktop */}
        <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] flex items-center justify-center">

          {/* --- RING LAYER 1: OUTER CELESTIAL ORBIT & PHOTON SATELLITES --- */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-[#5b6cff]/35"
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
          >
            {/* 4 Cardinal Photon Satellites with glowing aura */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#5b6cff] shadow-[0_0_14px_#5b6cff]" />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#4deeea] shadow-[0_0_14px_#4deeea]" />
            <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#5b6cff] shadow-[0_0_14px_#5b6cff]" />
            <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#4deeea] shadow-[0_0_14px_#4deeea]" />

            {/* Cardinal Micro Degree Labels */}
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#5b6cff]/70 tracking-widest">
              000°
            </span>
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#4deeea]/70 tracking-widest">
              180°
            </span>
            <span className="absolute -left-6 top-1/2 -translate-y-1/2 font-mono text-[8px] text-[#5b6cff]/70 tracking-widest">
              270°
            </span>
            <span className="absolute -right-6 top-1/2 -translate-y-1/2 font-mono text-[8px] text-[#4deeea]/70 tracking-widest">
              090°
            </span>
          </motion.div>

          {/* --- RING LAYER 2: DUAL-TONE CYBER SHIELD ARCS --- */}
          <motion.div
            className="absolute inset-6 sm:inset-10 rounded-full border-2 border-transparent border-t-[#4deeea]/80 border-b-[#5b6cff]/80 border-l-[#8b5cf6]/50"
            style={{
              filter: 'drop-shadow(0 0 16px rgba(77,238,234,0.4))',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          />

          {/* --- RING LAYER 3: CINEMATIC VOLUMETRIC TURBINE VORTEX BLADES (TECHVISTRA-INSPIRED) --- */}
          {/* 16 sweeping, curved aerodynamic ribbon blades rotating with dynamic light */}
          <motion.svg
            className="absolute inset-4 sm:inset-6 w-[calc(100%-2rem)] h-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] sm:h-[calc(100%-3rem)] overflow-visible"
            viewBox="0 0 500 500"
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          >
            <defs>
              {/* Primary Ribbon Blade Gradient: Luminous Cyan to Electric Indigo with violet depth */}
              <linearGradient id="vortexBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4deeea" stopOpacity="0.88" />
                <stop offset="40%" stopColor="#5b6cff" stopOpacity="0.65" />
                <stop offset="80%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#030509" stopOpacity="0.05" />
              </linearGradient>

              {/* Blade Specular Outer Edge Glow */}
              <linearGradient id="vortexBladeStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#4deeea" stopOpacity="0.7" />
                <stop offset="90%" stopColor="#5b6cff" stopOpacity="0.2" />
              </linearGradient>

              {/* Trailing Filament Whisper Gradient */}
              <linearGradient id="filamentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.75" />
                <stop offset="65%" stopColor="#4deeea" stopOpacity="0.35" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* 16 Sculpted Volumetric Ribbon Blades forming the hypnotic vortex */}
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(
              (deg) => (
                <g key={deg} transform={`rotate(${deg} 250 250)`}>
                  {/* Main Sculpted Ribbon Blade */}
                  <path
                    d="M 250 250 Q 295 155 405 180 C 350 225 290 245 250 250 Z"
                    fill="url(#vortexBladeGrad)"
                    stroke="url(#vortexBladeStroke)"
                    strokeWidth="1.4"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(77,238,234,0.35))',
                    }}
                  />
                  {/* Secondary Whispering Trailing Strand */}
                  <path
                    d="M 250 250 Q 320 130 435 160"
                    fill="none"
                    stroke="url(#filamentGrad)"
                    strokeWidth="0.9"
                    strokeDasharray="5 3"
                    opacity={0.7}
                  />
                </g>
              )
            )}
          </motion.svg>

          {/* --- RING LAYER 4: INNER COUNTER-SWIRLING TELEMETRY TICKS --- */}
          <motion.div
            className="absolute inset-20 sm:inset-28 rounded-full border border-[#5b6cff]/40 flex items-center justify-center"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-1.5 rounded-full border border-dotted border-white/20" />
            {/* Micro crosshair marks */}
            <span className="absolute top-1 text-[7px] text-[#4deeea]/60 font-mono">+</span>
            <span className="absolute bottom-1 text-[7px] text-[#4deeea]/60 font-mono">+</span>
            <span className="absolute left-1 text-[7px] text-[#4deeea]/60 font-mono">+</span>
            <span className="absolute right-1 text-[7px] text-[#4deeea]/60 font-mono">+</span>
          </motion.div>

          {/* --- RING LAYER 5: HIGH-VOLTAGE GLOW HALO AROUND CORE --- */}
          <motion.div
            className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(77, 238, 234, 0.38) 0%, rgba(91, 108, 255, 0.22) 50%, transparent 75%)',
              filter: 'blur(14px)',
            }}
            animate={{
              scale: isCracking ? [1, 1.4, 1.2] : [1, 1.08, 1],
              opacity: isCracking ? [0.6, 1, 0.8] : [0.5, 0.85, 0.5],
            }}
            transition={{
              duration: isCracking ? 0.35 : 3.2,
              repeat: isCracking ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* --- RING LAYER 6: THE BIOMETRIC OBSIDIAN CORE SPHERE --- */}
          {/* The physical center capsule that splits neatly down the middle */}
          <motion.div
            className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center overflow-hidden border-2 border-[#5b6cff]/80 z-10"
            style={{
              background:
                'radial-gradient(circle at 35% 30%, #1e294b 0%, #0d1527 50%, #03060d 100%)',
              boxShadow: isCracking
                ? '0 0 85px rgba(77,238,234,1), inset 0 0 45px rgba(77,238,234,0.85)'
                : '0 0 50px rgba(91,108,255,0.7), inset 0 0 30px rgba(91,108,255,0.3)',
            }}
            animate={
              isCracking
                ? { scale: [1, 1.14, 1.05] }
                : { scale: [1, 1.025, 1] }
            }
            transition={{
              duration: isCracking ? 0.35 : 3.6,
              repeat: isCracking ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Glass Lens Reflection Crescent */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-md pointer-events-none" />

            {/* Bold Luminous Monogram "SK" (Ready for custom logo) */}
            <motion.span
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(180deg, #ffffff 0%, #c7d2fe 55%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(91,108,255,0.9))',
              }}
            >
              SK
            </motion.span>

            {/* Futuristic Sub-Badge */}
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.32em] text-[#4deeea] mt-1 font-bold">
              QUANTUM AI CORE
            </span>

            {/* Live Status Reactor Pulsing LED */}
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#4deeea] mt-1.5"
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [0.9, 1.25, 0.9],
              }}
              transition={{ duration: 1.6, repeat: Infinity }}
              style={{ boxShadow: '0 0 10px #4deeea' }}
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export function PortfolioIntro({ onComplete }: PortfolioIntroProps) {
  // Always start at 'idle' on every page load/refresh
  const [phase, setPhase] = useState<'idle' | 'cracking' | 'unsealing' | 'done'>('idle');

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Freeze background page scroll while intro is visible
  useEffect(() => {
    if (phase !== 'done') {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [phase]);

  // Subtle Mouse Parallax Tilt for background ambient atmosphere
  useEffect(() => {
    if (phase !== 'idle') return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [phase]);

  // Trigger crack & dual split unseal
  const handleUnseal = useCallback(() => {
    if (phase !== 'idle') return;

    // Stage 1: Laser fissure ignition & shockwave burst (0.35s)
    setPhase('cracking');

    // Stage 2: Dual cyber gate curtain split (0.95s)
    window.setTimeout(() => {
      setPhase('unsealing');
    }, 320);

    // Stage 3: Complete & cleanup
    window.setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 1320);
  }, [phase, onComplete]);

  // Input Listeners: strictly opens only on SCROLL or mobile touch swipe or keyboard navigation
  useEffect(() => {
    if (phase !== 'idle') return;

    // Wheel / Trackpad scroll
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5 || Math.abs(e.deltaX) > 5) {
        handleUnseal();
      }
    };

    // Mobile touch swipe
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

    // Keyboard keys (Enter, Space, ArrowDown, PageDown)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
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
  }, [phase, handleUnseal]);

  if (phase === 'done') return null;

  const isCracking = phase === 'cracking';
  const isUnsealing = phase === 'unsealing';

  return (
    <div
      className="fixed inset-0 z-[99999] overflow-hidden select-none"
      role="region"
      aria-label="AI Quantum Vault Intro"
    >
      {/* ==============================================================
          LEFT CYBER-GATE (Left 0% to 50%)
          On unseal: Slides -100% to the left
          Inner scene is width: 200%, left: 0 -> exactly spans 0% to 100%
      ============================================================== */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden bg-[#030509] border-r border-[#5b6cff]/30 shadow-[10px_0_50px_rgba(0,0,0,0.95)] z-20 pointer-events-none"
        initial={{ x: 0 }}
        animate={isUnsealing ? { x: '-100%' } : { x: 0 }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        style={{ willChange: 'transform' }}
      >
        <div className="absolute top-0 left-0 w-[200%] h-full pointer-events-none">
          <VaultScene mousePos={mousePos} isCracking={isCracking} />
        </div>
      </motion.div>

      {/* ==============================================================
          RIGHT CYBER-GATE (Right 50% to 100%)
          On unseal: Slides +100% to the right
          Inner scene is width: 200%, left: -100% -> exactly spans 0% to 100%
      ============================================================== */}
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 w-1/2 overflow-hidden bg-[#030509] border-l border-[#5b6cff]/30 shadow-[-10px_0_50px_rgba(0,0,0,0.95)] z-20 pointer-events-none"
        initial={{ x: 0 }}
        animate={isUnsealing ? { x: '100%' } : { x: 0 }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        style={{ willChange: 'transform' }}
      >
        <div className="absolute top-0 -left-[100%] w-[200%] h-full pointer-events-none">
          <VaultScene mousePos={mousePos} isCracking={isCracking} />
        </div>
      </motion.div>

      {/* ==============================================================
          CENTER VERTICAL LASER SEAM & BREACH CRACK BEAM
          Sits exactly on the 50% midline
      ============================================================== */}
      {/* 1. Resting Vertical Seam Line */}
      {!isCracking && !isUnsealing && (
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[#5b6cff]/45 to-transparent z-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#4deeea] shadow-[0_0_6px_#4deeea]" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#5b6cff] shadow-[0_0_6px_#5b6cff]" />
        </div>
      )}

      {/* 2. Blinding Laser Fissure Beam on Crack Trigger */}
      <AnimatePresence>
        {isCracking && (
          <motion.div
            key="crack-laser"
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-white z-40 pointer-events-none"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: 1,
              opacity: [0, 1, 1, 0.85],
            }}
            exit={{ opacity: 0, scaleX: 3 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            style={{
              boxShadow:
                '0 0 20px #00f0ff, 0 0 45px #5b6cff, 0 0 85px #ffffff, 0 0 130px #4deeea',
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
            animate={{ width: 750, height: 750, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{
              boxShadow: '0 0 40px #00f0ff, inset 0 0 30px #5b6cff',
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
            className="absolute left-1/2 -translate-x-1/2 top-[calc(50%+185px)] sm:top-[calc(50%+245px)] md:top-[calc(50%+285px)] z-50 flex flex-col items-center gap-2"
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
              className="group relative px-6 py-2.5 rounded-full border border-[#5b6cff]/50 bg-[#0a0f1d]/90 hover:bg-[#10172e] hover:border-[#4deeea]/80 text-white transition-all shadow-[0_0_25px_rgba(91,108,255,0.35)] hover:shadow-[0_0_40px_rgba(77,238,234,0.55)] backdrop-blur-md flex items-center gap-2.5 cursor-pointer"
            >
              <Zap
                size={14}
                className="text-[#4deeea] group-hover:scale-110 transition-transform animate-pulse"
              />
              <span className="font-mono text-xs uppercase tracking-wider font-semibold text-white/95 group-hover:text-white">
                Scroll to Crack & Unseal
              </span>
              <ChevronDown
                size={14}
                className="text-white/60 group-hover:text-[#4deeea] animate-bounce"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
