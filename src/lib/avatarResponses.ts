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
   CONVERSATIONAL CHATGPT-STYLE RESPONSES (STRICTLY ABOUT SUHAIL'S RESUME)
   ========================================================================= */

const greetingResponse = (): AvatarResponse => ({
  text: `Hi! I'm Suhail's AI guide. I'm here to answer any questions about Suhail Khan, his resume, skills, projects, and education. What would you like to know about him?`,
});

const aboutResponse = (): AvatarResponse => ({
  text: `Suhail Khan is a Computer Science and Engineering student specializing in Data Science and AI at Dr. MGR Educational and Research Institute in Chennai. He maintains a 7.67 CGPA and has hands-on experience in machine learning, Python, and web development. He is actively looking for a Graduate Engineering Trainee role.`,
  action: { type: 'navigate', target: '#about' },
});

const careerGoalResponse = (): AvatarResponse => ({
  text: `Suhail is actively looking for a Graduate Engineering Trainee position in Data Science, Artificial Intelligence, or Full Stack Development. He brings practical experience in Python, machine learning workflows, and data analytics. You can reach out to him directly to discuss open opportunities!`,
  action: { type: 'navigate', target: '#contact' },
});

const educationResponse = (): AvatarResponse => {
  const btech = education[0];
  return {
    text: `Suhail is pursuing his ${btech.degree} at ${btech.institution}, graduating in 2027. He currently maintains a 7.67 CGPA, and completed his 12th standard with 67%.`,
    action: { type: 'navigate', target: '#education' },
  };
};

const cgpaResponse = (): AvatarResponse => ({
  text: `Suhail currently maintains a 7.67 CGPA in his B.Tech Computer Science program at Dr. MGR Educational and Research Institute in Chennai.`,
  action: { type: 'navigate', target: '#education' },
});

const collegeResponse = (): AvatarResponse => ({
  text: `Suhail studies at Dr. MGR Educational and Research Institute in Chennai, pursuing his B.Tech in Computer Science Engineering with specialization in Data Science and AI from 2023 to 2027.`,
  action: { type: 'navigate', target: '#education' },
});

const allSkillsResponse = (): AvatarResponse => ({
  text: `Suhail's main programming languages are Python, Java, C, and C++. For web development, he works with HTML, CSS, and JavaScript. He also has practical experience with AWS cloud services, Git, and IBM Cognos for data analytics.`,
  action: { type: 'navigate', target: '#skills' },
});

const pythonSkillsResponse = (): AvatarResponse => ({
  text: `Yes, absolutely! Python is one of Suhail's strongest languages. He has used it for data science workflows, machine learning models, and automated financial applications like his Expense Tracker.`,
  action: { type: 'navigate', target: '#skills' },
});

const javaSkillsResponse = (): AvatarResponse => ({
  text: `Yes, Suhail is proficient in Java and holds an official IBM Java Certificate earned in 2024, demonstrating strong object-oriented programming fundamentals.`,
  action: { type: 'navigate', target: '#skills' },
});

const webSkillsResponse = (): AvatarResponse => ({
  text: `For web development, Suhail builds with HTML, CSS, and modern JavaScript. He applied these skills during his Web Development Internship at Cognifyz Technologies and in building his Student Login Dashboard.`,
  action: { type: 'navigate', target: '#skills' },
});

const cloudSkillsResponse = (): AvatarResponse => ({
  text: `Suhail has practical cloud experience with AWS, including EC2 instances, storage services, and snapshot management. He completed 60 hours of AWS Cloud Computing training with Advantage Pro and holds an IBM Cloud certification.`,
  action: { type: 'navigate', target: '#skills' },
});

const allProjectsResponse = (): AvatarResponse => ({
  text: `Suhail has three featured projects: a Student Login and Dashboard Web Application in JavaScript, an automated Expense Tracker in Python, and a Netflix Stock Data Analysis built using IBM Cognos BI. Which one would you like to hear more about?`,
  action: { type: 'navigate', target: '#projects' },
});

const studentLoginProjectResponse = (): AvatarResponse => {
  const p = projects.find((item) => item.slug === 'student-login-dashboard') || projects[0];
  return {
    text: `The Student Login and Dashboard is a secure authentication system built with HTML, CSS, and JavaScript. It features input validation to protect user credentials, paired with a clean, responsive student dashboard.`,
    action: { type: 'navigate', target: `/projects/${p.slug}` },
  };
};

const expenseTrackerProjectResponse = (): AvatarResponse => {
  const p = projects.find((item) => item.slug === 'expense-tracker') || projects[1];
  return {
    text: `The Expense Tracker is an automated Python application that categorizes daily expenses and produces financial summary reports to help track personal budgets.`,
    action: { type: 'navigate', target: `/projects/${p.slug}` },
  };
};

const netflixProjectResponse = (): AvatarResponse => {
  const p = projects.find((item) => item.slug === 'netflix-stock-analysis') || projects[2];
  return {
    text: `The Netflix Stock Data Analysis project uses IBM Cognos BI to transform raw market data into interactive analytical dashboards and reports, uncovering financial trends through structured filtering.`,
    action: { type: 'navigate', target: `/projects/${p.slug}` },
  };
};

const allInternshipsResponse = (): AvatarResponse => ({
  text: `Suhail has completed two internships: a Web Development internship at Cognifyz Technologies, where he built front-end features, and a Python for Data Science internship at Codebind Technologies.`,
  action: { type: 'navigate', target: '#internship' },
});

const cognifyzInternshipResponse = (): AvatarResponse => ({
  text: `During his Web Development internship at Cognifyz Technologies, Suhail assisted in building front-end web features with HTML, CSS, and JavaScript, following modern industry workflows.`,
  action: { type: 'navigate', target: '#internship' },
});

const codebindInternshipResponse = (): AvatarResponse => ({
  text: `At Codebind Technologies, Suhail completed an intensive Python for Data Science internship, where he gained hands-on experience handling data workflows and analytical programming.`,
  action: { type: 'navigate', target: '#internship' },
});

const allCertificatesResponse = (): AvatarResponse => ({
  text: `Suhail holds nine verified certifications, including AWS Cloud Computing training from Advantage Pro, NPTEL Mobile Virtual Reality and AI, IBM Java, and AI and Python certifications from Infosys Springboard.`,
  action: { type: 'navigate', target: '#certificates' },
});

const contactResponse = (): AvatarResponse => ({
  text: `You can reach Suhail by email at ${profile.email}, by phone at +91 ${profile.phone}, or connect with him on LinkedIn. He is based in Chennai, India.`,
  action: { type: 'navigate', target: '#contact' },
});

const locationResponse = (): AvatarResponse => ({
  text: `Suhail is based in Chennai, Tamil Nadu, India. He is open to on-site opportunities in Chennai, as well as relocation and remote roles.`,
  action: { type: 'navigate', target: '#contact' },
});

const downloadResumeResponse = (): AvatarResponse => ({
  text: `Sure thing! Downloading Suhail's official resume for you right now.`,
  action: {
    type: 'download',
    target: `${BASE_URL}resume/Suhail_Khan_Resume.pdf`,
  },
});

const whyHireResponse = (): AvatarResponse => ({
  text: `Suhail brings a strong foundation in Computer Science specializing in Data Science and AI, combined with real hands-on experience from two internships at Cognifyz and Codebind. With 9 industry certifications, a 7.67 CGPA, and verified projects in Python, machine learning, and web development, he is proactive, technically sound, and eager to contribute as a Graduate Engineering Trainee!`,
  action: { type: 'navigate', target: '#about' },
});

const thankYouResponse = (): AvatarResponse => ({
  text: `You're very welcome! Please feel free to ask if you'd like to explore more about Suhail's projects, technical skills, or resume details.`,
});

const goodbyeResponse = (): AvatarResponse => ({
  text: `Goodbye! Thank you for visiting Suhail's portfolio. Have a wonderful day ahead!`,
});

/* =========================================================================
   STRICT OUT-OF-SCOPE GUARDRAIL
   (Politely declines any non-resume question)
   ========================================================================= */

const outOfScopeResponse = (): AvatarResponse => ({
  text: `Sorry, I can't answer that! I'm Suhail's personal AI guide, and I can only answer questions about Suhail Khan, his resume, projects, skills, and background. Feel free to ask me anything about Suhail!`,
});

/* =========================================================================
   INTENT MATCHER
   ========================================================================= */

export function getAvatarResponse(rawQuery: string): AvatarResponse {
  const q = rawQuery.trim().toLowerCase();

  // 1. Empty query
  if (!q) return greetingResponse();

  // 2. Greetings
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|sup|yo|hi there|hello there)\b/.test(q) && q.length < 25) {
    return greetingResponse();
  }

  // 3. Courtesy (thanks / bye)
  if (/\b(thank you|thanks|thx|appreciate it)\b/.test(q)) {
    return thankYouResponse();
  }
  if (/^(bye|goodbye|see ya|cya|farewell)\b/.test(q)) {
    return goodbyeResponse();
  }

  // 4. Strict filter for general non-resume requests:
  // e.g. "write python code", "what is python", "tell me a joke", "who is elon musk", "weather"
  const isCodeOrTaskRequest = /(write|code|create|generate|implement|solve|debug|build me|give me|program).*(code|script|algorithm|program|function|class|query|app|website|game|solution)/i.test(q);
  const isGeneralDef = /^(what is|explain|define|how does|how to use|how do i)\s+(python|java|aws|cloud|machine learning|c\+\+|javascript|html|css|data science)\b/i.test(q);
  const isTriviaOrUnrelated = /\b(weather|president|prime minister|capital of|joke|poem|story|song|movie|game|sports|cricket|football|math|calculate|translate|news|elon musk|chatgpt|openai)\b/i.test(q);

  if (isCodeOrTaskRequest || isGeneralDef || isTriviaOrUnrelated) {
    return outOfScopeResponse();
  }

  // 5. Resume download
  if (/(download|get|give me|view|pdf|copy of).*(resume|cv)\b/.test(q) || /^(resume|cv)\b/.test(q)) {
    return downloadResumeResponse();
  }

  // 6. Why hire Suhail / strengths / suitability
  if (/(why (should (we|i) )?hire|strengths|unique|why choose|why suhail)\b/.test(q)) {
    return whyHireResponse();
  }

  // 7. Contact & Location
  if (/(contact|reach|email|phone|call|message|touch with|connect with)\b/.test(q)) {
    return contactResponse();
  }
  if (/(where.*(live|stay|from|located)|location|city|address|chennai)\b/.test(q)) {
    return locationResponse();
  }
  if (/(linkedin|github|profile link|social)\b/.test(q)) {
    return contactResponse();
  }

  // 8. Job, Hiring, Role, Availability
  if (/(hire|job|role|position|get|graduate engineering trainee|seeking|available|fresher|work with|opportunity)\b/.test(q)) {
    return careerGoalResponse();
  }

  // 9. Education, College, CGPA
  if (/(cgpa|gpa|marks|percentage|score|grade)\b/.test(q)) {
    return cgpaResponse();
  }
  if (/(college|university|institute|school|mgr|12th|hsc)\b/.test(q)) {
    return collegeResponse();
  }
  if (/(education|degree|b\.?tech|graduation|study|studied|academics)\b/.test(q)) {
    return educationResponse();
  }

  // 10. Specific Projects
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

  // 11. Internships
  if (/(cognifyz|web development intern)\b/.test(q)) {
    return cognifyzInternshipResponse();
  }
  if (/(codebind|python intern|data science intern)\b/.test(q)) {
    return codebindInternshipResponse();
  }
  if (/(internship|intern|work experience|practical experience)\b/.test(q)) {
    return allInternshipsResponse();
  }

  // 12. Specific Skills (Asking about Suhail's proficiency)
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

  // 13. Certifications
  if (/(certif|credential|nptel|infosys|advantage pro|ibm)\b/.test(q)) {
    return allCertificatesResponse();
  }

  // 14. General Questions about Suhail
  if (/(who is|tell me about|about|introduce|bio|summary|background)\b.*(suhail|him|candidate|developer|engineer|yourself|you)?/.test(q) ||
      /(suhail khan|suhail)\b/.test(q)) {
    return aboutResponse();
  }

  // 15. Direct section navigation requests
  if (/(show|open|go to).*(project)/.test(q)) return allProjectsResponse();
  if (/(show|open|go to).*(skill)/.test(q)) return allSkillsResponse();
  if (/(show|open|go to).*(certif)/.test(q)) return allCertificatesResponse();
  if (/(show|open|go to).*(intern)/.test(q)) return allInternshipsResponse();
  if (/(show|open|go to).*(education|college)/.test(q)) return educationResponse();
  if (/(show|open|go to).*(contact)/.test(q)) return contactResponse();

  // 16. STRICT OUT-OF-SCOPE REJECTION:
  // Any question outside Suhail's resume triggers "Sorry, I can't answer that!"
  return outOfScopeResponse();
}

export const quickPrompts = [
  'Tell me about Suhail',
  'Why hire Suhail?',
  'What is his education & CGPA?',
  'What are his core skills?',
  'Explain his projects',
  'What internships has he done?',
  'Show his certifications',
  'Download resume',
  'How to contact Suhail?',
];
