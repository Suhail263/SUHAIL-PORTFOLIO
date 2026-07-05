import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '@/data/resume';

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((p) => {
        const next = p + (100 - p) * 0.18 + 1;
        return next >= 99 ? 100 : next;
      });
    }, 90);

    const timeout = window.setTimeout(() => setVisible(false), 1600);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
          style={{ background: 'var(--color-bg)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="text-sm tracking-[0.3em] uppercase"
            style={{ color: 'var(--color-text-muted)' }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {profile.name}
          </motion.p>
          <div className="w-56 h-px bg-white/10 overflow-hidden rounded-full">
            <motion.div
              className="h-full"
              style={{ background: 'var(--color-accent)', width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
