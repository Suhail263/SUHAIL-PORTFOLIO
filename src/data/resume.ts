// Single source of truth for all site content.
// Every section component AND the avatar's Q&A logic read from this file,
// so nothing is ever duplicated or inconsistent across the site.

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  detail: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  year: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string;
  techStack: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  challenges: string;
  futureImprovements: string;
}

export interface InternshipItem {
  role: string;
  organization: string;
  period?: string;
  responsibilities: string[];
  skillsLearned: string[];
}

export interface CertificateItem {
  title: string;
  year?: string;
}

export const profile: Profile = {
  name: 'Suhail Khan C',
  role: 'Graduate Engineering Trainee — Data Science & AI',
  tagline: 'Building thoughtful, data-driven software.',
  phone: '7845314386',
  email: 'roshanu143roshan@gmail.com',
  // Left blank intentionally — your resume didn't include real GitHub/LinkedIn
  // URLs, and a guessed handle risks linking to a real, unrelated person (as
  // happened before). Fill these in with your actual profile URLs and the
  // site will show the links automatically; until then they stay hidden.
  linkedin: 'https://www.linkedin.com/in/suhailkhan61/',
  github: 'https://github.com/Suhail263',
  summary:
    'Enthusiastic B.Tech graduate in Computer Science Engineering, specializing in Data Science and Artificial Intelligence, seeking a Graduate Engineering Trainee position. Strong foundation in data analytics, machine learning, and AI concepts, with a passion for applying technical knowledge to real-world problems. A quick learner and collaborative team player, eager to contribute to innovative projects while gaining hands-on industry experience.',
};

export const skillGroups: SkillGroup[] = [
  { category: 'Programming Languages', items: ['Python', 'Java', 'C', 'C++'] },
  { category: 'Web Technologies', items: ['HTML', 'CSS', 'JavaScript'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Cognos BI'] },
  { category: 'Cloud Platforms', items: ['AWS EC2', 'Snapshot Management', 'Storage Services'] },
  { category: 'Core Concepts', items: ['Data Analytics', 'Machine Learning Fundamentals'] },
  { category: 'Soft Skills', items: ['Communication', 'Team Collaboration', 'Critical Thinking'] },
];

export const education: EducationItem[] = [
  {
    degree: 'B.Tech — Computer Science Engineering (Data Science & AI)',
    institution: 'Dr. MGR Educational and Research Institute, Chennai',
    period: '2023 – 2027',
    detail: 'Current CGPA: 7.67',
  },
  {
    degree: '12th Standard',
    institution: '',
    period: '',
    detail: 'Percentage: 67%',
  },
];

export const projects: ProjectItem[] = [
  {
    slug: 'student-login-dashboard',
    title: 'Student Login & Dashboard Web Application',
    year: '2025',
    summary: 'A secure student authentication system with a responsive dashboard interface.',
    problem:
      'Students needed a reliable, secure way to log in and access a personal dashboard without exposing the system to common authentication vulnerabilities.',
    solution:
      'Built a secure authentication system with input validation, and a responsive interface designed to make navigation and daily use straightforward.',
    architecture:
      'Front-end interface communicating with a validated authentication flow, structured for clarity and easy extension.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Developed a secure authentication system with validation features',
      'Designed a responsive interface to improve usability',
    ],
    challenges: 'Ensuring form validation covered edge cases without harming the user experience.',
    futureImprovements: 'Add role-based access control and persistent session management.',
  },
  {
    slug: 'expense-tracker',
    title: 'Expense Tracker Application',
    year: '2025',
    summary: 'A Python application that automatically tracks and categorizes personal expenses.',
    problem: 'Manually tracking day-to-day expenses and understanding spending patterns is tedious and error-prone.',
    solution:
      'Created an automated system to track and categorize expenses, then generate financial reports to support personal budget monitoring.',
    architecture: 'Python-based logic layer handling categorization rules and report generation.',
    techStack: ['Python'],
    highlights: [
      'Created an automated system to track and categorize expenses',
      'Generated financial reports for personal budget monitoring',
    ],
    challenges: 'Designing categorization logic flexible enough for varied real-world spending habits.',
    futureImprovements: 'Add data visualization and multi-month trend analysis.',
  },
  {
    slug: 'netflix-stock-analysis',
    title: 'Netflix Stock Data Analysis using Cognos',
    year: '2024',
    summary: 'Dashboards and analytical reports on Netflix stock data built with IBM Cognos.',
    problem: 'Raw stock data needed to be turned into a clear, structured, and explorable analytical view.',
    solution: 'Built dashboards and analytical reports using IBM Cognos, extracting insights through structured data filtering and grouping.',
    architecture: 'IBM Cognos BI layer on top of structured stock data, organized into filterable, groupable views.',
    techStack: ['IBM Cognos', 'Data Analytics'],
    highlights: [
      'Built dashboards and analytical reports using IBM Cognos',
      'Extracted insights through structured data filtering and grouping',
    ],
    challenges: 'Structuring the data model so filtering and grouping remained fast and intuitive.',
    futureImprovements: 'Extend to real-time data feeds and predictive trend indicators.',
  },
];

export const internships: InternshipItem[] = [
  {
    role: 'Web Development Intern',
    organization: 'Cognifyz Technologies',
    responsibilities: ['Assisted in developing front-end features using HTML, CSS, and JavaScript'],
    skillsLearned: ['HTML', 'CSS', 'JavaScript', 'Front-end development workflow'],
  },
  {
    role: 'Python for Data Science Intern',
    organization: 'Codebind Technologies',
    responsibilities: ['Completed a Python for Data Science internship, gaining hands-on experience with data workflows'],
    skillsLearned: ['Python', 'Data Science fundamentals'],
  },
];

export const certificates: CertificateItem[] = [
  { title: 'IBM Java Certificate', year: '2024' },
  { title: 'AWS Cloud Computing Training — Advantage Pro (60 hours)' },
  { title: 'NPTEL — Mobile Virtual Reality & AI' },
  { title: 'Introduction to Artificial Intelligence — Infosys Springboard' },
  { title: 'Basics of Python — Infosys Springboard' },
  { title: 'IBM Introduction to Cloud' },
  { title: 'IBM Business Intelligence' },
  { title: 'Web Development Internship Certificate' },
];
