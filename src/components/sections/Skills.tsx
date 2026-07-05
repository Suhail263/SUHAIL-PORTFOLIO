import {
  SiPython, SiOpenjdk, SiC, SiCplusplus, SiHtml5, SiCss, SiJavascript,
  SiGit, SiGithub,
} from 'react-icons/si';
import { BarChart3, Brain, MessageSquare, Users, Lightbulb, Code2, Cloud, Database } from 'lucide-react';
import type { IconType } from 'react-icons';
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
  if (Icon) return <Icon size={22} />;
  const Fallback = LUCIDE_FALLBACK[name] ?? Code2;
  return <Fallback size={22} />;
}

export function Skills() {
  return (
    <section id="skills" className="section" style={{ background: 'var(--color-bg-warm)' }}>
      <div className="container-max">
        <SectionHeading
          eyebrow="Skills"
          title="A practical toolkit, grouped by what it's for."
          description="Not a wall of logos — organized by the kind of problem each skill actually solves."
        />

        <div className="grid gap-8">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <p className="text-sm font-medium mb-4" style={{ color: 'var(--color-text-muted)' }}>
                {group.category}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {group.items.map((item) => (
                  <TiltCard key={item} className="p-5 flex flex-col items-start gap-3">
                    <span style={{ color: 'var(--color-accent)' }}>
                      <SkillIcon name={item} />
                    </span>
                    <span className="text-sm font-medium">{item}</span>
                  </TiltCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
