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

function Stat({
  label,
  value,
  isDecimal,
}: {
  label: string;
  value: number;
  isDecimal?: boolean;
}) {
  const { ref, value: animated } = useCountUp(
    isDecimal ? value * 100 : value,
  );

  const display = isDecimal ? (animated / 100).toFixed(2) : animated;

  return (
    <div>
      <p
        className="text-3xl md:text-4xl font-semibold text-white"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        <span ref={ref}>{display}</span>
        {label === 'CGPA' ? '' : '+'}
      </p>

      <p
        className="text-sm mt-1"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {label}
      </p>
    </div>
  );
}

const TIMELINE = [
  {
    year: '2023',
    label:
      'Began B.Tech in Computer Science Engineering (Data Science & AI)',
  },
  {
    year: '2024',
    label:
      'Completed internships and multiple foundational certifications in Python, AI, and Cloud',
  },
  {
    year: '2025',
    label:
      'Built independent projects spanning web apps, automation, and data analytics',
  },
  {
    year: '2027',
    label: `Graduating — ${education[0].detail}`,
  },
];

export function About() {
  return (
    <section
      id="about"
      className="section relative overflow-hidden bg-[#030814]"
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/about-background.png')",
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
              rgba(3, 8, 20, 0.72) 65%,
              rgba(3, 8, 20, 0.55) 100%
            ),
            linear-gradient(
              180deg,
              rgba(3, 8, 20, 0.55) 0%,
              rgba(3, 8, 20, 0.20) 45%,
              rgba(3, 8, 20, 0.90) 100%
            )
          `,
        }}
      />

      {/* BLUE GLOW */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 78% 30%, rgba(0, 140, 255, 0.12), transparent 42%)',
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
            eyebrow="About"
            title="Grounded in fundamentals, driven by curiosity."
            description="I'm a Computer Science student specializing in Data Science & AI, focused on turning theory into software that actually works. My goal is a Graduate Engineering Trainee role where I can apply what I've learned to real problems — and keep learning fast alongside a team."
          />
        </motion.div>

        {/* MISSION + VISION + TIMELINE */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* MISSION */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-6 border border-cyan-400/15 bg-[#071327]/70 backdrop-blur-xl">
                <h3
                  className="text-sm tracking-wide uppercase mb-3"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Mission
                </h3>

                <p className="text-base leading-relaxed text-white/70">
                  Apply data analytics, machine learning, and solid engineering
                  practice to build software that solves real problems — not
                  just demos.
                </p>
              </GlassCard>
            </motion.div>

            {/* VISION */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <GlassCard className="p-6 border border-cyan-400/15 bg-[#071327]/70 backdrop-blur-xl">
                <h3
                  className="text-sm tracking-wide uppercase mb-3"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Vision
                </h3>

                <p className="text-base leading-relaxed text-white/70">
                  Grow into an engineer who's equally comfortable in the data
                  layer and the product layer — someone a team trusts with both
                  the model and the interface.
                </p>
              </GlassCard>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — TIMELINE */}
          <div className="relative pl-6">
            {/* TIMELINE LINE */}
            <div
              className="absolute left-[7px] top-1 bottom-1 w-px"
              style={{ background: 'var(--glass-border)' }}
            />

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
                  {/* TIMELINE DOT */}
                  <span
                    className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                    style={{ background: 'var(--color-accent)' }}
                  />

                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {item.year}
                  </p>

                  <p className="text-sm mt-1 leading-relaxed text-white/65">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10 border-t border-white/10"
        >
          {STATS.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}