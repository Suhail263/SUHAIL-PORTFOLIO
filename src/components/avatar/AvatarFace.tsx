import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import photo from '@/assets/suhail-photo.jpeg';

interface AvatarFaceProps {
  isSpeaking: boolean;
  size?: number;
}

export function AvatarFace({ isSpeaking, size = 96 }: AvatarFaceProps) {
  const [blink, setBlink] = useState(false);

  // Natural, irregular blink timing rather than a fixed interval
  useEffect(() => {
    let timeout: number;
    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 3500;
      timeout = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 140);
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer pulse rings, only animate while speaking */}
      {isSpeaking && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid var(--color-accent)' }}
            animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid var(--color-accent)' }}
            animate={{ scale: [1, 1.35], opacity: [0.5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
          />
        </>
      )}

      {/* Breathing scale, always on, subtle */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          boxShadow: isSpeaking
            ? '0 0 24px var(--color-accent-glow), 0 0 0 2px var(--color-accent)'
            : '0 0 0 1px var(--glass-border)',
        }}
        animate={{ scale: isSpeaking ? [1, 1.03, 1] : 1 }}
        transition={{ duration: 1.8, repeat: isSpeaking ? Infinity : 0, ease: 'easeInOut' }}
      >
        <img
          src={photo}
          alt="Suhail Khan"
          className="w-full h-full object-cover"
          style={{ filter: blink ? 'brightness(0.85)' : 'none' }}
        />
        {/* Subtle blink overlay — a soft shade pass rather than literal eyelid animation,
            since we're deliberately not faking lip-sync/eye rigging on a static photo. */}
        {blink && (
          <div
            className="absolute inset-x-0 top-[38%] h-[10%]"
            style={{ background: 'rgba(10,10,11,0.35)' }}
          />
        )}
      </motion.div>
    </div>
  );
}
