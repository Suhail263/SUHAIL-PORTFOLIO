import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { internships } from '@/data/resume';

export function Internship() {
  return (
    <section id="internship" className="section">
      <div className="container-max">
        <SectionHeading
          eyebrow="Internship"
          title="Hands-on experience, applied early."
        />

        <div className="relative pl-8">
          <div className="absolute left-[15px] top-2 bottom-2 w-px" style={{ background: 'var(--glass-border)' }} />
          <div className="space-y-8">
            {internships.map((item, i) => (
              <motion.div
                key={item.organization}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <span
                  className="absolute -left-8 top-1 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--color-bg)', border: '1px solid var(--glass-border)', color: 'var(--color-accent)' }}
                >
                  <Briefcase size={14} />
                </span>

                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--color-accent)' }}>
                    {item.organization}
                  </p>

                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--color-text-faint)' }}>
                      Responsibilities
                    </p>
                    <ul className="space-y-1.5">
                      {item.responsibilities.map((r) => (
                        <li key={r} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--color-text-muted)' }}>
                          <span style={{ color: 'var(--color-accent)' }}>—</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.skillsLearned.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: 'var(--glass-fill-strong)', color: 'var(--color-text-muted)' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
