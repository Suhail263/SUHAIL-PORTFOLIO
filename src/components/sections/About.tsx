import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { useCountUp } from '@/hooks/useCountUp';
import { projects, certificates, education } from '@/data/resume';

const STATS = [
  { label: 'Projects Built', value: projects.length },
  { label: 'Certifications', value: certificates.length },
  { label: 'CGPA', value: 7.67, isDecimal: true },
  { label: 'Years Studying AI & DS', value: new Date().getFullYear() - 2023 },
];

function Stat({ label, value, isDecimal }: { label: string; value: number; isDecimal?: boolean }) {
  const { ref, value: animated } = useCountUp(isDecimal ? value * 100 : value);
  const display = isDecimal ? (animated / 100).toFixed(2) : animated;

  return (
    <div>
      <p className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
        <span ref={ref}>{display}</span>
        {label === 'CGPA' ? '' : '+'}
      </p>
      <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </p>
    </div>
  );
}

const TIMELINE = [
  { year: '2023', label: 'Began B.Tech in Computer Science Engineering (Data Science & AI)' },
  { year: '2024', label: 'Completed internships and multiple foundational certifications in Python, AI, and Cloud' },
  { year: '2025', label: 'Built independent projects spanning web apps, automation, and data analytics' },
  { year: '2027', label: `Graduating — ${education[0].detail}` },
];

export function About() {
  return (
    <section id="about" className="section relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="About"
          title="Grounded in fundamentals, driven by curiosity."
          description="I'm a Computer Science graduate specializing in Data Science & AI, focused on turning theory into software that actually works. My goal is a Graduate Engineering Trainee role where I can apply what I've learned to real problems — and keep learning fast alongside a team."
        />

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-sm tracking-wide uppercase mb-2" style={{ color: 'var(--color-accent)' }}>
                Mission
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Apply data analytics, machine learning, and solid engineering practice to build software that solves
                real problems — not just demos.
              </p>
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-sm tracking-wide uppercase mb-2" style={{ color: 'var(--color-accent)' }}>
                Vision
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Grow into an engineer who's equally comfortable in the data layer and the product layer — someone a
                team trusts with both the model and the interface.
              </p>
            </GlassCard>
          </div>

          <div className="relative pl-6">
            <div className="absolute left-[7px] top-1 bottom-1 w-px" style={{ background: 'var(--glass-border)' }} />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative"
                >
                  <span
                    className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full"
                    style={{ background: 'var(--color-accent)' }}
                  />
                  <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
                    {item.year}
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10 border-t" style={{ borderColor: 'var(--glass-border)' }}>
          {STATS.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
