import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mb-14 max-w-2xl"
    >
      <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
        {eyebrow}
      </p>
      <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
