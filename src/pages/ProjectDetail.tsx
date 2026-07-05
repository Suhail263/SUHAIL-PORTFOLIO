import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '@/data/resume';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

const FADE = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container-max">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm mb-10 opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>

        <motion.div {...FADE} transition={{ duration: 0.5 }}>
          <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>
            {project.year}
          </p>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold mt-2 max-w-3xl">{project.title}</h1>
          <p className="text-lg mt-4 max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {project.github && (
              <Button as="a" variant="ghost" href={project.github} target="_blank" rel="noreferrer" icon={<FaGithub size={16} />}>
                GitHub
              </Button>
            )}
            {project.demo && (
              <Button as="a" variant="primary" href={project.demo} target="_blank" rel="noreferrer" icon={<ExternalLink size={16} />}>
                Live Demo
              </Button>
            )}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          <motion.div {...FADE} transition={{ duration: 0.5, delay: 0.05 }}>
            <GlassCard className="p-6 h-full">
              <h2 className="text-sm tracking-wide uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
                Problem
              </h2>
              <p className="leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {project.problem}
              </p>
            </GlassCard>
          </motion.div>
          <motion.div {...FADE} transition={{ duration: 0.5, delay: 0.1 }}>
            <GlassCard className="p-6 h-full">
              <h2 className="text-sm tracking-wide uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
                Solution
              </h2>
              <p className="leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {project.solution}
              </p>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div {...FADE} transition={{ duration: 0.5, delay: 0.15 }} className="mt-6">
          <GlassCard className="p-6">
            <h2 className="text-sm tracking-wide uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
              Architecture
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {project.architecture}
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{ background: 'var(--glass-fill-strong)', color: 'var(--color-text-muted)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <motion.div {...FADE} transition={{ duration: 0.5, delay: 0.2 }}>
            <GlassCard className="p-6 h-full">
              <h2 className="text-sm tracking-wide uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
                Challenges
              </h2>
              <p className="leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {project.challenges}
              </p>
            </GlassCard>
          </motion.div>
          <motion.div {...FADE} transition={{ duration: 0.5, delay: 0.25 }}>
            <GlassCard className="p-6 h-full">
              <h2 className="text-sm tracking-wide uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
                Future Improvements
              </h2>
              <p className="leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {project.futureImprovements}
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
