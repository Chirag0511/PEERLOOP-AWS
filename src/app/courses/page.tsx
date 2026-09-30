'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  GraduationCap,
  Clock,
  Star,
  Users,
  CheckCircle2,
  AlertCircle,
  FileText,
  Play,
  Award,
  ChevronRight,
  Filter,
  Search,
  MessageSquare,
  ShieldCheck,
  Send,
  HelpCircle,
  Timer
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Course, AssessmentQuestionnaire, AssessmentSubmission } from '@/types';

export default function CoursesAndAssessmentsPage() {
  const {
    user,
    courses,
    enrollCourse,
    unenrollCourse,
    assessments,
    submitAssessment,
    submissions,
    feedbacks,
    submitCourseFeedback
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'courses' | 'assessments'>('courses');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Course Detail / Feedback Modal State
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [contentRating, setContentRating] = useState<number>(5);
  const [trainerRating, setTrainerRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [feedbackSuccess, setFeedbackSuccess] = useState<boolean>(false);

  // MCQ Assessment Runner Modal State
  const [activeAssessment, setActiveAssessment] = useState<AssessmentQuestionnaire | null>(null);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [assessmentResult, setAssessmentResult] = useState<AssessmentSubmission | null>(null);

  const subjects = ['All', 'Cloud & DevOps', 'AI & Data Science', 'Cybersecurity & Governance', 'Tech & Code'];

  const filteredCourses = courses.filter((c) => {
    const matchSubject = selectedSubject === 'All' || c.subject === selectedSubject;
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.trainerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchSearch;
  });

  const filteredAssessments = assessments.filter((a) => {
    const matchSubject = selectedSubject === 'All' || a.subject === selectedSubject;
    const matchSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.trainerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchSearch;
  });

  const handleStartAssessment = (assessment: AssessmentQuestionnaire) => {
    setActiveAssessment(assessment);
    setMcqAnswers({});
    setAssessmentResult(null);
  };

  const handleSelectMcqOption = (questionId: string, optionIndex: number) => {
    setMcqAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitAssessmentTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAssessment) return;
    const res = submitAssessment(activeAssessment.id, mcqAnswers);
    setAssessmentResult(res);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    submitCourseFeedback(selectedCourse.id, feedbackRating, contentRating, trainerRating, feedbackText);
    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackSuccess(false);
      setIsFeedbackOpen(false);
      setFeedbackText('');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                Institutional Learning Hub
              </span>
              <span className="text-xs text-slate-500">• Trainee Curriculum & Testing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Certified Courses & Subject Assessments
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Enroll in accredited curricula led by verified faculty trainers, study structured modules, attempt subject-wise MCQ assessments, and earn verifiable competency certifications.
            </p>
          </div>

          {/* Primary View Toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'courses'
                  ? 'bg-amazon-orange text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Courses ({courses.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('assessments')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'assessments'
                  ? 'bg-amazon-orange text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>MCQ Assessments ({assessments.length})</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Subject Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
            {subjects.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSubject === sub
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* TAB 1: COURSES CATALOG */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isEnrolled = user.enrolledCourseIds.includes(course.id);
              const courseFeedbacks = feedbacks.filter((f) => f.courseId === course.id);

              return (
                <div
                  key={course.id}
                  className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  {/* Thumbnail & Level Badge */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 border border-amber-400/30">
                      {course.subject}
                    </span>
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 shadow-sm">
                      {course.level}
                    </span>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1 font-semibold">
                        <Users className="w-3.5 h-3.5 text-sky-400" />
                        {course.enrolledCount} Trainees
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Trainer Attribution */}
                      <div className="flex items-center gap-2.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <img
                          src={course.trainerAvatar}
                          alt={course.trainerName}
                          className="w-8 h-8 rounded-full ring-1 ring-amber-400 object-cover"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                            {course.trainerName}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {course.trainerRole || 'Faculty Trainer'}
                          </p>
                        </div>
                      </div>

                      {/* Ratings & Module count */}
                      <div className="flex items-center justify-between mt-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {course.rating} ({course.reviewsCount} reviews)
                        </span>
                        <span>{course.modules.length} Modules</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      {isEnrolled ? (
                        <>
                          <button
                            onClick={() => unenrollCourse(course.id)}
                            className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 text-xs font-bold transition-all"
                          >
                            Enrolled ✓ (Leave)
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCourse(course);
                              setIsFeedbackOpen(true);
                            }}
                            className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100 border border-amber-200 dark:border-amber-800"
                            title="Provide Feedback"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => enrollCourse(course.id)}
                          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 text-xs font-bold shadow-md active:scale-95 transition-all"
                        >
                          Enroll in Course Free
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                      >
                        Syllabus
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: SUBJECT-WISE MCQ ASSESSMENTS */}
        {activeTab === 'assessments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssessments.map((assess) => {
                const existingSubmission = submissions.find((s) => s.assessmentId === assess.id && s.traineeId === user.id);

                return (
                  <div
                    key={assess.id}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                          {assess.subject}
                        </span>
                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <Timer className="w-3.5 h-3.5" />
                          {assess.deadline}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                        {assess.title}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        Prepared by <strong className="text-slate-700 dark:text-slate-300">{assess.trainerName}</strong>
                      </p>

                      {/* Criteria Highlights */}
                      <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Questions</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{assess.questions.length} MCQs</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">Time Limit</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{assess.timeLimitMinutes} Mins</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">Pass Score</span>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{assess.passingMarks}/{assess.totalMarks}</span>
                        </div>
                      </div>

                      {/* Existing result indicator */}
                      {existingSubmission && (
                        <div className={`mt-3 p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                          existingSubmission.passed
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                        }`}>
                          <span className="font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            Scored: {existingSubmission.score}/{existingSubmission.totalMarks} ({existingSubmission.percentage}%)
                          </span>
                          <span className="font-bold uppercase text-[10px]">
                            {existingSubmission.passed ? 'Certified ✓' : 'Failed'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => handleStartAssessment(assess)}
                        className="w-full py-2.5 rounded-xl bg-amazon-orange hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>{existingSubmission ? 'Retake MCQ Assessment' : 'Attempt Subject Assessment'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submissions History Table */}
            {submissions.length > 0 && (
              <div className="mt-12 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-amber-500" />
                  Your Subject Assessment History & Verifiable Records
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                        <th className="pb-3 font-semibold">Assessment Title</th>
                        <th className="pb-3 font-semibold">Subject</th>
                        <th className="pb-3 font-semibold">Trainee</th>
                        <th className="pb-3 font-semibold">Score</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {submissions.map((sub) => (
                        <tr key={sub.id} className="text-slate-700 dark:text-slate-300">
                          <td className="py-3 font-semibold text-slate-900 dark:text-white">{sub.assessmentTitle}</td>
                          <td className="py-3">{sub.subject}</td>
                          <td className="py-3">{sub.traineeName}</td>
                          <td className="py-3 font-mono font-bold text-slate-900 dark:text-white">{sub.score} / {sub.totalMarks} ({sub.percentage}%)</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              sub.passed
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                                : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                            }`}>
                              {sub.passed ? 'PASSED (CERTIFIED)' : 'FAILED'}
                            </span>
                          </td>
                          <td className="py-3 text-slate-400">{sub.submittedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* MODAL 1: COURSE SYLLABUS & REVIEWS MODAL */}
      {selectedCourse && !isFeedbackOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              {selectedCourse.subject}
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
              {selectedCourse.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Course Instructor: <strong>{selectedCourse.trainerName}</strong> ({selectedCourse.trainerRole})
            </p>

            {/* Modules List */}
            <h4 className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mt-6 mb-3">
              Curriculum Modules & Lessons ({selectedCourse.modules.length})
            </h4>
            <div className="space-y-2">
              {selectedCourse.modules.map((m, idx) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{m.title}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] flex items-center gap-2">
                    <span>{m.lessonsCount} lessons</span>
                    <span>•</span>
                    <span>{m.duration}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Learning Outcomes */}
            <h4 className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mt-6 mb-2">
              Key Competency Outcomes
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {selectedCourse.learningOutcomes.map((lo, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{lo}</span>
                </li>
              ))}
            </ul>

            {/* Trainee Reviews */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase text-slate-600 dark:text-slate-400 mb-3 flex items-center justify-between">
                <span>Trainee Feedback & Reviews</span>
                <span className="text-amber-500 font-bold">★ {selectedCourse.rating}</span>
              </h4>

              {feedbacks.filter((f) => f.courseId === selectedCourse.id).length === 0 ? (
                <p className="text-xs text-slate-400 italic">No reviews submitted yet.</p>
              ) : (
                <div className="space-y-2.5">
                  {feedbacks
                    .filter((f) => f.courseId === selectedCourse.id)
                    .map((fb) => (
                      <div key={fb.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-800 dark:text-slate-200">{fb.traineeName}</span>
                          <span className="text-amber-500 font-bold">★ {fb.rating}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-[11px]">{fb.feedbackText}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: COURSE FEEDBACK SUBMISSION */}
      {isFeedbackOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
            <button
              onClick={() => setIsFeedbackOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-500" />
              Provide Course & Content Feedback
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Course: <strong>{selectedCourse.title}</strong>
            </p>

            {feedbackSuccess ? (
              <div className="p-6 text-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 animate-bounce" />
                <p className="font-bold text-sm">Feedback Submitted Successfully!</p>
                <p className="text-xs mt-1 text-slate-500">Thank you for helping us improve organizational capacity.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 mt-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Overall Course Rating: {feedbackRating} / 5 Stars
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={feedbackRating}
                    onChange={(e) => setFeedbackRating(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Content Quality ({contentRating}/5)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={contentRating}
                      onChange={(e) => setContentRating(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Trainer Delivery ({trainerRating}/5)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={trainerRating}
                      onChange={(e) => setTrainerRating(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Constructive Review & Suggestions
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your learning experience, what concepts were clear, and areas for improvement..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amazon-orange hover:bg-amber-500 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Training Review</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: MCQ ASSESSMENT TEST RUNNER */}
      {activeAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveAssessment(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>

            {/* Assessment Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500 text-slate-950 font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {activeAssessment.subject} Assessment
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {activeAssessment.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Instructor: {activeAssessment.trainerName}</span>
                  <span>•</span>
                  <span>Time Limit: {activeAssessment.timeLimitMinutes} Mins</span>
                  <span>•</span>
                  <span>Passing Mark: {activeAssessment.passingMarks} / {activeAssessment.totalMarks}</span>
                </div>
              </div>
            </div>

            {assessmentResult ? (
              /* RESULT VIEW */
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center animate-fadeIn">
                <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-3 ${
                  assessmentResult.passed ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                }`}>
                  {assessmentResult.passed ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {assessmentResult.passed ? '🎉 Assessment Passed! Competency Certified' : 'Assessment Not Cleared'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  You scored <strong className="text-slate-900 dark:text-white">{assessmentResult.score} / {assessmentResult.totalMarks}</strong> ({assessmentResult.percentage}%)
                </p>

                {assessmentResult.passed && (
                  <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs">
                    <p className="font-bold flex items-center justify-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-600" />
                      Verifiable Credential & Badge Minted to Your Profile!
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Check your Profile page to view your newly awarded certificate and cryptographic proof badge.
                    </p>
                  </div>
                )}

                {/* Explanations */}
                <div className="mt-6 text-left space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Question Analysis & Diagnostic Explanations:
                  </h4>
                  {activeAssessment.questions.map((q, idx) => {
                    const isCorrect = mcqAnswers[q.id] === q.correctAnswerIndex;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border text-xs ${
                          isCorrect
                            ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                            : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
                        }`}
                      >
                        <p className="font-bold text-slate-900 dark:text-white mb-2">
                          Q{idx + 1}: {q.question}
                        </p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400">
                          Your Answer: <strong className={isCorrect ? 'text-emerald-600' : 'text-rose-600'}>{q.options[mcqAnswers[q.id]] || 'Not Answered'}</strong>
                        </p>
                        {!isCorrect && (
                          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                            Correct Answer: <strong>{q.options[q.correctAnswerIndex]}</strong>
                          </p>
                        )}
                        <p className="text-[11px] text-slate-500 mt-2 italic">
                          💡 Note: {q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => setActiveAssessment(null)}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold"
                  >
                    Done & Return
                  </button>
                </div>
              </div>
            ) : (
              /* QUESTIONNAIRE FORM VIEW */
              <form onSubmit={handleSubmitAssessmentTest} className="space-y-6 mt-4">
                {activeAssessment.questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800"
                  >
                    <p className="font-bold text-sm text-slate-900 dark:text-white mb-3">
                      {idx + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = mcqAnswers[q.id] === optIdx;
                        return (
                          <label
                            key={optIdx}
                            onClick={() => handleSelectMcqOption(q.id, optIdx)}
                            className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 font-semibold text-slate-900 dark:text-white'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              checked={isSelected}
                              onChange={() => handleSelectMcqOption(q.id, optIdx)}
                              className="accent-amber-500 w-4 h-4"
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-500">
                    Answered {Object.keys(mcqAnswers).length} of {activeAssessment.questions.length} questions
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all"
                  >
                    Submit Assessment for Evaluation
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
