import { profile, education, projects } from '@/data/resume';

export interface AvatarAction {
  type: 'navigate' | 'download' | 'external';
  target: string;
}

export interface AvatarResponse {
  text: string;
  action?: AvatarAction;
}

const BASE_URL = import.meta.env.BASE_URL;

/* =========================================================================
   RESUME KNOWLEDGE BASE RESPONSES (STRICTLY ABOUT SUHAIL KHAN)
   ========================================================================= */

const greetingResponse = (): AvatarResponse => ({
  text: `Hello! I'm Suhail's personal AI guide. I'm here exclusively to answer questions about Suhail Khan, his resume, projects, skills, education, and career experience. How can I help you today?`,
});

const aboutResponse = (): AvatarResponse => ({
  text: `${profile.name} is a passionate Computer Science Engineering graduate specializing in Data Science and Artificial Intelligence from Dr. MGR Educational and Research Institute, Chennai. He is actively seeking a Graduate Engineering Trainee position where he can apply his strong skills in Python, Machine Learning, Data Analytics, and Web Development to real-world engineering challenges.`,
  action: { type: 'navigate', target: '#about' },
});

const careerGoalResponse = (): AvatarResponse => ({
  text: `Suhail is actively seeking a Graduate Engineering Trainee position in Data Science, Artificial Intelligence, or Full Stack Development. He brings hands-on experience in machine learning workflows, data analytics with Python and IBM Cognos, and full-stack web applications. You can contact him directly to discuss open opportunities!`,
  action: { type: 'navigate', target: '#contact' },
});

const educationResponse = (): AvatarResponse => {
  const btech = education[0];
  const twelveth = education[1];
  return {
    text: `Suhail is pursuing his ${btech.degree} at ${btech.institution} (${btech.period}), maintaining a current CGPA of 7.67. He completed his 12th Standard with a score of ${twelveth.detail.replace('Percentage: ', '')}.`,
    action: { type: 'navigate', target: '#education' },
  };
};

const cgpaResponse = (): AvatarResponse => ({
  text: `Suhail's current CGPA is 7.67 in his B.Tech Computer Science Engineering program with specialization in Data Science & AI at Dr. MGR Educational and Research Institute, Chennai.`,
  action: { type: 'navigate', target: '#education' },
});

const collegeResponse = (): AvatarResponse => ({
  text: `Suhail studies at Dr. MGR Educational and Research Institute in Chennai, Tamil Nadu, pursuing his B.Tech in Computer Science Engineering (Data Science & AI) from 2023 to 2027.`,
  action: { type: 'navigate', target: '#education' },
});

const allSkillsResponse = (): AvatarResponse => ({
  text: `Suhail's technical toolkit includes: Programming in Python, Java, C, and C++; Web Technologies including HTML, CSS, and JavaScript; Cloud Platforms like AWS EC2, Snapshot Management, and Cloud Storage; Tools like Git, GitHub, and IBM Cognos BI; along with Machine Learning and Data Analytics fundamentals.`,
  action: { type: 'navigate', target: '#skills' },
});

const pythonSkillsResponse = (): AvatarResponse => ({
  text: `Python is one of Suhail's strongest programming languages. He has utilized Python for data science workflows, machine learning model development, automated expense tracking applications, and completed an internship focused on Python for Data Science at Codebind Technologies.`,
  action: { type: 'navigate', target: '#skills' },
});

const javaSkillsResponse = (): AvatarResponse => ({
  text: `Suhail is proficient in Java and holds an official IBM Java Certification earned in 2024, demonstrating strong core object-oriented programming concepts.`,
  action: { type: 'navigate', target: '#skills' },
});

const webSkillsResponse = (): AvatarResponse => ({
  text: `Suhail's web development capabilities include HTML, CSS, and modern JavaScript. He applied these skills during his Web Development Internship at Cognifyz Technologies and in building his Student Login & Dashboard web application.`,
  action: { type: 'navigate', target: '#skills' },
});

const cloudSkillsResponse = (): AvatarResponse => ({
  text: `Suhail has practical cloud computing knowledge on AWS, including EC2 instance deployment, snapshot management, and cloud storage services. He also completed a comprehensive 60-hour AWS Cloud Computing Training with Advantage Pro in 2025 and holds an IBM Introduction to Cloud certification.`,
  action: { type: 'navigate', target: '#skills' },
});

const allProjectsResponse = (): AvatarResponse => ({
  text: `Suhail has built three major portfolio projects: 1) The Student Login & Dashboard Web Application in JavaScript; 2) An automated Expense Tracker Application in Python; and 3) Netflix Stock Data Analysis built with IBM Cognos BI. Would you like me to explain any of these in detail?`,
  action: { type: 'navigate', target: '#projects' },
});

const studentLoginProjectResponse = (): AvatarResponse => {
  const p = projects.find((item) => item.slug === 'student-login-dashboard') || projects[0];
  return {
    text: `The Student Login & Dashboard Web Application is a secure authentication and user dashboard built with HTML, CSS, and JavaScript. It features robust input validation to prevent common authentication vulnerabilities, paired with an intuitive, responsive student dashboard interface.`,
    action: { type: 'navigate', target: `/projects/${p.slug}` },
  };
};

const expenseTrackerProjectResponse = (): AvatarResponse => {
  const p = projects.find((item) => item.slug === 'expense-tracker') || projects[1];
  return {
    text: `The Expense Tracker Application is a Python application engineered to automatically track, parse, and categorize daily personal expenses. It generates detailed financial summary reports to enable effective personal budget monitoring.`,
    action: { type: 'navigate', target: `/projects/${p.slug}` },
  };
};

const netflixProjectResponse = (): AvatarResponse => {
  const p = projects.find((item) => item.slug === 'netflix-stock-analysis') || projects[2];
  return {
    text: `The Netflix Stock Data Analysis project uses IBM Cognos BI to transform raw financial stock records into interactive analytical dashboards and executive reports, extracting market trend insights through structured data grouping and filtering.`,
    action: { type: 'navigate', target: `/projects/${p.slug}` },
  };
};

const allInternshipsResponse = (): AvatarResponse => ({
  text: `Suhail has completed two industry internships: 1) Web Development Intern at Cognifyz Technologies, where he developed responsive front-end features using HTML, CSS, and JavaScript; and 2) Python for Data Science Intern at Codebind Technologies, where he gained hands-on experience in data workflows and analysis.`,
  action: { type: 'navigate', target: '#internship' },
});

const cognifyzInternshipResponse = (): AvatarResponse => ({
  text: `During his Web Development Internship at Cognifyz Technologies, Suhail assisted in developing front-end web features using HTML, CSS, and JavaScript, following modern software engineering workflows.`,
  action: { type: 'navigate', target: '#internship' },
});

const codebindInternshipResponse = (): AvatarResponse => ({
  text: `At Codebind Technologies, Suhail completed an intensive Python for Data Science internship, where he mastered data handling workflows, analytical programming, and fundamental data science techniques using Python.`,
  action: { type: 'navigate', target: '#internship' },
});

const allCertificatesResponse = (): AvatarResponse => ({
  text: `Suhail holds 9 verified certifications across AI, Cloud, and Software Development. Notable ones include: AWS Cloud Computing Training (60 Hours) with Advantage Pro, NPTEL Mobile Virtual Reality & AI, IBM Java Certificate, Infosys Springboard AI & Python, and IBM Introduction to Cloud. You can view all certificates in the gallery!`,
  action: { type: 'navigate', target: '#certificates' },
});

const contactResponse = (): AvatarResponse => ({
  text: `You can reach Suhail directly via email at ${profile.email}, by phone at +91 ${profile.phone}, or connect on LinkedIn at linkedin.com/in/suhailkhan61. He is based in Chennai, India.`,
  action: { type: 'navigate', target: '#contact' },
});

const locationResponse = (): AvatarResponse => ({
  text: `Suhail is based in Chennai, Tamil Nadu, India. He is open to on-site roles in Chennai as well as relocation and remote opportunities.`,
  action: { type: 'navigate', target: '#contact' },
});

const downloadResumeResponse = (): AvatarResponse => ({
  text: `Downloading Suhail Khan's verified resume right now. You can also view all project details, skills, and certifications right here on this portfolio.`,
  action: {
    type: 'download',
    target: `${BASE_URL}resume/Suhail_Khan_Resume.pdf`,
  },
});

/* =========================================================================
   STRICT OUT-OF-SCOPE DECLINATION
   (Will NOT answer questions outside Suhail's resume)
   ========================================================================= */

const outOfScopeResponse = (): AvatarResponse => ({
  text: `I am Suhail's dedicated AI guide. I only answer questions directly related to Suhail Khan's resume, skills, projects, education, internships, and career background. Please feel free to ask me anything about his qualifications or portfolio!`,
});

/* =========================================================================
   INTENT PARSER & DISPATCHER
   ========================================================================= */

export function getAvatarResponse(rawQuery: string): AvatarResponse {
  const q = rawQuery.trim().toLowerCase();

  // 1. Empty or very short queries
  if (!q) return greetingResponse();

  // 2. Greetings
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|sup|yo)\b/.test(q) && q.length < 25) {
    return greetingResponse();
  }

  // 3. Resume Download
  if (/(download|get|give me|view|pdf|copy of).*(resume|cv)\b/.test(q) || /^(resume|cv)\b/.test(q)) {
    return downloadResumeResponse();
  }

  // 4. Contact & Personal Info
  if (/(contact|reach|email|phone|call|message|touch with|connect with)\b/.test(q)) {
    return contactResponse();
  }
  if (/(where.*(live|stay|from|located)|location|city|address|chennai)\b/.test(q)) {
    return locationResponse();
  }
  if (/(linkedin|github|profile link|social)\b/.test(q)) {
    return contactResponse();
  }

  // 5. Job / Hire / Career Goal / Availability
  if (/(hire|job|role|position|get|graduate engineering trainee|seeking|available|fresher|work with|opportunity)\b/.test(q)) {
    return careerGoalResponse();
  }

  // 6. Education / Academics / College / CGPA / Grades
  if (/(cgpa|gpa|marks|percentage|score|grade)\b/.test(q)) {
    return cgpaResponse();
  }
  if (/(college|university|institute|school|mgr|12th|hsc)\b/.test(q)) {
    return collegeResponse();
  }
  if (/(education|degree|b\.?tech|graduation|study|studied|academics)\b/.test(q)) {
    return educationResponse();
  }

  // 7. Specific Projects
  if (/(student login|dashboard web|login app|authentication project)\b/.test(q)) {
    return studentLoginProjectResponse();
  }
  if (/(expense tracker|budget|financial report|expense app)\b/.test(q)) {
    return expenseTrackerProjectResponse();
  }
  if (/(netflix|stock|cognos project|cognos bi analysis)\b/.test(q)) {
    return netflixProjectResponse();
  }
  if (/(project|portfolio work|built|created|developed|applications|apps)\b/.test(q)) {
    return allProjectsResponse();
  }

  // 8. Specific Internships
  if (/(cognifyz|web development intern)\b/.test(q)) {
    return cognifyzInternshipResponse();
  }
  if (/(codebind|python intern|data science intern)\b/.test(q)) {
    return codebindInternshipResponse();
  }
  if (/(internship|intern|work experience|practical experience)\b/.test(q)) {
    return allInternshipsResponse();
  }

  // 9. Specific Skills
  if (/(python)\b/.test(q)) {
    return pythonSkillsResponse();
  }
  if (/(java)\b/.test(q)) {
    return javaSkillsResponse();
  }
  if (/(html|css|javascript|web development|frontend)\b/.test(q)) {
    return webSkillsResponse();
  }
  if (/(aws|cloud|ec2|cloud platform)\b/.test(q)) {
    return cloudSkillsResponse();
  }
  if (/(cognos|bi|business intelligence|analytics|machine learning|ml)\b/.test(q)) {
    return allSkillsResponse();
  }
  if (/(skill|tech stack|tools|technologies|languages|abilities|programming|what does he know)\b/.test(q)) {
    return allSkillsResponse();
  }

  // 10. Certifications
  if (/(certif|credential|nptel|infosys|advantage pro|ibm)\b/.test(q)) {
    return allCertificatesResponse();
  }

  // 11. General Questions about Suhail
  if (/(who is|tell me about|about|introduce|bio|summary|background|strengths)\b.*(suhail|him|candidate|developer|engineer|yourself|you)?/.test(q) ||
      /(suhail khan|suhail)\b/.test(q)) {
    return aboutResponse();
  }

  // 12. Direct section navigation queries
  if (/(show|open|go to).*(project)/.test(q)) return allProjectsResponse();
  if (/(show|open|go to).*(skill)/.test(q)) return allSkillsResponse();
  if (/(show|open|go to).*(certif)/.test(q)) return allCertificatesResponse();
  if (/(show|open|go to).*(intern)/.test(q)) return allInternshipsResponse();
  if (/(show|open|go to).*(education|college)/.test(q)) return educationResponse();
  if (/(show|open|go to).*(contact)/.test(q)) return contactResponse();

  // 13. STRICT GUARD: If the question is outside Suhail's resume, decline politely!
  return outOfScopeResponse();
}

export const quickPrompts = [
  'Tell me about Suhail',
  'What is his education & CGPA?',
  'What are his core skills?',
  'Explain his projects',
  'What internships has he done?',
  'Show his certifications',
  'Download resume',
  'How to contact Suhail?',
];
