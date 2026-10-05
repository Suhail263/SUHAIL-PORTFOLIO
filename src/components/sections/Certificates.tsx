"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  ArrowUpRight,
  Check,
  ExternalLink,
  FileText,
  ScanLine,
  Sparkles,
  X,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

import {
  certificates,
  type CertificateItem,
} from "@/data/resume";

/* =========================================================
   CERTIFICATE FILES
   ========================================================= */

const CERTIFICATE_FILES: Record<
  string,
  {
    file: string;
    type: "image" | "pdf";
  }
> = {
  "IBM Java Certificate": {
    file: "/certificates/ibm-java.pdf",
    type: "pdf",
  },

  "AWS Cloud Computing Training — Advantage Pro (60 hours)": {
    file: "/certificates/aws-cloud-training.pdf",
    type: "pdf",
  },

  "NPTEL — Mobile Virtual Reality & AI": {
    file: "/certificates/nptel-mvr-ai.jpg",
    type: "image",
  },

  "Introduction to Artificial Intelligence — Infosys Springboard": {
    file: "/certificates/infosys-ai.pdf",
    type: "pdf",
  },

  "Basics of Python — Infosys Springboard": {
    file: "/certificates/infosys-python.pdf",
    type: "pdf",
  },

  "IBM Introduction to Cloud": {
    file: "/certificates/ibm-cloud.pdf",
    type: "pdf",
  },

  "IBM Business Intelligence": {
    file: "/certificates/ibm-business-intelligence.pdf",
    type: "pdf",
  },

  "Increase SEO Traffic with WordPress": {
    file: "/certificates/coursera-wordpress.pdf",
    type: "pdf",
  },

  "Search Engine Optimization (SEO) with Squarespace": {
    file: "/certificates/coursera-squarespace.pdf",
    type: "pdf",
  },
};

/* =========================================================
   TYPES
   ========================================================= */

type ThemeType =
  | "ibm"
  | "aws"
  | "nptel"
  | "ai"
  | "python"
  | "coursera";

type RevealStage =
  | "boot"
  | "scan"
  | "assemble"
  | "materialize"
  | "reveal"
  | "complete";

interface Theme {
  type: ThemeType;
  label: string;
  accent: string;
  secondary: string;
  soft: string;
  gradient: string;
  glow: string;
}

/* =========================================================
   CONSTANTS
   ========================================================= */

const ease = [0.16, 1, 0.3, 1] as const;

const TIMING = {
  scan: 420,
  assemble: 900,
  materialize: 1650,
  assemblyComplete: 2200,
  missingFileFallback: 6000,
};

/* =========================================================
   THEMES
   ========================================================= */

function getTheme(title: string): Theme {
  const value = title.toLowerCase();

  if (value.includes("aws")) {
    return {
      type: "aws",
      label: "CLOUD SYSTEM",
      accent: "#ff9f43",
      secondary: "#ffd166",
      soft: "rgba(255,159,67,0.22)",
      gradient:
        "linear-gradient(135deg, rgba(255,159,67,.24), rgba(255,209,102,.06), rgba(255,255,255,.02))",
      glow:
        "radial-gradient(circle, rgba(255,159,67,.32), rgba(255,209,102,.08), transparent 68%)",
    };
  }

  if (value.includes("nptel")) {
    return {
      type: "nptel",
      label: "ORBITAL LEARNING",
      accent: "#a78bfa",
      secondary: "#f472b6",
      soft: "rgba(167,139,250,0.22)",
      gradient:
        "linear-gradient(135deg, rgba(167,139,250,.25), rgba(244,114,182,.09), rgba(255,255,255,.02))",
      glow:
        "radial-gradient(circle, rgba(167,139,250,.32), rgba(244,114,182,.10), transparent 68%)",
    };
  }

  if (value.includes("artificial intelligence")) {
    return {
      type: "ai",
      label: "INTELLIGENCE SYSTEM",
      accent: "#ec4899",
      secondary: "#8b5cf6",
      soft: "rgba(236,72,153,0.22)",
      gradient:
        "linear-gradient(135deg, rgba(236,72,153,.24), rgba(139,92,246,.11), rgba(255,255,255,.02))",
      glow:
        "radial-gradient(circle, rgba(236,72,153,.30), rgba(139,92,246,.10), transparent 68%)",
    };
  }

  if (value.includes("python")) {
    return {
      type: "python",
      label: "PYTHON / DATA",
      accent: "#22c55e",
      secondary: "#38bdf8",
      soft: "rgba(34,197,94,0.22)",
      gradient:
        "linear-gradient(135deg, rgba(34,197,94,.22), rgba(56,189,248,.10), rgba(255,255,255,.02))",
      glow:
        "radial-gradient(circle, rgba(34,197,94,.28), rgba(56,189,248,.10), transparent 68%)",
    };
  }

  if (
    value.includes("seo") ||
    value.includes("wordpress") ||
    value.includes("squarespace")
  ) {
    return {
      type: "coursera",
      label: "LEARNING PATH",
      accent: "#06b6d4",
      secondary: "#6366f1",
      soft: "rgba(6,182,212,0.22)",
      gradient:
        "linear-gradient(135deg, rgba(6,182,212,.23), rgba(99,102,241,.10), rgba(255,255,255,.02))",
      glow:
        "radial-gradient(circle, rgba(6,182,212,.28), rgba(99,102,241,.10), transparent 68%)",
    };
  }

  return {
    type: "ibm",
    label: "PRECISION / SYSTEM",
    accent: "#3b82f6",
    secondary: "#8b5cf6",
    soft: "rgba(59,130,246,0.22)",
    gradient:
      "linear-gradient(135deg, rgba(59,130,246,.24), rgba(139,92,246,.10), rgba(255,255,255,.02))",
    glow:
      "radial-gradient(circle, rgba(59,130,246,.30), rgba(139,92,246,.10), transparent 68%)",
  };
}

/* =========================================================
   PARTICLES
   ========================================================= */

function ColorParticles({
  theme,
  count = 28,
}: {
  theme: Theme;
  count?: number;
}) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: `${5 + ((index * 31) % 90)}%`,
        top: `${5 + ((index * 47) % 88)}%`,
        size: 2 + (index % 4),
        delay: (index % 9) * 0.13,
        duration: 2.5 + (index % 5) * 0.6,
        direction: index % 2 === 0 ? -1 : 1,
      })),
    [count]
  );

  return (
    <>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            background:
            particle.id % 3 === 0
            ? theme.secondary
            : theme.accent,
            boxShadow: `0 0 18px ${theme.soft}`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            y: 20,
          }}
          animate={{
            opacity: [0, 0.9, 0],
            scale: [0, 1.2, 0.3],
            y: [
              20,
              particle.direction * 10,
              particle.direction * 35,
            ],
            x: [0, particle.direction * 8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/* =========================================================
   AURORA
   ========================================================= */

function Aurora({ theme }: { theme: Theme }) {
  return (
    <>
      <motion.div
        className="absolute w-[520px] h-[520px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: theme.glow,
        }}
        animate={{
          x: [-120, 80, -40, -120],
          y: [-50, 40, -20, -50],
          scale: [0.9, 1.15, 1, 0.9],
          opacity: [0.35, 0.65, 0.4, 0.35],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full blur-[110px] pointer-events-none"
        style={{
          background: `radial-gradient(
            circle,
            ${theme.secondary}25,
            transparent 68%
          )`,
        }}
        animate={{
          x: [140, -60, 100, 140],
          y: [70, -50, 30, 70],
          scale: [1, 0.8, 1.1, 1],
          opacity: [0.25, 0.5, 0.3, 0.25],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}

/* =========================================================
   SCANNING GRID
   ========================================================= */

function ScanningGrid({ theme }: { theme: Theme }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(
              ${theme.accent}18 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              ${theme.accent}18 1px,
              transparent 1px
            )
          `,
          backgroundSize: "42px 42px",
        }}
      />

      <motion.div
        className="absolute top-0 bottom-0 w-[2px]"
        style={{
          background: `linear-gradient(
            transparent,
            ${theme.accent},
            ${theme.secondary},
            transparent
          )`,
          boxShadow: `0 0 35px ${theme.soft}`,
        }}
        initial={{
          left: "0%",
          opacity: 0,
        }}
        animate={{
          left: ["0%", "100%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.1,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            ${theme.secondary},
            ${theme.accent},
            transparent
          )`,
          boxShadow: `0 0 25px ${theme.soft}`,
        }}
        initial={{
          top: "0%",
          opacity: 0,
        }}
        animate={{
          top: ["0%", "100%"],
          opacity: [0, 0.8, 0.8, 0],
        }}
        transition={{
          duration: 2.7,
          delay: 0.15,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/* =========================================================
   IBM VISUAL
   ========================================================= */

function SystemVisual({ theme }: { theme: Theme }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <ScanningGrid theme={theme} />

      <motion.div
        className="absolute left-1/2 top-1/2 w-72 h-28 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border"
        style={{
          borderColor: `${theme.accent}55`,
          boxShadow: `0 0 40px ${theme.soft}`,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 w-56 h-40 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border"
        style={{
          borderColor: `${theme.secondary}35`,
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: theme.accent,
          boxShadow: `
            0 0 25px ${theme.accent},
            0 0 60px ${theme.secondary}
          `,
        }}
        animate={{
          scale: [0.7, 1.5, 0.7],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
      />
    </div>
  );
}

/* =========================================================
   AWS VISUAL
   ========================================================= */

function CloudVisual({ theme }: { theme: Theme }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute left-1/2 top-1/2 w-72 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(
            ellipse,
            ${theme.accent}55,
            ${theme.secondary}18,
            transparent 70%
          )`,
        }}
        animate={{
          scale: [0.8, 1.15, 0.8],
          x: [-30, 30, -30],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {[0, 1, 2].map((item) => (
        <motion.div
          key={item}
          className="absolute rounded-full border"
          style={{
            width: `${150 + item * 50}px`,
            height: `${45 + item * 18}px`,
            left: "50%",
            top: `${42 + item * 4}%`,
            transform: "translate(-50%, -50%)",
            borderColor:
              item % 2 === 0
                ? `${theme.accent}55`
                : `${theme.secondary}40`,
          }}
          animate={{
            scale: [0.9, 1.08, 0.9],
            opacity: [0.25, 0.75, 0.25],
          }}
          transition={{
            duration: 3 + item,
            repeat: Infinity,
            delay: item * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      <ColorParticles theme={theme} count={25} />
    </div>
  );
}

/* =========================================================
   NPTEL VISUAL
   ========================================================= */

function OrbitVisual({ theme }: { theme: Theme }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute left-1/2 top-1/2 w-72 h-28 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border"
        style={{
          borderColor: `${theme.accent}55`,
          boxShadow: `0 0 40px ${theme.soft}`,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 w-56 h-40 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border"
        style={{
          borderColor: `${theme.secondary}35`,
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: theme.accent,
          boxShadow: `
            0 0 25px ${theme.accent},
            0 0 60px ${theme.secondary}
          `,
        }}
        animate={{
          scale: [0.7, 1.5, 0.7],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
      />

      <ColorParticles theme={theme} count={22} />
    </div>
  );
}

/* =========================================================
   AI NEURAL VISUAL
   ========================================================= */

function NeuralVisual({ theme }: { theme: Theme }) {
  const nodes = [
    [20, 30],
    [20, 70],
    [50, 22],
    [50, 50],
    [50, 78],
    [80, 35],
    [80, 65],
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="
            M20 30 L50 22 L80 35
            M20 30 L50 50 L80 35
            M20 70 L50 50 L80 65
            M20 70 L50 78 L80 65
          "
          fill="none"
          stroke={theme.accent}
          strokeWidth="0.45"
          strokeOpacity="0.4"
          pathLength={1}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: 1,
          }}
          transition={{
            duration: 1.5,
            ease,
          }}
        />
      </svg>

      {nodes.map(([x, y], index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            background:
              index % 2 === 0
                ? theme.accent
                : theme.secondary,
            boxShadow: `
              0 0 12px ${theme.accent},
              0 0 25px ${theme.soft}
            `,
          }}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0.35, 1, 0.35],
            scale: [0.7, 1.3, 0.7],
          }}
          transition={{
            duration: 1.8,
            delay: index * 0.12,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================
   PYTHON VISUAL
   ========================================================= */

function PythonVisual({ theme }: { theme: Theme }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[0, 1, 2, 3].map((item) => (
        <motion.div
          key={item}
          className="absolute h-1 rounded-full"
          style={{
            width: `${100 + item * 55}px`,
            left: `${15 + item * 8}%`,
            top: `${28 + item * 14}%`,
            background:
              item % 2 === 0
                ? `linear-gradient(
                    90deg,
                    transparent,
                    ${theme.accent},
                    transparent
                  )`
                : `linear-gradient(
                    90deg,
                    transparent,
                    ${theme.secondary},
                    transparent
                  )`,
          }}
          animate={{
            x: [-50, 80, -50],
            opacity: [0.1, 0.8, 0.1],
            scaleX: [0.6, 1.2, 0.6],
          }}
          transition={{
            duration: 3 + item * 0.5,
            delay: item * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[72px] font-bold font-mono"
        style={{
          color: `${theme.accent}20`,
          textShadow: `0 0 50px ${theme.soft}`,
        }}
        animate={{
          rotateY: [-12, 12, -12],
          scale: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {"</>"}
      </motion.div>

      <ColorParticles theme={theme} count={22} />
    </div>
  );
}

/* =========================================================
   COURSERA VISUAL
   ========================================================= */

function CourseraVisual({ theme }: { theme: Theme }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute left-[12%] right-[12%] top-1/2 h-px"
        style={{
          background: `linear-gradient(
            90deg,
            transparent,
            ${theme.accent},
            ${theme.secondary},
            transparent
          )`,
          boxShadow: `0 0 20px ${theme.soft}`,
        }}
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          duration: 1.2,
          ease,
        }}
      />

      {[0, 1, 2, 3, 4].map((item) => (
        <motion.div
          key={item}
          className="absolute top-1/2 w-3 h-3 rounded-full -translate-y-1/2"
          style={{
            left: `${18 + item * 16}%`,
            background:
              item % 2 === 0
                ? theme.accent
                : theme.secondary,
            boxShadow: `0 0 18px ${theme.soft}`,
          }}
          animate={{
            scale: [0.6, 1.35, 0.6],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.8,
            delay: item * 0.2,
            repeat: Infinity,
          }}
        />
      ))}

      <ColorParticles theme={theme} count={20} />
    </div>
  );
}

/* =========================================================
   THEME VISUAL
   ========================================================= */

function ThemeVisual({ theme }: { theme: Theme }) {
  switch (theme.type) {
    case "aws":
      return <CloudVisual theme={theme} />;

    case "nptel":
      return <OrbitVisual theme={theme} />;

    case "ai":
      return <NeuralVisual theme={theme} />;

    case "python":
      return <PythonVisual theme={theme} />;

    case "coursera":
      return <CourseraVisual theme={theme} />;

    default:
      return <SystemVisual theme={theme} />;
  }
}

/* =========================================================
   MATERIALIZATION SCENE
   ========================================================= */

function MaterializationScene({
  certificate,
  theme,
  stage,
}: {
  certificate: CertificateItem;
  theme: Theme;
  stage: RevealStage;
}) {
  const isAssembling =
    stage === "assemble" ||
    stage === "materialize";

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
    >
      <Aurora theme={theme} />

      <ThemeVisual theme={theme} />

      <ColorParticles
        theme={theme}
        count={stage === "materialize" ? 45 : 32}
      />

      {/* Central energy core */}

      <motion.div
        className="absolute left-1/2 top-1/2 w-24 h-24 rounded-full"
        style={{
          background: `radial-gradient(
            circle,
            ${theme.accent},
            ${theme.secondary}70,
            transparent 72%
          )`,
          filter: "blur(2px)",
          boxShadow: `0 0 80px ${theme.soft}`,
        }}
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale:
            stage === "boot"
              ? [0, 1, 0.8]
              : stage === "scan"
                ? [0.8, 1.5, 0.9]
                : 0,
          opacity:
            stage === "assemble" ||
            stage === "materialize"
              ? 0
              : [0, 1, 0.7],
        }}
        transition={{
          duration: 1.2,
          ease,
        }}
      />

      {/* Outer ring */}

      <motion.div
        className="absolute left-1/2 top-1/2 w-72 h-72 rounded-full border"
        style={{
          borderColor: `${theme.accent}35`,
          boxShadow: `0 0 80px ${theme.soft}`,
        }}
        initial={{
          scale: 0.3,
          rotate: 0,
          opacity: 0,
        }}
        animate={{
          scale: isAssembling
            ? 1.15
            : [0.3, 1, 1.1],
          rotate: 360,
          opacity: isAssembling
            ? 0
            : [0, 1, 0.6],
        }}
        transition={{
          duration: 2,
          ease,
        }}
      />

      {/* Back document */}

      <motion.div
        className="absolute w-[min(72vw,720px)] aspect-[1.414/1] rounded-2xl border"
        style={{
          background: "rgba(255,255,255,0.025)",
          borderColor: `${theme.secondary}30`,
          boxShadow: "0 30px 100px rgba(0,0,0,.55)",
          transformStyle: "preserve-3d",
        }}
        initial={{
          opacity: 0,
          scale: 0.3,
          rotateX: 70,
          rotateY: -35,
          y: 100,
          x: -80,
        }}
        animate={{
          opacity:
            stage === "assemble" ? 0.7 : 0,
          scale:
            stage === "assemble"
              ? [0.3, 0.8, 1]
              : 1,
          rotateX:
            stage === "assemble"
              ? [70, 20, 0]
              : 0,
          rotateY:
            stage === "assemble"
              ? [-35, 10, 0]
              : 0,
          y:
            stage === "assemble"
              ? [100, 30, 0]
              : 0,
          x:
            stage === "assemble"
              ? [-80, 10, 0]
              : 0,
        }}
        transition={{
          duration: 1.2,
          ease,
        }}
      />

      {/* Front holographic document */}

      <motion.div
        className="absolute w-[min(66vw,660px)] aspect-[1.414/1] rounded-2xl border"
        style={{
          background: "rgba(255,255,255,0.035)",
          borderColor: `${theme.accent}45`,
          transformStyle: "preserve-3d",
        }}
        initial={{
          opacity: 0,
          scale: 0.25,
          rotateX: -50,
          rotateY: 30,
          x: 100,
          y: 70,
        }}
        animate={{
          opacity:
            stage === "assemble" ? 0.9 : 0,
          scale:
            stage === "assemble"
              ? [0.25, 0.75, 1]
              : 1,
          rotateX:
            stage === "assemble"
              ? [-50, -8, 0]
              : 0,
          rotateY:
            stage === "assemble"
              ? [30, -8, 0]
              : 0,
          x:
            stage === "assemble"
              ? [100, -15, 0]
              : 0,
          y:
            stage === "assemble"
              ? [70, 10, 0]
              : 0,
        }}
        transition={{
          duration: 1.25,
          delay: 0.1,
          ease,
        }}
      />

      {/* Main holographic certificate */}

      <motion.div
        className="absolute w-[min(60vw,600px)] aspect-[1.414/1] rounded-xl overflow-hidden"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(255,255,255,.12),
              rgba(255,255,255,.025)
            )
          `,
          border: `1px solid ${theme.accent}65`,
          boxShadow: `
            0 50px 120px rgba(0,0,0,.75),
            0 0 80px ${theme.soft}
          `,
          transformStyle: "preserve-3d",
        }}
        initial={{
          opacity: 0,
          scale: 0.2,
          rotateX: 75,
          rotateY: -35,
          y: 120,
        }}
        animate={{
          opacity:
            stage === "assemble" ? 1 : 0,
          scale:
            stage === "assemble"
              ? [0.2, 0.65, 1]
              : 1,
          rotateX:
            stage === "assemble"
              ? [75, 18, 0]
              : 0,
          rotateY:
            stage === "assemble"
              ? [-35, 8, 0]
              : 0,
          y:
            stage === "assemble"
              ? [120, 20, 0]
              : 0,
        }}
        transition={{
          duration: 1.45,
          delay: 0.15,
          ease,
        }}
      >
        <div
          className="absolute inset-[7%] rounded-lg border"
          style={{
            borderColor: `${theme.accent}35`,
          }}
        />

        <motion.div
          className="absolute left-0 right-0 top-[18%] h-px"
          style={{
            background: `linear-gradient(
              90deg,
              transparent,
              ${theme.accent},
              ${theme.secondary},
              transparent
            )`,
          }}
          initial={{
            scaleX: 0,
          }}
          animate={{
            scaleX:
              stage === "assemble" ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.75,
          }}
        />

        <motion.div
          className="absolute left-1/2 top-[25%] -translate-x-1/2 w-12 h-12 rounded-full border flex items-center justify-center"
          style={{
            borderColor: `${theme.accent}60`,
            color: theme.accent,
            boxShadow: `0 0 25px ${theme.soft}`,
          }}
          initial={{
            scale: 0,
            rotate: -90,
          }}
          animate={{
            scale:
              stage === "assemble" ? 1 : 0,
            rotate: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.8,
            ease,
          }}
        >
          <Award size={19} />
        </motion.div>

        <motion.div
          className="absolute left-[15%] right-[15%] top-[48%] text-center"
          initial={{
            opacity: 0,
            filter: "blur(8px)",
          }}
          animate={{
            opacity:
              stage === "assemble" ? 1 : 0,
            filter:
              stage === "assemble"
                ? "blur(0px)"
                : "blur(8px)",
          }}
          transition={{
            duration: 0.8,
            delay: 1,
          }}
        >
          <div
            className="text-[8px] uppercase tracking-[0.4em]"
            style={{
              color: `${theme.accent}90`,
            }}
          >
            CERTIFICATE OF ACHIEVEMENT
          </div>

          <div className="mt-4 text-[clamp(12px,1.3vw,18px)] font-medium text-white/85">
            SUHAIL KHAN
          </div>

          <div className="mt-3 h-px bg-white/10" />

          <div
            className="mt-4 text-[clamp(8px,.8vw,12px)]"
            style={{
              color: `${theme.secondary}90`,
            }}
          >
            {certificate.title}
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-[13%] left-1/2 -translate-x-1/2 flex items-center gap-2 text-[7px] uppercase tracking-[0.3em]"
          style={{
            color: `${theme.accent}75`,
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity:
              stage === "assemble" ? 1 : 0,
          }}
          transition={{
            delay: 1.15,
            duration: 0.5,
          }}
        >
          <ScanLine size={10} />
          Authenticating
        </motion.div>
      </motion.div>

      {/* Loading status */}

      <motion.div
        className="absolute bottom-[9%] left-1/2 -translate-x-1/2 flex items-center gap-2"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <motion.span
          className="w-2 h-2 rounded-full"
          style={{
            background: theme.accent,
            boxShadow: `0 0 15px ${theme.accent}`,
          }}
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
          }}
        />

        <span
          className="text-[9px] uppercase tracking-[0.3em]"
          style={{
            color: `${theme.accent}90`,
          }}
        >
          {stage === "boot"
            ? "Initializing"
            : stage === "scan"
              ? "Scanning document"
              : stage === "assemble"
                ? "Assembling certificate"
                : "Preparing final reveal"}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   CERTIFICATE VIEWER
   ========================================================= */

function CertificateViewer({
  certificate,
  theme,
  file,
  onClose,
}: {
  certificate: CertificateItem;
  theme: Theme;
  file:
    | {
        file: string;
        type: "image" | "pdf";
      }
    | undefined;
  onClose: () => void;
}) {
  const [stage, setStage] =
    useState<RevealStage>("boot");

  const [certificateLoaded, setCertificateLoaded] =
    useState(false);

  const [assemblyFinished, setAssemblyFinished] =
    useState(false);

  const [loadError, setLoadError] =
    useState(false);

  const revealTriggered = useRef(false);

  /* ---------------------------------------------------------
     SYNCHRONIZED TIMELINE
     --------------------------------------------------------- */

  useEffect(() => {
    setStage("boot");
    setCertificateLoaded(false);
    setAssemblyFinished(false);
    setLoadError(false);
    revealTriggered.current = false;

    const scanTimer = window.setTimeout(() => {
      setStage("scan");
    }, TIMING.scan);

    const assembleTimer = window.setTimeout(() => {
      setStage("assemble");
    }, TIMING.assemble);

    const materializeTimer = window.setTimeout(() => {
      setStage("materialize");
    }, TIMING.materialize);

    const assemblyTimer = window.setTimeout(() => {
      setAssemblyFinished(true);
    }, TIMING.assemblyComplete);

    const fallbackTimer = window.setTimeout(() => {
      setCertificateLoaded((alreadyLoaded) => {
        if (!alreadyLoaded) {
          setLoadError(true);
          return true;
        }

        return alreadyLoaded;
      });
    }, TIMING.missingFileFallback);

    return () => {
      window.clearTimeout(scanTimer);
      window.clearTimeout(assembleTimer);
      window.clearTimeout(materializeTimer);
      window.clearTimeout(assemblyTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [certificate.title]);

  /* ---------------------------------------------------------
     REAL REVEAL SYNCHRONIZATION
     --------------------------------------------------------- */

  useEffect(() => {
    if (
      assemblyFinished &&
      certificateLoaded &&
      !revealTriggered.current
    ) {
      revealTriggered.current = true;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setStage("reveal");

          window.setTimeout(() => {
            setStage("complete");
          }, 900);
        });
      });
    }
  }, [assemblyFinished, certificateLoaded]);

  /* ---------------------------------------------------------
     BODY SCROLL LOCK
     --------------------------------------------------------- */

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, []);

  /* ---------------------------------------------------------
     ESC KEY
     --------------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  const isRevealed =
    stage === "reveal" ||
    stage === "complete";

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onClick={onClose}
    >
      {/* BACKDROP */}

      <motion.div
        className="absolute inset-0 bg-[#020204]/[0.96] backdrop-blur-2xl"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      />

      {/* BACKGROUND GLOW */}

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at 50% 50%,
              ${theme.soft},
              transparent 42%
            )
          `,
        }}
        animate={{
          opacity: [0.2, 0.5, 0.3],
          scale: [0.9, 1.08, 1],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
        }}
      />

      {/* MAIN VIEWER */}

      <motion.div
        className="relative z-10 w-full max-w-7xl h-[94vh] rounded-[28px] overflow-hidden border bg-[#060609]"
        style={{
          borderColor: `${theme.accent}35`,
          boxShadow: `
            0 50px 160px rgba(0,0,0,.8),
            0 0 100px ${theme.soft}
          `,
          perspective: "1200px",
        }}
        initial={{
          opacity: 0,
          scale: 0.88,
          y: 45,
          rotateX: 10,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.94,
          y: 30,
        }}
        transition={{
          duration: 0.85,
          ease,
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {/* AMBIENT BACKGROUND */}

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle at 50% 40%,
                ${theme.soft},
                transparent 38%
              ),
              radial-gradient(
                circle at 10% 90%,
                ${theme.secondary}10,
                transparent 30%
              )
            `,
          }}
          animate={{
            opacity: [0.4, 0.7, 0.45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* HEADER */}

        <motion.header
          className="relative z-50 h-16 border-b border-white/[0.07] flex items-center justify-between px-4 sm:px-6 bg-black/35 backdrop-blur-xl"
          initial={{
            opacity: 0,
            y: -15,
          }}
          animate={{
            opacity: isRevealed ? 1 : 0,
            y: isRevealed ? 0 : -15,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <motion.div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: theme.gradient,
                color: theme.accent,
                border: `1px solid ${theme.accent}30`,
              }}
              animate={{
                boxShadow: [
                  `0 0 0px ${theme.soft}`,
                  `0 0 25px ${theme.soft}`,
                  `0 0 0px ${theme.soft}`,
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            >
              <FileText size={17} />
            </motion.div>

            <div className="min-w-0">
              <p className="text-sm text-white/90 truncate">
                {certificate.title}
              </p>

              <p
                className="text-[9px] uppercase tracking-[0.2em] mt-0.5"
                style={{
                  color: `${theme.accent}80`,
                }}
              >
                {theme.label}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {file?.file && (
              <a
                href={file.file}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => {
                  event.stopPropagation();
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/45 hover:text-white hover:bg-white/[0.07] transition-colors"
                aria-label="Open certificate"
              >
                <ExternalLink size={16} />
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/45 hover:text-white hover:bg-white/[0.07] transition-colors"
              aria-label="Close certificate"
            >
              <X size={18} />
            </button>
          </div>
        </motion.header>

        {/* MATERIALIZATION */}

        {!isRevealed && (
          <MaterializationScene
            certificate={certificate}
            theme={theme}
            stage={stage}
          />
        )}

        {/* REAL CERTIFICATE */}

        <div
          className="absolute inset-16 sm:inset-20 top-20 sm:top-24 bottom-5 sm:bottom-6 flex items-center justify-center"
          style={{
            pointerEvents: isRevealed
              ? "auto"
              : "none",
          }}
        >
          <motion.div
            className="relative w-full h-full rounded-2xl overflow-hidden border bg-black/40"
            style={{
              borderColor: `${theme.accent}45`,
              boxShadow: `
                0 40px 120px rgba(0,0,0,.75),
                0 0 80px ${theme.soft}
              `,
            }}
            initial={{
              opacity: 0,
              scale: 0.82,
              rotateX: 10,
              y: 30,
            }}
            animate={{
              opacity: isRevealed ? 1 : 0,
              scale: isRevealed ? 1 : 0.82,
              rotateX: isRevealed ? 0 : 10,
              y: isRevealed ? 0 : 30,
            }}
            transition={{
              duration: 0.9,
              ease,
            }}
          >
            {/* LIGHT SWEEP */}

            {isRevealed && (
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] z-30 pointer-events-none"
                style={{
                  background: `linear-gradient(
                    90deg,
                    transparent,
                    ${theme.accent},
                    ${theme.secondary},
                    transparent
                  )`,
                  boxShadow: `0 0 20px ${theme.accent}`,
                }}
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: "100%",
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* CORNER ACCENTS */}

            <div
              className="absolute top-0 left-0 w-20 h-20 border-l border-t pointer-events-none z-20"
              style={{
                borderColor: `${theme.accent}80`,
              }}
            />

            <div
              className="absolute bottom-0 right-0 w-20 h-20 border-r border-b pointer-events-none z-20"
              style={{
                borderColor: `${theme.secondary}80`,
              }}
            />

            {/* ACTUAL CERTIFICATE */}

            {file?.file ? (
              file.type === "image" ? (
                <div className="w-full h-full flex items-center justify-center bg-[#151515] p-3 sm:p-8">
                  <img
                    src={file.file}
                    alt={`${certificate.title} certificate`}
                    className="max-w-full max-h-full object-contain rounded-sm"
                    onLoad={() => {
                      setCertificateLoaded(true);
                    }}
                    onError={() => {
                      setLoadError(true);
                      setCertificateLoaded(true);
                    }}
                  />
                </div>
              ) : (
                <iframe
                  key={file.file}
                  src={`${file.file}#toolbar=0&navpanes=0&scrollbar=1`}
                  title={`${certificate.title} certificate`}
                  className="w-full h-full border-0 bg-white"
                  onLoad={() => {
                    setCertificateLoaded(true);
                  }}
                  onError={() => {
                    setLoadError(true);
                    setCertificateLoaded(true);
                  }}
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Award
                    size={42}
                    strokeWidth={1}
                    className="mx-auto text-white/20"
                  />

                  <p className="mt-5 text-sm text-white/45">
                    Certificate preview unavailable
                  </p>
                </div>
              </div>
            )}

            {/* VIGNETTE */}

            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                boxShadow: `inset 0 0 80px ${theme.soft}`,
              }}
              animate={{
                opacity: [0.35, 0.7, 0.35],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />

            {/* LOADING */}

            {!certificateLoaded &&
              !isRevealed && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-[2px] pointer-events-none">
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      className="w-10 h-10 rounded-full border"
                      style={{
                        borderColor: `${theme.accent}25`,
                        borderTopColor: theme.accent,
                      }}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <span
                      className="text-[9px] uppercase tracking-[0.3em]"
                      style={{
                        color: `${theme.accent}90`,
                      }}
                    >
                      Loading certificate
                    </span>
                  </div>
                </div>
              )}

            {/* ERROR */}

            {loadError && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-black/70 border border-white/10 backdrop-blur-xl">
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/45">
                  Preview loaded with browser fallback
                </span>
              </div>
            )}
          </motion.div>
        </div>

        {/* COMPLETION STATUS */}

        <AnimatePresence>
          {stage === "complete" && (
            <motion.div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full border bg-black/60 backdrop-blur-xl"
              style={{
                borderColor: `${theme.accent}25`,
              }}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
              }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: theme.soft,
                  color: theme.accent,
                }}
              >
                <Check size={12} />
              </span>

              <span
                className="text-[9px] uppercase tracking-[0.22em]"
                style={{
                  color: `${theme.accent}90`,
                }}
              >
                Certificate revealed
              </span>

              <Sparkles
                size={11}
                style={{
                  color: `${theme.secondary}90`,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   MAIN CERTIFICATES SECTION
   ========================================================= */

export function Certificates() {
  const [selected, setSelected] =
    useState<CertificateItem | null>(null);

  const selectedFile = selected
    ? CERTIFICATE_FILES[selected.title]
    : undefined;

  const selectedTheme = selected
    ? getTheme(selected.title)
    : getTheme("");

  /* ---------------------------------------------------------
     BODY SCROLL LOCK + ESC
     --------------------------------------------------------- */

  useEffect(() => {
    if (!selected) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selected]);

  return (
    <section
      id="certificates"
      className="section relative overflow-hidden"
      style={{
        backgroundColor: "#070709",
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(7,7,9,.98),
            rgba(7,7,9,.88),
            rgba(7,7,9,.96)
          ),
          url('/images/certifications-background.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* SECTION ATMOSPHERE */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -right-48 -top-48 w-[650px] h-[650px] rounded-full blur-[160px]"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,.10), transparent 70%)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute left-[-220px] bottom-[-220px] w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,.07), transparent 70%)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* CONTENT */}

      <div className="container-max relative z-10">
        <SectionHeading
          eyebrow="Certifications"
          title="Continuous learning, documented."
          description="Explore my certifications and training achievements."
        />

        {/* CERTIFICATE GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {certificates.map(
            (certificate, index) => {
              const file =
                CERTIFICATE_FILES[
                  certificate.title
                ];

              const hasFile =
                Boolean(file?.file);

              const theme =
                getTheme(certificate.title);

              return (
                <motion.button
                  key={certificate.title}
                  type="button"
                  disabled={!hasFile}
                  onClick={() => {
                    if (hasFile) {
                      setSelected(certificate);
                    }
                  }}
                  className="group text-left outline-none h-full disabled:cursor-default"
                  initial={{
                    opacity: 0,
                    y: 45,
                    scale: 0.96,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    margin: "-70px",
                  }}
                  transition={{
                    duration: 0.75,
                    delay: index * 0.08,
                    ease,
                  }}
                >
                  <TiltCard
                    className="
                      relative
                      h-full
                      min-h-[205px]
                      p-6
                      rounded-2xl
                      overflow-hidden
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      backdrop-blur-xl
                      transition-all
                      duration-500
                      group-hover:bg-white/[0.045]
                      group-hover:border-white/[0.16]
                    "
                  >
                    {/* COLOR AURA */}

                    <motion.div
                      className="absolute -top-28 -right-24 w-64 h-64 rounded-full blur-[70px] pointer-events-none opacity-0 group-hover:opacity-100"
                      style={{
                        background: theme.glow,
                      }}
                      transition={{
                        duration: 0.7,
                      }}
                    />

                    {/* COLOR SWEEP */}

                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                      style={{
                        background: `
                          linear-gradient(
                            115deg,
                            transparent 25%,
                            ${theme.accent}08 45%,
                            ${theme.secondary}08 55%,
                            transparent 75%
                          )
                        `,
                        backgroundSize: "200% 100%",
                      }}
                      animate={{
                        backgroundPosition: [
                          "-120% 0%",
                          "120% 0%",
                        ],
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* NUMBER */}

                    <div
                      className="absolute top-5 right-5 text-[9px] tracking-[0.22em]"
                      style={{
                        color: `${theme.accent}45`,
                      }}
                    >
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    {/* ICON */}

                    <motion.div
                      className="relative w-12 h-12 rounded-xl border flex items-center justify-center"
                      style={{
                        borderColor: `${theme.accent}35`,
                        background: theme.gradient,
                        color: theme.accent,
                        boxShadow: `0 0 0 ${theme.soft}`,
                      }}
                      whileHover={{
                        scale: 1.1,
                        rotateX: -10,
                        rotateY: 15,
                        boxShadow: `0 0 30px ${theme.soft}`,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                    >
                      <Award
                        size={21}
                        strokeWidth={1.5}
                      />

                      {hasFile && (
                        <motion.span
                          className="absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full"
                          style={{
                            background:
                              theme.accent,
                            boxShadow: `
                              0 0 10px ${theme.accent},
                              0 0 20px ${theme.secondary}
                            `,
                          }}
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                          }}
                        />
                      )}
                    </motion.div>

                    {/* CONTENT */}

                    <div className="relative mt-6">
                      <p className="text-sm font-medium leading-relaxed text-white/90 pr-8">
                        {certificate.title}
                      </p>

                      {certificate.year && (
                        <p
                          className="text-xs mt-2"
                          style={{
                            color: `${theme.accent}75`,
                          }}
                        >
                          {certificate.year}
                        </p>
                      )}

                      <div className="mt-6 flex items-center justify-between">
                        <span
                          className="
                            text-[9px]
                            uppercase
                            tracking-[0.22em]
                            text-white/30
                            group-hover:text-white/65
                            transition-colors
                          "
                        >
                          {hasFile
                            ? "Open certificate"
                            : "Preview unavailable"}
                        </span>

                        {hasFile && (
                          <motion.span
                            className="w-8 h-8 rounded-full border flex items-center justify-center"
                            style={{
                              borderColor: `${theme.accent}25`,
                              color: `${theme.accent}80`,
                              background: `${theme.accent}08`,
                            }}
                            whileHover={{
                              rotate: 45,
                              scale: 1.12,
                            }}
                          >
                            <ArrowUpRight
                              size={14}
                            />
                          </motion.span>
                        )}
                      </div>
                    </div>

                    {/* BOTTOM COLOR LINE */}

                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px]"
                      style={{
                        background: `
                          linear-gradient(
                            90deg,
                            ${theme.accent},
                            ${theme.secondary},
                            transparent
                          )
                        `,
                        boxShadow: `0 0 15px ${theme.soft}`,
                      }}
                      initial={{
                        width: "0%",
                      }}
                      whileHover={{
                        width: "80%",
                      }}
                      transition={{
                        duration: 0.6,
                        ease,
                      }}
                    />

                    {/* RIGHT COLOR LINE */}

                    <motion.div
                      className="absolute right-0 top-0 bottom-0 w-[2px]"
                      style={{
                        background: `
                          linear-gradient(
                            180deg,
                            transparent,
                            ${theme.accent},
                            ${theme.secondary},
                            transparent
                          )
                        `,
                      }}
                      initial={{
                        opacity: 0,
                        scaleY: 0,
                      }}
                      whileHover={{
                        opacity: 1,
                        scaleY: 1,
                      }}
                      transition={{
                        duration: 0.55,
                      }}
                    />
                  </TiltCard>
                </motion.button>
              );
            }
          )}
        </div>

        {/* BOTTOM STATEMENT */}

        <motion.div
          className="mt-14 flex items-center justify-center gap-3 text-[9px] uppercase tracking-[0.3em] text-white/25"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
          }}
        >
          <Sparkles size={12} />

          Continuous learning

          <Sparkles size={12} />
        </motion.div>
      </div>

      {/* VIEWER */}

      <AnimatePresence>
        {selected && (
          <CertificateViewer
            certificate={selected}
            theme={selectedTheme}
            file={selectedFile}
            onClose={() => {
              setSelected(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}