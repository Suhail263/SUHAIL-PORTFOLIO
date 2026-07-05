import { AnimatePresence, motion } from 'framer-motion';

interface CaptionsProps {
  text: string;
}

export function Captions({ text }: CaptionsProps) {
  return (
    <AnimatePresence mode="wait">
      {text && (
        <motion.p
          key={text}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-text)' }}
          role="status"
          aria-live="polite"
        >
          {text}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
