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
      className="section relative overflow-hidden bg-[#030814]"
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/projects-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* DARK OVERLAY */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(3, 8, 20, 0.97) 0%,
              rgba(3, 8, 20, 0.92) 35%,
              rgba(3, 8, 20, 0.78) 70%,
              rgba(3, 8, 20, 0.65) 100%
            ),
            linear-gradient(
              180deg,
              rgba(3, 8, 20, 0.65) 0%,
              rgba(3, 8, 20, 0.30) 50%,
              rgba(3, 8, 20, 0.92) 100%
            )
          `,
        }}
      />

      {/* BLUE GLOW */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 78% 35%, rgba(0, 140, 255, 0.14), transparent 45%)',
        }}
      />

      {/* MAIN CONTENT */}
      <div className="container-max relative z-10">
        {/* SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            eyebrow="Projects"
            title="Things I've built end to end."
            description="Each one opens into a full breakdown — problem, solution, architecture, and what I'd improve next."
          />
        </motion.div>

        {/* PROJECT CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
              }}
            >
              <Link
                to={`/projects/${project.slug}`}
                className="block h-full"
              >
                <TiltCard className="p-6 h-full min-h-[220px] flex flex-col justify-between group border border-cyan-400/15 bg-[#071327]/80 backdrop-blur-xl hover:border-cyan-400/50 hover:bg-[#0b1d38]/90 transition-all duration-300">
                  {/* PROJECT DETAILS */}
                  <div>
                    {/* YEAR + ARROW */}
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs text-white/40">
                        {project.year}
                      </p>

                      <ArrowUpRight
                        size={18}
                        className="text-cyan-400 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                      />
                    </div>

                    {/* PROJECT TITLE */}
                    <h3 className="text-lg font-semibold mt-3 text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* PROJECT DESCRIPTION */}
                    <p className="text-sm mt-3 leading-relaxed text-white/60">
                      {project.summary}
                    </p>
                  </div>

                  {/* TECH STACK */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1.5 rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-100/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}