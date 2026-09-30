export type UserRole = 'trainee' | 'trainer' | 'admin';

export type UserStatus = 'Approved' | 'Pending' | 'Rejected';

export interface Qualification {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade?: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  organization: string;
  duration: string;
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl?: string;
}

export type SkillCategory =
  | 'Design & Creative'
  | 'Music & Arts'
  | 'Languages & Communication'
  | 'Engineering & 3D'
  | 'Tech & Code'
  | 'Academics & Analytics'
  | 'Cloud & DevOps'
  | 'AI & Data Science'
  | 'Cybersecurity & Governance';

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
  role: UserRole;
  status: UserStatus;
  organization?: string;
  designation?: string;
  qualifications: Qualification[];
  workExperience: WorkExperience[];
  interests: string[];
  certificates: Certificate[];
  enrolledCourseIds: string[];
  campusCredits: number;
  rupeeBalance: number; // in Indian Rupees (₹)
  pricePerSessionInRupees: number;
  rating: number;
  totalSessions: number;
  isOnline: boolean;
  skillsOffered: Skill[];
  skillsSeeking: string[];
  badges: ProofBadge[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessonsCount: number;
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  category: SkillCategory;
  description: string;
  trainerId: string;
  trainerName: string;
  trainerAvatar: string;
  trainerRole?: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  enrolledCount: number;
  rating: number;
  reviewsCount: number;
  modules: CourseModule[];
  learningOutcomes: string[];
  prerequisites?: string[];
  publishedAt: string;
}

export type MaterialType = 'Recorded Lecture' | 'Presentation' | 'Study Material';

export interface TrainerMaterial {
  id: string;
  courseId?: string;
  title: string;
  subject: string;
  type: MaterialType;
  trainerId: string;
  trainerName: string;
  trainerAvatar?: string;
  fileFormat: 'MP4' | 'PDF' | 'PPTX' | 'DOCX';
  fileSize: string;
  uploadDate: string;
  durationOrPages: string;
  resourceLink: string;
  description: string;
  downloadsCount: number;
}

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface AssessmentQuestionnaire {
  id: string;
  courseId?: string;
  title: string;
  subject: string;
  trainerId: string;
  trainerName: string;
  deadline: string;
  timeLimitMinutes: number;
  totalMarks: number;
  passingMarks: number;
  questions: MCQQuestion[];
  totalSubmissionsCount: number;
  averageScore: number;
  status: 'Active' | 'Closed';
  createdAt: string;
}

export interface AssessmentSubmission {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  subject: string;
  traineeId: string;
  traineeName: string;
  traineeAvatar?: string;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
  answers: Record<string, number>;
}

export interface CourseFeedback {
  id: string;
  courseId: string;
  courseTitle: string;
  traineeId: string;
  traineeName: string;
  traineeAvatar: string;
  rating: number;
  contentQualityRating: number;
  trainerDeliveryRating: number;
  feedbackText: string;
  date: string;
}

export type AnnouncementType = 'Announcement' | 'Achievement' | 'New Content' | 'Notification';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: AnnouncementType;
  author: string;
  authorRole: string;
  publishedAt: string;
  priority: 'High' | 'Normal';
  badgeText?: string;
  targetAudience: 'All' | 'Trainees' | 'Trainers';
  actionUrl?: string;
  actionText?: string;
}

export interface CompetencyMatch {
  trainerId: string;
  trainerName: string;
  trainerAvatar: string;
  qualification: string;
  experienceYears: number;
  suitabilityScore: number; // 0-100%
  matchingSkills: string[];
  recommendedSubjects: string[];
  status: 'Recommended' | 'Primary Trainer' | 'Secondary Mentor';
  activeCoursesCount: number;
  trainerRating: number;
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
  bountyInRupees: number;
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
  matchScore: number;
  aiMatchReason: string;
  complementarySkills: string[];
}

export interface SolutionAuditResult {
  passed: boolean;
  score: number;
  verdict: 'APPROVED' | 'REJECTED' | 'NEEDS_CLARIFICATION';
  feedback: string;
  clarificationQuestion?: string;
  criteriaScores: {
    relevance: number;
    technicalAccuracy: number;
    completeness: number;
    clarity: number;
  };
}
