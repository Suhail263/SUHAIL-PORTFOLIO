"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import {
  Code2,
  Coffee,
  Cpu,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  Cloud,
  BarChart3,
  Terminal,
  Layers3,
  Zap,
} from "lucide-react";

/* =========================================================
   TYPES
   ========================================================= */

type Skill = {
  name: string;
  icon: LucideIcon;
  color: string;
  glow: string;
};

type SkillGroup = {
  title: string;
  color: string;
  secondary: string;
  skills: Skill[];
};

/* =========================================================
   SKILL DATA
   ========================================================= */

const skillGroups: SkillGroup[] = [
  {
    title: "Programming Languages",
    color: "#22c55e",
    secondary: "#eab308",

    skills: [
      {
        name: "Python",
        icon: Terminal,
        color: "#22c55e",
        glow: "rgba(34,197,94,0.45)",
      },
      {
        name: "Java",
        icon: Coffee,
        color: "#f97316",
        glow: "rgba(249,115,22,0.45)",
      },
      {
        name: "C",
        icon: Code2,
        color: "#38bdf8",
        glow: "rgba(56,189,248,0.45)",
      },
      {
        name: "C++",
        icon: Cpu,
        color: "#60a5fa",
        glow: "rgba(96,165,250,0.45)",
      },
    ],
  },

  {
    title: "Web Technologies",
    color: "#f97316",
    secondary: "#3b82f6",

    skills: [
      {
        name: "HTML",
        icon: Globe,
        color: "#f97316",
        glow: "rgba(249,115,22,0.45)",
      },
      {
        name: "CSS",
        icon: FileCode2,
        color: "#3b82f6",
        glow: "rgba(59,130,246,0.45)",
      },
      {
        name: "JavaScript",
        icon: Zap,
        color: "#facc15",
        glow: "rgba(250,204,21,0.45)",
      },
    ],
  },

  {
    title: "Tools",
    color: "#a855f7",
    secondary: "#ec4899",

    skills: [
      {
        name: "Git",
        icon: GitBranch,
        color: "#f97316",
        glow: "rgba(249,115,22,0.45)",
      },
      {
        name: "GitHub",
        icon: Code2,
        color: "#e879f9",
        glow: "rgba(232,121,249,0.45)",
      },
      {
        name: "Cognos BI",
        icon: BarChart3,
        color: "#a78bfa",
        glow: "rgba(167,139,250,0.45)",
      },
    ],
  },

  {
    title: "Cloud Platforms",
    color: "#f59e0b",
    secondary: "#38bdf8",

    skills: [
      {
        name: "AWS EC2",
        icon: Cloud,
        color: "#f59e0b",
        glow: "rgba(245,158,11,0.45)",
      },
      {
        name: "Snapshot Management",
        icon: Layers3,
        color: "#38bdf8",
        glow: "rgba(56,189,248,0.45)",
      },
      {
        name: "Storage Services",
        icon: Database,
        color: "#818cf8",
        glow: "rgba(129,140,248,0.45)",
      },
    ],
  },
];

/* =========================================================
   BACKGROUND
   ========================================================= */

function SkillsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Green */}

      <motion.div
        className="absolute -left-52 top-[5%] w-[520px] h-[520px] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.12), transparent 70%)",
        }}
        animate={{
          x: [0, 70, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple */}

      <motion.div
        className="absolute right-[-180px] top-[18%] w-[560px] h-[560px] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orange */}

      <motion.div
        className="absolute left-[35%] bottom-[-240px] w-[500px] h-[500px] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.09), transparent 70%)",
        }}
        animate={{
          x: [-60, 60, -60],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blue */}

      <motion.div
        className="absolute right-[25%] bottom-[10%] w-[360px] h-[360px] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.07), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.6) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.6) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Large orbit */}

      <motion.div
        className="absolute right-[-100px] top-[5%] w-[650px] h-[650px] rounded-full border border-purple-400/[0.045]"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute right-[-20px] top-[12%] w-[520px] h-[520px] rounded-full border border-blue-400/[0.035]"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

/* =========================================================
   SKILL CARD
   ========================================================= */

function SkillCard({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) {
  const Icon = skill.icon;

  return (
    <motion.div
      className="group relative"
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-70px",
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Outer glow */}

      <div
        className="absolute -inset-[1px] rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `
            linear-gradient(
              135deg,
              ${skill.color}70,
              transparent 45%,
              ${skill.color}30
            )
          `,
        }}
      />

      {/* Main card */}

      <motion.div
        className="
          relative
          h-[150px]
          rounded-[20px]
          overflow-hidden
          border
          border-white/[0.08]
          bg-[#0b0c11]/95
          backdrop-blur-xl
          p-6
        "
        whileHover={{
          y: -8,
          scale: 1.015,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 20,
        }}
      >
        {/* Mouse-like ambient glow */}

        <div
          className="absolute -right-20 -top-20 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: skill.glow,
          }}
        />

        {/* Top accent */}

        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `
              linear-gradient(
                90deg,
                transparent,
                ${skill.color},
                transparent
              )
            `,
          }}
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          whileHover={{
            scaleX: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
          }}
        />

        {/* Icon */}

        <motion.div
          className="relative w-12 h-12 rounded-2xl flex items-center justify-center border"
          style={{
            color: skill.color,
            background: `${skill.color}12`,
            borderColor: `${skill.color}30`,
          }}
          whileHover={{
            scale: 1.12,
            rotate: -5,
            boxShadow: `0 0 32px ${skill.glow}`,
          }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 16,
          }}
        >
          <Icon
            size={24}
            strokeWidth={1.8}
          />

          {/* Live indicator */}

          <motion.span
            className="absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full"
            style={{
              background: skill.color,
              boxShadow: `0 0 12px ${skill.color}`,
            }}
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.65, 1, 0.65],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Name */}

        <div className="relative mt-5">
          <h4 className="text-[15px] font-medium text-white/90">
            {skill.name}
          </h4>

          <div className="flex items-center gap-2 mt-3">
            <motion.span
              className="h-[2px] rounded-full"
              style={{
                background: skill.color,
                boxShadow: `0 0 8px ${skill.color}`,
              }}
              initial={{
                width: 18,
              }}
              whileHover={{
                width: 45,
              }}
            />

            <span
              className="text-[8px] uppercase tracking-[0.25em]"
              style={{
                color: `${skill.color}85`,
              }}
            >
              Technology
            </span>
          </div>
        </div>

        {/* Bottom line */}

        <motion.div
          className="absolute bottom-0 left-0 h-[2px]"
          style={{
            background: `
              linear-gradient(
                90deg,
                ${skill.color},
                transparent
              )
            `,
            boxShadow: `0 0 14px ${skill.color}`,
          }}
          initial={{
            width: "0%",
          }}
          whileHover={{
            width: "75%",
          }}
          transition={{
            duration: 0.5,
          }}
        />

        {/* Corner */}

        <div
          className="absolute bottom-4 right-4 w-5 h-5 border-r border-b rounded-br-md opacity-20 group-hover:opacity-80 transition-opacity"
          style={{
            borderColor: skill.color,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   CATEGORY
   ========================================================= */

function SkillCategory({
  group,
  index,
}: {
  group: SkillGroup;
  index: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-80px",
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Category heading */}

      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="flex items-center gap-3">

            <motion.span
              className="w-2 h-2 rounded-full"
              style={{
                background: group.color,
                boxShadow: `0 0 14px ${group.color}`,
              }}
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            <h3
              className="text-sm font-medium"
              style={{
                color: group.color,
              }}
            >
              {group.title}
            </h3>
          </div>
        </div>

        <span
          className="hidden sm:block text-[9px] uppercase tracking-[0.3em]"
          style={{
            color: `${group.color}55`,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Category divider */}

      <div className="relative h-px bg-white/[0.06] mb-5 overflow-hidden">

        <motion.div
          className="absolute left-0 top-0 h-px w-[38%]"
          style={{
            background: `
              linear-gradient(
                90deg,
                ${group.color},
                ${group.secondary},
                transparent
              )
            `,
            boxShadow: `0 0 12px ${group.color}`,
          }}
          initial={{
            scaleX: 0,
            transformOrigin: "left",
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>

      {/* Cards */}

      <div
        className={
          group.skills.length === 4
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        }
      >
        {group.skills.map((skill, skillIndex) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={skillIndex}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN SKILLS
   ========================================================= */

export function Skills() {
  return (
    <section
      id="skills"
      className="section relative overflow-hidden"
      style={{
        background: "#07080c",
      }}
    >
      <SkillsBackground />

      {/* Top fade */}

      <div
        className="absolute top-0 left-0 right-0 h-44 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #07080c 0%, transparent 100%)",
        }}
      />

      {/* Main content */}

      <div className="container-max relative z-10">

        {/* =================================================
            HEADER
            ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <motion.p
            className="text-xs tracking-[0.28em] uppercase mb-3"
            style={{
              color: "#8b5cf6",
            }}
          >
            Skills
          </motion.p>

          <h2
            className="
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-semibold
              tracking-tight
              text-white
              max-w-3xl
            "
          >
            A practical toolkit,
            <br />
            grouped by what it&apos;s for.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-white/45 max-w-2xl">
            Not a wall of logos — organized by the kind
            of problem each skill actually solves.
          </p>
        </motion.div>

        {/* =================================================
            CATEGORIES
            ================================================= */}

        <div className="mt-14 space-y-14">
          {skillGroups.map((group, index) => (
            <SkillCategory
              key={group.title}
              group={group}
              index={index}
            />
          ))}
        </div>

        {/* =================================================
            FOOTER
            ================================================= */}

        <motion.div
          className="mt-20 flex items-center justify-center gap-3"
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
            duration: 0.8,
          }}
        >
          <span
            className="w-10 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, #22c55e)",
            }}
          />

          <SparklesIcon />

          <span className="text-[9px] uppercase tracking-[0.35em] text-white/30">
            Always learning · Always building
          </span>

          <SparklesIcon />

          <span
            className="w-10 h-px"
            style={{
              background:
                "linear-gradient(90deg, #f97316, transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   SMALL SPARKLE
   ========================================================= */

function SparklesIcon() {
  return (
    <span
      className="text-purple-400 text-sm"
      aria-hidden="true"
    >
      ✦
    </span>
  );
}

export default Skills;