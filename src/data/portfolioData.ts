export interface ProjectItem {
  id: string;
  name: string;
  title: string;
  description: string;
  longDescription?: string;
  language: string;
  topics: string[];
  stars: number;
  forks: number;
  html_url: string;
  homepage?: string;
  featured?: boolean;
  category: "Full Stack" | "Mobile App" | "Frontend" | "Backend" | "AI/ML" | "Systems";
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: {
    name: string;
    icon: string;
    level: string;
    category: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  score?: string;
  status?: string;
  logo?: string;
  description: string;
  highlights: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  description: string[];
  skills: string[];
}

export interface PublicationItem {
  title: string;
  conference: string;
  year: string;
  status: string;
  linkText?: string;
}

export interface LeadershipItem {
  role: string;
  organization: string;
  period: string;
  description: string[];
}

export const PERSONAL_INFO = {
  name: "Yash Wadhvani",
  handle: "yashwadhvani",
  title: "Full Stack & Mobile Engineer | AI/ML Specialist",
  roles: [
    "Full-Stack Developer",
    "Mobile App Engineer (React Native & Flutter)",
    "AI/ML Specialist",
    "M.Tech Advanced Computing Scholar",
    "Open Source Contributor",
  ],
  bio: "M.Tech Scholar in Advanced Computing at MANIT Bhopal & B.Tech CSE (AI/ML) Graduate from Karnavati University (CGPA 8.72). Experienced in building production web applications, cross-platform mobile apps (Flutter, React Native), and intelligent risk-minimization machine learning frameworks.",
  longBio: [
    "👋 Greetings! I'm Yash Wadhvani, an advanced computing engineer, full-stack developer, and AI/ML specialist with industry internship experience at Logion Solutions.",
    "I engineer robust digital products across the web and mobile ecosystem using React, Next.js, Nuxt.js, React Native, Flutter, Node.js, and Python. I have architected CRM platforms, integrated payment gateways (Razorpay, CCAvenue), and deployed production mobile applications to both the Google Play Store and Apple App Store.",
    "My research work on multi-factor urban safety and risk-aware navigation is published at the IEEE International Conference on AI Engineering and Innovations (AIEI 2026). Currently pursuing my M.Tech in Advanced Computing at Maulana Azad National Institute of Technology (MANIT), Bhopal.",
  ],
  location: "Bhopal / Ahmedabad, India",
  email: "yashwadhvani123@gmail.com",
  phone: "+91 99043 66478",
  whatsappUrl: "https://wa.me/919904366478",
  githubUrl: "https://github.com/YashWadhvani",
  linkedinUrl: "https://www.linkedin.com/in/yash-wadhvani",
  resumeUrl: "/assets/YashWadhvani_Resume.pdf",
  avatar: "/assets/YashBlob3.png",
  secondaryAvatar: "/assets/YashBlob1.png",
  stats: [
    { label: "GitHub Repositories", value: "27+" },
    { label: "B.Tech CGPA", value: "8.72" },
    { label: "Technical Competencies", value: "25+" },
    { label: "IEEE Publications", value: "1" },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "Code",
    skills: [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        level: "Advanced",
        category: "Language",
      },
      {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        level: "Advanced",
        category: "Language",
      },
      {
        name: "C / C++",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
        level: "Proficient",
        category: "Language",
      },
      {
        name: "JavaScript (ES6+)",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        level: "Expert",
        category: "Language",
      },
      {
        name: "SQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        level: "Advanced",
        category: "Language",
      },
      {
        name: "R",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg",
        level: "Intermediate",
        category: "Language",
      },
      {
        name: "PHP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
        level: "Intermediate",
        category: "Language",
      },
    ],
  },
  {
    title: "Web Development",
    icon: "Globe",
    skills: [
      {
        name: "React.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        level: "Expert",
        category: "Web",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
        level: "Advanced",
        category: "Web",
      },
      {
        name: "Nuxt.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg",
        level: "Advanced",
        category: "Web",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        level: "Advanced",
        category: "Web",
      },
      {
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        level: "Advanced",
        category: "Web",
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        level: "Advanced",
        category: "Web",
      },
      {
        name: "MERN Stack",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg",
        level: "Expert",
        category: "Web",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        level: "Advanced",
        category: "Web",
      },
      {
        name: "HTML5 & CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        level: "Expert",
        category: "Web",
      },
    ],
  },
  {
    title: "Mobile App Development",
    icon: "Smartphone",
    skills: [
      {
        name: "React Native",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        level: "Advanced",
        category: "Mobile",
      },
      {
        name: "Flutter",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
        level: "Advanced",
        category: "Mobile",
      },
      {
        name: "Context API",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        level: "Advanced",
        category: "Mobile",
      },
      {
        name: "AsyncStorage",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg",
        level: "Advanced",
        category: "Mobile",
      },
    ],
  },
  {
    title: "AI/ML & Core Computing",
    icon: "Cpu",
    skills: [
      {
        name: "Machine Learning",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        level: "Advanced",
        category: "AI/ML",
      },
      {
        name: "TensorFlow",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
        level: "Proficient",
        category: "AI/ML",
      },
      {
        name: "XGBoost & LSTM",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
        level: "Advanced",
        category: "AI/ML",
      },
      {
        name: "REST APIs",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
        level: "Expert",
        category: "Backend",
      },
      {
        name: "DBMS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        level: "Advanced",
        category: "Database",
      },
      {
        name: "WebSockets & Real-time",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg",
        level: "Advanced",
        category: "Backend",
      },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "Wrench",
    skills: [
      {
        name: "Git & GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        level: "Advanced",
        category: "Tools",
      },
      {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
        level: "Advanced",
        category: "Tools",
      },
      {
        name: "Postman",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
        level: "Advanced",
        category: "Tools",
      },
      {
        name: "WordPress",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg",
        level: "Advanced",
        category: "Tools",
      },
      {
        name: "Shopify",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/shopify/shopify-original.svg",
        level: "Proficient",
        category: "Tools",
      },
      {
        name: "Prismic CMS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
        level: "Proficient",
        category: "Tools",
      },
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "M.Tech in Advanced Computing",
    institution: "Maulana Azad National Institute of Technology (MANIT), Bhopal",
    period: "2026 – 2028",
    location: "Bhopal, Madhya Pradesh",
    status: "Ongoing Postgraduate Degree",
    description:
      "Advanced postgraduate studies in High-Performance Computing, Advanced Computer Architectures, Distributed Systems, Machine Intelligence, and Advanced Algorithms at a National Institute of Technology (NIT).",
    highlights: [
      "Specialization in Advanced Computing and intelligent systems",
      "Focus on distributed systems, scalable data engineering, and optimization models",
    ],
  },
  {
    degree: "B.Tech in Computer Science and Engineering (AI/ML)",
    institution: "Unitedworld Institute of Technology (UIT), Karnavati University",
    period: "July 2022 – June 2026",
    location: "Gandhinagar, Gujarat",
    score: "CGPA: 8.72",
    logo: "/assets/KarnavatiUniversity_Logo.png",
    description:
      "Comprehensive engineering curriculum specializing in Artificial Intelligence, Machine Learning, Deep Neural Networks, Algorithms, DBMS, Operating Systems, and Full-Stack Engineering.",
    highlights: [
      "Graduated with High Academic Distinction (CGPA: 8.72)",
      "Published research paper with IEEE on risk-aware personal navigation systems",
      "Active organizer of national tech symposia and cybersecurity hackathons",
    ],
  },
  {
    degree: "Senior Secondary Certificate (Grade 12 - CBSE Science)",
    institution: "Delhi Public School, Gandhinagar",
    period: "2020 – 2022",
    location: "Gandhinagar, Gujarat",
    score: "88.0%",
    logo: "/assets/dps_logo.png",
    description:
      "Completed Higher Secondary Education under the Central Board of Secondary Education (CBSE) with rigorous coursework in Physics, Chemistry, and Advanced Mathematics.",
    highlights: [
      "Achieved 88.0% aggregate in CBSE Senior School Board examinations",
      "Solid foundations in mathematical modeling, calculus, and computational reasoning",
    ],
  },
  {
    degree: "Secondary School Certificate (Grade 10 - CBSE)",
    institution: "Delhi Public School, Rajkot",
    period: "Up to 2020",
    location: "Rajkot, Gujarat",
    score: "90.2%",
    logo: "/assets/dps_logo.png",
    description:
      "Graduated secondary schooling with high honors under CBSE, developing early passion for computer science and technology.",
    highlights: [
      "Secured 90.2% aggregate in CBSE Grade 10 Board examinations",
      "Recognized for academic excellence and participation in technical competitions",
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Full Stack Development Intern",
    company: "Logion Solutions",
    period: "Feb 16, 2026 – May 16, 2026",
    type: "Internship",
    description: [
      "Developed and enhanced live web applications using Nuxt.js, Tailwind CSS, WordPress, JavaScript, and REST APIs, focusing on responsive UI and production-ready features.",
      "Built enterprise CRM modules including invoice generation, quotations, reporting, user management, KOT, delivery, product duplication, and automated email notifications.",
      "Integrated third-party payment and messaging services including Razorpay, CCAvenue, WhatsApp/Notifino, WebSockets, and real-time notification systems across business applications.",
      "Developed key features for the IPI Connect mobile application, including bulk lead upload, delivery-driver integration, booking workflows, and authentication; successfully deployed the app to Google Play Store and Apple App Store.",
    ],
    skills: ["Nuxt.js", "Tailwind CSS", "React Native", "REST APIs", "Razorpay", "CCAvenue", "WebSockets", "CRM"],
  },
  {
    role: "Web Dev Intern",
    company: "Logion Solutions",
    period: "June 2024 – Aug 2024",
    type: "Internship",
    description: [
      "Built and maintained websites using Nuxt.js, React Native, and WordPress for various high-growth client projects.",
      "Contributed significantly to Viral Sales, Carecay, Law Suit, and Daily Nudge platforms.",
      "Engineered and launched a Real-Time Metal Rates React Native mobile application for live commodity price tracking.",
    ],
    skills: ["Nuxt.js", "React Native", "WordPress", "JavaScript", "HTML/CSS"],
  },
  {
    role: "Freelance Web Developer",
    company: "Independent Client Engagements",
    period: "Ongoing",
    type: "Freelance",
    description: [
      "Developed and maintained client websites using WordPress and Shopify, including beodd.co and greensapio.com.",
      "Handled website customization, responsive UI development, performance improvements, SEO optimization, and payment gateway integrations.",
    ],
    skills: ["WordPress", "Shopify", "UI/UX", "SEO", "E-commerce"],
  },
];

export const PUBLICATIONS: PublicationItem[] = [
  {
    title: "A Multi-Factor Risk-Minimization Framework for Integrated Personal Safety and Navigation",
    conference: "IEEE International Conference on AI Engineering and Innovations (AIEI)",
    year: "2026",
    status: "Published / IEEE DOI",
    linkText: "IEEE AIEI 2026",
  },
];

export const LEADERSHIP: LeadershipItem[] = [
  {
    role: "Head Organizer – AriaRo 3.0",
    organization: "Karnavati University",
    period: "Mar 2025",
    description: [
      "Led the university-wide technical and cultural fest, coordinating speakers, distinguished guests, 2000+ participants, and university management.",
      "Spearheaded technical events, hackathons, and web presence with seamless Lu.ma integration.",
    ],
  },
  {
    role: "Secretary",
    organization: "Cybersecurity Club, UIT",
    period: "2025",
    description: [
      "Conducted interactive club sessions, hands-on Kali Linux security workshops, and university-wide cybersecurity awareness campaigns.",
    ],
  },
  {
    role: "Instructor – Web Development Bootcamp",
    organization: "Manipal University Jaipur",
    period: "2024",
    description: [
      "Conducted an intensive online frontend development bootcamp for 200+ aspiring software engineering participants.",
    ],
  },
];

export const ALL_REPOSITORIES: ProjectItem[] = [
  {
    id: "code_snippet_library",
    name: "code_snippet_library",
    title: "Code Snippet Library",
    description:
      "A Website that has a collection of Code Snippets of problems that can be useful for every beginner. Contains Code Snippets in various Languages such as C, C++, Python, JavaScript and Java.",
    longDescription:
      "Developer productivity tool built to organize, search, and manage algorithmic solutions and coding interview problems across C, C++, Python, JavaScript, and Java.",
    language: "JavaScript",
    topics: ["javascript", "c", "cpp", "python", "java", "snippets", "algorithms"],
    stars: 2,
    forks: 3,
    html_url: "https://github.com/YashWadhvani/code_snippet_library",
    featured: true,
    category: "Full Stack",
  },
  {
    id: "wastelessbites",
    name: "wastelessbites",
    title: "WastelessBites",
    description:
      "Food Waste Reduction Website to reduce food waste by effective tracking of food inventory at homes, restaurants, and retail spaces.",
    longDescription:
      "Full-stack initiative helping households and restaurants track expiry dates, share excess groceries, and optimize pantry stock to eliminate food waste.",
    language: "JavaScript",
    topics: ["javascript", "html", "css", "food-waste", "inventory"],
    stars: 2,
    forks: 3,
    html_url: "https://github.com/YashWadhvani/wastelessbites",
    featured: true,
    category: "Full Stack",
  },
  {
    id: "library-management-system",
    name: "library-management-system",
    title: "Library Management System",
    description:
      "An Intermediate Level Python - MySQL Connectivity based project. Contains various functions of a Library-Management-System.",
    longDescription:
      "Python and MySQL database application providing complete librarian workflows, fine calculation, book searching, and automated membership logs.",
    language: "Python",
    topics: ["python", "mysql", "library", "management", "database"],
    stars: 2,
    forks: 1,
    html_url: "https://github.com/YashWadhvani/library-management-system",
    featured: true,
    category: "Backend",
  },
  {
    id: "store-management-system",
    name: "store-management-system",
    title: "Store Management System",
    description:
      "An Intermediate Level Python - MySQL Connectivity based project. Contains various functions of a Store-Management-System.",
    longDescription:
      "Python and MySQL connectivity project providing inventory controls, billing calculation, product threshold warnings, and sales reporting.",
    language: "Python",
    topics: ["python", "mysql", "inventory", "management-system", "database"],
    stars: 2,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/store-management-system",
    featured: true,
    category: "Backend",
  },
  {
    id: "JavaProgramsSem4",
    name: "JavaProgramsSem4",
    title: "Java Programs Sem 4 Lab",
    description:
      "A Repository for storing all the Programs made during the Object Oriented Programming with Java Lab Sessions @ USCI, Karnavati University.",
    longDescription:
      "Object Oriented Programming exercises covering inheritance, polymorphism, multithreading, custom exceptions, and Java Swing GUI applications.",
    language: "Java",
    topics: ["java", "oop", "lab-sessions", "algorithms"],
    stars: 2,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/JavaProgramsSem4",
    featured: true,
    category: "Systems",
  },
  {
    id: "law-suit",
    name: "law-suit",
    title: "Law Suit Legal Portal",
    description:
      "A responsive legal consultancy and law firm website built with clean semantic HTML and modern CSS styling.",
    language: "HTML",
    topics: ["html", "css", "legal", "law-firm"],
    stars: 0,
    forks: 1,
    html_url: "https://github.com/YashWadhvani/law-suit",
    featured: false,
    category: "Frontend",
  },
  {
    id: "portfolio",
    name: "portfolio",
    title: "Personal Developer Portfolio",
    description:
      "This Repository contains all the Source Code for my Personal Portfolio Website built with Next.js and Tailwind CSS.",
    longDescription:
      "Interactive developer portfolio engineered with Next.js 14, Framer Motion, Tailwind CSS, VS Code IDE aesthetic, and Spotify now playing integration.",
    language: "JavaScript",
    topics: ["nextjs", "react", "tailwind", "portfolio", "developer"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/portfolio",
    featured: false,
    category: "Frontend",
  },
  {
    id: "Mouse-Tracker-Using-Eyes",
    name: "Mouse-Tracker-Using-Eyes",
    title: "Mouse Tracker Using Eyes",
    description:
      "A Python Project which detects Eyes and Controls Mouse Controls using position of Eyes.",
    longDescription:
      "Computer vision application using OpenCV and MediaPipe facial mesh tracking to map pupil movement to mouse coordinates for hands-free computing.",
    language: "Python",
    topics: ["python", "opencv", "computer-vision", "eye-tracking"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/Mouse-Tracker-Using-Eyes",
    featured: false,
    category: "AI/ML",
  },
  {
    id: "bookstore-api",
    name: "bookstore-api",
    title: "Bookstore RESTful API",
    description: "A RESTful API to simulate an online Bookstore catalogue, search, and transactions.",
    language: "JavaScript",
    topics: ["nodejs", "express", "api", "rest", "backend"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/bookstore-api",
    featured: false,
    category: "Backend",
  },
  {
    id: "DroneDeliveryNetwork",
    name: "DroneDeliveryNetwork",
    title: "Drone Delivery Network",
    description: "Java object-oriented model simulating automated drone fleet routing and dispatch.",
    language: "Java",
    topics: ["java", "simulation", "dijkstra", "routing"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/DroneDeliveryNetwork",
    featured: false,
    category: "Systems",
  },
  {
    id: "carecay",
    name: "carecay",
    title: "Carecay Healthcare Platform",
    description: "Healthcare appointment and clinic directory frontend built with Vue.js.",
    language: "Vue",
    topics: ["vue", "nuxt", "healthcare", "booking"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/carecay",
    featured: false,
    category: "Frontend",
  },
  {
    id: "viral-sales",
    name: "viral-sales",
    title: "Viral Sales E-Commerce",
    description: "Modern sales landing page and conversion platform built with Vue and Tailwind CSS.",
    language: "Vue",
    topics: ["vue", "nuxt", "tailwind", "e-commerce"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/viral-sales",
    featured: false,
    category: "Frontend",
  },
  {
    id: "saferoute-backend",
    name: "saferoute-backend",
    title: "SafeRoute Backend API",
    description: "Spatial navigation and route hazard scoring backend services.",
    language: "JavaScript",
    topics: ["javascript", "nodejs", "express", "navigation", "api"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/saferoute-backend",
    featured: false,
    category: "Backend",
  },
  {
    id: "saferoute_frontend",
    name: "saferoute_frontend",
    title: "SafeRoute Mobile App",
    description: "Flutter mobile application for emergency SOS alerts and safe route navigation.",
    language: "Dart",
    topics: ["dart", "flutter", "mobile", "safety", "maps"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/saferoute_frontend",
    featured: false,
    category: "Mobile App",
  },
  {
    id: "health-symptom-checker",
    name: "health-symptom-checker",
    title: "Health Symptom Checker",
    description: "Cross-platform mobile application in Flutter providing medical triage recommendations.",
    language: "Dart",
    topics: ["flutter", "dart", "healthcare", "mobile", "symptoms"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/health-symptom-checker",
    featured: false,
    category: "Mobile App",
  },
  {
    id: "constructify-frontend",
    name: "constructify-frontend",
    title: "Constructify Construction ERP",
    description: "Frontend dashboard for construction project milestones, vendors, and materials.",
    language: "JavaScript",
    topics: ["javascript", "dashboard", "erp", "construction"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/constructify-frontend",
    featured: false,
    category: "Frontend",
  },
  {
    id: "constructify-backend",
    name: "constructify-backend",
    title: "Constructify Backend API",
    description: "Node.js backend powering site data, material procurement, and user auth.",
    language: "JavaScript",
    topics: ["javascript", "nodejs", "api", "erp"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/constructify-backend",
    featured: false,
    category: "Backend",
  },
  {
    id: "medsprint",
    name: "medsprint",
    title: "MedSprint Logistics",
    description: "Emergency medicine distribution and pharmacy delivery tracker.",
    language: "JavaScript",
    topics: ["javascript", "react", "healthcare", "delivery"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/medsprint",
    featured: false,
    category: "Full Stack",
  },
  {
    id: "NeoBin_FrontEnd",
    name: "NeoBin_FrontEnd",
    title: "NeoBin Smart Waste Frontend",
    description: "IoT garbage fill-level visualization and waste truck route planning dashboard.",
    language: "JavaScript",
    topics: ["javascript", "react", "iot", "dashboard"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/NeoBin_FrontEnd",
    featured: false,
    category: "Frontend",
  },
  {
    id: "NeoBin_BackEnd",
    name: "NeoBin_BackEnd",
    title: "NeoBin Smart Waste Backend",
    description: "Telemetry ingestion API for municipal ultrasonic smart bin sensors.",
    language: "JavaScript",
    topics: ["javascript", "nodejs", "iot", "api"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/NeoBin_BackEnd",
    featured: false,
    category: "Backend",
  },
  {
    id: "real-time-metal-rates-front-end",
    name: "real-time-metal-rates-front-end",
    title: "Real Time Metal Rates Frontend",
    description: "Gold and silver spot market pricing ticker and interactive charts.",
    language: "JavaScript",
    topics: ["javascript", "finance", "markets", "charts"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/real-time-metal-rates-front-end",
    featured: false,
    category: "Frontend",
  },
  {
    id: "real-time-metal-rates-back-end",
    name: "real-time-metal-rates-back-end",
    title: "Real Time Metal Rates Backend",
    description: "Financial WebSocket and REST scraper for live commodity metal spot quotes.",
    language: "JavaScript",
    topics: ["javascript", "nodejs", "finance", "api"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/real-time-metal-rates-back-end",
    featured: false,
    category: "Backend",
  },
  {
    id: "Philmy-Shit",
    name: "Philmy-Shit",
    title: "Philmy-Shit Movie Recommendations",
    description: "A Movie Recommendation Website powered by TMDB API and dynamic genre discovery.",
    language: "JavaScript",
    topics: ["javascript", "ejs", "tmdb", "movies"],
    stars: 0,
    forks: 0,
    html_url: "https://github.com/YashWadhvani/Philmy-Shit",
    featured: false,
    category: "Frontend",
  },
];
