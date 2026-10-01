import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, X, Upload } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import {
  certificates,
  type CertificateItem,
} from '@/data/resume';

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
    <section
      id="certificates"
      className="section relative overflow-hidden"
      style={{
        backgroundColor: '#030814',
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(3, 8, 20, 0.98) 0%,
            rgba(3, 8, 20, 0.92) 38%,
            rgba(3, 8, 20, 0.65) 70%,
            rgba(3, 8, 20, 0.45) 100%
          ),
          linear-gradient(
            0deg,
            rgba(3, 8, 20, 0.85),
            transparent 50%
          ),
          url('/images/certifications-background.png')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 78% 28%, rgba(0, 120, 255, 0.16), transparent 42%)',
        }}
      />

      {/* Main Content */}
      <div className="container-max relative z-10">
        <SectionHeading
          eyebrow="Certifications"
          title="Continuous learning, documented."
          description="Tap any card for details. Upload the certificate files and I'll wire in real previews and downloads."
        />

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {certificates.map((cert, i) => (
            <motion.button
              key={cert.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setSelected(cert)}
              className="text-left h-full group"
            >
              <TiltCard
                className="p-6 h-full min-h-[150px] flex flex-col gap-4 rounded-2xl border transition-all duration-300 group-hover:border-blue-400/60"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'rgba(59, 130, 246, 0.14)',
                    color: '#6385ff',
                    border: '1px solid rgba(59, 130, 246, 0.18)',
                  }}
                >
                  <Award size={22} />
                </div>

                <div>
                  <p className="text-sm font-medium leading-snug text-white">
                    {cert.title}
                  </p>

                  {cert.year && (
                    <p className="text-xs mt-2 text-white/50">
                      {cert.year}
                    </p>
                  )}
                </div>
              </TiltCard>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Certificate Details Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            {/* Modal Backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.75)' }}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0b1224]/95 backdrop-blur-xl p-8"
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Certificate Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: 'rgba(59, 130, 246, 0.14)',
                  color: '#6385ff',
                }}
              >
                <Award size={22} />
              </div>

              {/* Certificate Title */}
              <h3 className="text-lg font-semibold leading-snug text-white">
                {selected.title}
              </h3>

              {selected.year && (
                <p className="text-sm mt-2 text-white/60">
                  Completed {selected.year}
                </p>
              )}

              {/* Certificate Upload Notice */}
              <div className="mt-6 rounded-xl p-4 flex items-start gap-3 text-xs bg-white/5 text-white/50 border border-white/10">
                <Upload size={16} className="shrink-0 mt-0.5" />

                <p>
                  No certificate file uploaded yet — add it and this modal
                  will show a real preview and download link.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}