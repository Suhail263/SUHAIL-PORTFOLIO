import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { projects } from '@/data/resume';

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container-max">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built end to end."
          description="Each one opens into a full breakdown — problem, solution, architecture, and what I'd improve next."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link to={`/projects/${project.slug}`}>
                <TiltCard className="p-6 h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>
                        {project.year}
                      </p>
                      <ArrowUpRight
                        size={16}
                        className="opacity-40 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--color-accent)' }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-2">{project.title}</h3>
                    <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      {project.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: 'var(--glass-fill-strong)', color: 'var(--color-text-muted)' }}
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
