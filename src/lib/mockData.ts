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

export const MOCK_SOS_REQUESTS: SOSRequest[] = [
  {
    id: 'sos-1',
    studentId: 'usr-11',
    studentName: 'Ritika Mishra',
    studentDept: 'Computer Science (2nd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    topic: 'Premiere Pro 4K timeline lagging & GPU render crash at 90%',
    description: 'Tech fest promo video export due in 2 hours. Timeline is stuttering heavily on Lumetri Color and export fails with GPU Acceleration error. Need an experienced video editor for 10 mins to fix render settings.',
    category: 'Design & Creative',
    urgency: 'Critical (Exam/Deadline)',
    creditsReward: 1,
    bountyInRupees: 150,
    createdAt: '12 minutes ago',
    status: 'Open'
  },
  {
    id: 'sos-2',
    studentId: 'usr-12',
    studentName: 'Ayush Mohanty',
    studentDept: 'Electronics (3rd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    topic: 'Guitar F-Major barre chord buzz & wrist pain troubleshooting',
    description: 'Auditions in two days. The index finger barre on the 1st fret buzzes on the B string no matter how hard I press. Need 15 mins with an experienced guitarist to check my thumb placement and elbow angle.',
    category: 'Music & Arts',
    urgency: 'High',
    creditsReward: 1,
    bountyInRupees: 100,
    createdAt: '28 minutes ago',
    status: 'Open'
  },
  {
    id: 'sos-3',
    studentId: 'usr-13',
    studentName: 'Kavya Sen',
    studentDept: 'Mechanical (3rd Year)',
    studentAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    topic: 'SolidWorks lofted boss guide curve failing in drone propeller blade',
    description: 'Mini-project submission: lofting between 3 airfoil sketch profiles is twisting and failing to intersect guide curves. Need a CAD peer for 15 mins to inspect profile alignment.',
    category: 'Engineering & 3D',
    urgency: 'Critical (Exam/Deadline)',
    creditsReward: 2,
    bountyInRupees: 200,
    createdAt: '40 minutes ago',
    status: 'Open'
  }
];

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
