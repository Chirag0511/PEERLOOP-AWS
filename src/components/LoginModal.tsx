'use client';

import React, { useState } from 'react';
import { X, LogIn, UserCheck, ShieldCheck, Sparkles, CheckCircle2, GraduationCap, BookOpen, Users } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { DEMO_TRAINEE, DEMO_TRAINER, DEMO_ADMIN, MOCK_USERS_LIST } from '@/lib/mockData';
import { Student, UserRole } from '@/types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, allUsers, switchRole } = useAppStore();
  const [activeTab, setActiveTab] = useState<'demo' | 'signup' | 'signin'>('demo');
  const [selectedRole, setSelectedRole] = useState<UserRole>('trainee');
  const [email, setEmail] = useState('learner@peerloop.edu');
  const [name, setName] = useState('Ankit Verma');
  const [organization, setOrganization] = useState('National Institute of Technology');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [degree, setDegree] = useState('B.Tech in Computer Science');

  if (!isOpen) return null;

  const handleSelectUser = (student: Student) => {
    login(student);
    onClose();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      id: `usr-${Date.now()}`,
      name,
      email,
      department,
      organization,
      year: selectedRole === 'trainee' ? '3rd Year (B.Tech)' : selectedRole === 'trainer' ? 'Senior Faculty' : 'Administrator',
      avatar: selectedRole === 'trainer'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        : selectedRole === 'admin'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      bio: `${selectedRole === 'trainee' ? 'Trainee' : selectedRole === 'trainer' ? 'Certified Trainer' : 'Institutional Admin'} in ${department} at ${organization}.`,
      role: selectedRole,
      status: selectedRole === 'admin' ? 'Approved' : 'Pending', // Demonstrates Admin approval requirement
      qualifications: [
        {
          id: `q-${Date.now()}`,
          degree: degree || 'Bachelor of Technology',
          institution: organization,
          year: '2023 - 2027'
        }
      ],
      workExperience: [],
      interests: ['Cloud Architecture', 'Generative AI', 'Cybersecurity'],
      certificates: [],
      enrolledCourseIds: [],
      campusCredits: 3,
      rupeeBalance: 300,
      pricePerSessionInRupees: 0,
      rating: 5.0,
      totalSessions: 0,
      isOnline: true,
      skillsOffered: [],
      skillsSeeking: [],
      badges: []
    };

    login(newStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-amazon-orange to-amber-500 text-slate-950 shadow-md shadow-amber-500/20">
            <LogIn className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Platform Authentication
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                3 User Roles
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Secure role-based access for Trainees, Trainers, and Institutional Administrators
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 mb-6 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'demo'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ⚡ 1-Click Role Switch
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'signup'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            📝 Register / Sign Up
          </button>
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'signin'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            🔑 Institutional Login
          </button>
        </div>

        {activeTab === 'demo' ? (
          <div className="space-y-4">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Instant Presentation Personas (Click to launch mode):
            </span>

            {/* Trainee Card */}
            <button
              onClick={() => handleSelectUser(DEMO_TRAINEE)}
              className="w-full p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-400 hover:shadow-md transition-all text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={DEMO_TRAINEE.avatar}
                  alt="Trainee"
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-400"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {DEMO_TRAINEE.name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                      TRAINEE
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Enroll in courses, take subject MCQ tests, download materials, build profile
                  </p>
                </div>
              </div>
              <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            </button>

            {/* Trainer Card */}
            <button
              onClick={() => handleSelectUser(DEMO_TRAINER)}
              className="w-full p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 hover:border-amber-400 hover:shadow-md transition-all text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={DEMO_TRAINER.avatar}
                  alt="Trainer"
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-400"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                      {DEMO_TRAINER.name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                      TRAINER
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Create MCQ questionnaires with deadlines, upload library materials, monitor performance
                  </p>
                </div>
              </div>
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            </button>

            {/* Admin Card */}
            <button
              onClick={() => handleSelectUser(DEMO_ADMIN)}
              className="w-full p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 hover:shadow-md transition-all text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={DEMO_ADMIN.avatar}
                  alt="Admin"
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-400"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                      {DEMO_ADMIN.name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300">
                      ADMINISTRATOR
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    User approvals, role management, executive monitoring dashboards, homepage bulletins
                  </p>
                </div>
              </div>
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            </button>
          </div>
        ) : activeTab === 'signup' ? (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            {/* Role Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Registering As (Role)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['trainee', 'trainer', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold capitalize transition-all flex items-center justify-center gap-1.5 ${
                      selectedRole === r
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {r === 'trainee' && <GraduationCap className="w-3.5 h-3.5" />}
                    {r === 'trainer' && <BookOpen className="w-3.5 h-3.5" />}
                    {r === 'admin' && <Users className="w-3.5 h-3.5" />}
                    <span>{r}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Institutional Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Organization / University
                </label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-amber-500"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Cloud Systems & Distributed Computing">Cloud Systems & Distributed Computing</option>
                  <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                  <option value="Cyber Defense & Information Security">Cyber Defense & Information Security</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Highest Qualification
              </label>
              <input
                type="text"
                placeholder="e.g. B.Tech Computer Science, M.Tech, Ph.D."
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition-all mt-3"
            >
              Complete Registration as {selectedRole.toUpperCase()}
            </button>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSelectUser(DEMO_TRAINEE);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Registered Institutional Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                defaultValue="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 font-bold text-sm shadow-md active:scale-95 transition-all mt-4"
            >
              Sign In to Platform
            </button>
          </form>
        )}

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Secured via Cognito Institutional Identity & RBAC</span>
          </div>
          <span className="font-semibold text-slate-400">SIH Edition</span>
        </div>

      </div>
    </div>
  );
};

export default LoginModal;
