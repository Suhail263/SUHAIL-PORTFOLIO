"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface PortfolioIntroProps {
  onComplete?: () => void;
}

export function PortfolioIntro({ onComplete }: PortfolioIntroProps) {
  const [phase, setPhase] = useState<"intro" | "exit">("intro");

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setPhase("exit");
    }, 2800);

    const completeTimer = window.setTimeout(() => {
      onComplete?.();
    }, 3650);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "intro" && (
        <motion.div
          className="fixed inset-0 z-[99999] overflow-hidden bg-[#030405] text-white"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.25,
              ease: "easeOut",
            },
          }}
        >
          {/* =========================================================
              BACKGROUND BASE
          ========================================================= */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,#111522_0%,#080a0f_35%,#030405_72%)]" />

          {/* =========================================================
              LARGE ATMOSPHERIC LIGHT
          ========================================================= */}

          <motion.div
            className="absolute left-1/2 top-1/2 h-[55vw] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(86,100,255,0.12) 0%, rgba(86,100,255,0.045) 28%, transparent 68%)",
              filter: "blur(45px)",
            }}
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: [0, 1, 0.75],
              scale: [0.7, 1.08, 1],
            }}
            transition={{
              duration: 3.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* =========================================================
              SECONDARY LIGHT
          ========================================================= */}

          <motion.div
            className="absolute left-[18%] top-[22%] h-[28rem] w-[28rem] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.035), transparent 68%)",
              filter: "blur(50px)",
            }}
            animate={{
              x: [0, 80, 20, 0],
              y: [0, -40, 30, 0],
              opacity: [0.15, 0.3, 0.18, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* =========================================================
              ARCHITECTURAL GRID
          ========================================================= */}

          <motion.div
            className="absolute inset-0 opacity-[0.13]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)
              `,
              backgroundSize: "90px 90px",
              maskImage:
                "radial-gradient(circle at center, black 0%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 0%, transparent 72%)",
            }}
            initial={{
              opacity: 0,
              scale: 1.15,
            }}
            animate={{
              opacity: 0.13,
              scale: 1,
            }}
            transition={{
              duration: 2.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* =========================================================
              CENTER VERTICAL AXIS
          ========================================================= */}

          <motion.div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.055]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* =========================================================
              CENTER HORIZONTAL AXIS
          ========================================================= */}

          <motion.div
            className="absolute left-0 top-1/2 h-px w-full bg-white/[0.035]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* =========================================================
              DIAGONAL LIGHT BEAM
          ========================================================= */}

          <motion.div
            className="absolute -left-[20%] top-[20%] h-px w-[140%] rotate-[-24deg] bg-gradient-to-r from-transparent via-[#6675ff]/20 to-transparent"
            initial={{
              x: "-30%",
              opacity: 0,
            }}
            animate={{
              x: "30%",
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3.5,
              delay: 0.4,
              ease: "easeInOut",
            }}
          />

          {/* =========================================================
              MOVING SCAN LIGHT
          ========================================================= */}

          <motion.div
            className="absolute left-0 top-0 h-full w-[18%]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.025), transparent)",
              filter: "blur(12px)",
            }}
            animate={{
              x: ["-30vw", "130vw"],
            }}
            transition={{
              duration: 4.5,
              delay: 0.6,
              ease: "easeInOut",
            }}
          />

          {/* =========================================================
              FLOATING PARTICLES
          ========================================================= */}

          {[...Array(18)].map((_, index) => {
            const positions = [
              [12, 22],
              [24, 67],
              [32, 18],
              [41, 79],
              [54, 14],
              [63, 72],
              [71, 27],
              [82, 62],
              [90, 35],
              [17, 48],
              [29, 88],
              [47, 31],
              [58, 91],
              [76, 83],
              [87, 17],
              [8, 76],
              [68, 52],
              [37, 54],
            ];

            const [left, top] = positions[index];

            return (
              <motion.span
                key={index}
                className="absolute h-[2px] w-[2px] rounded-full bg-white/30"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 0.45, 0],
                  scale: [0.5, 1, 0.5],
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 2.5 + (index % 4) * 0.6,
                  delay: index * 0.08,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* =========================================================
              FILM GRAIN
          ========================================================= */}

          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.8'/%3E%3C/svg%3E\")",
            }}
          />

          {/* =========================================================
              VIGNETTE
          ========================================================= */}

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,0.5) 100%)",
            }}
          />

          {/* =========================================================
              CORNER INFORMATION
          ========================================================= */}

          <motion.div
            className="absolute left-8 top-8 text-[9px] uppercase tracking-[0.38em] text-white/30 md:left-10 md:top-9"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
            }}
          >
            SUHAIL KHAN
          </motion.div>

          <motion.div
            className="absolute right-8 top-8 text-[9px] uppercase tracking-[0.38em] text-white/30 md:right-10 md:top-9"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
            }}
          >
            2026
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-8 text-[9px] uppercase tracking-[0.35em] text-white/25 md:left-10 md:bottom-9"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
          >
            AI · DATA · ENGINEERING
          </motion.div>

          <motion.div
            className="absolute bottom-8 right-8 text-[9px] uppercase tracking-[0.35em] text-white/25 md:right-10 md:bottom-9"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
          >
            PORTFOLIO / 01
          </motion.div>

          {/* =========================================================
              MAIN TITLE
          ========================================================= */}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex w-full flex-col items-center">

              {/* TOP WORD */}
              <motion.div
                className="relative z-20 select-none whitespace-nowrap font-[var(--font-display)] text-[clamp(3.2rem,10vw,10rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em] text-white"
                initial={{
                  y: "-70vh",
                  opacity: 0,
                  scale: 0.92,
                  filter: "blur(10px)",
                }}
                animate={{
                  y: "-0.10em",
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.55,
                  delay: 0.15,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                SUHAIL'S
              </motion.div>

              {/* =====================================================
                  CENTER ENERGY LINE
              ===================================================== */}

              <div className="relative z-30 my-6 flex items-center justify-center">
                <motion.div
                  className="h-px bg-white/15"
                  initial={{ width: 0 }}
                  animate={{ width: "min(26rem, 38vw)" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.95,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />

                <motion.div
                  className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#6877ff]"
                  style={{
                    boxShadow:
                      "0 0 18px rgba(104,119,255,0.7)",
                  }}
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 1.45,
                  }}
                />
              </div>

              {/* BOTTOM WORD */}
              <motion.div
                className="relative z-20 select-none whitespace-nowrap font-[var(--font-display)] text-[clamp(3.2rem,10vw,10rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em] text-white"
                initial={{
                  y: "70vh",
                  opacity: 0,
                  scale: 0.92,
                  filter: "blur(10px)",
                }}
                animate={{
                  y: "0.10em",
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.55,
                  delay: 0.15,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                PORTFOLIO
              </motion.div>
            </div>
          </div>

          {/* =========================================================
              SUBTITLE
          ========================================================= */}

          <motion.div
            className="absolute left-1/2 top-[76%] -translate-x-1/2 text-center"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 1.65,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p className="text-[9px] uppercase tracking-[0.5em] text-white/35">
              AI ENGINEER · FULL STACK DEVELOPER
            </p>
          </motion.div>

          {/* =========================================================
              BOTTOM ACCENT
          ========================================================= */}

          <motion.div
            className="absolute bottom-[13%] left-1/2 h-px -translate-x-1/2 bg-[#6877ff]"
            initial={{
              width: 0,
              opacity: 0,
            }}
            animate={{
              width: "4rem",
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* =========================================================
              CINEMATIC EXIT WIPE
          ========================================================= */}

          <motion.div
            className="absolute inset-0 z-[100] pointer-events-none bg-white"
            initial={{
              clipPath: "inset(50% 0 50% 0)",
            }}
            animate={{
              clipPath: [
                "inset(50% 0 50% 0)",
                "inset(48% 0 48% 0)",
                "inset(0% 0 0% 0)",
              ],
            }}
            transition={{
              duration: 0.9,
              delay: 2.78,
              times: [0, 0.18, 1],
              ease: [0.76, 0, 0.24, 1],
            }}
          />

          {/* =========================================================
              FINAL NAME
          ========================================================= */}

          <motion.div
            className="absolute inset-0 z-[110] flex items-center justify-center pointer-events-none"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: [0, 0, 1, 0],
              scale: [0.95, 0.95, 1, 1.05],
            }}
            transition={{
              duration: 0.85,
              delay: 2.8,
              times: [0, 0.35, 0.55, 1],
            }}
          >
            <span className="text-[clamp(1rem,2vw,1.4rem)] font-medium uppercase tracking-[0.5em] text-black">
              SUHAIL KHAN
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}