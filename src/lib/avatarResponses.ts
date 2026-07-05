import { profile, skillGroups, education, projects, internships, certificates } from '@/data/resume';

export interface AvatarAction {
  type: 'navigate' | 'download' | 'external';
  target: string;
}

export interface AvatarResponse {
  text: string;
  action?: AvatarAction;
}

const greeting = (): AvatarResponse => ({
  text: `Hi, I'm ${profile.name.split(' ')[0]}'s AI guide. I can tell you about his background, skills, projects, certifications, or internships — just ask, or use one of the quick prompts below.`,
});

const aboutSuhail = (): AvatarResponse => ({
  text: profile.summary,
});

const skillsAnswer = (): AvatarResponse => ({
  text: `${profile.name.split(' ')[0]}'s core skills span ${skillGroups.map((g) => g.category.toLowerCase()).join(', ')}. In particular: ${skillGroups
    .slice(0, 3)
    .map((g) => `${g.category} — ${g.items.join(', ')}`)
    .join('. ')}.`,
});

const educationAnswer = (): AvatarResponse => ({
  text: education.map((e) => `${e.degree}${e.institution ? ` at ${e.institution}` : ''} (${e.period || 'completed'}), ${e.detail}`).join('. '),
});

const projectsAnswer = (): AvatarResponse => ({
  text: `He's built ${projects.length} projects worth highlighting: ${projects.map((p) => p.title).join(', ')}. Ask me to explain any one of them by name.`,
});

const explainProject = (query: string): AvatarResponse => {
  const match = projects.find((p) => query.toLowerCase().includes(p.title.toLowerCase().split(' ')[0].toLowerCase()))
    ?? projects.find((p) => p.techStack.some((t) => query.toLowerCase().includes(t.toLowerCase())));
  if (!match) {
    return {
      text: `I'm not sure which project you mean. He's worked on: ${projects.map((p) => p.title).join(', ')}. Try naming one.`,
    };
  }
  return {
    text: `${match.title} (${match.year}): ${match.summary} Problem: ${match.problem} Solution: ${match.solution} Tech stack: ${match.techStack.join(', ')}.`,
    action: { type: 'navigate', target: `/projects/${match.slug}` },
  };
};

const certificationsAnswer = (): AvatarResponse => ({
  text: `He holds ${certificates.length} certifications, including ${certificates.slice(0, 4).map((c) => c.title).join(', ')}, and more — scroll to the Certificates section to see the full gallery.`,
  action: { type: 'navigate', target: '#certificates' },
});

const internshipAnswer = (): AvatarResponse => ({
  text: internships
    .map((i) => `${i.role} at ${i.organization}: ${i.responsibilities.join('; ')}. Skills gained: ${i.skillsLearned.join(', ')}.`)
    .join(' '),
});

const downloadResume = (): AvatarResponse => ({
  text: `Here's his resume — downloading it now.`,
  action: { type: 'download', target: '/resume/Suhail_Khan_Resume.pdf' },
});

const contactSuhail = (): AvatarResponse => ({
  text: `You can reach him directly at ${profile.email}, or use the contact form below. His LinkedIn and GitHub are linked in the navigation.`,
  action: { type: 'navigate', target: '#contact' },
});

const fallback = (): AvatarResponse => ({
  text: `I can tell you about ${profile.name.split(' ')[0]}, his skills, education, projects, internships, or certifications, and I can pull up his resume or contact details. What would you like to know?`,
});

export function getAvatarResponse(rawQuery: string): AvatarResponse {
  const q = rawQuery.trim().toLowerCase();

  if (!q) return greeting();
  if (/(hi|hello|hey)\b/.test(q) && q.length < 12) return greeting();
  if (/tell me about (suhail|him|yourself|you)|who is suhail|about suhail/.test(q)) return aboutSuhail();
  if (/skill/.test(q)) return skillsAnswer();
  if (/education|college|degree|cgpa|university/.test(q)) return educationAnswer();
  if (/explain (this|the) project|project details/.test(q)) return explainProject(q);
  if (/project/.test(q)) return projectsAnswer();
  if (/certif/.test(q)) return certificationsAnswer();
  if (/internship|intern\b/.test(q)) return internshipAnswer();
  if (/(download|get).*(resume|cv)/.test(q)) return downloadResume();
  if (/contact|reach|email|hire/.test(q)) return contactSuhail();

  return fallback();
}

export const quickPrompts = [
  'Tell me about Suhail',
  'Show his skills',
  'Show certifications',
  'Tell me about his internships',
  'Download resume',
  'Contact Suhail',
];
