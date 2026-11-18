import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from 'react';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

import {
  ArrowRight,
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
import { scrollToTarget } from '@/hooks/useLenis';

const BASE_URL = import.meta.env.BASE_URL;

const ROLE_WORDS = [
  'Artificial Intelligence',
  'Data Science',
  'Machine Learning',
  'Full Stack Development',
];

function useTypewriter(
  words: string[],
  speed = 65,
  pause = 1600,
) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: number | undefined;

    if (!deleting && text.length < current.length) {
      timeout = window.setTimeout(() => {
        setText(current.slice(0, text.length + 1));
      }, speed);
    } else if (!deleting && text.length === current.length) {
      timeout = window.setTimeout(() => {
        setDeleting(true);
      }, pause);
    } else if (deleting && text.length > 0) {
      timeout = window.setTimeout(() => {
        setText(current.slice(0, text.length - 1));
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIndex((index) => (index + 1) % words.length);
    }

    return () => {
      if (timeout !== undefined) {
        window.clearTimeout(timeout);
      }
    };
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(ROLE_WORDS);

  const scrollTo = (id: string) => {
    scrollToTarget('#' + id);
  };

  /* =========================================================
     MOUSE PARALLAX
  ========================================================= */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 60,
    damping: 20,
    mass: 0.6,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 60,
    damping: 20,
    mass: 0.6,
  });

  const imageX = useTransform(
    smoothX,
    [-1, 1],
    [-18, 18],
  );

  const imageY = useTransform(
    smoothY,
    [-1, 1],
    [-12, 12],
  );

  const glowX = useTransform(
    smoothX,
    [-1, 1],
    [-30, 30],
  );

  const glowY = useTransform(
    smoothY,
    [-1, 1],
    [-20, 20],
  );

  const rafParallaxRef = useRef<number | null>(null);

  const handleMouseMove = (
    event: MouseEvent<HTMLElement>,
  ) => {
    const { clientX, clientY, currentTarget } = event;
    if (rafParallaxRef.current !== null) return;

    rafParallaxRef.current = requestAnimationFrame(() => {
      const rect = currentTarget.getBoundingClientRect();
      const x = (clientX - rect.left) / (rect.width || 1);
      const y = (clientY - rect.top) / (rect.height || 1);

      mouseX.set((x - 0.5) * 2);
      mouseY.set((y - 0.5) * 2);
      rafParallaxRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (rafParallaxRef.current !== null) {
      cancelAnimationFrame(rafParallaxRef.current);
      rafParallaxRef.current = null;
    }
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050505]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <motion.div
        className="
          absolute
          inset-[-3%]
          z-0
        "
        style={{
          x: imageX,
          y: imageY,
          scale: 1.035,
          backgroundImage: `url("${BASE_URL}images/hero-background.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
        initial={{
          opacity: 0,
          scale: 1.08,
        }}
        animate={{
          opacity: 1,
          scale: 1.035,
        }}
        transition={{
          duration: 1.8,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* =====================================================
          CINEMATIC DARKNESS
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
        "
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(3,4,7,0.99) 0%,
              rgba(3,4,7,0.96) 17%,
              rgba(3,4,7,0.78) 36%,
              rgba(3,4,7,0.30) 62%,
              rgba(3,4,7,0.05) 100%
            ),
            linear-gradient(
              0deg,
              rgba(3,4,7,0.96) 0%,
              rgba(3,4,7,0.15) 38%,
              rgba(3,4,7,0.05) 100%
            )
          `,
        }}
      />

      {/* =====================================================
          ATMOSPHERIC LIGHT
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          z-[2]
          h-[650px]
          w-[650px]
          rounded-full
        "
        style={{
          right: '-8%',
          top: '18%',
          x: glowX,
          y: glowY,
          willChange: 'transform',
          background:
            'radial-gradient(circle, rgba(91,108,255,0.18) 0%, rgba(91,108,255,0.06) 35%, rgba(91,108,255,0.01) 55%, transparent 70%)',
        }}
        animate={{
          opacity: [0.45, 0.75, 0.45],
          scale: [0.95, 1.08, 0.95],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =====================================================
          SECOND LIGHT
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          left-[35%]
          top-[15%]
          z-[2]
          h-[300px]
          w-[300px]
          rounded-full
        "
        style={{
          willChange: 'transform',
          background:
            'radial-gradient(circle, rgba(91,108,255,0.10) 0%, rgba(91,108,255,0.03) 40%, transparent 70%)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* =====================================================
          SUBTLE GRID
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[3]
          opacity-[0.06]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.07) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.07) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '110px 110px',
          maskImage:
            'linear-gradient(to bottom, transparent, black 18%, black 78%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 18%, black 78%, transparent)',
        }}
      />

      {/* =====================================================
          VERTICAL EDITORIAL LINE
      ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-[6vw]
          top-0
          z-[4]
          hidden
          w-px
          bg-white/[0.08]
          lg:block
        "
        initial={{
          scaleY: 0,
          transformOrigin: 'top',
        }}
        animate={{
          scaleY: 1,
        }}
        transition={{
          duration: 1.5,
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* =====================================================
          TOP RIGHT INDEX
      ===================================================== */}

      <motion.div
        className="
          absolute
          right-6
          top-7
          z-20
          text-[9px]
          uppercase
          tracking-[0.35em]
          text-white/30
          lg:right-12
        "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.7,
        }}
      >
        01 / 08
      </motion.div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          container-max
          relative
          z-10
          flex
          min-h-screen
          items-center
          pt-28
          pb-20
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-1
            items-center
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-20
              max-w-[600px]
            "
          >
            {/* HERO IDENTITY ACCENT */}

            <motion.div
              className="mb-4 flex items-center gap-3.5"
              initial={{
                opacity: 0,
                x: -16,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="h-px w-10 shrink-0 bg-[#6675ff] lg:w-14" />

              <span className="text-[10px] font-medium uppercase tracking-[0.42em] text-white/50">
                SUHAIL KHAN
              </span>
            </motion.div>

            {/* ROLE */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                mb-7
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#6675ff]
                  shadow-[0_0_16px_rgba(102,117,255,0.7)]
                "
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.28em]
                  text-white/60
                "
              >
                AI ENGINEER
              </span>

              <span className="text-white/20">
                /
              </span>

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.28em]
                  text-white/40
                "
              >
                FULL STACK
              </span>
            </motion.div>

            {/* NAME */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                font-[var(--font-display)]
                text-[clamp(4.2rem,8vw,8.4rem)]
                font-semibold
                leading-[0.78]
                tracking-[-0.075em]
              "
            >
              <span className="block text-white">
                Suhail
              </span>

              <span
                className="
                  block
                  text-white/25
                  transition-colors
                  duration-700
                "
              >
                Khan
              </span>
            </motion.h1>

            {/* ACCENT LINE */}

            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: '8rem',
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 1.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                mt-7
                h-px
                bg-gradient-to-r
                from-[#6675ff]
                via-[#6675ff]/60
                to-transparent
              "
            />

            {/* TYPEWRITER */}

            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 1.05,
              }}
              className="
                mt-7
                text-lg
                font-medium
                text-white/85
                md:text-xl
              "
            >
              Building with{' '}

              <span className="text-[#7180ff]">
                {typed}

                <span
                  className="
                    ml-1
                    inline-block
                    h-[1em]
                    w-[2px]
                    animate-pulse
                    align-middle
                    bg-[#6675ff]
                  "
                />
              </span>
            </motion.div>

            {/* DESCRIPTION */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1.2,
              }}
              className="
                mt-5
                max-w-[500px]
                text-sm
                leading-relaxed
                text-white/55
                md:text-base
              "
            >
              Computer Science student specializing in AI &
              Data Science. Full Stack Developer turning ideas
              into real-world solutions through code,
              creativity, and curiosity.
            </motion.p>

            {/* BUTTONS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 1.35,
              }}
              className="
                mt-8
                flex
                flex-wrap
                items-center
                gap-4
              "
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
                  href={`${BASE_URL}resume/Suhail_Khan_Resume.pdf`}
                  download
                  icon={<Download size={17} />}
                >
                  Download Resume
                </Button>
              </Magnetic>
            </motion.div>

            {/* SOCIALS */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 1.5,
              }}
              className="
                mt-7
                flex
                items-center
                gap-6
              "
            >
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="
                    text-white/55
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:text-white
                  "
                >
                  <FaGithub size={21} />
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="
                    text-white/55
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:text-white
                  "
                >
                  <FaLinkedin size={21} />
                </a>
              )}

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-white/50
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                <Mail size={16} />
                Let's Talk
                <ArrowRight size={14} />
              </button>
            </motion.div>

            {/* =================================================
                STATS
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 1.65,
              }}
              className="
                mt-10
                flex
                flex-wrap
                gap-x-8
                gap-y-5
                border-t
                border-white/[0.08]
                pt-6
              "
            >
              {/* CGPA */}

              <div className="flex items-center gap-3">
                <GraduationCap
                  size={21}
                  className="text-[#6675ff]"
                />

                <div>
                  <p className="text-lg font-semibold">
                    7.67
                  </p>

                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-white/35
                    "
                  >
                    CGPA
                  </p>
                </div>
              </div>

              {/* PROJECTS */}

              <div className="flex items-center gap-3">
                <Box
                  size={21}
                  className="text-[#6675ff]"
                />

                <div>
                  <p className="text-lg font-semibold">
                    10+
                  </p>

                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-white/35
                    "
                  >
                    Projects
                  </p>
                </div>
              </div>

              {/* INTERNSHIPS */}

              <div className="flex items-center gap-3">
                <Zap
                  size={21}
                  className="text-[#6675ff]"
                />

                <div>
                  <p className="text-lg font-semibold">
                    3+
                  </p>

                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-white/35
                    "
                  >
                    Internships
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* =================================================
              RIGHT / PORTRAIT AREA
          ================================================= */}

          <motion.div
            className="
              relative
              hidden
              min-h-[720px]
              items-center
              justify-center
              lg:flex
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1.4,
              delay: 0.35,
            }}
          >
            {/* PORTRAIT ATMOSPHERE */}

            <motion.div
              className="
                pointer-events-none
                absolute
                h-[620px]
                w-[620px]
                rounded-full
              "
              style={{
                x: glowX,
                y: glowY,
                willChange: 'transform',
                background:
                  'radial-gradient(circle, rgba(91,108,255,0.18) 0%, rgba(91,108,255,0.06) 35%, rgba(91,108,255,0.01) 55%, transparent 70%)',
              }}
              animate={{
                scale: [0.96, 1.05, 0.96],
                opacity: [0.55, 0.85, 0.55],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* VERTICAL FRAME */}

            <motion.div
              className="
                absolute
                right-[14%]
                top-[9%]
                h-[78%]
                w-px
                bg-gradient-to-b
                from-transparent
                via-white/10
                to-transparent
              "
              initial={{
                scaleY: 0,
              }}
              animate={{
                scaleY: 1,
              }}
              transition={{
                duration: 1.6,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* PORTRAIT DEPTH */}

            <motion.div
              className="
                absolute
                inset-[4%]
              "
              style={{
                x: imageX,
                y: imageY,
              }}
            >
              {/* Soft edge glow */}

              <div
                className="
                  absolute
                  right-[8%]
                  top-[18%]
                  h-[430px]
                  w-[300px]
                  rounded-full
                "
                style={{
                  background:
                    'radial-gradient(circle, rgba(91,108,255,0.10) 0%, rgba(91,108,255,0.03) 45%, transparent 70%)',
                }}
              />
            </motion.div>

            {/* SIDE INDEX */}

            <motion.div
              className="
                absolute
                bottom-[17%]
                right-[3%]
                origin-right
                rotate-90
                text-[9px]
                uppercase
                tracking-[0.35em]
                text-white/25
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 1.8,
              }}
            >
              Selected Work / 2023—2027
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <motion.button
        type="button"
        onClick={() => scrollTo('about')}
        aria-label="Scroll to About section"
        className="
          absolute
          bottom-7
          left-8
          z-20
          hidden
          items-center
          gap-4
          text-[10px]
          uppercase
          tracking-[0.25em]
          text-white/40
          transition-colors
          hover:text-white
          md:flex
          lg:left-12
        "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 2,
          duration: 0.8,
        }}
      >
        <span
          className="
            flex
            h-10
            w-6
            items-start
            justify-center
            rounded-full
            border
            border-white/15
            p-2
          "
        >
          <motion.span
            className="
              h-2
              w-[2px]
              rounded-full
              bg-[#6675ff]
            "
            animate={{
              y: [0, 10, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </span>

        Scroll
      </motion.button>

      {/* =====================================================
          PHOTO IDENTITY — Side of photo near Ask about me
      ===================================================== */}

      <motion.div
        className="
          pointer-events-auto
          absolute
          bottom-20
          right-5
          z-20
          hidden
          sm:block
          lg:bottom-24
          lg:right-8
        "
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          delay: 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="rounded-2xl border border-white/10 bg-[#070b14]/85 px-4 py-3 backdrop-blur-md shadow-2xl">
          <div className="mb-1.5 flex items-center gap-2.5">
            <span className="h-px w-8 bg-[#6675ff]" />
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#818cf8] font-medium">
              AI · DATA · ENGINEERING
            </span>
          </div>

          <p className="text-base font-semibold tracking-tight text-white font-[var(--font-display)]">
            Suhail Khan
          </p>

          <p className="mt-0.5 text-xs text-white/50">
            AI Engineer &amp; Full Stack Developer
          </p>
        </div>
      </motion.div>

      {/* =====================================================
          BOTTOM RIGHT LOCATION
      ===================================================== */}

      <motion.div
        className="
          absolute
          bottom-7
          right-48
          z-20
          hidden
          text-[9px]
          uppercase
          tracking-[0.3em]
          text-white/25
          md:block
          lg:right-52
        "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 2,
          duration: 0.8,
        }}
      >
        Chennai · India
      </motion.div>
    </section>
  );
}