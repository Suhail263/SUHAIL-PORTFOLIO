import {
  SiPython,
  SiOpenjdk,
  SiC,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiGit,
  SiGithub,
} from 'react-icons/si';

import {
  BarChart3,
  Brain,
  MessageSquare,
  Users,
  Lightbulb,
  Code2,
  Cloud,
  Database,
} from 'lucide-react';

import type { IconType } from 'react-icons';

import { motion } from 'framer-motion';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { skillGroups } from '@/data/resume';

const ICON_MAP: Record<string, IconType> = {
  Python: SiPython,
  Java: SiOpenjdk,
  C: SiC,
  'C++': SiCplusplus,
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  Git: SiGit,
  GitHub: SiGithub,
};

const LUCIDE_FALLBACK: Record<string, typeof BarChart3> = {
  'Data Analytics': BarChart3,
  'Machine Learning Fundamentals': Brain,
  Communication: MessageSquare,
  'Team Collaboration': Users,
  'Critical Thinking': Lightbulb,
  'Cognos BI': Database,
  'AWS EC2': Cloud,
  'Snapshot Management': Cloud,
  'Storage Services': Database,
};

function SkillIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name];

  if (Icon) return <Icon size={24} />;

  const Fallback = LUCIDE_FALLBACK[name] ?? Code2;

  return <Fallback size={24} />;
}

export function Skills() {
  return (
    <section
      id="skills"
      className="section relative overflow-hidden bg-[#030814]"
    >
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/skills-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* DARK OVERLAY */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(3, 8, 20, 0.97) 0%,
              rgba(3, 8, 20, 0.91) 40%,
              rgba(3, 8, 20, 0.78) 75%,
              rgba(3, 8, 20, 0.68) 100%
            ),
            linear-gradient(
              180deg,
              rgba(3, 8, 20, 0.65) 0%,
              rgba(3, 8, 20, 0.30) 50%,
              rgba(3, 8, 20, 0.90) 100%
            )
          `,
        }}
      />

      {/* BLUE GLOW */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 78% 35%, rgba(0, 140, 255, 0.12), transparent 42%)',
        }}
      />

      {/* MAIN CONTENT */}
      <div className="container-max relative z-10">
        {/* SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            eyebrow="Skills"
            title="A practical toolkit, grouped by what it's for."
            description="Not a wall of logos — organized by the kind of problem each skill actually solves."
          />
        </motion.div>

        {/* SKILL GROUPS */}
        <div className="grid gap-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: groupIndex * 0.08,
              }}
            >
              {/* CATEGORY TITLE */}
              <p className="text-sm font-medium mb-4 text-white/65">
                {group.category}
              </p>

              {/* SKILL CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {group.items.map((item) => (
                  <TiltCard
                    key={item}
                    className="p-5 flex flex-col items-start gap-3 border border-cyan-400/15 bg-[#071327]/75 backdrop-blur-xl hover:border-cyan-400/50 hover:bg-[#0b1d38]/90 transition-all duration-300"
                  >
                    {/* ICON */}
                    <span className="text-blue-400">
                      <SkillIcon name={item} />
                    </span>

                    {/* SKILL NAME */}
                    <span className="text-sm font-medium text-white/90">
                      {item}
                    </span>
                  </TiltCard>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}