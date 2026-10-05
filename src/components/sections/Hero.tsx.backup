import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowDown,
  Download,
  Mail,
  GraduationCap,
  Box,
  Zap,
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { profile } from '@/data/resume';

const ROLE_WORDS = [
  'Artificial Intelligence',
  'Data Science',
  'Machine Learning',
  'Full Stack Development',
];

function useTypewriter(words: string[], speed = 65, pause = 1600) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: number;

    if (!deleting && text.length < current.length) {
      timeout = window.setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        speed,
      );
    } else if (!deleting && text.length === current.length) {
      timeout = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = window.setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        speed / 2,
      );
    } else {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    return () => window.clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(ROLE_WORDS);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center bg-[#030814] text-white"
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/hero-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateX(8%) scale(1.12)',
          transformOrigin: 'center center',
        }}
      />

      {/* DARK OVERLAY — keeps the left text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(3, 8, 20, 0.98) 0%,
              rgba(3, 8, 20, 0.92) 28%,
              rgba(3, 8, 20, 0.68) 45%,
              rgba(3, 8, 20, 0.20) 72%,
              rgba(3, 8, 20, 0.12) 100%
            ),
            linear-gradient(
              0deg,
              rgba(3, 8, 20, 0.80) 0%,
              transparent 45%,
              rgba(3, 8, 20, 0.20) 100%
            )
          `,
        }}
      />

      {/* BLUE GLOW */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 75% 35%, rgba(0, 140, 255, 0.16), transparent 38%)',
        }}
      />

      {/* MAIN CONTENT */}
      <div className="container-max relative z-10 w-full pt-32 pb-28">
        <div className="max-w-[540px]">

          {/* ROLE BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-[#07172b]/80 px-5 py-3 backdrop-blur-md"
          >
            <span className="text-xs md:text-sm tracking-wide text-white">
              AI ENGINEER
            </span>

            <span className="text-cyan-400">|</span>

            <span className="text-xs md:text-sm tracking-wide text-white">
              FULL STACK DEVELOPER
            </span>

            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
          </motion.div>

          {/* NAME */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-[clamp(4rem,8vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.065em]"
          >
            <span className="block text-white">Suhail</span>

            <span
              className="block bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Khan
            </span>
          </motion.h1>

          {/* SIGNATURE */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 flex items-center gap-3"
          >
            <span className="text-2xl md:text-3xl italic font-light tracking-tight text-white/90">
              SK
            </span>

            <span className="h-px w-14 bg-gradient-to-r from-cyan-400 to-transparent" />

            <span className="text-sm tracking-[0.18em] uppercase text-cyan-300">
              Innovate · Build · Create
            </span>
          </motion.div>

          {/* ANIMATED ROLE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-xl md:text-2xl font-medium text-white/85"
          >
            Building with{' '}
            <span className="text-cyan-300">
              {typed}
              <span className="ml-1 inline-block h-[1em] w-[2px] animate-pulse align-middle bg-cyan-400" />
            </span>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-5 max-w-[480px] text-base md:text-lg leading-relaxed text-white/75"
          >
            Computer Science student specializing in AI &amp; Data Science.
            Full Stack Developer turning ideas into real-world solutions
            through code, creativity, and curiosity.
          </motion.p>

          {/* ACTION BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Button
                variant="primary"
                onClick={() => scrollTo('projects')}
                icon={<ArrowRight size={18} />}
              >
                Explore Projects
              </Button>
            </Magnetic>

            <Magnetic>
              <Button
                as="a"
                variant="ghost"
                href="/resume/Suhail_Khan_Resume.pdf"
                download
                icon={<Download size={17} />}
              >
                Download Resume
              </Button>
            </Magnetic>
          </motion.div>

          {/* SOCIAL LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 flex items-center gap-5"
          >
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-white/75 transition-colors hover:text-cyan-400"
              >
                <FaGithub size={23} />
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-white/75 transition-colors hover:text-cyan-400"
              >
                <FaLinkedin size={23} />
              </a>
            )}

            <button
              onClick={() => scrollTo('contact')}
              className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-cyan-300"
            >
              <Mail size={17} />
              Let's Talk
              <ArrowRight size={15} />
            </button>
          </motion.div>

          {/* STATS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {/* CGPA */}
            <div className="flex min-w-[145px] items-center gap-4 rounded-xl border border-cyan-400/25 bg-[#061327]/75 px-5 py-4 backdrop-blur-md">
              <GraduationCap className="text-cyan-400" size={30} />

              <div>
                <p className="text-2xl font-semibold text-white">7.67</p>
                <p className="text-xs text-white/60">CGPA</p>
              </div>
            </div>

            {/* PROJECTS */}
            <div className="flex min-w-[145px] items-center gap-4 rounded-xl border border-cyan-400/25 bg-[#061327]/75 px-5 py-4 backdrop-blur-md">
              <Box className="text-cyan-400" size={30} />

              <div>
                <p className="text-2xl font-semibold text-white">10+</p>
                <p className="text-xs text-white/60">Projects</p>
              </div>
            </div>

            {/* INTERNSHIPS */}
            <div className="flex min-w-[145px] items-center gap-4 rounded-xl border border-cyan-400/25 bg-[#061327]/75 px-5 py-4 backdrop-blur-md">
              <Zap className="text-cyan-400" size={30} />

              <div>
                <p className="text-2xl font-semibold text-white">3+</p>
                <p className="text-xs text-white/60">Internships</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.button
        onClick={() => scrollTo('about')}
        aria-label="Scroll to About section"
        className="absolute bottom-7 left-8 z-10 flex items-center gap-4 text-sm text-white/70 transition-colors hover:text-cyan-300"
        animate={{ y: [0, 5, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-cyan-400/60 p-2">
          <span className="h-2 w-[2px] rounded-full bg-cyan-300" />
        </span>

        Scroll Down

        <span className="h-px w-20 bg-gradient-to-r from-cyan-400/70 to-transparent" />
      </motion.button>

      {/* BOTTOM RIGHT DECORATION */}
      <div className="pointer-events-none absolute bottom-8 right-8 hidden items-center gap-3 rounded-full border border-white/10 bg-[#071327]/70 px-5 py-4 backdrop-blur-md md:flex">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-sm font-bold text-cyan-300">
          SK
        </span>

        <div>
          <p className="text-sm font-medium text-white">Suhail Khan</p>
          <p className="text-xs text-white/50">AI Engineer &amp; Developer</p>
        </div>
      </div>
    </section>
  );
}