import {
  Student,
  SOSRequest,
  CreditTransaction,
  Course,
  TrainerMaterial,
  AssessmentQuestionnaire,
  AssessmentSubmission,
  CourseFeedback,
  Announcement,
  CompetencyMatch
} from '@/types';

export const DEMO_TRAINEE: Student = {
  id: 'usr-trainee',
  name: 'Aman Sharma',
  email: 'aman.sharma@peerloop.edu',
  department: 'Computer Science & Engineering',
  year: '3rd Year (B.Tech)',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  bio: 'Computer Science student & passionate trainee. Looking to master cloud-native architecture, full-stack systems, and AI workflows.',
  role: 'trainee',
  status: 'Approved',
  organization: 'National Institute of Technology',
  designation: 'Undergraduate Trainee & Systems Intern',
  qualifications: [
    {
      id: 'q-1',
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'National Institute of Technology',
      year: '2023 - 2027 (Expected)',
      grade: 'CGPA 8.9 / 10'
    },
    {
      id: 'q-2',
      degree: 'Higher Secondary Certificate (Physics, Chem, Math)',
      institution: 'Delhi Public School',
      year: '2021 - 2023',
      grade: '94.6%'
    }
  ],
  workExperience: [
    {
      id: 'we-1',
      role: 'Frontend Engineering Intern',
      organization: 'TechVanguard Labs',
      duration: 'May 2025 - Jul 2025 (3 mos)',
      description: 'Built responsive UI modules using React, Next.js, and Tailwind CSS. Implemented state management with Zustand.'
    },
    {
      id: 'we-2',
      role: 'Student Developer Lead',
      organization: 'Campus Open Source Guild',
      duration: 'Aug 2024 - Present',
      description: 'Mentoring 40+ junior trainees in Git workflows, TypeScript best practices, and collaborative software engineering.'
    }
  ],
  interests: [
    'Cloud-Native Computing',
    'Serverless Microservices',
    'Generative AI Applications',
    'Full-Stack Web Systems',
    'Zero-Trust Cybersecurity'
  ],
  certificates: [
    {
      id: 'cert-1',
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: 'Aug 2025',
      credentialId: 'AWS-CCP-982341'
    },
    {
      id: 'cert-2',
      title: 'Meta Certified Front-End Developer',
      issuer: 'Meta / Coursera',
      date: 'Jan 2025',
      credentialId: 'META-FED-551982'
    },
    {
      id: 'cert-3',
      title: 'Institutional Certificate of Merit in Data Structures',
      issuer: 'Academic Council',
      date: 'Dec 2024',
      credentialId: 'ACAD-DS-00918'
    }
  ],
  enrolledCourseIds: ['course-1', 'course-2'],
  campusCredits: 5,
  rupeeBalance: 650,
  pricePerSessionInRupees: 0,
  rating: 4.9,
  totalSessions: 16,
  isOnline: true,
  skillsOffered: [
    { name: 'UI/UX Prototyping & Figma', category: 'Design & Creative', level: 'Advanced', endorsements: 46 },
    { name: 'Frontend Web Layouts', category: 'Tech & Code', level: 'Intermediate', endorsements: 32 },
    { name: 'Python Scripting', category: 'Tech & Code', level: 'Intermediate', endorsements: 28 }
  ],
  skillsSeeking: ['Cloud Architecture', 'Generative AI Systems', 'Enterprise Cybersecurity'],
  badges: [
    {
      id: 'bdg-1',
      title: 'Certified Trainee Scholar',
      skill: 'Full-Stack Web Systems',
      issuer: 'PeerLoop Verification Network',
      issuedAt: '2026-08-12',
      verificationHash: '0x8f2a994c...e2b1',
      level: 'Diamond'
    },
    {
      id: 'bdg-2',
      title: 'Top Peer Contributor',
      skill: 'Collaborative Problem Solving',
      issuer: 'Student Leadership Council',
      issuedAt: '2026-07-29',
      verificationHash: '0x3c11d87a...90bf',
      level: 'Gold'
    }
  ]
};

export const DEMO_TRAINER: Student = {
  id: 'usr-trainer',
  name: 'Dr. Rajesh Verma',
  email: 'dr.rajesh.verma@peerloop.edu',
  department: 'Cloud Systems & Distributed Computing',
  year: 'Faculty / Lead Trainer',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  bio: 'Senior Cloud Solutions Architect & Lead Faculty Trainer. 12+ years of experience training corporate engineers and students in AWS, Distributed Computing, and Microservices.',
  role: 'trainer',
  status: 'Approved',
  organization: 'Apex Institute of Technology & Research',
  designation: 'Associate Professor & Lead Cloud Architect',
  qualifications: [
    {
      id: 'q-t1',
      degree: 'Ph.D. in Distributed Systems & Cloud Computing',
      institution: 'Indian Institute of Technology (IIT)',
      year: '2016 - 2020',
      grade: 'Summa Cum Laude'
    },
    {
      id: 'q-t2',
      degree: 'M.Tech in Computer Science & Engineering',
      institution: 'National Institute of Technology (NIT)',
      year: '2012 - 2014',
      grade: 'Gold Medalist'
    }
  ],
  workExperience: [
    {
      id: 'we-t1',
      role: 'Principal Cloud Systems Trainer',
      organization: 'CloudScale Consulting & Training Services',
      duration: '2020 - Present (6 yrs)',
      description: 'Trained over 3,500 trainees in AWS Serverless, Kubernetes orchestration, and event-driven patterns.'
    },
    {
      id: 'we-t2',
      role: 'Senior Infrastructure Consultant',
      organization: 'Global Cloud Enterprise',
      duration: '2014 - 2020 (6 yrs)',
      description: 'Architected high-availability cloud solutions, DynamoDB single-table topologies, and Lambda pipelines.'
    }
  ],
  interests: ['Cloud Architecture', 'Serverless Resilience', 'Competency Mapping', 'Pedagogical Systems'],
  certificates: [
    {
      id: 'cert-t1',
      title: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2024',
      credentialId: 'AWS-SAP-883912'
    },
    {
      id: 'cert-t2',
      title: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      date: '2023',
      credentialId: 'CKA-99210-CR'
    }
  ],
  enrolledCourseIds: [],
  campusCredits: 45,
  rupeeBalance: 12500,
  pricePerSessionInRupees: 0,
  rating: 4.98,
  totalSessions: 142,
  isOnline: true,
  skillsOffered: [
    { name: 'AWS Cloud Architecture', category: 'Tech & Code', level: 'Advanced', endorsements: 182 },
    { name: 'Serverless Lambda & DynamoDB', category: 'Tech & Code', level: 'Advanced', endorsements: 154 },
    { name: 'Distributed Microservices', category: 'Tech & Code', level: 'Advanced', endorsements: 129 }
  ],
  skillsSeeking: ['Advanced GenAI Prompting', 'Quantum Computing Fundamentals'],
  badges: [
    {
      id: 'bdg-t1',
      title: 'Distinguished Master Trainer',
      skill: 'Enterprise Cloud Architecture',
      issuer: 'PeerLoop Verification Network',
      issuedAt: '2026-01-15',
      verificationHash: '0x9928fa...77cd',
      level: 'Diamond'
    }
  ]
};

export const DEMO_ADMIN: Student = {
  id: 'usr-admin',
  name: 'Priya Nair',
  email: 'admin.priya@peerloop.edu',
  department: 'Academic Training & Institutional Governance',
  year: 'Administrator',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  bio: 'Director of Institutional Capacity Building and Learning Governance. Overseeing user verification, competency mapping, training quality, and curriculum execution.',
  role: 'admin',
  status: 'Approved',
  organization: 'National Capacity Building Council',
  designation: 'Director of Academic Governance & Training Operations',
  qualifications: [
    {
      id: 'q-a1',
      degree: 'Master of Public Administration & Education Leadership',
      institution: 'University of Governance',
      year: '2010 - 2012',
      grade: 'Distinction'
    }
  ],
  workExperience: [
    {
      id: 'we-a1',
      role: 'Head of National Capacity Building',
      organization: 'Institutional Skills Mission',
      duration: '2018 - Present',
      description: 'Directing statewide competency frameworks, trainer accreditation, and institutional skill benchmarking.'
    }
  ],
  interests: ['Institutional Capacity Building', 'Competency Mapping', 'Assessment Standards', 'E-Learning Analytics'],
  certificates: [
    {
      id: 'cert-a1',
      title: 'Certified Higher Education Governance Specialist',
      issuer: 'Global Quality Assurance Council',
      date: '2022',
      credentialId: 'QA-GOV-10294'
    }
  ],
  enrolledCourseIds: [],
  campusCredits: 100,
  rupeeBalance: 25000,
  pricePerSessionInRupees: 0,
  rating: 5.0,
  totalSessions: 89,
  isOnline: true,
  skillsOffered: [
    { name: 'Curriculum & Competency Mapping', category: 'Academics & Analytics', level: 'Advanced', endorsements: 110 },
    { name: 'Assessment Design & Governance', category: 'Academics & Analytics', level: 'Advanced', endorsements: 95 }
  ],
  skillsSeeking: [],
  badges: []
};

export const CURRENT_USER: Student = DEMO_TRAINEE;

export const MOCK_USERS_LIST: Student[] = [
  DEMO_TRAINEE,
  DEMO_TRAINER,
  DEMO_ADMIN,
  {
    id: 'usr-trainee-2',
    name: 'Sneha Patel',
    email: 'sneha.patel@peerloop.edu',
    department: 'Electrical Engineering',
    year: '3rd Year (B.Tech)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Electrical engineering trainee exploring IoT automation and Python.',
    role: 'trainee',
    status: 'Approved',
    organization: 'Apex Technical Institute',
    designation: 'Trainee',
    qualifications: [
      { id: 'q-sp1', degree: 'B.Tech Electrical Eng', institution: 'Apex Technical Institute', year: '2023 - 2027' }
    ],
    workExperience: [],
    interests: ['Embedded Systems', 'IoT Automation', 'Python'],
    certificates: [],
    enrolledCourseIds: ['course-1'],
    campusCredits: 6,
    rupeeBalance: 600,
    pricePerSessionInRupees: 0,
    rating: 4.96,
    totalSessions: 28,
    isOnline: true,
    skillsOffered: [{ name: 'Video Editing', category: 'Design & Creative', level: 'Advanced', endorsements: 58 }],
    skillsSeeking: ['Python Automation'],
    badges: []
  },
  {
    id: 'usr-trainer-2',
    name: 'Dr. Sunita Rao',
    email: 'sunita.rao@peerloop.edu',
    department: 'Artificial Intelligence & Data Science',
    year: 'Lead AI Trainer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    bio: 'Ph.D. in Machine Learning. 9+ years research and training in Deep Learning, NLP, and Bedrock Generative AI architectures.',
    role: 'trainer',
    status: 'Approved',
    organization: 'Center for Advanced Machine Intelligence',
    designation: 'Associate Professor & Senior AI Researcher',
    qualifications: [
      { id: 'q-sr1', degree: 'Ph.D. in Artificial Intelligence', institution: 'IIT Delhi', year: '2015 - 2019' },
      { id: 'q-sr2', degree: 'M.Tech in Data Science', institution: 'IISc Bangalore', year: '2013 - 2015' }
    ],
    workExperience: [
      {
        id: 'we-sr1',
        role: 'AI Training Specialist',
        organization: 'National AI Mission',
        duration: '2019 - Present',
        description: 'Conducted 50+ masterclasses on PyTorch, Foundation Models, and RAG architectures.'
      }
    ],
    interests: ['Generative AI', 'Large Language Models', 'Computer Vision'],
    certificates: [
      { id: 'cert-sr1', title: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', date: '2022', credentialId: 'DLAI-9981' }
    ],
    enrolledCourseIds: [],
    campusCredits: 38,
    rupeeBalance: 11000,
    pricePerSessionInRupees: 0,
    rating: 4.96,
    totalSessions: 118,
    isOnline: true,
    skillsOffered: [
      { name: 'Machine Learning & PyTorch', category: 'AI & Data Science', level: 'Advanced', endorsements: 165 },
      { name: 'Generative AI & LLMs', category: 'AI & Data Science', level: 'Advanced', endorsements: 142 }
    ],
    skillsSeeking: [],
    badges: []
  },
  {
    id: 'usr-trainee-pending',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@peerloop.edu',
    department: 'Information Technology',
    year: '2nd Year (B.Tech)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'New applicant for institutional training program. Awaiting admin approval.',
    role: 'trainee',
    status: 'Pending',
    organization: 'National Institute of Technology',
    designation: 'Trainee Applicant',
    qualifications: [
      { id: 'q-vr1', degree: 'B.Tech IT', institution: 'NIT', year: '2024 - 2028' }
    ],
    workExperience: [],
    interests: ['Cybersecurity', 'Linux Systems'],
    certificates: [],
    enrolledCourseIds: [],
    campusCredits: 2,
    rupeeBalance: 200,
    pricePerSessionInRupees: 0,
    rating: 5.0,
    totalSessions: 0,
    isOnline: false,
    skillsOffered: [],
    skillsSeeking: ['Cybersecurity'],
    badges: []
  },
  {
    id: 'usr-trainer-pending',
    name: 'Col. Vikram Malhotra',
    email: 'vikram.malhotra@peerloop.edu',
    department: 'Cyber Defense & Information Security',
    year: 'Guest Cyber Trainer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'Former Defense Cyber Cell Officer. 15+ years experience in zero-trust architectures and ethical hacking.',
    role: 'trainer',
    status: 'Pending',
    organization: 'Defense Cyber Institute',
    designation: 'Cyber Security Consultant & Trainer',
    qualifications: [
      { id: 'q-vm1', degree: 'M.Tech Information Security', institution: 'Defense Institute of Tech', year: '2008 - 2010' }
    ],
    workExperience: [
      { id: 'we-vm1', role: 'Cyber Security Officer', organization: 'Defense Cyber Command', duration: '2010 - 2024', description: 'Handled critical infrastructure defense.' }
    ],
    interests: ['Ethical Hacking', 'Zero-Trust Networks', 'Penetration Testing'],
    certificates: [
      { id: 'cert-vm1', title: 'Certified Information Systems Security Professional (CISSP)', issuer: 'ISC2', date: '2021', credentialId: 'CISSP-8831' }
    ],
    enrolledCourseIds: [],
    campusCredits: 20,
    rupeeBalance: 5000,
    pricePerSessionInRupees: 0,
    rating: 5.0,
    totalSessions: 12,
    isOnline: true,
    skillsOffered: [
      { name: 'Enterprise Cybersecurity', category: 'Cybersecurity & Governance', level: 'Advanced', endorsements: 120 }
    ],
    skillsSeeking: [],
    badges: []
  }
];

export const MOCK_STUDENTS: Student[] = MOCK_USERS_LIST;

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Cloud-Native Architecture & Scalable Systems',
    subject: 'Cloud & DevOps',
    category: 'Tech & Code',
    description: 'Master enterprise-grade cloud architecture, serverless microservices with AWS Lambda, DynamoDB single-table design, and API Gateway event pipelines for resilient digital infrastructure.',
    trainerId: 'usr-trainer',
    trainerName: 'Dr. Rajesh Verma',
    trainerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    trainerRole: 'Associate Professor & Lead Cloud Architect',
    duration: '6 Weeks (24 Hours)',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    enrolledCount: 384,
    rating: 4.94,
    reviewsCount: 68,
    publishedAt: '2026-08-10',
    modules: [
      { id: 'm-1', title: 'Foundations of Cloud-Native & 12-Factor Apps', duration: '3h 30m', lessonsCount: 6 },
      { id: 'm-2', title: 'Serverless Compute: Lambda & EventBridge Patterns', duration: '4h 15m', lessonsCount: 8 },
      { id: 'm-3', title: 'High-Performance NoSQL: DynamoDB Deep-Dive', duration: '4h 45m', lessonsCount: 7 },
      { id: 'm-4', title: 'CI/CD Pipelines, Infrastructure as Code & Monitoring', duration: '5h 00m', lessonsCount: 9 }
    ],
    learningOutcomes: [
      'Design fault-tolerant, multi-region serverless applications',
      'Optimize query access patterns in DynamoDB with sub-10ms latency',
      'Deploy automated CI/CD deployment pipelines on AWS Amplify and GitHub Actions',
      'Implement zero-downtime microservice migrations'
    ],
    prerequisites: ['Basic JavaScript / Python', 'Foundational Networking Concepts']
  },
  {
    id: 'course-2',
    title: 'Generative AI & LLM Systems Engineering',
    subject: 'AI & Data Science',
    category: 'AI & Data Science',
    description: 'A comprehensive curriculum on Transformer architectures, prompt engineering, Retrieval-Augmented Generation (RAG) pipelines, and deploying Bedrock foundation models securely.',
    trainerId: 'usr-trainer-2',
    trainerName: 'Dr. Sunita Rao',
    trainerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    trainerRole: 'Lead AI Researcher & Associate Professor',
    duration: '8 Weeks (32 Hours)',
    level: 'Advanced',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    enrolledCount: 512,
    rating: 4.97,
    reviewsCount: 94,
    publishedAt: '2026-08-15',
    modules: [
      { id: 'm-21', title: 'Attention Mechanisms & Transformer Foundations', duration: '4h 00m', lessonsCount: 6 },
      { id: 'm-22', title: 'Vector Embeddings & Semantic Search Topologies', duration: '5h 15m', lessonsCount: 8 },
      { id: 'm-23', title: 'Building Production RAG Systems with LangChain & Bedrock', duration: '6h 30m', lessonsCount: 10 },
      { id: 'm-24', title: 'Model Evaluation, Safety Guardrails & Escrow Auditing', duration: '4h 45m', lessonsCount: 7 }
    ],
    learningOutcomes: [
      'Construct semantic search and vector retrieval pipelines',
      'Fine-tune domain prompts with few-shot reasoning techniques',
      'Deploy AI Auditor solutions with strict scoring rubrics',
      'Integrate AWS Bedrock Claude 3 foundation models'
    ]
  },
  {
    id: 'course-3',
    title: 'Enterprise Cybersecurity & Zero-Trust Defense',
    subject: 'Cybersecurity & Governance',
    category: 'Cybersecurity & Governance',
    description: 'Learn modern security postures: Identity and Access Management (IAM), mutual TLS, OAuth2/Cognito JWT verification, threat modeling, and OWASP Top 10 mitigation.',
    trainerId: 'usr-trainer-pending',
    trainerName: 'Col. Vikram Malhotra',
    trainerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    trainerRole: 'Defense Cyber Security Consultant',
    duration: '5 Weeks (20 Hours)',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    enrolledCount: 290,
    rating: 4.89,
    reviewsCount: 42,
    publishedAt: '2026-08-20',
    modules: [
      { id: 'm-31', title: 'Zero-Trust Architecture Principles', duration: '3h 30m', lessonsCount: 5 },
      { id: 'm-32', title: 'Cognito Domain Validation & JWT Security', duration: '4h 00m', lessonsCount: 6 },
      { id: 'm-33', title: 'Network Encryption, WAF & DDoS Mitigation', duration: '4h 30m', lessonsCount: 7 }
    ],
    learningOutcomes: [
      'Implement strict domain-level user authentication',
      'Conduct penetration testing and threat vulnerability assessments',
      'Harden cloud APIs and endpoints against cyber attacks'
    ]
  },
  {
    id: 'course-4',
    title: 'Full-Stack Modern Web Engineering with Next.js 14',
    subject: 'Tech & Code',
    category: 'Tech & Code',
    description: 'Hands-on practical full-stack training covering Next.js App Router, React Server Components, TypeScript, Tailwind CSS, API endpoints, and scalable cloud state management.',
    trainerId: 'usr-trainer',
    trainerName: 'Dr. Rajesh Verma',
    trainerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    trainerRole: 'Associate Professor & Lead Cloud Architect',
    duration: '6 Weeks (24 Hours)',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
    enrolledCount: 440,
    rating: 4.92,
    reviewsCount: 79,
    publishedAt: '2026-08-25',
    modules: [
      { id: 'm-41', title: 'Next.js App Router & Hybrid Rendering', duration: '4h 00m', lessonsCount: 7 },
      { id: 'm-42', title: 'State Management with Zustand & Local Storage', duration: '3h 30m', lessonsCount: 6 },
      { id: 'm-43', title: 'Styling with Tailwind CSS & Responsive Themes', duration: '4h 15m', lessonsCount: 8 }
    ],
    learningOutcomes: [
      'Build snappy, server-rendered Next.js applications',
      'Master client-server boundary separation with Server Actions',
      'Implement seamless Dark and Light theme switching'
    ]
  }
];

export const MOCK_TRAINER_MATERIALS: TrainerMaterial[] = [
  {
    id: 'mat-1',
    courseId: 'course-1',
    title: 'Mastering Distributed Microservices & Event-Driven Patterns',
    subject: 'Cloud & DevOps',
    type: 'Recorded Lecture',
    trainerId: 'usr-trainer',
    trainerName: 'Dr. Rajesh Verma',
    fileFormat: 'MP4',
    fileSize: '480 MB',
    uploadDate: '2026-09-12',
    durationOrPages: '48 mins',
    resourceLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Deep-dive lecture on building decoupled serverless workflows using AWS Lambda, EventBridge buses, and SQS dead-letter queues.',
    downloadsCount: 312
  },
  {
    id: 'mat-2',
    courseId: 'course-2',
    title: 'Generative AI Embeddings & Semantic Search Demystified',
    subject: 'AI & Data Science',
    type: 'Recorded Lecture',
    trainerId: 'usr-trainer-2',
    trainerName: 'Dr. Sunita Rao',
    fileFormat: 'MP4',
    fileSize: '620 MB',
    uploadDate: '2026-09-15',
    durationOrPages: '62 mins',
    resourceLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Mathematical breakdown of cosine similarity, dimensional vector projections, and RAG architectures in modern LLM systems.',
    downloadsCount: 428
  },
  {
    id: 'mat-3',
    courseId: 'course-1',
    title: 'Enterprise Cloud-Native Infrastructure & Serverless Scaling Deck',
    subject: 'Cloud & DevOps',
    type: 'Presentation',
    trainerId: 'usr-trainer',
    trainerName: 'Dr. Rajesh Verma',
    fileFormat: 'PPTX',
    fileSize: '18.4 MB',
    uploadDate: '2026-09-18',
    durationOrPages: '46 Slides',
    resourceLink: '#',
    description: 'Official presentation slides covering multi-AZ redundancy, DynamoDB capacity modes, and AWS Amplify edge routing architecture.',
    downloadsCount: 512
  },
  {
    id: 'mat-4',
    courseId: 'course-2',
    title: 'Transformer Attention & Foundation Models Presentation Deck',
    subject: 'AI & Data Science',
    type: 'Presentation',
    trainerId: 'usr-trainer-2',
    trainerName: 'Dr. Sunita Rao',
    fileFormat: 'PPTX',
    fileSize: '24.1 MB',
    uploadDate: '2026-09-20',
    durationOrPages: '58 Slides',
    resourceLink: '#',
    description: 'Slide deck highlighting Multi-Head Attention, positional encodings, and prompt tokenization mechanics.',
    downloadsCount: 389
  },
  {
    id: 'mat-5',
    courseId: 'course-3',
    title: 'Zero-Trust Network Access & Security Policy Implementation Manual',
    subject: 'Cybersecurity & Governance',
    type: 'Study Material',
    trainerId: 'usr-trainer-pending',
    trainerName: 'Col. Vikram Malhotra',
    fileFormat: 'PDF',
    fileSize: '12.8 MB',
    uploadDate: '2026-09-22',
    durationOrPages: '84 Pages',
    resourceLink: '#',
    description: 'Comprehensive technical handbook on configuring zero-trust boundaries, automated threat auditing, and defense-in-depth protocols.',
    downloadsCount: 275
  },
  {
    id: 'mat-6',
    courseId: 'course-4',
    title: 'Next.js 14 App Router & TypeScript Production Reference Handbook',
    subject: 'Tech & Code',
    type: 'Study Material',
    trainerId: 'usr-trainer',
    trainerName: 'Dr. Rajesh Verma',
    fileFormat: 'PDF',
    fileSize: '9.6 MB',
    uploadDate: '2026-09-24',
    durationOrPages: '64 Pages',
    resourceLink: '#',
    description: 'Complete coding guide covering layout nesting, client vs server components, suspense boundaries, and Zustand stores.',
    downloadsCount: 460
  }
];

export const MOCK_ASSESSMENTS: AssessmentQuestionnaire[] = [
  {
    id: 'assess-1',
    courseId: 'course-1',
    title: 'Subject MCQ Assessment: Cloud Architecture & Serverless Resilience',
    subject: 'Cloud & DevOps',
    trainerId: 'usr-trainer',
    trainerName: 'Dr. Rajesh Verma',
    deadline: '2026-10-15 (11:59 PM)',
    timeLimitMinutes: 15,
    totalMarks: 25,
    passingMarks: 18,
    status: 'Active',
    createdAt: '2026-09-20',
    totalSubmissionsCount: 148,
    averageScore: 21.4,
    questions: [
      {
        id: 'q1-1',
        question: 'Which DynamoDB feature ensures ACID-compliant atomic operations across multiple items simultaneously?',
        options: [
          'TransactWriteItems / TransactGetItems',
          'BatchWriteItem',
          'Global Secondary Index (GSI)',
          'DynamoDB Streams'
        ],
        correctAnswerIndex: 0,
        explanation: 'TransactWriteItems provides all-or-nothing atomicity and isolation across up to 100 items or 4MB of data in DynamoDB.'
      },
      {
        id: 'q1-2',
        question: 'What is the primary benefit of deploying AWS Lambda functions in a serverless microservice architecture?',
        options: [
          'Guaranteed static IP addresses',
          'Event-driven execution with automatic scaling and zero idle cost',
          'Direct disk mounting without virtualization',
          'Permanent in-memory state preservation'
        ],
        correctAnswerIndex: 1,
        explanation: 'Lambda executes code on-demand in response to events and scales automatically from zero to thousands of concurrent requests.'
      },
      {
        id: 'q1-3',
        question: 'In Amazon API Gateway, which endpoint type should be selected to serve requests from globally distributed clients with minimal latency?',
        options: [
          'Edge-Optimized (CloudFront integrated)',
          'Regional',
          'Private VPC Endpoint',
          'Internal Loopback'
        ],
        correctAnswerIndex: 0,
        explanation: 'Edge-optimized API endpoints route traffic through the nearest CloudFront Point of Presence (PoP) across the globe.'
      },
      {
        id: 'q1-4',
        question: 'Which HTTP status code is returned by an API Gateway when request throttling rate limits are exceeded?',
        options: [
          '500 Internal Server Error',
          '403 Forbidden',
          '429 Too Many Requests',
          '504 Gateway Timeout'
        ],
        correctAnswerIndex: 2,
        explanation: 'HTTP 429 indicates rate-limiting or quota exhaustion under token bucket algorithm policies.'
      },
      {
        id: 'q1-5',
        question: 'Which design pattern is best suited for decoupling long-running batch workloads from real-time API responses?',
        options: [
          'Synchronous Blocking RPC',
          'Asynchronous Event Queueing via SQS / EventBridge',
          'Polled HTTP Long-Polling Loop',
          'Direct Database Socket Connection'
        ],
        correctAnswerIndex: 1,
        explanation: 'Queueing through Amazon SQS or EventBridge enables asynchronous processing, buffering traffic spikes and isolating failure domains.'
      }
    ]
  },
  {
    id: 'assess-2',
    courseId: 'course-2',
    title: 'Subject MCQ Assessment: Generative AI, Embeddings & RAG Architectures',
    subject: 'AI & Data Science',
    trainerId: 'usr-trainer-2',
    trainerName: 'Dr. Sunita Rao',
    deadline: '2026-10-18 (11:59 PM)',
    timeLimitMinutes: 20,
    totalMarks: 25,
    passingMarks: 18,
    status: 'Active',
    createdAt: '2026-09-22',
    totalSubmissionsCount: 194,
    averageScore: 22.1,
    questions: [
      {
        id: 'q2-1',
        question: 'In Retrieval-Augmented Generation (RAG), what metric is most commonly calculated between user query embeddings and document chunk vectors?',
        options: [
          'Cosine Similarity',
          'Manhattan Distance',
          'Hamming Code',
          'Jaccard Coefficient'
        ],
        correctAnswerIndex: 0,
        explanation: 'Cosine similarity measures the normalized directional alignment between vector embeddings in high-dimensional semantic space.'
      },
      {
        id: 'q2-2',
        question: 'What is the primary role of the Self-Attention mechanism in the Transformer architecture?',
        options: [
          'Encrypting the token sequence for transport security',
          'Dynamically weighting relationships between all tokens in a sequence regardless of distance',
          'Compressing tokens into a single scalar value',
          'Filtering out stopwords before vectorization'
        ],
        correctAnswerIndex: 1,
        explanation: 'Self-attention computes attention scores between all token pairs, allowing the model to capture long-range contextual dependencies.'
      },
      {
        id: 'q2-3',
        question: 'Why are Chunk Overlaps utilized when splitting long institutional documents for vector databases?',
        options: [
          'To intentionally increase storage costs',
          'To prevent loss of contextual meaning across arbitrary boundary splits',
          'To compress the vector dimension size',
          'To enable regex pattern matching'
        ],
        correctAnswerIndex: 1,
        explanation: 'Chunk overlap ensures that sentences or entities spanning chunk boundaries retain contiguous semantic coherence.'
      },
      {
        id: 'q2-4',
        question: 'In AWS Bedrock, what model invocation parameter controls the randomness and creativity of generated token outputs?',
        options: [
          'Temperature',
          'Top-K',
          'Stop Sequences',
          'Max Token Length'
        ],
        correctAnswerIndex: 0,
        explanation: 'Temperature flattens or sharpens the output probability distribution; lower values yield deterministic, focused results.'
      },
      {
        id: 'q2-5',
        question: 'What is "Hallucination" in foundation language models?',
        options: [
          'Hardware memory leak in GPU clusters',
          'Generation of factually inaccurate or fabricated statements with high model confidence',
          'Token rate limit throttling',
          'Inability to parse JSON input formatting'
        ],
        correctAnswerIndex: 1,
        explanation: 'Hallucination refers to models producing plausibly sounding but empirically untrue or ungrounded assertions.'
      }
    ]
  },
  {
    id: 'assess-3',
    courseId: 'course-3',
    title: 'Subject MCQ Assessment: Zero-Trust Security & Identity Verification',
    subject: 'Cybersecurity & Governance',
    trainerId: 'usr-trainer-pending',
    trainerName: 'Col. Vikram Malhotra',
    deadline: '2026-10-22 (11:59 PM)',
    timeLimitMinutes: 15,
    totalMarks: 25,
    passingMarks: 18,
    status: 'Active',
    createdAt: '2026-09-25',
    totalSubmissionsCount: 92,
    averageScore: 19.8,
    questions: [
      {
        id: 'q3-1',
        question: 'What is the foundational mantra of the Zero-Trust Architecture model?',
        options: [
          'Trust everything inside the perimeter firewall',
          'Never trust, always verify',
          'Trust all authenticated IP addresses',
          'Verify only when traffic originates outside the subnet'
        ],
        correctAnswerIndex: 1,
        explanation: 'Zero Trust assumes no implicit trust granted to assets or user accounts based solely on physical or network location.'
      },
      {
        id: 'q3-2',
        question: 'Which component of a JSON Web Token (JWT) guarantees cryptographic tamper-proofing when validated with a public key?',
        options: [
          'Header',
          'Payload Claims',
          'Signature',
          'Base64 URL Encoding'
        ],
        correctAnswerIndex: 2,
        explanation: 'The signature is computed using the issuer private key or shared secret, preventing unauthorized payload alteration.'
      },
      {
        id: 'q3-3',
        question: 'How does Amazon Cognito enforce institutional identity domain verification (e.g. @peerloop.edu)?',
        options: [
          'Pre-Sign-up Lambda Triggers validating email domain regex',
          'Manual paper verification by campus staff',
          'Public DNS TXT record check per student',
          'Browser cookie inspection'
        ],
        correctAnswerIndex: 0,
        explanation: 'Cognito invokes a Pre-Sign-up Lambda trigger that inspects user attributes and denies registration if the domain does not match.'
      },
      {
        id: 'q3-4',
        question: 'Which security header mitigates Cross-Site Scripting (XSS) attacks by restricting where scripts can be loaded from?',
        options: [
          'Content-Security-Policy (CSP)',
          'Strict-Transport-Security (HSTS)',
          'X-Frame-Options',
          'Cache-Control'
        ],
        correctAnswerIndex: 0,
        explanation: 'CSP specifies authorized origins for executable scripts, stylesheets, and images, neutralizing malicious injected code.'
      },
      {
        id: 'q3-5',
        question: 'What is Multi-Factor Authentication (MFA) designed to prevent?',
        options: [
          'Server hardware disk corruption',
          'Unauthorized account compromise resulting from leaked or stolen passwords',
          'Database indexing delays',
          'Network packet fragmentation'
        ],
        correctAnswerIndex: 1,
        explanation: 'MFA requires two or more independent credentials (knowledge, possession, inherence), thwarting credential stuffing attacks.'
      }
    ]
  }
];

export const MOCK_SUBMISSIONS: AssessmentSubmission[] = [
  {
    id: 'sub-1',
    assessmentId: 'assess-1',
    assessmentTitle: 'Subject MCQ Assessment: Cloud Architecture & Serverless Resilience',
    subject: 'Cloud & DevOps',
    traineeId: 'usr-trainee',
    traineeName: 'Aman Sharma',
    traineeAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    score: 25,
    totalMarks: 25,
    percentage: 100,
    passed: true,
    submittedAt: '2026-09-28 (14:30)',
    answers: { 'q1-1': 0, 'q1-2': 1, 'q1-3': 0, 'q1-4': 2, 'q1-5': 1 }
  },
  {
    id: 'sub-2',
    assessmentId: 'assess-2',
    assessmentTitle: 'Subject MCQ Assessment: Generative AI, Embeddings & RAG Architectures',
    subject: 'AI & Data Science',
    traineeId: 'usr-trainee-2',
    traineeName: 'Sneha Patel',
    traineeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    score: 20,
    totalMarks: 25,
    percentage: 80,
    passed: true,
    submittedAt: '2026-09-29 (10:15)',
    answers: { 'q2-1': 0, 'q2-2': 1, 'q2-3': 1, 'q2-4': 0, 'q2-5': 0 }
  }
];

export const MOCK_FEEDBACKS: CourseFeedback[] = [
  {
    id: 'fb-1',
    courseId: 'course-1',
    courseTitle: 'Cloud-Native Architecture & Scalable Systems',
    traineeId: 'usr-trainee',
    traineeName: 'Aman Sharma',
    traineeAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    contentQualityRating: 5,
    trainerDeliveryRating: 5,
    feedbackText: 'Exceptional training quality by Dr. Rajesh Verma. The DynamoDB single-table design lecture and architectural diagrams made complex serverless concepts crystal clear!',
    date: '2026-09-28'
  },
  {
    id: 'fb-2',
    courseId: 'course-2',
    courseTitle: 'Generative AI & LLM Systems Engineering',
    traineeId: 'usr-trainee-2',
    traineeName: 'Sneha Patel',
    traineeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    contentQualityRating: 5,
    trainerDeliveryRating: 4.8,
    feedbackText: 'The hands-on vector embeddings demo and Bedrock automated auditor project were world-class. Highly recommended for any engineering trainee.',
    date: '2026-09-27'
  }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: '🚀 Smart India Hackathon (SIH) Capacity Building & Training Initiative Live',
    content: 'The centralized multi-role capacity building ecosystem is officially active. Trainees can enroll in certified curricula, access trainer libraries, and take subject-wise assessments. Trainers can deploy questionnaires and manage study materials.',
    category: 'Announcement',
    author: 'Priya Nair',
    authorRole: 'Director of Academic Governance (Admin)',
    publishedAt: 'Today, 09:00 AM',
    priority: 'High',
    badgeText: 'Official Directive',
    targetAudience: 'All',
    actionUrl: '/courses',
    actionText: 'Browse Courses'
  },
  {
    id: 'ann-2',
    title: '🏆 Institutional Milestone: 1,450+ Trainees Certified Across Core Engineering Subjects',
    content: 'Congratulations to our trainees and faculty trainers! The platform has achieved a 94.2% assessment pass rate across Cloud Architecture, AI Systems, and Cybersecurity tracks with verifiable micro-credentials.',
    category: 'Achievement',
    author: 'Priya Nair',
    authorRole: 'Director of Academic Governance (Admin)',
    publishedAt: 'Yesterday, 04:30 PM',
    priority: 'High',
    badgeText: 'Institutional Achievement',
    targetAudience: 'All'
  },
  {
    id: 'ann-3',
    title: '📚 Newly Added Learning Content: Advanced Zero-Trust & Microservices Decks',
    content: 'Dr. Rajesh Verma and Col. Vikram Malhotra have published fresh recorded lectures and 84-page implementation manuals to the Trainer Library. Download and review before the upcoming assessment cycle.',
    category: 'New Content',
    author: 'Dr. Rajesh Verma',
    authorRole: 'Lead Cloud Trainer',
    publishedAt: '2 days ago',
    priority: 'Normal',
    badgeText: 'Trainer Library Update',
    targetAudience: 'Trainees',
    actionUrl: '/library',
    actionText: 'Open Library'
  },
  {
    id: 'ann-4',
    title: '📢 Mandatory Subject-Wise MCQ Assessment Window Open',
    content: 'Assessments for Cloud-Native Architecture and Generative AI systems are active. Please ensure all enrolled trainees complete their assessments prior to the October 15 deadline.',
    category: 'Notification',
    author: 'Priya Nair',
    authorRole: 'Director of Academic Governance (Admin)',
    publishedAt: '3 days ago',
    priority: 'Normal',
    badgeText: 'Deadline Alert',
    targetAudience: 'Trainees',
    actionUrl: '/courses',
    actionText: 'View Assessments'
  }
];

export const MOCK_COMPETENCY_MATCHES: CompetencyMatch[] = [
  {
    trainerId: 'usr-trainer',
    trainerName: 'Dr. Rajesh Verma',
    trainerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    qualification: 'Ph.D. in Distributed Systems & Cloud Computing (IIT)',
    experienceYears: 12,
    suitabilityScore: 98,
    matchingSkills: [
      'AWS Cloud Architecture',
      'Serverless Microservices',
      'DynamoDB NoSQL Design',
      'Distributed Resilient Topologies'
    ],
    recommendedSubjects: ['Cloud & DevOps', 'Full-Stack Systems', 'High-Performance Computing'],
    status: 'Primary Trainer',
    activeCoursesCount: 2,
    trainerRating: 4.98
  },
  {
    trainerId: 'usr-trainer-2',
    trainerName: 'Dr. Sunita Rao',
    trainerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    qualification: 'Ph.D. in Artificial Intelligence (IIT Delhi)',
    experienceYears: 9,
    suitabilityScore: 96,
    matchingSkills: [
      'Machine Learning & PyTorch',
      'Transformer Attention Models',
      'Vector Embeddings & RAG',
      'AI Solution Auditing'
    ],
    recommendedSubjects: ['AI & Data Science', 'Machine Learning', 'Computer Vision'],
    status: 'Primary Trainer',
    activeCoursesCount: 1,
    trainerRating: 4.96
  },
  {
    trainerId: 'usr-trainer-pending',
    trainerName: 'Col. Vikram Malhotra',
    trainerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    qualification: 'M.Tech Information Security & CISSP Certified',
    experienceYears: 15,
    suitabilityScore: 94,
    matchingSkills: [
      'Zero-Trust Network Architecture',
      'Identity Domain & JWT Verification',
      'Vulnerability & Penetration Testing',
      'Critical Infrastructure Defense'
    ],
    recommendedSubjects: ['Cybersecurity & Governance', 'Enterprise Defense', 'Network Protocol Hardening'],
    status: 'Recommended',
    activeCoursesCount: 1,
    trainerRating: 5.0
  }
];

export const SHOWCASE_SQL_SOS_QUESTION: SOSRequest = {
  id: 'sos-sql-showcase-01',
  studentId: 'usr-trainee',
  studentName: 'Aman Sharma',
  studentDept: 'Computer Science (3rd Year)',
  studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  topic: 'Which SQL command is used to display all records and columns from a table?',
  description: 'Given any relational database table (e.g., student_enrollments or trainer_registry), write the standard SQL query used to retrieve and inspect all columns and rows in that table.',
  category: 'Tech & Code',
  urgency: 'Critical (Exam/Deadline)',
  creditsReward: 1,
  bountyInRupees: 100,
  createdAt: 'Just now',
  status: 'Open'
};

export const SOS_PROBLEM_POOL: Omit<SOSRequest, 'id' | 'createdAt' | 'status'>[] = [
  {
    studentId: 'usr-11',
    studentName: 'Ritika Mishra',
    studentDept: 'Computer Science (2nd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    topic: 'Premiere Pro 4K timeline lagging & GPU render crash at 90%',
    description: 'Tech fest promo video export due in 2 hours. Timeline is stuttering heavily on Lumetri Color and export fails with GPU Acceleration error. Need an experienced video editor for 10 mins to fix render settings.',
    category: 'Design & Creative',
    urgency: 'Critical (Exam/Deadline)',
    creditsReward: 1,
    bountyInRupees: 150
  },
  {
    studentId: 'usr-12',
    studentName: 'Ayush Mohanty',
    studentDept: 'Electronics (3rd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    topic: 'Guitar F-Major barre chord buzz & wrist pain troubleshooting',
    description: 'Auditions in two days. The index finger barre on the 1st fret buzzes on the B string no matter how hard I press. Need 15 mins with an experienced guitarist to check my thumb placement and elbow angle.',
    category: 'Music & Arts',
    urgency: 'High',
    creditsReward: 1,
    bountyInRupees: 100
  },
  {
    studentId: 'usr-13',
    studentName: 'Kavya Sen',
    studentDept: 'Mechanical (3rd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    topic: 'SolidWorks lofted boss guide curve failing in drone propeller blade',
    description: 'Mini-project submission: lofting between 3 airfoil sketch profiles is twisting and failing to intersect guide curves. Need a CAD peer for 15 mins to inspect profile alignment.',
    category: 'Engineering & 3D',
    urgency: 'Critical (Exam/Deadline)',
    creditsReward: 2,
    bountyInRupees: 200
  },
  {
    studentId: 'usr-14',
    studentName: 'Saurav Jena',
    studentDept: 'Information Technology (4th Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    topic: 'German B1 Speaking mock drill for Goethe Zertifikat exam',
    description: 'Oral examination is tomorrow morning. Need someone who has cleared B1 to run a 15-min practice dialogue on Teil 2 presentation and Teil 3 partner discussion.',
    category: 'Languages & Communication',
    urgency: 'Critical (Exam/Deadline)',
    creditsReward: 1,
    bountyInRupees: 120
  },
  {
    studentId: 'usr-15',
    studentName: 'Megha Tripathy',
    studentDept: 'CSE (3rd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    topic: 'Python OpenCV script crashing with MemoryError on batch video frames',
    description: 'Computer vision lab assignment: looping over 1,200 video frames causes RAM usage to spike to 100% and crashes the kernel. Need help using generator streams or frame decimation.',
    category: 'Tech & Code',
    urgency: 'High',
    creditsReward: 1,
    bountyInRupees: 100
  },
  {
    studentId: 'usr-16',
    studentName: 'Arjun Nanda',
    studentDept: 'Civil Engineering (3rd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    topic: 'Figma responsive auto-layout collapsing nested cards on mobile resize',
    description: 'Designing the official recruitment website. The hero grid works on desktop, but switching to 375px mobile viewport squishes the text layers instead of wrapping. Need 10 mins of Figma help.',
    category: 'Design & Creative',
    urgency: 'High',
    creditsReward: 1,
    bountyInRupees: 100
  },
  {
    studentId: 'usr-17',
    studentName: 'Pooja Barik',
    studentDept: 'Electrical Engineering (2nd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    topic: 'Calculus III Fourier Series convergence doubt for mid-sem exam',
    description: 'Mid-sem exam tomorrow at 9 AM. I am stuck calculating the odd-even half range expansion coefficients (a_n and b_n) for a piecewise triangular wave. Need 15 mins to clear concept.',
    category: 'Academics & Analytics',
    urgency: 'Critical (Exam/Deadline)',
    creditsReward: 1,
    bountyInRupees: 100
  }
];

export function generateRandomSosRequests(count: number = 8): SOSRequest[] {
  const times = ['2m ago', '5m ago', '12m ago', '18m ago', '25m ago', '42m ago', '1h ago', '2h ago'];
  const shuffled = [...SOS_PROBLEM_POOL].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  const randomList = selected.map((item, index) => ({
    ...item,
    id: `sos-rand-${index + 1}`,
    createdAt: times[index % times.length],
    status: 'Open' as const
  }));

  return [SHOWCASE_SQL_SOS_QUESTION, ...randomList];
}

export const MOCK_SOS_REQUESTS: SOSRequest[] = generateRandomSosRequests(9);

export const MOCK_TRANSACTIONS: CreditTransaction[] = [
  {
    id: 'tx-1',
    timestamp: 'Today, 3:15 PM',
    amountRupees: 0,
    amountCredits: 1,
    type: 'Earned',
    description: 'Completed Certified Cloud-Native MCQ Assessment',
    counterpart: 'System Examination Engine'
  },
  {
    id: 'tx-2',
    timestamp: 'Yesterday, 5:45 PM',
    amountRupees: 0,
    amountCredits: 1,
    type: 'Earned',
    description: 'Enrolled in Generative AI & LLM Systems Engineering',
    counterpart: 'Dr. Sunita Rao'
  },
  {
    id: 'tx-3',
    timestamp: '3 days ago',
    amountRupees: 150,
    amountCredits: 1,
    type: 'Earned',
    description: 'Completed Peer Verification on SQL Optimization',
    counterpart: 'PeerLoop Training Network'
  },
  {
    id: 'tx-4',
    timestamp: '1 week ago',
    amountRupees: 300,
    amountCredits: 2,
    type: 'Welcome Bonus',
    description: 'Institutional Capacity Building onboarding credit',
    counterpart: 'Academic Governance Office'
  }
];
