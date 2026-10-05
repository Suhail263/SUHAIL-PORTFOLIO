import { useRef } from 'react';

import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { useCountUp } from '@/hooks/useCountUp';
import { projects, certificates, education } from '@/data/resume';

/* =========================================================
   STATS
   ========================================================= */

const STATS = [
  {
    label: 'Projects Built',
    value: projects.length,
  },
  {
    label: 'Certifications',
    value: certificates.length,
  },
  {
    label: 'CGPA',
    value: 7.67,
    isDecimal: true,
  },
  {
    label: 'Years Studying AI & DS',
    value: new Date().getFullYear() - 2023,
  },
];

/* =========================================================
   STAT COLORS
   ========================================================= */

const STAT_COLORS = [
  {
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.45)',
  },
  {
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.45)',
  },
  {
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.45)',
  },
  {
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.45)',
  },
];

/* =========================================================
   TIMELINE
   ========================================================= */

const TIMELINE = [
  {
    year: '2023',
    label:
      'Began B.Tech in Computer Science Engineering (Data Science & AI)',
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.45)',
  },
  {
    year: '2024',
    label:
      'Completed internships and multiple foundational certifications in Python, AI, and Cloud',
    color: '#c084fc',
    glow: 'rgba(192,132,252,0.45)',
  },
  {
    year: '2025',
    label:
      'Built independent projects spanning web apps, automation, and data analytics',
    color: '#fb923c',
    glow: 'rgba(251,146,60,0.45)',
  },
  {
    year: '2027',
    label: `Graduating — ${education[0].detail}`,
    color: '#34d399',
    glow: 'rgba(52,211,153,0.45)',
  },
];

/* =========================================================
   STAT COMPONENT
   ========================================================= */

function Stat({
  label,
  value,
  isDecimal,
  index,
}: {
  label: string;
  value: number;
  isDecimal?: boolean;
  index: number;
}) {
  const { ref, value: animated } = useCountUp(
    isDecimal ? value * 100 : value,
  );

  const display = isDecimal
    ? (animated / 100).toFixed(2)
    : animated;

  const accent = STAT_COLORS[index];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
        filter: 'blur(8px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{
        once: true,
        margin: '-80px',
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative"
    >
      {/* subtle color atmosphere */}

      <div
        className="absolute -left-8 -top-8 h-24 w-24 rounded-full blur-3xl opacity-0 transition-opacity duration-500 hover:opacity-40 pointer-events-none"
        style={{
          background: accent.color,
        }}
      />

      <p
        className="relative text-3xl md:text-4xl font-semibold text-white"
        style={{
          fontFamily: 'var(--font-display)',
          textShadow: `0 0 24px ${accent.glow}`,
        }}
      >
        <span ref={ref}>{display}</span>
        {label === 'CGPA' ? '' : '+'}
      </p>

      <p
        className="text-sm mt-1"
        style={{
          color: 'var(--color-text-muted)',
        }}
      >
        {label}
      </p>

      {/* colored indicator */}

      <motion.div
        className="mt-3 h-[2px] rounded-full"
        style={{
          background: `linear-gradient(
            90deg,
            ${accent.color},
            transparent
          )`,
          boxShadow: `0 0 10px ${accent.glow}`,
        }}
        initial={{
          width: 20,
          opacity: 0.5,
        }}
        whileInView={{
          width: 48,
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.6,
          delay: 0.25,
        }}
      />
    </motion.div>
  );
}

/* =========================================================
   ABOUT
   ========================================================= */

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);

  /* =======================================================
     SECTION PARALLAX
     ======================================================= */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ['-8%', '8%'],
  );

  const backgroundScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.08, 1.16],
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section relative overflow-hidden bg-[var(--color-bg)]"
    >

      {/* ===================================================
          BACKGROUND IMAGE
          =================================================== */}

      <motion.div
        className="absolute inset-[-8%] pointer-events-none"
        style={{
          y: backgroundY,
          scale: backgroundScale,
          backgroundImage:
            "url('/images/about-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* ===================================================
          DARK OVERLAY
          =================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(7, 8, 15, 0.94) 0%,
              rgba(7, 8, 15, 0.86) 34%,
              rgba(7, 8, 15, 0.66) 64%,
              rgba(7, 8, 15, 0.48) 100%
            ),
            linear-gradient(
              180deg,
              rgba(7, 8, 15, 0.72) 0%,
              rgba(7, 8, 15, 0.18) 48%,
              rgba(7, 8, 15, 0.96) 100%
            )
          `,
        }}
      />

      {/* ===================================================
          COLORFUL ATMOSPHERE
          =================================================== */}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: useTransform(
            scrollYProgress,
            [0, 0.5, 1],
            [0.65, 0.9, 0.65],
          ),

          background: `
            radial-gradient(
              circle at 78% 28%,
              rgba(99,102,241,0.18),
              transparent 32%
            ),
            radial-gradient(
              circle at 18% 58%,
              rgba(34,211,238,0.08),
              transparent 30%
            ),
            radial-gradient(
              circle at 82% 76%,
              rgba(236,72,153,0.10),
              transparent 30%
            ),
            radial-gradient(
              circle at 45% 90%,
              rgba(34,197,94,0.06),
              transparent 26%
            )
          `,
        }}
      />

      {/* ===================================================
          COLOR LIGHT STREAKS
          =================================================== */}

      <motion.div
        className="absolute right-[-12%] top-[15%] w-[55%] h-[1px] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(99,102,241,0.55), rgba(236,72,153,0.4), transparent)',
          boxShadow:
            '0 0 25px rgba(99,102,241,0.35)',
          rotate: -12,
        }}
        animate={{
          opacity: [0.25, 0.65, 0.25],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute left-[-10%] bottom-[20%] w-[45%] h-[1px] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(34,211,238,0.45), rgba(34,197,94,0.25), transparent)',
          boxShadow:
            '0 0 22px rgba(34,211,238,0.25)',
          rotate: 14,
        }}
        animate={{
          opacity: [0.2, 0.55, 0.2],
          x: [0, 25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* ===================================================
          COLOR ORBS
          =================================================== */}

      <motion.div
        className="absolute right-[10%] top-[25%] w-2 h-2 rounded-full pointer-events-none"
        style={{
          background: '#818cf8',
          boxShadow: '0 0 20px #818cf8',
        }}
        animate={{
          y: [0, 30, 0],
          opacity: [0.35, 1, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute right-[25%] top-[65%] w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{
          background: '#f472b6',
          boxShadow: '0 0 18px #f472b6',
        }}
        animate={{
          y: [0, -25, 0],
          opacity: [0.25, 0.9, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      <motion.div
        className="absolute left-[8%] top-[42%] w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{
          background: '#22d3ee',
          boxShadow: '0 0 18px #22d3ee',
        }}
        animate={{
          x: [0, 20, 0],
          opacity: [0.25, 0.8, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      />

      {/* ===================================================
          MAIN CONTENT
          =================================================== */}

      <div className="container-max relative z-10">

        {/* =================================================
            SECTION HEADING
            ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 45,
            filter: 'blur(12px)',
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          viewport={{
            once: true,
            margin: '-100px',
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <SectionHeading
            eyebrow="About"
            title="Grounded in fundamentals, driven by curiosity."
            description="I'm a Computer Science student specializing in Data Science & AI, focused on turning theory into software that actually works. My goal is a Graduate Engineering Trainee role where I can apply what I've learned to real problems — and keep learning fast alongside a team."
          />
        </motion.div>

        {/* =================================================
            MISSION + VISION + TIMELINE
            ================================================= */}

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* =================================================
              LEFT COLUMN
              ================================================= */}

          <div className="space-y-6">

            {/* =================================================
                MISSION
                ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -55,
                scale: 0.96,
                filter: 'blur(8px)',
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
                filter: 'blur(0px)',
              }}
              whileHover={{
                y: -5,
              }}
              viewport={{
                once: true,
                margin: '-80px',
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <GlassCard
                className="
                  relative
                  overflow-hidden
                  p-6
                  border
                  border-cyan-400/20
                  bg-[rgba(8,20,30,0.58)]
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:border-cyan-400/60
                "
              >

                {/* Mission glow */}

                <div
                  className="absolute -right-16 -top-16 w-40 h-40 rounded-full blur-[65px] pointer-events-none"
                  style={{
                    background:
                      'rgba(34,211,238,0.13)',
                  }}
                />

                <div className="relative">

                  <h3
                    className="text-sm tracking-wide uppercase mb-3"
                    style={{
                      color: '#22d3ee',
                      textShadow:
                        '0 0 18px rgba(34,211,238,0.4)',
                    }}
                  >
                    Mission
                  </h3>

                  <p className="text-base leading-relaxed text-white/70">
                    Apply data analytics, machine learning, and solid engineering
                    practice to build software that solves real problems — not
                    just demos.
                  </p>

                  <div
                    className="mt-5 h-[2px] w-16 rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, #22d3ee, transparent)',
                      boxShadow:
                        '0 0 12px rgba(34,211,238,0.45)',
                    }}
                  />

                </div>
              </GlassCard>
            </motion.div>

            {/* =================================================
                VISION
                ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -55,
                scale: 0.96,
                filter: 'blur(8px)',
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
                filter: 'blur(0px)',
              }}
              whileHover={{
                y: -5,
              }}
              viewport={{
                once: true,
                margin: '-80px',
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <GlassCard
                className="
                  relative
                  overflow-hidden
                  p-6
                  border
                  border-fuchsia-400/20
                  bg-[rgba(25,10,28,0.58)]
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:border-fuchsia-400/60
                "
              >

                {/* Vision glow */}

                <div
                  className="absolute -right-16 -top-16 w-40 h-40 rounded-full blur-[65px] pointer-events-none"
                  style={{
                    background:
                      'rgba(236,72,153,0.14)',
                  }}
                />

                <div className="relative">

                  <h3
                    className="text-sm tracking-wide uppercase mb-3"
                    style={{
                      color: '#e879f9',
                      textShadow:
                        '0 0 18px rgba(232,121,249,0.4)',
                    }}
                  >
                    Vision
                  </h3>

                  <p className="text-base leading-relaxed text-white/70">
                    Grow into an engineer who's equally comfortable in the data
                    layer and the product layer — someone a team trusts with both
                    the model and the interface.
                  </p>

                  <div
                    className="mt-5 h-[2px] w-16 rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, #e879f9, transparent)',
                      boxShadow:
                        '0 0 12px rgba(232,121,249,0.45)',
                    }}
                  />

                </div>
              </GlassCard>
            </motion.div>

          </div>

          {/* =================================================
              RIGHT COLUMN — TIMELINE
              ================================================= */}

          <div className="relative pl-8">

            {/* =================================================
                TIMELINE LINE
                ================================================= */}

            <motion.div
              className="absolute left-[7px] top-1 bottom-1 w-px origin-top"
              initial={{
                scaleY: 0,
              }}
              whileInView={{
                scaleY: 1,
              }}
              viewport={{
                once: true,
                margin: '-100px',
              }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                background:
                  'linear-gradient(to bottom, #38bdf8, #c084fc, #fb923c, #34d399, transparent)',
                boxShadow:
                  '0 0 12px rgba(99,102,241,0.25)',
              }}
            />

            <div className="space-y-8">

              {TIMELINE.map((item, i) => (

                <motion.div
                  key={item.year}
                  initial={{
                    opacity: 0,
                    x: 35,
                    filter: 'blur(7px)',
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    filter: 'blur(0px)',
                  }}
                  viewport={{
                    once: true,
                    margin: '-60px',
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25 + i * 0.16,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative"
                >

                  {/* =================================================
                      TIMELINE DOT
                      ================================================= */}

                  <motion.span
                    className="absolute -left-[35px] top-1.5 w-3 h-3 rounded-full"
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    whileInView={{
                      scale: 1,
                      opacity: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.35 + i * 0.16,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      background: item.color,
                      boxShadow: `
                        0 0 0 4px ${item.glow.replace(
                          '0.45',
                          '0.12',
                        )},
                        0 0 20px ${item.glow}
                      `,
                    }}
                  />

                  {/* =================================================
                      YEAR
                      ================================================= */}

                  <motion.p
                    className="text-sm font-semibold"
                    style={{
                      color: item.color,
                      textShadow: `0 0 16px ${item.glow}`,
                    }}
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: 0.4 + i * 0.16,
                    }}
                  >
                    {item.year}
                  </motion.p>

                  {/* =================================================
                      DESCRIPTION
                      ================================================= */}

                  <p className="text-sm mt-1 leading-relaxed text-white/65">
                    {item.label}
                  </p>

                </motion.div>

              ))}

            </div>
          </div>
        </div>

        {/* =======================================================
            STATS
            ======================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: '-80px',
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative
            grid
            grid-cols-2
            md:grid-cols-4
            gap-8
            mt-16
            pt-10
            border-t
            border-white/10
          "
        >

          {/* colorful divider */}

          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, #ec4899, #6366f1, #22c55e, #f59e0b)',
              boxShadow:
                '0 0 15px rgba(99,102,241,0.25)',
            }}
          />

          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.25 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Stat
                {...stat}
                index={index}
              />
            </motion.div>
          ))}

        </motion.div>

      </div>
    </section>
  );
}

export default About;