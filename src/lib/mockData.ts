import { Student, SOSRequest, CreditTransaction } from '@/types';

export const CURRENT_USER: Student = {
  id: 'usr-current',
  name: 'Aman Sharma',
  email: 'aman.sharma@vssut.ac.in',
  department: 'Computer Science & Engineering',
  year: '3rd Year (B.Tech)',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  bio: 'Product designer & frontend builder. I craft Figma design systems, wireframes, and interactive prototypes. Looking to barter for Acoustic Guitar basics or German.',
  campusCredits: 4,
  rupeeBalance: 450,
  pricePerSessionInRupees: 0, // 100% Free Mutual Barter!
  rating: 4.9,
  totalSessions: 16,
  isOnline: true,
  skillsOffered: [
    { name: 'UI/UX Prototyping & Figma', category: 'Design & Creative', level: 'Advanced', endorsements: 46 },
    { name: 'Design Systems & Tokens', category: 'Design & Creative', level: 'Advanced', endorsements: 38 },
    { name: 'Frontend Web Layouts', category: 'Tech & Code', level: 'Intermediate', endorsements: 29 }
  ],
  skillsSeeking: ['Acoustic Guitar Fingerstyle', 'Spoken German Conversation', 'Video Editing (Premiere Pro)'],
  badges: [
    {
      id: 'bdg-1',
      title: 'Master UI/UX Peer Mentor',
      skill: 'Figma & Design Systems',
      issuer: 'VSSUT Design & Creative Guild',
      issuedAt: '2026-08-12',
      verificationHash: '0x8f2a994c...e2b1',
      level: 'Diamond'
    },
    {
      id: 'bdg-2',
      title: 'Top Campus Barter Contributor',
      skill: 'Peer Collaboration',
      issuer: 'VSSUT Student Council',
      issuedAt: '2026-07-29',
      verificationHash: '0x3c11d87a...90bf',
      level: 'Gold'
    }
  ]
};

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'usr-1',
    name: 'Sneha Patel',
    email: 'sneha.patel@vssut.ac.in',
    department: 'Electrical Engineering',
    year: '3rd Year (B.Tech)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Lead video editor for university fests & YouTube creator. Can teach cinematic video editing, color grading, and thumbnail design in exchange for French or Public Speaking.',
    campusCredits: 6,
    rupeeBalance: 600,
    pricePerSessionInRupees: 0, // Pure Barter
    rating: 4.96,
    totalSessions: 28,
    isOnline: true,
    skillsOffered: [
      { name: 'Video Editing (Premiere Pro)', category: 'Design & Creative', level: 'Advanced', endorsements: 58 },
      { name: 'DaVinci Resolve Color Grading', category: 'Design & Creative', level: 'Advanced', endorsements: 42 },
      { name: 'Short-Form Content Strategy', category: 'Design & Creative', level: 'Advanced', endorsements: 35 }
    ],
    skillsSeeking: ['Spoken French Basics', 'Debate & Public Speaking', 'Figma Wireframing'],
    badges: [
      {
        id: 'bdg-3',
        title: 'Master Video Editor',
        skill: 'Video Editing & Color Grading',
        issuer: 'VSSUT Media & Film Society',
        issuedAt: '2026-08-01',
        verificationHash: '0x49e8a01...f32c',
        level: 'Diamond'
      }
    ]
  },
  {
    id: 'usr-2',
    name: 'Debasish Panda',
    email: 'debasish.p@vssut.ac.in',
    department: 'Electronics & Telecommunication',
    year: '4th Year (B.Tech)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Guitarist in the campus band for 3 years. I teach acoustic guitar chords, fingerstyle, rhythm strumming, and basic music theory. Seeking video editing or UI design.',
    campusCredits: 8,
    rupeeBalance: 750,
    pricePerSessionInRupees: 0, // Pure Barter
    rating: 4.98,
    totalSessions: 34,
    isOnline: true,
    skillsOffered: [
      { name: 'Acoustic Guitar & Chords', category: 'Music & Arts', level: 'Advanced', endorsements: 64 },
      { name: 'Fingerstyle Technique', category: 'Music & Arts', level: 'Advanced', endorsements: 47 },
      { name: 'Music Theory & Ear Training', category: 'Music & Arts', level: 'Intermediate', endorsements: 32 }
    ],
    skillsSeeking: ['Video Editing (Premiere Pro)', 'UI/UX Prototyping', 'Photography Lighting'],
    badges: [
      {
        id: 'bdg-4',
        title: 'Resident Music Mentor',
        skill: 'Acoustic Guitar',
        issuer: 'VSSUT Music Club',
        issuedAt: '2026-06-15',
        verificationHash: '0x1b74ef2...a891',
        level: 'Diamond'
      }
    ]
  },
  {
    id: 'usr-3',
    name: 'Ananya Dash',
    email: 'ananya.dash@vssut.ac.in',
    department: 'Information Technology',
    year: '3rd Year (B.Tech)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    bio: 'Passed Goethe-Zertifikat B1 German. I can help you speak conversational German, master grammar, or write polished SOPs/resumes in exchange for creative design or 3D modeling.',
    campusCredits: 5,
    rupeeBalance: 320,
    pricePerSessionInRupees: 99,
    rating: 4.92,
    totalSessions: 22,
    isOnline: true,
    skillsOffered: [
      { name: 'German Language (A1-B1)', category: 'Languages & Communication', level: 'Advanced', endorsements: 51 },
      { name: 'Academic Writing & SOPs', category: 'Languages & Communication', level: 'Advanced', endorsements: 39 },
      { name: 'IELTS / TOEFL Speaking Prep', category: 'Languages & Communication', level: 'Advanced', endorsements: 44 }
    ],
    skillsSeeking: ['UI/UX Prototyping & Figma', 'SolidWorks 3D Modeling', 'Acoustic Guitar'],
    badges: [
      {
        id: 'bdg-5',
        title: 'Language Ambassador',
        skill: 'German & Communication',
        issuer: 'International Relations Cell VSSUT',
        issuedAt: '2026-07-10',
        verificationHash: '0x9923da1...48bc',
        level: 'Gold'
      }
    ]
  },
  {
    id: 'usr-4',
    name: 'Rohan Rath',
    email: 'rohan.rath@vssut.ac.in',
    department: 'Mechanical Engineering',
    year: '4th Year (B.Tech)',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    bio: 'Robotics team chassis designer. I teach SolidWorks 3D CAD modeling, 3D printing slicing, and product prototyping. Looking to barter for Public Speaking & GD prep.',
    campusCredits: 7,
    rupeeBalance: 520,
    pricePerSessionInRupees: 0,
    rating: 4.88,
    totalSessions: 20,
    isOnline: false,
    skillsOffered: [
      { name: 'SolidWorks 3D CAD', category: 'Engineering & 3D', level: 'Advanced', endorsements: 45 },
      { name: '3D Printing & Slicing', category: 'Engineering & 3D', level: 'Advanced', endorsements: 37 },
      { name: 'Hardware Prototyping', category: 'Engineering & 3D', level: 'Intermediate', endorsements: 28 }
    ],
    skillsSeeking: ['Debate & Public Speaking', 'Personal Branding / LinkedIn', 'Guitar Basics'],
    badges: [
      {
        id: 'bdg-6',
        title: '3D Engineering Specialist',
        skill: 'SolidWorks & CAD',
        issuer: 'Idea Lab VSSUT',
        issuedAt: '2026-05-20',
        verificationHash: '0x7e83bc2...99ca',
        level: 'Diamond'
      }
    ]
  },
  {
    id: 'usr-5',
    name: 'Priya Mahapatra',
    email: 'priya.m@vssut.ac.in',
    department: 'Information Technology',
    year: '4th Year (B.Tech)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Campus photography lead & visual artist. I teach manual camera controls, portrait composition, and Lightroom editing. Looking to barter for Python automation or Data Analysis.',
    campusCredits: 6,
    rupeeBalance: 400,
    pricePerSessionInRupees: 149,
    rating: 4.95,
    totalSessions: 25,
    isOnline: true,
    skillsOffered: [
      { name: 'DSLR Photography & Lighting', category: 'Design & Creative', level: 'Advanced', endorsements: 49 },
      { name: 'Lightroom Color Grading', category: 'Design & Creative', level: 'Advanced', endorsements: 41 },
      { name: 'Visual Storytelling', category: 'Design & Creative', level: 'Advanced', endorsements: 33 }
    ],
    skillsSeeking: ['Python Automation', 'Calculus & Statistics', 'French Language'],
    badges: [
      {
        id: 'bdg-7',
        title: 'Visual Arts Mentor',
        skill: 'Photography & Editing',
        issuer: 'VSSUT Shutterbugs Club',
        issuedAt: '2026-08-19',
        verificationHash: '0x55fa891...21d9',
        level: 'Gold'
      }
    ]
  },
  {
    id: 'usr-6',
    name: 'Subham Sahoo',
    email: 'subham.sahoo@vssut.ac.in',
    department: 'Mechanical Engineering',
    year: '3rd Year (B.Tech)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'National Parliamentary Debater & TEDx campus organizer. I can help you conquer stage fright, ace group discussions, and structure persuasive arguments. Seeking SolidWorks CAD or Python.',
    campusCredits: 5,
    rupeeBalance: 350,
    pricePerSessionInRupees: 0,
    rating: 4.94,
    totalSessions: 18,
    isOnline: true,
    skillsOffered: [
      { name: 'Debate & Public Speaking', category: 'Languages & Communication', level: 'Advanced', endorsements: 53 },
      { name: 'Group Discussion & HR Prep', category: 'Languages & Communication', level: 'Advanced', endorsements: 48 },
      { name: 'Speech Structuring & Delivery', category: 'Languages & Communication', level: 'Advanced', endorsements: 36 }
    ],
    skillsSeeking: ['SolidWorks 3D CAD', 'Video Editing for Reels', 'Python Basics'],
    badges: [
      {
        id: 'bdg-8',
        title: 'Master Orator',
        skill: 'Debate & Public Speaking',
        issuer: 'VSSUT Literary & Debating Society',
        issuedAt: '2026-07-15',
        verificationHash: '0x88bb12c...55ea',
        level: 'Diamond'
      }
    ]
  }
];

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
    description: 'Designing the official club recruitment website. The hero grid works on desktop, but switching to 375px mobile viewport squishes the text layers instead of wrapping. Need 10 mins of Figma help.',
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
    bountyInRupees: 150
  },
  {
    studentId: 'usr-18',
    studentName: 'Manish Behera',
    studentDept: 'Mechanical (2nd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    topic: 'Public speaking speech hook & opening stance for parliamentary debate',
    description: 'Inter-college debate finals tomorrow. My rebuttal points are solid, but my opening 45-second hook feels flat. Need a seasoned debater to listen and suggest a punchy opening line.',
    category: 'Languages & Communication',
    urgency: 'High',
    creditsReward: 1,
    bountyInRupees: 100
  },
  {
    studentId: 'usr-19',
    studentName: 'Tanvi Agarwal',
    studentDept: 'Production Engineering (3rd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    topic: '3D Printer Ender-3 PETG bed adhesion warping at corners',
    description: 'Printing parts for our SAE BAJA rover. PETG is warping off the glass bed after layer 15. Tried 75°C bed temp and brim. Need 10 mins with someone experienced in 3D printing slicing.',
    category: 'Engineering & 3D',
    urgency: 'High',
    creditsReward: 1,
    bountyInRupees: 120
  },
  {
    studentId: 'usr-20',
    studentName: 'Devidutta Ray',
    studentDept: 'Electronics (4th Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    topic: 'FL Studio audio clipping & sidechain compression pump setup',
    description: 'Producing the background anthem for the college fest trailer. The kick and sub-bass frequencies are clashing and causing harsh digital distortion. Need 15 mins with an audio producer.',
    category: 'Music & Arts',
    urgency: 'Normal',
    creditsReward: 1,
    bountyInRupees: 100
  },
  {
    studentId: 'usr-21',
    studentName: 'Kunal Swain',
    studentDept: 'CSE (2nd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    topic: 'C++ Dijkstra priority_queue custom comparator syntax error',
    description: 'Lab test tomorrow: compiling custom struct with min-heap priority_queue throws cannot be overloaded error. Need 10 mins with a DSA peer to fix the operator() comparator.',
    category: 'Tech & Code',
    urgency: 'Critical (Exam/Deadline)',
    creditsReward: 1,
    bountyInRupees: 150
  },
  {
    studentId: 'usr-22',
    studentName: 'Sonali Pradhan',
    studentDept: 'Chemical Engineering (3rd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    topic: 'MATLAB ode45 stiff chemical reaction kinetics returning NaN',
    description: 'Simulating a 3-step exothermic reactor system. ode45 is taking 10,000 steps and exploding with NaN values due to stiffness. Need help switching to ode15s with proper Jacobian settings.',
    category: 'Academics & Analytics',
    urgency: 'Critical (Exam/Deadline)',
    creditsReward: 2,
    bountyInRupees: 200
  },
  {
    studentId: 'usr-23',
    studentName: 'Biswajit Das',
    studentDept: 'EEE (3rd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    topic: 'ESP32 MQTT broker disconnect loop on campus Wi-Fi network',
    description: 'Smart energy meter hardware project: ESP32 connects to campus Wi-Fi but drops MQTT connection every 12 seconds with error -2. Need help debugging keep-alive ping intervals.',
    category: 'Engineering & 3D',
    urgency: 'High',
    creditsReward: 1,
    bountyInRupees: 140
  },
  {
    studentId: 'usr-24',
    studentName: 'Shruti Panigrahi',
    studentDept: 'Civil (2nd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    topic: 'French DELF A2 oral comprehension listening & speaking practice',
    description: 'Applying for a summer exchange program in France. Need 15 mins to practice listening comprehension and speaking response drills with a fluent French peer.',
    category: 'Languages & Communication',
    urgency: 'Normal',
    creditsReward: 1,
    bountyInRupees: 100
  }
];

export const SHOWCASE_SQL_SOS_QUESTION: SOSRequest = {
  id: 'sos-showcase-sql',
  studentId: 'usr-showcase-sql',
  studentName: 'Aditya Verma',
  studentDept: 'Computer Science (2nd Year)',
  studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  topic: 'SQL Query: Which command is used to show the full "students" table?',
  description: 'Table: `students`\n+----+------------------+-------------------+----------------+\n| id | name             | department        | campus_credits |\n+----+------------------+-------------------+----------------+\n| 1  | Chirag Sharma    | Computer Science  | 12             |\n| 2  | Ananya Dash      | IT                | 8              |\n| 3  | Rohan Rath       | Mechanical        | 10             |\n+----+------------------+-------------------+----------------+\n\nQuestion: Which SQL command is used to fetch and show the entire table with all rows and columns? (Answer: SELECT * FROM <table_name>)',
  category: 'Tech & Code',
  urgency: 'Critical (Exam/Deadline)',
  creditsReward: 1,
  bountyInRupees: 150,
  createdAt: 'Just now',
  status: 'Open'
};

export function generateRandomSosRequests(count: number = 9): SOSRequest[] {
  // Random time phrases
  const times = [
    '3 minutes ago',
    '7 minutes ago',
    '12 minutes ago',
    '18 minutes ago',
    '24 minutes ago',
    '31 minutes ago',
    '39 minutes ago',
    '47 minutes ago',
    '55 minutes ago',
    '1 hour ago'
  ];

  // Shuffle pool (Fisher-Yates)
  const shuffled = [...SOS_PROBLEM_POOL].sort(() => 0.5 - Math.random());
  // Pick count - 1 items so total includes the showcase SQL question
  const selected = shuffled.slice(0, Math.max(1, Math.min(count - 1, shuffled.length)));

  const randomList = selected.map((item, index) => ({
    ...item,
    id: `sos-${Date.now()}-${index}`,
    createdAt: times[index % times.length],
    status: 'Open' as const
  }));

  // ALWAYS place the SQL showcase question at the 1st position (index 0)
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
    description: 'Bartered 30m Figma Design System coaching for Guitar barre chord coaching with Debasish',
    counterpart: 'Debasish Panda'
  },
  {
    id: 'tx-2',
    timestamp: 'Yesterday, 5:45 PM',
    amountRupees: 0,
    amountCredits: -1,
    type: 'Spent',
    description: 'Learned Premiere Pro multi-cam editing & color grading from Sneha',
    counterpart: 'Sneha Patel'
  },
  {
    id: 'tx-3',
    timestamp: '3 days ago',
    amountRupees: 150,
    amountCredits: 1,
    type: 'Earned',
    description: 'Solved SOS Flash: SolidWorks propeller sketch lofting issue',
    counterpart: 'Kavya Sen'
  },
  {
    id: 'tx-4',
    timestamp: '1 week ago',
    amountRupees: 300,
    amountCredits: 2,
    type: 'Welcome Bonus',
    description: 'Campus Barter Community onboarding credit (₹300 + 2 Credits)',
    counterpart: 'VSSUT Student Council'
  }
];
