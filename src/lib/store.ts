'use client';

import { useState, useEffect } from 'react';
import {
  Student,
  UserRole,
  UserStatus,
  SOSRequest,
  CreditTransaction,
  ProofBadge,
  SessionData,
  Course,
  TrainerMaterial,
  AssessmentQuestionnaire,
  AssessmentSubmission,
  CourseFeedback,
  Announcement,
  CompetencyMatch,
  Qualification,
  WorkExperience,
  Certificate
} from '@/types';
import {
  DEMO_TRAINEE,
  DEMO_TRAINER,
  DEMO_ADMIN,
  MOCK_USERS_LIST,
  MOCK_COURSES,
  MOCK_TRAINER_MATERIALS,
  MOCK_ASSESSMENTS,
  MOCK_SUBMISSIONS,
  MOCK_FEEDBACKS,
  MOCK_ANNOUNCEMENTS,
  MOCK_COMPETENCY_MATCHES,
  MOCK_SOS_REQUESTS,
  MOCK_TRANSACTIONS,
  generateRandomSosRequests,
  SHOWCASE_SQL_SOS_QUESTION
} from './mockData';

const STORAGE_KEYS = {
  USER: 'peerloop_user_sih_v3',
  ROLE: 'peerloop_role_sih_v3',
  IS_LOGGED_IN: 'peerloop_logged_in_sih_v3',
  ALL_USERS: 'peerloop_all_users_sih_v3',
  COURSES: 'peerloop_courses_sih_v3',
  MATERIALS: 'peerloop_materials_sih_v3',
  ASSESSMENTS: 'peerloop_assessments_sih_v3',
  SUBMISSIONS: 'peerloop_submissions_sih_v3',
  FEEDBACKS: 'peerloop_feedbacks_sih_v3',
  ANNOUNCEMENTS: 'peerloop_announcements_sih_v3',
  SOS_LIST: 'peerloop_sos_list_sih_v3',
  TRANSACTIONS: 'peerloop_transactions_sih_v3'
};

export function useAppStore() {
  const [user, setUser] = useState<Student>(DEMO_TRAINEE);
  const [currentRole, setCurrentRole] = useState<UserRole>('trainee');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [allUsers, setAllUsers] = useState<Student[]>(MOCK_USERS_LIST);
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [materials, setMaterials] = useState<TrainerMaterial[]>(MOCK_TRAINER_MATERIALS);
  const [assessments, setAssessments] = useState<AssessmentQuestionnaire[]>(MOCK_ASSESSMENTS);
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>(MOCK_SUBMISSIONS);
  const [feedbacks, setFeedbacks] = useState<CourseFeedback[]>(MOCK_FEEDBACKS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [competencyMatches] = useState<CompetencyMatch[]>(MOCK_COMPETENCY_MATCHES);
  const [sosList, setSosList] = useState<SOSRequest[]>(MOCK_SOS_REQUESTS);
  const [transactions, setTransactions] = useState<CreditTransaction[]>(MOCK_TRANSACTIONS);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
      const savedLoggedIn = localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
      const savedAllUsers = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
      const savedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);
      const savedMaterials = localStorage.getItem(STORAGE_KEYS.MATERIALS);
      const savedAssessments = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
      const savedSubmissions = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      const savedFeedbacks = localStorage.getItem(STORAGE_KEYS.FEEDBACKS);
      const savedAnnouncements = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      const savedSos = localStorage.getItem(STORAGE_KEYS.SOS_LIST);
      const savedTx = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedRole) setCurrentRole(JSON.parse(savedRole));
      if (savedLoggedIn !== null) setIsLoggedIn(JSON.parse(savedLoggedIn));
      if (savedAllUsers) setAllUsers(JSON.parse(savedAllUsers));
      if (savedCourses) setCourses(JSON.parse(savedCourses));
      if (savedMaterials) setMaterials(JSON.parse(savedMaterials));
      if (savedAssessments) setAssessments(JSON.parse(savedAssessments));
      if (savedSubmissions) setSubmissions(JSON.parse(savedSubmissions));
      if (savedFeedbacks) setFeedbacks(JSON.parse(savedFeedbacks));
      if (savedAnnouncements) setAnnouncements(JSON.parse(savedAnnouncements));
      if (savedTx) setTransactions(JSON.parse(savedTx));

      // Randomly populate around 8-10 SOS problems on launch
      const randomCount = Math.floor(Math.random() * 3) + 8;
      const freshSos = generateRandomSosRequests(randomCount);

      if (savedSos) {
        const parsed = JSON.parse(savedSos);
        const currentUserObj = savedUser ? JSON.parse(savedUser) : DEMO_TRAINEE;
        const userCreated = parsed.filter((s: SOSRequest) => s.studentId === currentUserObj.id);
        const otherFresh = freshSos.filter((s: SOSRequest) => s.id !== SHOWCASE_SQL_SOS_QUESTION.id);
        const combined = [SHOWCASE_SQL_SOS_QUESTION, ...userCreated, ...otherFresh];
        setSosList(combined);
        localStorage.setItem(STORAGE_KEYS.SOS_LIST, JSON.stringify(combined));
      } else {
        setSosList(freshSos);
        localStorage.setItem(STORAGE_KEYS.SOS_LIST, JSON.stringify(freshSos));
      }
    } catch (e) {
      console.error('Failed to load from storage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save updated user data
  const saveUserData = (updated: Student) => {
    setUser(updated);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updated));

    // Also update in allUsers list
    const updatedUsersList = allUsers.map((u) => (u.id === updated.id ? updated : u));
    setAllUsers(updatedUsersList);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(updatedUsersList));
  };

  // Auth: Role Switcher (One-click toggle between Trainee, Trainer, Admin for instant SIH demo)
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem(STORAGE_KEYS.ROLE, JSON.stringify(role));

    if (role === 'trainee') {
      login(DEMO_TRAINEE);
    } else if (role === 'trainer') {
      login(DEMO_TRAINER);
    } else if (role === 'admin') {
      login(DEMO_ADMIN);
    }
  };

  // Auth: Login
  const login = (studentToLogin: Student) => {
    setUser(studentToLogin);
    setCurrentRole(studentToLogin.role || 'trainee');
    setIsLoggedIn(true);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(studentToLogin));
    localStorage.setItem(STORAGE_KEYS.ROLE, JSON.stringify(studentToLogin.role || 'trainee'));
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, JSON.stringify(true));
  };

  // Auth: Logout
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, JSON.stringify(false));
  };

  // Auth: Switch persona
  const switchUser = (studentId: string) => {
    const found = allUsers.find((s) => s.id === studentId);
    if (found) {
      login(found);
    }
  };

  // Trainee: Course Enrollment
  const enrollCourse = (courseId: string) => {
    if (user.enrolledCourseIds.includes(courseId)) return;
    const updatedEnrolled = [...user.enrolledCourseIds, courseId];
    const updatedUser = { ...user, enrolledCourseIds: updatedEnrolled };
    saveUserData(updatedUser);

    // Update course enrolled count
    const updatedCourses = courses.map((c) =>
      c.id === courseId ? { ...c, enrolledCount: c.enrolledCount + 1 } : c
    );
    setCourses(updatedCourses);
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(updatedCourses));
  };

  const unenrollCourse = (courseId: string) => {
    const updatedEnrolled = user.enrolledCourseIds.filter((id) => id !== courseId);
    const updatedUser = { ...user, enrolledCourseIds: updatedEnrolled };
    saveUserData(updatedUser);

    const updatedCourses = courses.map((c) =>
      c.id === courseId ? { ...c, enrolledCount: Math.max(0, c.enrolledCount - 1) } : c
    );
    setCourses(updatedCourses);
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(updatedCourses));
  };

  // Trainee: Submit Course Feedback
  const submitCourseFeedback = (
    courseId: string,
    rating: number,
    contentQuality: number,
    trainerDelivery: number,
    feedbackText: string
  ) => {
    const course = courses.find((c) => c.id === courseId);
    const newFeedback: CourseFeedback = {
      id: `fb-${Date.now()}`,
      courseId,
      courseTitle: course ? course.title : 'Course Training',
      traineeId: user.id,
      traineeName: user.name,
      traineeAvatar: user.avatar,
      rating,
      contentQualityRating: contentQuality,
      trainerDeliveryRating: trainerDelivery,
      feedbackText,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(updated));
    return newFeedback;
  };

  // Trainee: Submit Assessment
  const submitAssessment = (
    assessmentId: string,
    answers: Record<string, number>
  ): AssessmentSubmission => {
    const assessment = assessments.find((a) => a.id === assessmentId);
    if (!assessment) throw new Error('Assessment not found');

    let correctCount = 0;
    assessment.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / assessment.questions.length) * assessment.totalMarks);
    const percentage = Math.round((correctCount / assessment.questions.length) * 100);
    const passed = score >= assessment.passingMarks;

    const submission: AssessmentSubmission = {
      id: `sub-${Date.now()}`,
      assessmentId,
      assessmentTitle: assessment.title,
      subject: assessment.subject,
      traineeId: user.id,
      traineeName: user.name,
      traineeAvatar: user.avatar,
      score,
      totalMarks: assessment.totalMarks,
      percentage,
      passed,
      submittedAt: new Date().toLocaleString(),
      answers
    };

    const updatedSubmissions = [submission, ...submissions];
    setSubmissions(updatedSubmissions);
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(updatedSubmissions));

    // Award certificate / proof badge if passed!
    if (passed) {
      const newBadge: ProofBadge = {
        id: `cert-assess-${Date.now()}`,
        title: `${assessment.subject} Certified`,
        skill: assessment.subject,
        issuer: 'PeerLoop Capacity Assessment Council',
        issuedAt: new Date().toISOString().split('T')[0],
        verificationHash: '0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6),
        level: score === assessment.totalMarks ? 'Diamond' : 'Gold'
      };

      const newCert: Certificate = {
        id: `cert-obj-${Date.now()}`,
        title: `${assessment.subject} Competency Certification`,
        issuer: 'Institutional Training Council',
        date: new Date().toISOString().split('T')[0],
        credentialId: `CERT-MCQ-${Date.now().toString().slice(-6)}`
      };

      const updatedUser: Student = {
        ...user,
        badges: [newBadge, ...user.badges],
        certificates: [newCert, ...user.certificates],
        campusCredits: user.campusCredits + 1
      };
      saveUserData(updatedUser);
    }

    return submission;
  };

  // Trainee Profile: Update Qualifications, Work Experience, Certificates, Interests
  const addQualification = (qual: Omit<Qualification, 'id'>) => {
    const newQual: Qualification = { ...qual, id: `q-${Date.now()}` };
    const updatedUser = {
      ...user,
      qualifications: [...user.qualifications, newQual]
    };
    saveUserData(updatedUser);
  };

  const removeQualification = (id: string) => {
    const updatedUser = {
      ...user,
      qualifications: user.qualifications.filter((q) => q.id !== id)
    };
    saveUserData(updatedUser);
  };

  const addWorkExperience = (exp: Omit<WorkExperience, 'id'>) => {
    const newExp: WorkExperience = { ...exp, id: `we-${Date.now()}` };
    const updatedUser = {
      ...user,
      workExperience: [newExp, ...user.workExperience]
    };
    saveUserData(updatedUser);
  };

  const removeWorkExperience = (id: string) => {
    const updatedUser = {
      ...user,
      workExperience: user.workExperience.filter((we) => we.id !== id)
    };
    saveUserData(updatedUser);
  };

  const addCertificate = (cert: Omit<Certificate, 'id'>) => {
    const newCert: Certificate = { ...cert, id: `cert-${Date.now()}` };
    const updatedUser = {
      ...user,
      certificates: [newCert, ...user.certificates]
    };
    saveUserData(updatedUser);
  };

  const removeCertificate = (id: string) => {
    const updatedUser = {
      ...user,
      certificates: user.certificates.filter((c) => c.id !== id)
    };
    saveUserData(updatedUser);
  };

  const updateInterests = (interests: string[]) => {
    const updatedUser = { ...user, interests };
    saveUserData(updatedUser);
  };

  // Trainer: Create Questionnaire / MCQ Assessment
  const addAssessment = (newAssess: Omit<AssessmentQuestionnaire, 'id' | 'createdAt' | 'totalSubmissionsCount' | 'averageScore'>) => {
    const created: AssessmentQuestionnaire = {
      ...newAssess,
      id: `assess-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      totalSubmissionsCount: 0,
      averageScore: 0
    };
    const updated = [created, ...assessments];
    setAssessments(updated);
    localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(updated));
    return created;
  };

  // Trainer: Upload Material (Lectures, Presentations, Study Materials)
  const addMaterial = (newMat: Omit<TrainerMaterial, 'id' | 'uploadDate' | 'downloadsCount'>) => {
    const created: TrainerMaterial = {
      ...newMat,
      id: `mat-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
      downloadsCount: 0
    };
    const updated = [created, ...materials];
    setMaterials(updated);
    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(updated));
    return created;
  };

  // Admin: User Approval & Role Management
  const approveUser = (userId: string, status: UserStatus) => {
    const updatedList = allUsers.map((u) => (u.id === userId ? { ...u, status } : u));
    setAllUsers(updatedList);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(updatedList));

    if (user.id === userId) {
      saveUserData({ ...user, status });
    }
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    const updatedList = allUsers.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
    setAllUsers(updatedList);
    localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(updatedList));

    if (user.id === userId) {
      saveUserData({ ...user, role: newRole });
      setCurrentRole(newRole);
    }
  };

  // Admin: Publish Homepage Announcement / Achievement / Notification
  const addAnnouncement = (newAnn: Omit<Announcement, 'id' | 'publishedAt'>) => {
    const created: Announcement = {
      ...newAnn,
      id: `ann-${Date.now()}`,
      publishedAt: 'Just now'
    };
    const updated = [created, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(updated));
    return created;
  };

  const deleteAnnouncement = (id: string) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(updated));
  };

  // SOS & Peer Support (kept integrated)
  const addSosRequest = (newRequest: Omit<SOSRequest, 'id' | 'createdAt' | 'status' | 'studentId' | 'studentName' | 'studentDept' | 'studentAvatar'>) => {
    const created: SOSRequest = {
      ...newRequest,
      id: `sos-${Date.now()}`,
      studentId: user.id,
      studentName: user.name,
      studentDept: `${user.department} (${user.year.split(' ')[0]})`,
      studentAvatar: user.avatar,
      createdAt: 'Just now',
      status: 'Open'
    };
    const updatedList = [created, ...sosList];
    setSosList(updatedList);
    localStorage.setItem(STORAGE_KEYS.SOS_LIST, JSON.stringify(updatedList));
    return created;
  };

  const acceptSosRequest = (sosId: string) => {
    const target = sosList.find((s) => s.id === sosId);
    if (!target) return null;

    const updatedList = sosList.map((s) => {
      if (s.id === sosId) {
        return {
          ...s,
          status: 'In-Progress' as const,
          acceptedBy: user.id,
          acceptedByName: user.name
        };
      }
      return s;
    });

    setSosList(updatedList);
    localStorage.setItem(STORAGE_KEYS.SOS_LIST, JSON.stringify(updatedList));
    return target;
  };

  const resolveSosRequest = (sosId: string) => {
    const updatedList = sosList.map((s) => {
      if (s.id === sosId || `sos-${s.id}` === sosId) {
        return { ...s, status: 'Resolved' as const };
      }
      return s;
    });
    setSosList(updatedList);
    localStorage.setItem(STORAGE_KEYS.SOS_LIST, JSON.stringify(updatedList));
  };

  const completeSessionAndAward = (
    sessionId: string,
    topic: string,
    rupeesEarned: number,
    creditsEarned: number = 1,
    badgeAwarded?: ProofBadge
  ) => {
    resolveSosRequest(sessionId);
    const updatedUser = {
      ...user,
      rupeeBalance: user.rupeeBalance + rupeesEarned,
      campusCredits: user.campusCredits + creditsEarned,
      totalSessions: user.totalSessions + 1,
      badges: badgeAwarded ? [badgeAwarded, ...user.badges] : user.badges
    };
    saveUserData(updatedUser);

    const newTx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      timestamp: 'Just now',
      amountRupees: rupeesEarned,
      amountCredits: creditsEarned,
      type: 'Earned',
      description: `Completed peer consultation on "${topic}"`,
      counterpart: 'Peer Network'
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTx));
  };

  const depositMoney = (amount: number, method: string = 'Instant UPI') => {
    const updatedUser = {
      ...user,
      rupeeBalance: user.rupeeBalance + amount
    };
    saveUserData(updatedUser);

    const newTx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      timestamp: 'Just now',
      amountRupees: amount,
      type: 'Earned',
      description: `Added ₹${amount} via ${method}`,
      counterpart: 'UPI / Bank Deposit'
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTx));
  };

  const withdrawMoney = (amount: number, upiId: string) => {
    const updatedUser = {
      ...user,
      rupeeBalance: Math.max(0, user.rupeeBalance - amount)
    };
    saveUserData(updatedUser);

    const newTx: CreditTransaction = {
      id: `tx-${Date.now()}`,
      timestamp: 'Just now',
      amountRupees: -amount,
      type: 'Spent',
      description: `Payout of ₹${amount} transferred to ${upiId}`,
      counterpart: 'Bank / UPI Withdrawal'
    };
    const updatedTx = [newTx, ...transactions];
    setTransactions(updatedTx);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTx));
  };

  return {
    user,
    currentRole,
    switchRole,
    isLoggedIn,
    login,
    logout,
    switchUser,
    setUser: saveUserData,
    allUsers,
    approveUser,
    updateUserRole,
    courses,
    enrollCourse,
    unenrollCourse,
    materials,
    addMaterial,
    assessments,
    addAssessment,
    submissions,
    submitAssessment,
    feedbacks,
    submitCourseFeedback,
    announcements,
    addAnnouncement,
    deleteAnnouncement,
    competencyMatches,
    addQualification,
    removeQualification,
    addWorkExperience,
    removeWorkExperience,
    addCertificate,
    removeCertificate,
    updateInterests,
    sosList,
    addSosRequest,
    acceptSosRequest,
    resolveSosRequest,
    completeSessionAndAward,
    depositMoney,
    withdrawMoney,
    transactions,
    sessions,
    isLoaded
  };
}
