import { motion } from 'framer-motion';
import { Briefcase, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { internships } from '@/data/resume';

const internshipThemes = [
  {
    accent: '#6C7BFF',
    accentSoft: 'rgba(108, 123, 255, 0.14)',
    glow: 'rgba(108, 123, 255, 0.22)',
    border: 'rgba(108, 123, 255, 0.28)',
  },
  {
    accent: '#A855F7',
    accentSoft: 'rgba(168, 85, 247, 0.14)',
    glow: 'rgba(168, 85, 247, 0.22)',
    border: 'rgba(168, 85, 247, 0.28)',
  },
];

export function Internship() {
  return (
    <section
      id="internship"
      className="section relative isolate overflow-hidden"
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(8, 8, 12, 0.98) 0%,
              rgba(8, 8, 12, 0.92) 38%,
              rgba(8, 8, 12, 0.72) 68%,
              rgba(8, 8, 12, 0.48) 100%
            ),
            linear-gradient(
              180deg,
              rgba(8, 8, 12, 0.72) 0%,
              rgba(8, 8, 12, 0.94) 100%
            ),
            url('/images/internship-background.png')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* =========================================================
          AMBIENT COLOR FIELD
      ========================================================== */}

      <motion.div
        className="absolute -z-10 pointer-events-none"
        style={{
          width: '520px',
          height: '520px',
          right: '-120px',
          top: '5%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(108,123,255,0.14) 0%, rgba(108,123,255,0.05) 35%, transparent 70%)',
          filter: 'blur(20px)',
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
          width: '420px',
          height: '420px',
          left: '-180px',
          bottom: '0%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(168,85,247,0.11) 0%, rgba(168,85,247,0.04) 38%, transparent 72%)',
          filter: 'blur(25px)',
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
          CONTENT
      ========================================================== */}

      <div className="container-max relative z-10">
        <SectionHeading
          eyebrow="Internship"
          title="Hands-on experience, applied early."
        />

        <div className="relative pl-8">
          {/* =====================================================
              TIMELINE
          ====================================================== */}

          <div className="absolute left-[15px] top-2 bottom-2 w-px overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 w-full origin-top"
              style={{
                height: '100%',
                background:
                  'linear-gradient(180deg, rgba(108,123,255,0.75), rgba(168,85,247,0.65), rgba(255,255,255,0.08))',
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>

          {/* =====================================================
              INTERNSHIP ITEMS
          ====================================================== */}

          <div className="space-y-8">
            {internships.map((item, i) => {
              const theme =
                internshipThemes[i % internshipThemes.length];

              return (
                <motion.div
                  key={item.organization}
                  initial={{
                    opacity: 0,
                    x: i % 2 === 0 ? -35 : 35,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: '-80px',
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative"
                >
                  {/* =================================================
                      TIMELINE ICON
                  ================================================== */}

                  <motion.span
                    className="absolute -left-8 top-1 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: `linear-gradient(
                        145deg,
                        rgba(20,20,28,0.98),
                        rgba(12,12,17,0.96)
                      )`,
                      border: `1px solid ${theme.border}`,
                      color: theme.accent,
                      boxShadow: `0 0 25px ${theme.glow}`,
                    }}
                    initial={{
                      scale: 0,
                      rotate: -45,
                    }}
                    whileInView={{
                      scale: 1,
                      rotate: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.18 + 0.15,
                      type: 'spring',
                      stiffness: 180,
                      damping: 14,
                    }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 8,
                    }}
                  >
                    <Briefcase size={14} />
                  </motion.span>

                  {/* =================================================
                      INTERNSHIP CARD
                  ================================================== */}

                  <GlassCard className="relative overflow-hidden p-6 group">
                    {/* Card ambient glow */}
                    <motion.div
                      className="absolute pointer-events-none"
                      style={{
                        width: '280px',
                        height: '180px',
                        right: '-100px',
                        top: '-100px',
                        borderRadius: '50%',
                        background: `radial-gradient(
                          circle,
                          ${theme.glow} 0%,
                          transparent 70%
                        )`,
                        filter: 'blur(18px)',
                      }}
                      animate={{
                        scale: [1, 1.12, 1],
                        opacity: [0.55, 0.8, 0.55],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.5,
                      }}
                    />

                    {/* Top accent line */}
                    <motion.div
                      className="absolute left-0 top-0 h-[2px]"
                      style={{
                        background: `linear-gradient(
                          90deg,
                          ${theme.accent},
                          transparent
                        )`,
                      }}
                      initial={{ width: '0%' }}
                      whileInView={{ width: '65%' }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: i * 0.18 + 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Role */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold tracking-tight">
                            {item.role}
                          </h3>

                          {/* Organization */}
                          <motion.p
                            className="text-sm mt-1"
                            style={{
                              color: theme.accent,
                            }}
                            whileHover={{
                              x: 4,
                            }}
                          >
                            {item.organization}
                          </motion.p>
                        </div>

                        {/* Small visual marker */}
                        <motion.div
                          className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl"
                          style={{
                            background: theme.accentSoft,
                            border: `1px solid ${theme.border}`,
                            color: theme.accent,
                          }}
                          whileHover={{
                            scale: 1.1,
                            rotate: 8,
                          }}
                        >
                          <ArrowUpRight size={16} />
                        </motion.div>
                      </div>

                      {/* Responsibilities */}
                      <div className="mt-5">
                        <p
                          className="text-xs uppercase tracking-[0.16em] mb-2"
                          style={{
                            color: 'var(--color-text-faint)',
                          }}
                        >
                          Responsibilities
                        </p>

                        <ul className="space-y-2">
                          {item.responsibilities.map((r, index) => (
                            <motion.li
                              key={r}
                              className="text-sm leading-relaxed flex gap-2"
                              style={{
                                color: 'var(--color-text-muted)',
                              }}
                              initial={{
                                opacity: 0,
                                x: -10,
                              }}
                              whileInView={{
                                opacity: 1,
                                x: 0,
                              }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.45,
                                delay:
                                  i * 0.18 +
                                  0.45 +
                                  index * 0.08,
                              }}
                            >
                              <span
                                style={{
                                  color: theme.accent,
                                }}
                              >
                                —
                              </span>

                              <span>{r}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <motion.div
                        className="mt-5 flex flex-wrap gap-2"
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.18 + 0.65,
                        }}
                      >
                        {item.skillsLearned.map((skill, index) => (
                          <motion.span
                            key={skill}
                            className="text-xs px-3 py-1.5 rounded-full"
                            style={{
                              background:
                                index === 0
                                  ? theme.accentSoft
                                  : 'rgba(255,255,255,0.045)',
                              border:
                                index === 0
                                  ? `1px solid ${theme.border}`
                                  : '1px solid rgba(255,255,255,0.07)',
                              color:
                                index === 0
                                  ? theme.accent
                                  : 'var(--color-text-muted)',
                            }}
                            whileHover={{
                              y: -2,
                              scale: 1.03,
                            }}
                            transition={{
                              duration: 0.2,
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    {/* Hover border glow */}
                    <motion.div
                      className="absolute inset-0 rounded-[inherit] pointer-events-none"
                      style={{
                        border: `1px solid ${theme.border}`,
                        opacity: 0,
                      }}
                      whileHover={{
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    />
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}