import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { projects } from '@/data/resume';

export function Projects() {
  return (
    <section
      id="projects"
      className="section relative overflow-hidden bg-[#050509]"
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/projects-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* =====================================================
          DARK OVERLAY
      ====================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(5, 5, 9, 0.96) 0%,
              rgba(5, 5, 9, 0.88) 35%,
              rgba(5, 5, 9, 0.70) 70%,
              rgba(5, 5, 9, 0.52) 100%
            ),
            linear-gradient(
              180deg,
              rgba(5, 5, 9, 0.68) 0%,
              rgba(5, 5, 9, 0.24) 50%,
              rgba(5, 5, 9, 0.94) 100%
            )
          `,
        }}
      />

      {/* =====================================================
          COLORFUL ATMOSPHERE
      ====================================================== */}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at 78% 30%,
              rgba(99, 102, 241, 0.16),
              transparent 35%
            ),
            radial-gradient(
              circle at 18% 65%,
              rgba(34, 211, 238, 0.08),
              transparent 30%
            ),
            radial-gradient(
              circle at 55% 80%,
              rgba(236, 72, 153, 0.08),
              transparent 32%
            ),
            radial-gradient(
              circle at 92% 70%,
              rgba(249, 115, 22, 0.07),
              transparent 28%
            )
          `,
        }}
      />

      {/* =====================================================
          PURPLE FLOATING LIGHT
      ====================================================== */}

      <motion.div
        className="absolute right-[12%] top-[18%] w-2 h-2 rounded-full pointer-events-none"
        style={{
          background: '#a78bfa',
          boxShadow: '0 0 22px #a78bfa',
        }}
        animate={{
          y: [0, 25, 0],
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.35, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =====================================================
          CYAN FLOATING LIGHT
      ====================================================== */}

      <motion.div
        className="absolute left-[25%] top-[42%] w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{
          background: '#22d3ee',
          boxShadow: '0 0 18px #22d3ee',
        }}
        animate={{
          x: [0, 25, 0],
          opacity: [0.25, 0.9, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =====================================================
          PINK FLOATING LIGHT
      ====================================================== */}

      <motion.div
        className="absolute right-[32%] bottom-[25%] w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{
          background: '#f472b6',
          boxShadow: '0 0 18px #f472b6',
        }}
        animate={{
          y: [0, -22, 0],
          opacity: [0.25, 0.85, 0.25],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =====================================================
          ORANGE FLOATING LIGHT
      ====================================================== */}

      <motion.div
        className="absolute right-[8%] bottom-[32%] w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{
          background: '#fb923c',
          boxShadow: '0 0 18px #fb923c',
        }}
        animate={{
          x: [0, -18, 0],
          opacity: [0.2, 0.75, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =====================================================
          COLORFUL LIGHT STREAK
      ====================================================== */}

      <motion.div
        className="absolute right-[-5%] top-[32%] w-[50%] h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(236,72,153,0.35), transparent)',
          boxShadow:
            '0 0 25px rgba(99,102,241,0.3)',
          rotate: -10,
        }}
        animate={{
          x: [0, -35, 0],
          opacity: [0.25, 0.65, 0.25],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="container-max relative z-10">

        {/* ===================================================
            SECTION HEADING
        ==================================================== */}

        <motion.div
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
            duration: 0.7,
          }}
        >
          <SectionHeading
            eyebrow="Projects"
            title="Things I've built end to end."
            description="Each one opens into a full breakdown — problem, solution, architecture, and what I'd improve next."
          />
        </motion.div>

        {/* ===================================================
            PROJECT CARDS
        ==================================================== */}

        <div className="grid md:grid-cols-3 gap-6">

          {projects.map((project, i) => {

            /* ================================================
               CARD COLOR
            ================================================= */

            const accents = [
              {
                color: '#22d3ee',
                border: 'rgba(34, 211, 238, 0.28)',
                background: 'rgba(34, 211, 238, 0.055)',
                glow: 'rgba(34, 211, 238, 0.18)',
              },
              {
                color: '#a78bfa',
                border: 'rgba(167, 139, 250, 0.28)',
                background: 'rgba(167, 139, 250, 0.055)',
                glow: 'rgba(167, 139, 250, 0.18)',
              },
              {
                color: '#f472b6',
                border: 'rgba(244, 114, 182, 0.28)',
                background: 'rgba(244, 114, 182, 0.055)',
                glow: 'rgba(244, 114, 182, 0.18)',
              },
            ];

            const accent = accents[i % accents.length];

            return (
              <motion.div
                key={project.slug}
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
                  margin: '-60px',
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                }}
              >

                <Link
                  to={`/projects/${project.slug}`}
                  className="block h-full"
                >

                  {/* =================================================
                      COLOR WRAPPER
                  ================================================== */}

                  <div
                    className="
                      h-full
                      rounded-2xl
                      transition-all
                      duration-300
                    "
                    style={{
                      border: `1px solid ${accent.border}`,
                      background: `
                        linear-gradient(
                          145deg,
                          rgba(255,255,255,0.055),
                          ${accent.background}
                        )
                      `,
                      boxShadow:
                        `0 0 0 rgba(0,0,0,0)`,
                    }}
                  >

                    {/* =================================================
                        TILT CARD
                    ================================================== */}

                    <TiltCard
                      className="
                        relative
                        overflow-hidden
                        p-6
                        h-full
                        min-h-[220px]
                        flex
                        flex-col
                        justify-between
                        group
                        backdrop-blur-xl
                        border-transparent
                        bg-transparent
                        transition-all
                        duration-300
                      "
                    >

                      {/* =================================================
                          CARD COLOR GLOW
                      ================================================== */}

                      <div
                        className="
                          absolute
                          -right-16
                          -top-16
                          w-40
                          h-40
                          rounded-full
                          blur-[65px]
                          pointer-events-none
                          opacity-40
                          group-hover:opacity-75
                          transition-opacity
                          duration-500
                        "
                        style={{
                          background: accent.color,
                        }}
                      />

                      {/* =================================================
                          TOP COLOR LINE
                      ================================================== */}

                      <motion.div
                        className="
                          absolute
                          top-0
                          left-0
                          h-[2px]
                          rounded-full
                        "
                        style={{
                          background: `
                            linear-gradient(
                              90deg,
                              ${accent.color},
                              transparent
                            )
                          `,
                          boxShadow:
                            `0 0 15px ${accent.glow}`,
                        }}
                        initial={{
                          width: '20%',
                          opacity: 0.5,
                        }}
                        whileHover={{
                          width: '100%',
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.45,
                        }}
                      />

                      {/* =================================================
                          PROJECT DETAILS
                      ================================================== */}

                      <div className="relative">

                        {/* YEAR + ARROW */}

                        <div className="flex items-start justify-between gap-3">

                          <p className="text-xs text-white/45">
                            {project.year}
                          </p>

                          <ArrowUpRight
                            size={18}
                            style={{
                              color: accent.color,
                            }}
                            className="
                              opacity-60
                              group-hover:opacity-100
                              group-hover:translate-x-1
                              group-hover:-translate-y-1
                              transition-all
                              duration-300
                            "
                          />

                        </div>

                        {/* =================================================
                            PROJECT TITLE
                        ================================================== */}

                        <h3
                          className="
                            text-lg
                            font-semibold
                            mt-3
                            text-white
                            transition-colors
                            duration-300
                          "
                        >
                          {project.title}
                        </h3>

                        {/* =================================================
                            PROJECT DESCRIPTION
                        ================================================== */}

                        <p className="text-sm mt-3 leading-relaxed text-white/60">
                          {project.summary}
                        </p>

                      </div>

                      {/* =================================================
                          TECH STACK
                      ================================================== */}

                      <div className="relative flex flex-wrap gap-2 mt-6">

                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="
                              text-xs
                              px-3
                              py-1.5
                              rounded-full
                              transition-all
                              duration-300
                            "
                            style={{
                              border:
                                `1px solid ${accent.border}`,
                              background:
                                accent.background,
                              color:
                                accent.color,
                            }}
                          >
                            {tech}
                          </span>
                        ))}

                      </div>

                      {/* =================================================
                          BOTTOM ACCENT
                      ================================================== */}

                      <motion.div
                        className="
                          absolute
                          bottom-0
                          left-0
                          h-[2px]
                          rounded-full
                        "
                        style={{
                          background: `
                            linear-gradient(
                              90deg,
                              ${accent.color},
                              transparent
                            )
                          `,
                          boxShadow:
                            `0 0 12px ${accent.glow}`,
                        }}
                        initial={{
                          width: '0%',
                        }}
                        whileHover={{
                          width: '65%',
                        }}
                        transition={{
                          duration: 0.45,
                        }}
                      />

                    </TiltCard>

                  </div>

                </Link>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default Projects;