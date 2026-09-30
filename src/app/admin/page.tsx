'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Award,
  BookOpen,
  BarChart3,
  Bell,
  Plus,
  Trash2,
  GraduationCap,
  Sparkles,
  TrendingUp,
  FileCheck,
  Send
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { UserRole, UserStatus, AnnouncementType } from '@/types';

export default function AdminConsolePage() {
  const {
    user,
    allUsers,
    approveUser,
    updateUserRole,
    courses,
    assessments,
    submissions,
    announcements,
    addAnnouncement,
    deleteAnnouncement
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'users' | 'dashboard' | 'announcements'>('users');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Announcement publisher state
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState<AnnouncementType>('Announcement');
  const [annPriority, setAnnPriority] = useState<'High' | 'Normal'>('High');
  const [annBadge, setAnnBadge] = useState('Official Directive');
  const [annAudience, setAnnAudience] = useState<'All' | 'Trainees' | 'Trainers'>('All');
  const [publishSuccessNotice, setPublishSuccessNotice] = useState<string | null>(null);

  const filteredUsers = allUsers.filter((u) => {
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    const matchStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchRole && matchStatus;
  });

  const totalEnrollments = courses.reduce((acc, c) => acc + c.enrolledCount, 0);
  const totalCertificates = submissions.filter((s) => s.passed).length;
  const passRate = submissions.length > 0
    ? Math.round((totalCertificates / submissions.length) * 100)
    : 92;

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({
      title: annTitle,
      content: annContent,
      category: annCategory,
      author: user.name,
      authorRole: 'Director of Academic Governance (Admin)',
      priority: annPriority,
      badgeText: annBadge,
      targetAudience: annAudience
    });

    setPublishSuccessNotice(`Notification "${annTitle}" successfully published directly to Homepage!`);
    setAnnTitle('');
    setAnnContent('');
    setTimeout(() => setPublishSuccessNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                Institutional Admin Console
              </span>
              <span className="text-xs text-slate-500">• Quality & Role Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              Administrative Governance & Executive Dashboards
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
              Manage user verification approvals and role assignments, review centralized capacity monitoring metrics across courses and assessments, and publish institutional announcements and achievements to the homepage.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              Admin Status: Active
            </span>
          </div>
        </div>

        {publishSuccessNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{publishSuccessNotice}</span>
          </div>
        )}

        {/* Top Tab Bar */}
        <div className="flex rounded-2xl bg-white dark:bg-slate-900 p-1 mb-8 border border-slate-200 dark:border-slate-800 shadow-sm max-w-xl">
          {[
            { id: 'users', label: 'User Approval & Roles', icon: ShieldCheck },
            { id: 'dashboard', label: 'Monitoring Dashboards', icon: BarChart3 },
            { id: 'announcements', label: 'Publish Homepage Content', icon: Bell }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: USER APPROVAL & ROLE MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Filter By Role:
                </span>
                {['All', 'trainee', 'trainer', 'admin'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRoleFilter(r)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize ${
                      roleFilter === r
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Approval Status:
                </span>
                {['All', 'Approved', 'Pending', 'Rejected'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-semibold ${
                      statusFilter === s
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Users Table */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                <span>Registered Platform Members ({filteredUsers.length})</span>
                <span className="text-xs font-normal text-slate-400">Manage approvals and dynamic role assignments</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                      <th className="pb-3 font-semibold">User</th>
                      <th className="pb-3 font-semibold">Organization / Dept</th>
                      <th className="pb-3 font-semibold">Role</th>
                      <th className="pb-3 font-semibold">Approval Status</th>
                      <th className="pb-3 font-semibold">Role Action</th>
                      <th className="pb-3 font-semibold text-right">Approval Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredUsers.map((u) => {
                      const isPending = u.status === 'Pending';
                      const isApproved = u.status === 'Approved';

                      return (
                        <tr key={u.id} className="text-slate-700 dark:text-slate-300">
                          <td className="py-3.5">
                            <div className="flex items-center gap-3">
                              <img
                                src={u.avatar}
                                alt={u.name}
                                className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                              />
                              <div>
                                <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                                <p className="text-[11px] text-slate-400">{u.email}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5">
                            <p className="font-semibold text-slate-800 dark:text-slate-200">{u.organization || 'NIT'}</p>
                            <p className="text-[11px] text-slate-400">{u.department}</p>
                          </td>

                          <td className="py-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              u.role === 'trainer'
                                ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                                : u.role === 'admin'
                                ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300'
                                : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                            }`}>
                              {u.role}
                            </span>
                          </td>

                          <td className="py-3.5">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isApproved
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700'
                                : isPending
                                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700 animate-pulse'
                                : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-700'
                            }`}>
                              {u.status}
                            </span>
                          </td>

                          {/* Role Switcher */}
                          <td className="py-3.5">
                            <select
                              value={u.role}
                              onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                              className="px-2 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                            >
                              <option value="trainee">Trainee</option>
                              <option value="trainer">Trainer</option>
                              <option value="admin">Admin</option>
                            </select>
                          </td>

                          {/* Approval Actions */}
                          <td className="py-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {u.status !== 'Approved' && (
                                <button
                                  onClick={() => approveUser(u.id, 'Approved')}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-xs transition-all flex items-center gap-1"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Approve</span>
                                </button>
                              )}
                              {u.status !== 'Rejected' && (
                                <button
                                  onClick={() => approveUser(u.id, 'Rejected')}
                                  className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 text-[11px] font-bold transition-all flex items-center gap-1"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Reject</span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MONITORING DASHBOARDS */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold block">Total Active Courses</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">{courses.length}</span>
                <span className="text-[10px] text-emerald-600 font-bold">100% Accredited</span>
              </div>
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold block">Total Enrollments</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">{totalEnrollments}</span>
                <span className="text-[10px] text-indigo-600 font-bold">Cross-department</span>
              </div>
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold block">Assessments Evaluated</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">{submissions.length}</span>
                <span className="text-[10px] text-sky-600 font-bold">Automated MCQ engine</span>
              </div>
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold block">Certificates Issued</span>
                <span className="text-2xl font-black text-amber-500 font-mono mt-1 block">{totalCertificates}</span>
                <span className="text-[10px] text-amber-600 font-bold">Verifiable credentials</span>
              </div>
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs text-slate-500 font-semibold block">Trainee Pass Rate</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">{passRate}%</span>
                <span className="text-[10px] text-emerald-600 font-bold">Capacity benchmark</span>
              </div>
            </div>

            {/* Course-Wise Enrollment Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  Course Enrollment & Trainee Capacity Status
                </h3>

                <div className="space-y-4">
                  {courses.map((c) => (
                    <div key={c.id}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{c.title}</span>
                        <span className="font-mono font-semibold text-slate-500">{c.enrolledCount} enrolled</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${Math.min(100, (c.enrolledCount / 500) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessment Completion Stats */}
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-500" />
                  Subject-Wise Assessment Deadlines & Participation
                </h3>

                <div className="space-y-3">
                  {assessments.map((a) => (
                    <div
                      key={a.id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 block mb-0.5">
                          {a.subject}
                        </span>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{a.title}</p>
                        <p className="text-[10px] text-slate-400 mt-1">Deadline: {a.deadline} • Pass: {a.passingMarks}/{a.totalMarks}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold font-mono text-emerald-600">{a.totalSubmissionsCount} completed</span>
                        <span className="text-[10px] text-slate-400 block">Avg: {a.averageScore} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PUBLISH HOMEPAGE ANNOUNCEMENTS & ACHIEVEMENTS */}
        {activeTab === 'announcements' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Publisher Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handlePublishAnnouncement} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-indigo-600" />
                  Publish Live Homepage Notice or Achievement
                </h3>
                <p className="text-xs text-slate-500">
                  Broadcast institutional directives, celebrate trainee milestones, and spotlight newly added learning content onto the homepage bulletin.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Notice Headline
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 🏆 Institutional Achievement: 100% Trainees Certified in Cloud Systems"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Category Type
                    </label>
                    <select
                      value={annCategory}
                      onChange={(e) => setAnnCategory(e.target.value as AnnouncementType)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Announcement">Announcement (Directive)</option>
                      <option value="Achievement">Achievement (Milestone)</option>
                      <option value="New Content">New Learning Content</option>
                      <option value="Notification">Notification (Alert)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Institutional Milestone"
                      value={annBadge}
                      onChange={(e) => setAnnBadge(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Target Audience
                    </label>
                    <select
                      value={annAudience}
                      onChange={(e) => setAnnAudience(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="All">All Users</option>
                      <option value="Trainees">Trainees Only</option>
                      <option value="Trainers">Trainers Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Announcement Body Text
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Enter detailed description of the announcement, achievements, or newly uploaded content..."
                    value={annContent}
                    onChange={(e) => setAnnContent(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to Homepage Bulletin</span>
                </button>
              </form>
            </div>

            {/* Active Announcements List */}
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
                  Live Homepage Announcements ({announcements.length})
                </h3>

                <div className="space-y-3">
                  {announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                          {ann.category}
                        </span>
                        <button
                          onClick={() => deleteAnnouncement(ann.id)}
                          className="text-slate-400 hover:text-rose-500"
                          title="Delete notice"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-bold text-slate-800 dark:text-slate-200 leading-snug">
                        {ann.title}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {ann.content}
                      </p>
                      <span className="text-[9px] text-slate-400 block mt-2">
                        Published by {ann.author} • {ann.publishedAt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
