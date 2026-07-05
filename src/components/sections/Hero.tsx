import { useEffect, useState, lazy, Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { useParallax } from '@/hooks/useParallax';
import { profile } from '@/data/resume';
import photo from '@/assets/suhail-photo.jpeg';

const NeuralBackground = lazy(() =>
  import('@/components/three/NeuralBackground').then((m) => ({ default: m.NeuralBackground })),
);

const ROLE_WORDS = ['Data Science', 'Artificial Intelligence', 'Machine Learning', 'Software Engineering'];

function useTypewriter(words: string[], speed = 70, pause = 1400) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: number;

    if (!deleting && text.length < current.length) {
      timeout = window.setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === current.length) {
      timeout = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = window.setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2);
    } else {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    }

    return () => window.clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(ROLE_WORDS);
  const contentRef = useRef<HTMLDivElement>(null);
  useParallax(contentRef, 60);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <Suspense fallback={null}>
        <NeuralBackground />
      </Suspense>

      <div
        ref={contentRef}
        className="container-max relative z-10 pt-32 pb-20 grid lg:grid-cols-[1.15fr,0.85fr] gap-12 items-center"
      >
        {/* Left: text content */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm tracking-[0.25em] uppercase mb-6"
            style={{ color: 'var(--color-accent)' }}
          >
            Available for Graduate Engineering roles
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] font-semibold"
          >
            {profile.name.split(' ').slice(0, 2).join(' ')}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-[clamp(1.1rem,2.2vw,1.6rem)]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Engineering with{' '}
            <span style={{ color: 'var(--color-text)' }}>
              {typed}
              <span className="inline-block w-[2px] h-[1em] ml-1 align-middle animate-pulse" style={{ background: 'var(--color-accent)' }} />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-base leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            B.Tech Computer Science graduate specializing in Data Science &amp; AI — turning data
            into decisions and ideas into working software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Button variant="primary" onClick={() => scrollTo('projects')}>
                Explore Projects
              </Button>
            </Magnetic>
            <Magnetic>
              <Button as="a" variant="ghost" href="/resume/Suhail_Khan_Resume.pdf" download icon={<Download size={16} />}>
                Download Resume
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="ghost" onClick={() => scrollTo('contact')} icon={<Mail size={16} />}>
                Hire Me
              </Button>
            </Magnetic>

            {(profile.github || profile.linkedin) && (
              <div className="flex items-center gap-3 ml-1">
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="opacity-70 hover:opacity-100 transition-opacity">
                    <FaGithub size={20} />
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="opacity-70 hover:opacity-100 transition-opacity">
                    <FaLinkedin size={20} />
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
        >
          {/* Ambient glow behind the portrait */}
          <div
            className="absolute -inset-10 rounded-full blur-3xl opacity-40"
            style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }}
          />
          {/* Rotating dashed ring accent */}
          <motion.div
            className="absolute -inset-4 rounded-[2rem] border"
            style={{ borderColor: 'var(--glass-border)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative rounded-[1.75rem] overflow-hidden glass p-2">
            <div className="rounded-[1.4rem] overflow-hidden">
              <img
                src={photo}
                alt="Suhail Khan"
                className="w-full h-auto object-cover aspect-[4/5]"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                }}
              />
            </div>
          </div>

          {/* Floating stat chip */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute -left-6 bottom-10 glass rounded-2xl px-4 py-3 shadow-xl hidden sm:block"
          >
            <p className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>7.67</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>CGPA</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="absolute -right-4 top-10 glass rounded-2xl px-4 py-3 shadow-xl hidden sm:block"
          >
            <p className="text-xl font-semibold" style={{ fontFamily: 'var(--font-display)' }}>AI &amp; DS</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Specialization</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo('about')}
        aria-label="Scroll to About section"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-60 hover:opacity-100 transition-opacity"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown size={20} />
      </motion.button>
    </section>
  );
}
