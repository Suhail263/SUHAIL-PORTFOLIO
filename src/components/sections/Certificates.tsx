import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, X, Upload } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { certificates, type CertificateItem } from '@/data/resume';

export function Certificates() {
  const [selected, setSelected] = useState<CertificateItem | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  return (
    <section id="certificates" className="section" style={{ background: 'var(--color-bg-warm)' }}>
      <div className="container-max">
        <SectionHeading
          eyebrow="Certifications"
          title="Continuous learning, documented."
          description="Tap any card for details. Upload the certificate files and I'll wire in real previews and downloads."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert, i) => (
            <motion.button
              key={cert.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setSelected(cert)}
              className="text-left"
            >
              <TiltCard className="p-6 h-full flex flex-col gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
                >
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium leading-snug">{cert.title}</p>
                  {cert.year && (
                    <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-faint)' }}>
                      {cert.year}
                    </p>
                  )}
                </div>
              </TiltCard>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)' }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl p-8 max-w-md w-full relative"
              role="dialog"
              aria-modal="true"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5"
              >
                <X size={16} />
              </button>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }}
              >
                <Award size={22} />
              </div>
              <h3 className="text-lg font-semibold leading-snug">{selected.title}</h3>
              {selected.year && (
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  Completed {selected.year}
                </p>
              )}
              <div
                className="mt-6 rounded-xl p-4 flex items-center gap-3 text-xs"
                style={{ background: 'var(--glass-fill-strong)', color: 'var(--color-text-faint)' }}
              >
                <Upload size={14} />
                No certificate file uploaded yet — add it and this modal will show a real preview and download link.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
