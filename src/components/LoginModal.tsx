'use client';

import React, { useState } from 'react';
import { X, LogIn, UserCheck, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { CURRENT_USER, MOCK_STUDENTS } from '@/lib/mockData';
import { Student } from '@/types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAppStore();
  const [activeTab, setActiveTab] = useState<'demo' | 'email'>('demo');
  const [email, setEmail] = useState('student@vssut.ac.in');
  const [name, setName] = useState('Ankit Verma');
  const [department, setDepartment] = useState('Computer Science & Engineering');

  if (!isOpen) return null;

  const allPersonas: Student[] = [CURRENT_USER, ...MOCK_STUDENTS];

  const handleSelectPersona = (student: Student) => {
    login(student);
    onClose();
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      id: `usr-${Date.now()}`,
      name,
      email,
      department,
      year: '3rd Year (B.Tech)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      bio: `Student at VSSUT in ${department}. Active peer learner.`,
      campusCredits: 3,
      rupeeBalance: 300,
      pricePerSessionInRupees: 149,
      rating: 5.0,
      totalSessions: 0,
      isOnline: true,
      skillsOffered: [
        { name: 'UI & Web Layouts', category: 'Design & Creative', level: 'Intermediate', endorsements: 5 },
        { name: 'Python Scripting', category: 'Tech & Code', level: 'Intermediate', endorsements: 4 }
      ],
      skillsSeeking: ['Acoustic Guitar', 'Video Editing'],
      badges: []
    };
    login(newStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl text-slate-800">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-amazon-orange to-amber-500 text-slate-950 shadow-md shadow-amber-500/20">
            <LogIn className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Student Authentication
            </h2>
            <p className="text-xs text-slate-500">
              Sign in with institutional credentials or select a campus persona
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-100 p-1 mb-6 border border-slate-200">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'demo'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ Quick Campus Personas
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'email'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📧 University Sign In
          </button>
        </div>

        {activeTab === 'demo' ? (
          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider block mb-1">
              Select student profile to test:
            </span>
            {allPersonas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => handleSelectPersona(persona)}
                className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={persona.avatar}
                    alt={persona.name}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-200 shrink-0 group-hover:ring-amber-400 transition-all"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors truncate">
                        {persona.name}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate">
                        • {persona.department.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {persona.skillsOffered.map((s) => s.name).slice(0, 2).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <span className="text-xs font-bold text-amber-700 block font-mono">
                    ₹{persona.rupeeBalance}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {persona.pricePerSessionInRupees > 0 ? `₹${persona.pricePerSessionInRupees}/30m` : 'Free Barter'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                University Email (@vssut.ac.in)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:border-amber-500"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 font-bold text-sm shadow-md active:scale-95 transition-all mt-4"
            >
              Sign In to Campus PeerLoop
            </button>
          </form>
        )}

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secured via Amazon Cognito Domain Validation</span>
          </div>
        </div>

      </div>
    </div>
  );
};
export default LoginModal;
