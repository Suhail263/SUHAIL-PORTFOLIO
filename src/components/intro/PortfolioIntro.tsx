import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Shield, Terminal, Zap } from 'lucide-react';

interface PortfolioIntroProps {
  onComplete?: () => void;
}

/**
 * Reusable full-width visual canvas for the AI Quantum Vault.
 * Both the Left Door (0% - 50%) and Right Door (50% - 100%) render this
 * identical component within a 100vw container.
 * When closed, the two halves meet seamlessly at x = 50vw.
 * When unsealed, the doors slide left and right, physically splitting
 * the reactor core, HUD telemetry, and rings down the vertical seam!
 */
function VaultCanvas({ mousePos, isCracking }: { mousePos: { x: number; y: number }; isCracking: boolean }) {
  return (
    <div className="relative w-full h-full bg-[#030509] text-white select-none overflow-hidden">
      {/* 1. Deep Space Cybernetic Grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(91, 108, 255, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91, 108, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
        }}
      />

      {/* 2. Central Atmospheric Nebula Glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,750px)] h-[min(90vw,750px)] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(91, 108, 255, 0.22) 0%, rgba(77, 238, 234, 0.08) 35%, rgba(3, 5, 9, 0) 70%)',
        }}
      />

      {/* 3. Top-Left HUD Telemetry (Radar & Coordinates) */}
      <div className="absolute top-8 left-8 sm:top-12 sm:left-12 flex items-start gap-4 z-10 pointer-events-none">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#5b6cff]/30 flex items-center justify-center">
          <div className="absolute inset-1 rounded-full border border-dashed border-[#5b6cff]/20 animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-3 rounded-full border border-[#4deeea]/30 animate-[spin_10s_linear_infinite_reverse]" />
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#4deeea]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="absolute top-1/2 left-1/2 w-8 h-px bg-gradient-to-r from-transparent via-[#4deeea] to-transparent -translate-y-1/2 animate-[spin_4s_linear_infinite]" />
        </div>
        <div className="font-mono text-[9px] sm:text-[10px] text-white/50 tracking-wider space-y-1 pt-1">
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
      <div className="absolute top-8 right-8 sm:top-12 sm:right-12 text-right font-mono text-[9px] sm:text-[10px] text-white/50 tracking-wider space-y-1 z-10 pointer-events-none">
        <div className="flex items-center justify-end gap-1.5 text-[#5b6cff]">
          <Shield size={11} />
          <span className="font-semibold uppercase tracking-widest">CORE ENCRYPTION ACTIVE</span>
        </div>
        <p className="text-white/70">ARCH: AI & DATA SPECIALIZATION</p>
        <p>SECTOR: CHENNAI · INDIA</p>
        <p className="text-white/40">PROTOCOL: QUANTUM_UNSEAL</p>
      </div>

      {/* 5. Bottom Metadata Corners */}
      <div className="absolute bottom-8 left-8 sm:bottom-10 sm:left-12 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 z-10 pointer-events-none">
        <p className="text-[#5b6cff]/80">SUHAIL KHAN</p>
        <p className="text-white/30 text-[8px] tracking-[0.25em] mt-0.5">AI ENGINEER · FULL STACK</p>
      </div>
      <div className="absolute bottom-8 right-8 sm:bottom-10 sm:right-12 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 text-right z-10 pointer-events-none">
        <p className="text-white/70">RELEASE // 2026</p>
        <p className="text-white/30 text-[8px] tracking-[0.25em] mt-0.5">PORTFOLIO v2.0</p>
      </div>

      {/* 6. CENTER AI QUANTUM REACTOR CORE / IRIS */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x}px), calc(-50% + ${mousePos.y}px))`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[500px] md:h-[500px] flex items-center justify-center">
          {/* Ring 1 — Outer Dotted Cyber Track */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-[#5b6cff]/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#5b6cff] shadow-[0_0_10px_#5b6cff]" />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-[#4deeea] shadow-[0_0_10px_#4deeea]" />
            <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#5b6cff] shadow-[0_0_10px_#5b6cff]" />
            <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#4deeea] shadow-[0_0_10px_#4deeea]" />
          </motion.div>

          {/* Ring 2 — Middle Cyan/Blue Segmented Orbit */}
          <motion.div
            className="absolute inset-8 sm:inset-10 rounded-full border-2 border-transparent border-t-[#4deeea]/70 border-b-[#5b6cff]/70 border-l-[#5b6cff]/30"
            style={{
              filter: 'drop-shadow(0 0 14px rgba(77,238,234,0.35))',
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />

          {/* Ring 3 — Concentric Golden-Cyan Telemetry Ticks */}
          <motion.div
            className="absolute inset-16 sm:inset-20 rounded-full border border-[#5b6cff]/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-1 rounded-full border border-dotted border-white/20" />
          </motion.div>

          {/* Ring 4 — Aperture Swirl Lines (Spiraling Iris) */}
          <motion.svg
            className="absolute inset-12 sm:inset-14 w-[calc(100%-6rem)] h-[calc(100%-6rem)] sm:w-[calc(100%-7rem)] sm:h-[calc(100%-7rem)] opacity-40"
            viewBox="0 0 200 200"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <path
                key={deg}
                d="M 100 100 Q 130 60 160 80"
                fill="none"
                stroke="url(#irisGrad)"
                strokeWidth="1.2"
                transform={`rotate(${deg} 100 100)`}
              />
            ))}
            <defs>
              <linearGradient id="irisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4deeea" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#5b6cff" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Ring 5 — Central Obsidian Core with SK Monogram */}
          <motion.div
            className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center overflow-hidden border border-[#5b6cff]/60"
            style={{
              background:
                'radial-gradient(circle at 35% 35%, #161e33 0%, #0c1220 50%, #05080e 100%)',
              boxShadow: isCracking
                ? '0 0 60px rgba(77,238,234,0.9), inset 0 0 30px rgba(77,238,234,0.6)'
                : '0 0 35px rgba(91,108,255,0.45), inset 0 0 20px rgba(91,108,255,0.2)',
            }}
            animate={
              isCracking
                ? { scale: [1, 1.15, 1.05] }
                : { scale: [1, 1.025, 1] }
            }
            transition={{ duration: isCracking ? 0.35 : 3.5, repeat: isCracking ? 0 : Infinity, ease: 'easeInOut' }}
          >
            {/* Core Lens Flare */}
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />

            {/* Glowing Monogram */}
            <motion.span
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(180deg, #ffffff 0%, #9cb3ff 60%, #5b6cff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 16px rgba(91,108,255,0.75))',
              }}
            >
              SK
            </motion.span>

            {/* Micro Badge Label */}
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#4deeea] mt-1 font-semibold">
              QUANTUM AI CORE
            </span>

            {/* Subtle Pulse Core Dot */}
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#4deeea] mt-1.5 shadow-[0_0_8px_#4deeea]"
              animate={{ opacity: [0.4, 1, 0.4] }}
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

  // Parallax subtle float
  useEffect(() => {
    if (phase !== 'idle') return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) - 0.5) * 16;
      const y = ((e.clientY / window.innerHeight) - 0.5) * 16;
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

  // Trigger crack & split unseal
  const handleUnseal = useCallback(() => {
    if (phase !== 'idle') return;

    // Stage 1: Core breach & laser fissure (0.35s)
    setPhase('cracking');

    // Stage 2: Dual door curtain split (1.0s)
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
    }, 1320);
  }, [phase, onComplete]);

  // Input Listeners: Scroll, Touch swipe, Keys
  useEffect(() => {
    if (phase !== 'idle') return;

    // Scroll trigger (mouse wheel / trackpad)
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 6 || Math.abs(e.deltaX) > 6) {
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
      if (deltaY > 12) {
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
          LEFT CYBER-GATE (0% - 50%)
          Slides -100% horizontally to the left during unsealing
      ============================================================== */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden bg-[#030509] border-r border-[#5b6cff]/20 shadow-[10px_0_40px_rgba(0,0,0,0.95)] z-20"
        initial={{ x: 0 }}
        animate={isUnsealing ? { x: '-100%' } : { x: 0 }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Full-width Canvas anchored to Left: 0 */}
        <div className="absolute top-0 left-0 w-[100vw] h-full pointer-events-none">
          <VaultCanvas mousePos={mousePos} isCracking={isCracking} />
        </div>
      </motion.div>

      {/* ==============================================================
          RIGHT CYBER-GATE (50% - 100%)
          Slides +100% horizontally to the right during unsealing
      ============================================================== */}
      <motion.div
        className="absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden bg-[#030509] border-l border-[#5b6cff]/20 shadow-[-10px_0_40px_rgba(0,0,0,0.95)] z-20"
        initial={{ x: 0 }}
        animate={isUnsealing ? { x: '100%' } : { x: 0 }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Full-width Canvas anchored to Right: 0 */}
        <div className="absolute top-0 right-0 w-[100vw] h-full pointer-events-none">
          <VaultCanvas mousePos={mousePos} isCracking={isCracking} />
        </div>
      </motion.div>

      {/* ==============================================================
          CENTER VERTICAL LASER CRACK LINE (The Breach Moment)
      ============================================================== */}
      {/* 1. Subtle Resting Seam Line */}
      {!isCracking && !isUnsealing && (
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[#5b6cff]/35 to-transparent z-30 pointer-events-none" />
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
          Positioned below the core on the center axis
      ============================================================== */}
      <AnimatePresence>
        {!isCracking && !isUnsealing && (
          <motion.div
            key="unseal-btn"
            className="absolute left-1/2 -translate-x-1/2 top-[calc(50%+195px)] sm:top-[calc(50%+230px)] z-50 flex flex-col items-center gap-2"
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
              className="group relative px-6 py-2.5 rounded-full border border-[#5b6cff]/40 bg-[#0a0f1d]/90 hover:bg-[#10172e] hover:border-[#4deeea]/70 text-white transition-all shadow-[0_0_25px_rgba(91,108,255,0.25)] hover:shadow-[0_0_35px_rgba(77,238,234,0.45)] backdrop-blur-md flex items-center gap-2.5 cursor-pointer"
            >
              <Zap size={14} className="text-[#4deeea] group-hover:scale-110 transition-transform animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider font-medium text-white/90 group-hover:text-white">
                Scroll to Crack & Unseal
              </span>
              <ChevronDown size={14} className="text-white/50 group-hover:text-[#4deeea] animate-bounce" />
            </button>
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
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
