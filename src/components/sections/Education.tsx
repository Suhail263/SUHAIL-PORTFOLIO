import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { education } from '@/data/resume';

export function Education() {
  return (
    <section
      id="education"
      className="section relative isolate overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(5, 8, 20, 0.97) 0%,
              rgba(5, 8, 20, 0.82) 45%,
              rgba(5, 8, 20, 0.50) 100%
            ),
            linear-gradient(
              to bottom,
              rgba(5, 8, 20, 0.65),
              rgba(5, 8, 20, 0.90)
            ),
            url('/images/education-background.png')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Blue Glow */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 85% 20%, rgba(37, 99, 235, 0.12), transparent 45%)',
        }}
      />

      <div className="container-max relative z-10">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                margin: '-60px',
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
              }}
            >
              <GlassCard className="p-6 h-full">
                {/* Education Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: 'var(--color-accent-soft)',
                    color: 'var(--color-accent)',
                  }}
                >
                  <GraduationCap size={20} />
                </div>

                {/* Degree */}
                <h3 className="text-base font-semibold leading-snug">
                  {item.degree}
                </h3>

                {/* Institution */}
                {item.institution && (
                  <p
                    className="text-sm mt-1.5"
                    style={{
                      color: 'var(--color-accent)',
                    }}
                  >
                    {item.institution}
                  </p>
                )}

                {/* Period and Details */}
                <div
                  className="flex flex-wrap items-center gap-3 mt-3 text-sm"
                  style={{
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {item.period && <span>{item.period}</span>}

                  {item.period && (
                    <span
                      style={{
                        color: 'var(--color-text-faint)',
                      }}
                    >
                      •
                    </span>
                  )}

                  <span>{item.detail}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}