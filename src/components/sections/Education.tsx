import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { education } from '@/data/resume';

const educationThemes = [
  {
    accent: '#38BDF8',
    soft: 'rgba(56, 189, 248, 0.13)',
    border: 'rgba(56, 189, 248, 0.28)',
    glow: 'rgba(56, 189, 248, 0.20)',
  },
  {
    accent: '#A78BFA',
    soft: 'rgba(167, 139, 250, 0.13)',
    border: 'rgba(167, 139, 250, 0.28)',
    glow: 'rgba(167, 139, 250, 0.20)',
  },
];

export function Education() {
  return (
    <section
      id="education"
      className="section relative isolate overflow-hidden"
    >
      {/* =========================================================
          BACKGROUND IMAGE
      ========================================================== */}

      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(5, 5, 10, 0.97) 0%,
              rgba(5, 5, 10, 0.86) 42%,
              rgba(5, 5, 10, 0.60) 72%,
              rgba(5, 5, 10, 0.45) 100%
            ),
            linear-gradient(
              to bottom,
              rgba(5, 5, 10, 0.70),
              rgba(5, 5, 10, 0.94)
            ),
            url('/images/education-background.png')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* =========================================================
          BLUE / PURPLE AMBIENT GLOW
      ========================================================== */}

      <motion.div
        className="absolute -z-10 pointer-events-none"
        style={{
          width: '520px',
          height: '520px',
          right: '-140px',
          top: '-100px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(56,189,248,0.14) 0%, rgba(56,189,248,0.05) 35%, transparent 70%)',
          filter: 'blur(25px)',
        }}
        animate={{
          x: [0, -25, 0],
          y: [0, 20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute -z-10 pointer-events-none"
        style={{
          width: '450px',
          height: '450px',
          left: '-180px',
          bottom: '-120px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.04) 38%, transparent 72%)',
          filter: 'blur(30px)',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          SMALL AMBIENT LIGHTS
      ========================================================== */}

      <motion.div
        className="absolute right-[18%] top-[22%] w-2 h-2 rounded-full pointer-events-none"
        style={{
          background: '#38BDF8',
          boxShadow: '0 0 22px rgba(56,189,248,0.8)',
        }}
        animate={{
          opacity: [0.25, 1, 0.25],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute left-[12%] bottom-[24%] w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{
          background: '#A78BFA',
          boxShadow: '0 0 18px rgba(167,139,250,0.8)',
        }}
        animate={{
          opacity: [0.2, 0.85, 0.2],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="container-max relative z-10">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation."
        />

        {/* =======================================================
            EDUCATION CARDS
        ======================================================== */}

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((item, i) => {
            const theme =
              educationThemes[i % educationThemes.length];

            return (
              <motion.div
                key={item.degree}
                initial={{
                  opacity: 0,
                  y: 25,
                  scale: 0.97,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  margin: '-60px',
                }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full"
              >
                {/* =================================================
                    CARD COLOR WRAPPER

                    Style is applied to normal div instead of
                    GlassCard, keeping TypeScript safe.
                ================================================== */}

                <div
                  className="
                    relative
                    h-full
                    rounded-2xl
                    transition-all
                    duration-500
                  "
                  style={{
                    border: `1px solid ${theme.border}`,
                    background: `
                      linear-gradient(
                        145deg,
                        rgba(255,255,255,0.055),
                        ${theme.soft}
                      )
                    `,
                    boxShadow:
                      `0 0 35px ${theme.glow}`,
                  }}
                >
                  <GlassCard
                    className="
                      relative
                      overflow-hidden
                      p-6
                      h-full
                      bg-transparent
                      border-transparent
                    "
                  >
                    {/* =============================================
                        TOP COLOR LINE
                    ============================================== */}

                    <motion.div
                      className="absolute left-0 top-0 h-[2px]"
                      style={{
                        background: `
                          linear-gradient(
                            90deg,
                            ${theme.accent},
                            transparent
                          )
                        `,
                        boxShadow:
                          `0 0 14px ${theme.glow}`,
                      }}
                      initial={{
                        width: '0%',
                      }}
                      whileInView={{
                        width: '70%',
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.15 + 0.25,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />

                    {/* =============================================
                        CARD AMBIENT GLOW
                    ============================================== */}

                    <motion.div
                      className="
                        absolute
                        pointer-events-none
                        -right-20
                        -top-20
                        w-48
                        h-48
                        rounded-full
                        blur-[55px]
                      "
                      style={{
                        background: theme.accent,
                        opacity: 0.08,
                      }}
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.06, 0.12, 0.06],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.5,
                      }}
                    />

                    {/* =============================================
                        EDUCATION ICON
                    ============================================== */}

                    <motion.div
                      className="
                        relative
                        z-10
                        w-11
                        h-11
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        mb-4
                      "
                      style={{
                        background: theme.soft,
                        color: theme.accent,
                        border: `1px solid ${theme.border}`,
                        boxShadow:
                          `0 0 22px ${theme.glow}`,
                      }}
                      initial={{
                        scale: 0,
                        rotate: -20,
                      }}
                      whileInView={{
                        scale: 1,
                        rotate: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.15 + 0.2,
                        type: 'spring',
                        stiffness: 180,
                        damping: 14,
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotate: 6,
                      }}
                    >
                      <GraduationCap size={20} />
                    </motion.div>

                    {/* =============================================
                        DEGREE
                    ============================================== */}

                    <h3 className="relative z-10 text-base font-semibold leading-snug">
                      {item.degree}
                    </h3>

                    {/* =============================================
                        INSTITUTION
                    ============================================== */}

                    {item.institution && (
                      <motion.p
                        className="relative z-10 text-sm mt-1.5"
                        style={{
                          color: theme.accent,
                        }}
                        whileHover={{
                          x: 4,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                      >
                        {item.institution}
                      </motion.p>
                    )}

                    {/* =============================================
                        PERIOD + DETAILS
                    ============================================== */}

                    <div
                      className="
                        relative
                        z-10
                        flex
                        flex-wrap
                        items-center
                        gap-3
                        mt-3
                        text-sm
                      "
                      style={{
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {item.period && (
                        <span>{item.period}</span>
                      )}

                      {item.period && (
                        <span
                          style={{
                            color: theme.accent,
                          }}
                        >
                          •
                        </span>
                      )}

                      <span>{item.detail}</span>
                    </div>

                    {/* =============================================
                        BOTTOM ACCENT
                    ============================================== */}

                    <motion.div
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-[2px]
                      "
                      style={{
                        background: `
                          linear-gradient(
                            90deg,
                            ${theme.accent},
                            transparent
                          )
                        `,
                        boxShadow:
                          `0 0 12px ${theme.glow}`,
                      }}
                      initial={{
                        width: '0%',
                      }}
                      whileInView={{
                        width: '45%',
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.15 + 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </GlassCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}