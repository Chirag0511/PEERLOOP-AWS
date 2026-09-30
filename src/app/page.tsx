'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Users,
  Compass,
  Layers,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Bell,
  Clock,
  Play,
  FileText,
  Star,
  Zap,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { LoginModal } from '@/components/LoginModal';
import { UserRole } from '@/types';

export default function HomePage() {
  const {
    user,
    currentRole,
    switchRole,
    courses,
    materials,
    assessments,
    announcements,
    competencyMatches,
    submissions
  } = useAppStore();

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const totalEnrollments = courses.reduce((acc, c) => acc + c.enrolledCount, 0);
  const totalCertificates = submissions.filter((s) => s.passed).length + 380; // Baseline institutional count

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* SIH Problem Statement Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-bold text-slate-800 dark:text-slate-200">
              Smart India Hackathon (SIH) Solution
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">
              Institutional Capacity Building & Training Ecosystem
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Scalable Training, Assessment &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amazon-orange to-orange-500">
              Competency Mapping
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive, role-based platform empowering <strong className="text-slate-900 dark:text-white font-semibold">Trainees</strong> to build verified profiles and clear subject assessments, <strong className="text-slate-900 dark:text-white font-semibold">Trainers</strong> to deploy questionnaires and educational media, and <strong className="text-slate-900 dark:text-white font-semibold">Admins</strong> to govern user approvals and competency discovery.
          </p>

          {/* 1-Click Role Switcher on Hero for Instant Prototype Demonstration */}
          <div className="mt-8 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md inline-flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
              Explore As:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => switchRole('trainee')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  currentRole === 'trainee'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Trainee Mode</span>
              </button>

              <button
                onClick={() => switchRole('trainer')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  currentRole === 'trainer'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Trainer Mode</span>
              </button>

              <button
                onClick={() => switchRole('admin')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  currentRole === 'admin'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Admin Console</span>
              </button>
            </div>
          </div>

          {/* Action CTAs based on selected role */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/courses"
              className="px-6 py-3 rounded-xl bg-amazon-orange hover:bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Courses & Assessments</span>
            </Link>

            <Link
              href="/library"
              className="px-5 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs"
            >
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Trainer Library</span>
            </Link>

            <Link
              href="/competency"
              className="px-5 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs"
            >
              <Compass className="w-4 h-4 text-indigo-500" />
              <span>Competency Mapping</span>
            </Link>
          </div>

        </div>

        {/* LIVE ADMIN ANNOUNCEMENTS & ACHIEVEMENTS TICKER */}
        <div className="mt-14 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Bell className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Official Homepage Bulletins & Achievements
                </h3>
                <p className="text-[11px] text-slate-400">Published by Institutional Admin Office</p>
              </div>
            </div>

            {currentRole === 'admin' && (
              <Link
                href="/admin"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>+ Broadcast New Notice</span>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col justify-between text-xs group hover:border-amber-400/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ann.category === 'Achievement'
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                        : ann.category === 'New Content'
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                        : 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                    }`}>
                      {ann.badgeText || ann.category}
                    </span>
                    <span className="text-[9px] text-slate-400">{ann.publishedAt}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {ann.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {ann.content}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Audience: {ann.targetAudience}</span>
                  {ann.actionUrl && (
                    <Link
                      href={ann.actionUrl}
                      className="font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-0.5"
                    >
                      <span>{ann.actionText || 'View'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 CORE SYSTEM MODULES GRID */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          {/* Module 1: Trainee Module */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                Trainee Lifecycle
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Professional Trainee Profiles & Learning
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Create comprehensive profiles with qualifications, work experience, certificates, and interests. Enroll in accredited courses, access study guides, attempt MCQ assessments, and provide structured feedback.
              </p>
            </div>
            <Link
              href="/profile"
              className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Manage Profile & Certs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module 2: Trainer Studio */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-amber-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                Faculty Workspace
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Questionnaires, Library & Monitoring
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Build timed subject-wise MCQ questionnaires with custom deadlines, monitor trainee completion and average scores, and upload recorded lectures, slide decks, and handouts.
              </p>
            </div>
            <Link
              href="/trainer"
              className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Launch Trainer Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module 3: Admin Console */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                Central Administration
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Approvals, Roles & Monitoring Dashboards
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Review pending applicant approvals, dynamically switch user roles, inspect enrollment and pass rate analytics across departments, and publish official homepage bulletins.
              </p>
            </div>
            <Link
              href="/admin"
              className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Open Admin Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Module 4: Competency Mapping */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-sky-500/50 transition-all">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-1">
                Capacity Engine
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Algorithmic Trainer Competency Mapping
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Identifies suitable trainers for every subject curriculum based on academic pedigree, years of experience, verified skills, and student satisfaction metrics.
              </p>
            </div>
            <Link
              href="/competency"
              className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              <span>Explore Competency Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* FEATURED COURSES & SUBJECTS PREVIEW */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                Accredited Institutional Curricula
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Curated courses prepared by verified lead trainers with subject-wise MCQ assessment cycles
              </p>
            </div>
            <Link
              href="/courses"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View All ({courses.length}) Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between group"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400">
                    {c.subject}
                  </span>
                  <span className="absolute top-2.5 right-2.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200">
                    {c.level}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug line-clamp-2">
                      {c.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      Instructor: {c.trainerName}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-amber-500 font-bold text-[11px]">★ {c.rating}</span>
                    <Link
                      href="/courses"
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px]"
                    >
                      Enroll Free
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PLATFORM CAPACITY METRICS */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
              Real-Time Capacity Benchmarks
            </span>
            <h3 className="text-2xl font-black">
              Institutional Learning Impact & Scaling Statistics
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-3xl font-black text-amber-400 font-mono block">
                {totalEnrollments}+
              </span>
              <span className="text-xs text-slate-300 font-semibold mt-1 block">Active Trainees Enrolled</span>
              <span className="text-[10px] text-slate-400">Across 8 Academic Depts</span>
            </div>

            <div>
              <span className="text-3xl font-black text-emerald-400 font-mono block">
                {totalCertificates}+
              </span>
              <span className="text-xs text-slate-300 font-semibold mt-1 block">Verifiable Certifications</span>
              <span className="text-[10px] text-slate-400">Cryptographically Signed</span>
            </div>

            <div>
              <span className="text-3xl font-black text-sky-400 font-mono block">
                94.2%
              </span>
              <span className="text-xs text-slate-300 font-semibold mt-1 block">MCQ Assessment Pass Rate</span>
              <span className="text-[10px] text-slate-400">Audited Scoring Engine</span>
            </div>

            <div>
              <span className="text-3xl font-black text-amber-400 font-mono block">
                100%
              </span>
              <span className="text-xs text-slate-300 font-semibold mt-1 block">Role-Based Governance</span>
              <span className="text-[10px] text-slate-400">Admin Approved Accreditation</span>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
