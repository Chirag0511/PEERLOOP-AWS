'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  GraduationCap,
  Users,
  Award,
  Upload,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  Trash2,
  BarChart3,
  MessageSquare,
  FileText,
  Star,
  Layers,
  Sparkles
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { MCQQuestion, MaterialType } from '@/types';

export default function TrainerStudioPage() {
  const {
    user,
    courses,
    assessments,
    addAssessment,
    submissions,
    feedbacks,
    materials,
    addMaterial
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'assessments' | 'analytics' | 'materials' | 'profile'>('assessments');

  // Create Assessment Form State
  const [assessTitle, setAssessTitle] = useState('');
  const [assessSubject, setAssessSubject] = useState('Cloud & DevOps');
  const [assessDeadline, setAssessDeadline] = useState('2026-10-25 (11:59 PM)');
  const [assessTimeLimit, setAssessTimeLimit] = useState(20);
  const [assessPassingMarks, setAssessPassingMarks] = useState(18);
  const [assessQuestions, setAssessQuestions] = useState<MCQQuestion[]>([
    {
      id: 'q-init-1',
      question: 'What is the primary role of a Load Balancer in distributed architectures?',
      options: [
        'Evenly distribute network or application traffic across multiple healthy targets',
        'Directly compile JavaScript server files',
        'Store static media files without caching',
        'Encrypt database disk volumes'
      ],
      correctAnswerIndex: 0,
      explanation: 'Load balancers distribute incoming traffic across multiple targets to maximize availability and throughput.'
    }
  ]);

  // Temporary new question input state
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOpt0, setNewOpt0] = useState('');
  const [newOpt1, setNewOpt1] = useState('');
  const [newOpt2, setNewOpt2] = useState('');
  const [newOpt3, setNewOpt3] = useState('');
  const [newCorrectIdx, setNewCorrectIdx] = useState(0);
  const [newExplanation, setNewExplanation] = useState('');
  const [createSuccessNotice, setCreateSuccessNotice] = useState<string | null>(null);

  // Upload Material Form State
  const [matTitle, setMatTitle] = useState('');
  const [matSubject, setMatSubject] = useState('Cloud & DevOps');
  const [matType, setMatType] = useState<MaterialType>('Recorded Lecture');
  const [matDurationPages, setMatDurationPages] = useState('45 mins');
  const [matDesc, setMatDesc] = useState('');

  const handleAddQuestionToDraft = () => {
    if (!newQuestionText.trim() || !newOpt0.trim() || !newOpt1.trim()) {
      alert('Please fill out question text and at least 2 options.');
      return;
    }

    const createdQ: MCQQuestion = {
      id: `q-${Date.now()}`,
      question: newQuestionText,
      options: [newOpt0, newOpt1, newOpt2 || 'Option C', newOpt3 || 'Option D'],
      correctAnswerIndex: newCorrectIdx,
      explanation: newExplanation || 'Correct technical solution verified by Trainer.'
    };

    setAssessQuestions([...assessQuestions, createdQ]);
    setNewQuestionText('');
    setNewOpt0('');
    setNewOpt1('');
    setNewOpt2('');
    setNewOpt3('');
    setNewExplanation('');
  };

  const handleRemoveQuestionFromDraft = (index: number) => {
    setAssessQuestions(assessQuestions.filter((_, idx) => idx !== index));
  };

  const handlePublishAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (assessQuestions.length === 0) {
      alert('Please include at least 1 question.');
      return;
    }

    addAssessment({
      title: assessTitle,
      subject: assessSubject,
      trainerId: user.id,
      trainerName: user.name,
      deadline: assessDeadline,
      timeLimitMinutes: assessTimeLimit,
      totalMarks: assessQuestions.length * 5,
      passingMarks: assessPassingMarks,
      status: 'Active',
      questions: assessQuestions
    });

    setCreateSuccessNotice(`Assessment "${assessTitle}" successfully created and scheduled with deadline ${assessDeadline}!`);
    setAssessTitle('');
    setTimeout(() => setCreateSuccessNotice(null), 3000);
  };

  const handlePublishMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    addMaterial({
      title: matTitle,
      subject: matSubject,
      type: matType,
      trainerId: user.id,
      trainerName: user.name,
      fileFormat: matType === 'Recorded Lecture' ? 'MP4' : matType === 'Presentation' ? 'PPTX' : 'PDF',
      fileSize: matType === 'Recorded Lecture' ? '520 MB' : '15 MB',
      durationOrPages: matDurationPages,
      resourceLink: '#',
      description: matDesc
    });

    setCreateSuccessNotice(`Resource "${matTitle}" published to Trainer Library!`);
    setMatTitle('');
    setMatDesc('');
    setTimeout(() => setCreateSuccessNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                Faculty & Trainer Studio
              </span>
              <span className="text-xs text-slate-500">• Curriculum Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <GraduationCap className="w-8 h-8 text-amber-500" />
              Trainer Management Workspace
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Create and manage subject questionnaires with strict deadlines, monitor trainee participation and scoring metrics, and upload educational resources to the shared library.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Instructor: <strong className="text-slate-900 dark:text-white">{user.name}</strong>
            </span>
          </div>
        </div>

        {createSuccessNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{createSuccessNotice}</span>
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex rounded-2xl bg-white dark:bg-slate-900 p-1 mb-8 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl overflow-x-auto">
          {[
            { id: 'assessments', label: 'Create MCQ Questionnaire', icon: Plus },
            { id: 'analytics', label: 'Trainee Performance & Reviews', icon: BarChart3 },
            { id: 'materials', label: 'Upload Library Resources', icon: Layers },
            { id: 'profile', label: 'Manage Trainer Profile', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: CREATE MCQ QUESTIONNAIRE WITH DEADLINE */}
        {activeTab === 'assessments' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Questionnaire Builder */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handlePublishAssessment} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-500" />
                  Define New Assessment Questionnaire
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Assessment Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Distributed Consensus & Cloud Storage Reliability Assessment"
                    value={assessTitle}
                    onChange={(e) => setAssessTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Subject
                    </label>
                    <select
                      value={assessSubject}
                      onChange={(e) => setAssessSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Cloud & DevOps">Cloud & DevOps</option>
                      <option value="AI & Data Science">AI & Data Science</option>
                      <option value="Cybersecurity & Governance">Cybersecurity & Governance</option>
                      <option value="Tech & Code">Tech & Code</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Submission Deadline
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2026-10-30 (11:59 PM)"
                      value={assessDeadline}
                      onChange={(e) => setAssessDeadline(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Time Limit (Mins)
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={120}
                      value={assessTimeLimit}
                      onChange={(e) => setAssessTimeLimit(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Draft Questions List */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Included Questions ({assessQuestions.length})
                    </span>
                    <span className="text-[11px] text-slate-400">Total Marks: {assessQuestions.length * 5}</span>
                  </div>

                  <div className="space-y-3">
                    {assessQuestions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex items-start justify-between gap-3"
                      >
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">
                            {idx + 1}. {q.question}
                          </p>
                          <p className="text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
                            Correct: {q.options[q.correctAnswerIndex]}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestionFromDraft(idx)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add MCQ Question Sub-Form */}
                <div className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/60 space-y-3 mt-4">
                  <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                    Add MCQ Item to Questionnaire
                  </h4>
                  <input
                    type="text"
                    placeholder="Enter question prompt..."
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Option 1"
                      value={newOpt0}
                      onChange={(e) => setNewOpt0(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Option 2"
                      value={newOpt1}
                      onChange={(e) => setNewOpt1(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Option 3"
                      value={newOpt2}
                      onChange={(e) => setNewOpt2(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="Option 4"
                      value={newOpt3}
                      onChange={(e) => setNewOpt3(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newCorrectIdx}
                      onChange={(e) => setNewCorrectIdx(Number(e.target.value))}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                    >
                      <option value={0}>Correct Answer: Option 1</option>
                      <option value={1}>Correct Answer: Option 2</option>
                      <option value={2}>Correct Answer: Option 3</option>
                      <option value={3}>Correct Answer: Option 4</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Brief Diagnostic Explanation"
                      value={newExplanation}
                      onChange={(e) => setNewExplanation(e.target.value)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddQuestionToDraft}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Append Question to Draft</span>
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all mt-4"
                >
                  Publish Questionnaire to Trainee Assessments Hub
                </button>
              </form>
            </div>

            {/* Right Col: Active Assessments Feed */}
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  Your Active Questionnaires ({assessments.length})
                </h3>
                <div className="space-y-3">
                  {assessments.map((a) => (
                    <div
                      key={a.id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                    >
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block mb-1">
                        {a.subject}
                      </span>
                      <p className="font-bold text-slate-800 dark:text-slate-200 leading-snug">
                        {a.title}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                        <span>Deadline: {a.deadline}</span>
                        <span>{a.questions.length} MCQs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRAINEE PERFORMANCE & REVIEWS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold block">Active Enrolled Trainees</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">824</span>
                <span className="text-[10px] text-emerald-600 font-bold">+18% this month</span>
              </div>
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold block">Assessments Evaluated</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">{submissions.length}</span>
                <span className="text-[10px] text-sky-600 font-bold">Automatic MCQ grading</span>
              </div>
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold block">Average Pass Rate</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">91.4%</span>
                <span className="text-[10px] text-emerald-600 font-bold">Exceeds Benchmark</span>
              </div>
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold block">Trainer Rating</span>
                <span className="text-2xl font-black text-amber-500 font-mono mt-1 block">4.96 ★</span>
                <span className="text-[10px] text-amber-600 font-bold">From Trainee Feedback</span>
              </div>
            </div>

            {/* Trainee Submissions Table */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-500" />
                Live Trainee Assessment Submissions
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                      <th className="pb-3 font-semibold">Trainee Name</th>
                      <th className="pb-3 font-semibold">Assessment Title</th>
                      <th className="pb-3 font-semibold">Subject</th>
                      <th className="pb-3 font-semibold">Score / Marks</th>
                      <th className="pb-3 font-semibold">Result</th>
                      <th className="pb-3 font-semibold">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="text-slate-700 dark:text-slate-300">
                        <td className="py-3 font-bold text-slate-900 dark:text-white">{sub.traineeName}</td>
                        <td className="py-3">{sub.assessmentTitle}</td>
                        <td className="py-3">{sub.subject}</td>
                        <td className="py-3 font-mono font-bold text-slate-900 dark:text-white">{sub.score} / {sub.totalMarks} ({sub.percentage}%)</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            sub.passed
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                              : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300'
                          }`}>
                            {sub.passed ? 'PASSED' : 'RETEST NEEDED'}
                          </span>
                        </td>
                        <td className="py-3 text-slate-400">{sub.submittedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Trainee Course Feedbacks Feed */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-500" />
                Trainee Reviews & Course Feedback Ratings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 dark:text-white">{fb.traineeName}</span>
                      <span className="text-amber-500 font-bold">★ {fb.rating} / 5</span>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 block mb-1.5">
                      Course: {fb.courseTitle}
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                      "{fb.feedbackText}"
                    </p>
                    <div className="flex items-center gap-3 mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700 text-[10px] text-slate-400">
                      <span>Content: {fb.contentQualityRating}/5</span>
                      <span>•</span>
                      <span>Delivery: {fb.trainerDeliveryRating}/5</span>
                      <span className="ml-auto">{fb.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: UPLOAD LIBRARY RESOURCES */}
        {activeTab === 'materials' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handlePublishMaterial} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Upload className="w-5 h-5 text-amber-500" />
                  Upload Lectures & Materials to Trainer Library
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Resource Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Masterclass: High-Throughput Event Streams with Amazon Kinesis"
                    value={matTitle}
                    onChange={(e) => setMatTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Resource Type
                    </label>
                    <select
                      value={matType}
                      onChange={(e) => setMatType(e.target.value as MaterialType)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Recorded Lecture">Recorded Lecture (Video)</option>
                      <option value="Presentation">Presentation (Slides)</option>
                      <option value="Study Material">Study Material (Handout/PDF)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Subject
                    </label>
                    <select
                      value={matSubject}
                      onChange={(e) => setMatSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Cloud & DevOps">Cloud & DevOps</option>
                      <option value="AI & Data Science">AI & Data Science</option>
                      <option value="Cybersecurity & Governance">Cybersecurity & Governance</option>
                      <option value="Tech & Code">Tech & Code</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Duration / Pages
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 55 mins or 48 pages"
                      value={matDurationPages}
                      onChange={(e) => setMatDurationPages(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Description & Learning Objectives
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Summary of topics covered, prerequisites, and practical takeaways..."
                    value={matDesc}
                    onChange={(e) => setMatDesc(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload & Publish to Trainee Library</span>
                </button>
              </form>
            </div>

            <div>
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
                  Trainer Library Status
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  All materials uploaded here are immediately indexed and available for enrolled trainees to download and review.
                </p>
                <Link
                  href="/library"
                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2"
                >
                  <span>Open Public Trainer Library</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MANAGE TRAINER PROFILE */}
        {activeTab === 'profile' && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Faculty Qualifications & Competency Profile
            </h3>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{user.name}</h4>
                <p className="text-xs text-slate-500">{user.email}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 mt-1 inline-block">
                  Verified Trainer ({user.status})
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Academic Qualifications
              </span>
              <div className="space-y-2">
                {user.qualifications.map((q) => (
                  <div key={q.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{q.degree}</p>
                    <p className="text-[11px] text-slate-400">{q.institution} • {q.year} ({q.grade})</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Professional Work Experience
              </span>
              <div className="space-y-2">
                {user.workExperience.map((we) => (
                  <div key={we.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{we.role} — {we.organization}</p>
                    <p className="text-[11px] text-slate-400">{we.duration}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{we.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
