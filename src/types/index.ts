export type SkillCategory =
  | 'Design & Creative'
  | 'Music & Arts'
  | 'Languages & Communication'
  | 'Engineering & 3D'
  | 'Tech & Code'
  | 'Academics & Analytics';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  endorsements: number;
}

export interface ProofBadge {
  id: string;
  title: string;
  skill: string;
  issuer: string;
  issuedAt: string;
  verificationHash: string;
  level: 'Silver' | 'Gold' | 'Diamond';
}

export interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  year: string;
  avatar: string;
  bio: string;
  campusCredits: number;
  rupeeBalance: number; // in Indian Rupees (₹)
  pricePerSessionInRupees: number; // e.g. 0 for 100% free barter, or 149
  rating: number;
  totalSessions: number;
  isOnline: boolean;
  skillsOffered: Skill[];
  skillsSeeking: string[];
  badges: ProofBadge[];
}

export type UrgencyLevel = 'Critical (Exam/Deadline)' | 'High' | 'Normal';

export interface SOSRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentDept: string;
  studentAvatar: string;
  topic: string;
  description: string;
  category: SkillCategory;
  urgency: UrgencyLevel;
  creditsReward: number;
  bountyInRupees: number; // in Indian Rupees (₹)
  createdAt: string;
  status: 'Open' | 'In-Progress' | 'Resolved';
  acceptedBy?: string;
  acceptedByName?: string;
}

export interface CreditTransaction {
  id: string;
  timestamp: string;
  amountRupees?: number;
  amountCredits?: number;
  type: 'Earned' | 'Spent' | 'Welcome Bonus';
  description: string;
  counterpart: string;
}

export interface SessionData {
  id: string;
  mentorId: string;
  mentorName: string;
  learnerId: string;
  learnerName: string;
  topic: string;
  status: 'Scheduled' | 'Live' | 'Completed';
  createdAt: string;
  durationMinutes: number;
  notesContent: string;
  codeContent: string;
  feeInRupees: number;
  aiSummary?: {
    overview: string;
    keyConceptsLearned: string[];
    actionItems: string[];
    badgeAwarded?: ProofBadge;
  };
}

export interface SemanticMatchResult {
  student: Student;
  matchScore: number; // 0 to 100
  aiMatchReason: string;
  complementarySkills: string[];
}

export interface SolutionAuditResult {
  passed: boolean;
  score: number; // 0 to 100
  verdict: 'APPROVED' | 'REJECTED' | 'NEEDS_CLARIFICATION';
  feedback: string;
  clarificationQuestion?: string;
  criteriaScores: {
    relevance: number; // /30
    technicalAccuracy: number; // /30
    completeness: number; // /25
    clarity: number; // /15
  };
}

