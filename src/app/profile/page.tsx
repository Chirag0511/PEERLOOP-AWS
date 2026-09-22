'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Coins,
  Star,
  Award,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  ExternalLink,
  Edit2,
  Check,
  ArrowRightLeft,
  Plus,
  Wallet,
  X,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { SkillCategory, Skill } from '@/types';
import { SymbolicBadge } from '@/components/SymbolicBadge';
import { WalletActionModal } from '@/components/WalletActionModal';

const SKILL_CATEGORIES: SkillCategory[] = [
  'Tech & Code',
  'Design & Creative',
  'Engineering & 3D',
  'Academics & Analytics',
  'Languages & Communication',
  'Music & Arts'
];

const SKILL_LEVELS: Array<'Beginner' | 'Intermediate' | 'Advanced'> = [
  'Beginner',
  'Intermediate',
  'Advanced'
];

export default function ProfilePage() {
  const { user, setUser, transactions } = useAppStore();
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [rateInput, setRateInput] = useState(user.pricePerSessionInRupees.toString());

  // Skills Management state
  const [isAddingOffered, setIsAddingOffered] = useState(false);
  const [newOfferedName, setNewOfferedName] = useState('');
  const [newOfferedCategory, setNewOfferedCategory] = useState<SkillCategory>('Tech & Code');
  const [newOfferedLevel, setNewOfferedLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');

  const [isAddingSeeking, setIsAddingSeeking] = useState(false);
  const [newSeekingName, setNewSeekingName] = useState('');

  // Wallet Modal state
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletMode, setWalletMode] = useState<'deposit' | 'withdraw'>('deposit');

  const openDeposit = () => {
    setWalletMode('deposit');
    setIsWalletOpen(true);
  };

  const openWithdraw = () => {
    setWalletMode('withdraw');
    setIsWalletOpen(true);
  };

  const handleSaveRate = () => {
    const parsed = parseInt(rateInput) || 0;
    setUser({
      ...user,
      pricePerSessionInRupees: Math.max(0, parsed)
    });
    setIsEditingRate(false);
  };

  const handleAddOfferedSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newOfferedName.trim();
    if (!trimmed) return;

    if (user.skillsOffered.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())) {
      alert('This skill is already in your teaching list!');
      return;
    }

    const newSkill: Skill = {
      name: trimmed,
      category: newOfferedCategory,
      level: newOfferedLevel,
      endorsements: 0
    };

    setUser({
      ...user,
      skillsOffered: [...user.skillsOffered, newSkill]
    });

    setNewOfferedName('');
    setIsAddingOffered(false);
  };

  const handleRemoveOfferedSkill = (skillNameToRemove: string) => {
    setUser({
      ...user,
      skillsOffered: user.skillsOffered.filter((s) => s.name !== skillNameToRemove)
    });
  };

  const handleAddSeekingSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newSeekingName.trim();
    if (!trimmed) return;

    if (user.skillsSeeking.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      alert('This skill is already in your learning list!');
      return;
    }

    setUser({
      ...user,
      skillsSeeking: [...user.skillsSeeking, trimmed]
    });

    setNewSeekingName('');
    setIsAddingSeeking(false);
  };

  const handleRemoveSeekingSkill = (skillNameToRemove: string) => {
    setUser({
      ...user,
      skillsSeeking: user.skillsSeeking.filter((s) => s !== skillNameToRemove)
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Deposit / Withdraw Modal */}
      <WalletActionModal
        isOpen={isWalletOpen}
        mode={walletMode}
        onClose={() => setIsWalletOpen(false)}
      />

      {/* Profile Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          
          {/* Identity */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{user.name}</h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  @vssut.ac.in Verified
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {user.department} • {user.year}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {user.rating} Rating
                </span>
                <span>•</span>
                <span>{user.totalSessions} Barters Completed</span>
              </div>
            </div>
          </div>

          {/* Interactive Wallet Balance & Action Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2.5 text-xs w-full sm:w-auto shadow-xs">
            <div className="flex items-center justify-between gap-6">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                  Rupee Balance
                </span>
                <span className="text-xl font-black font-mono text-emerald-700">
                  ₹{user.rupeeBalance}
                </span>
              </div>

              <div className="w-px h-8 bg-slate-200" />

              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                  Barter Credits
                </span>
                <span className="text-xl font-black text-amber-700 flex items-center gap-1">
                  <Coins className="w-4 h-4 text-amber-500" />
                  {user.campusCredits}
                </span>
              </div>
            </div>

            {/* Quick Deposit & Withdraw Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
              <button
                onClick={openDeposit}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-semibold flex items-center justify-center gap-1 transition-all shadow-xs"
              >
                <Plus className="w-3 h-3" />
                <span>Add Money</span>
              </button>
              
              <button
                onClick={openWithdraw}
                className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-[11px] font-semibold flex items-center justify-center gap-1 transition-all shadow-xs"
              >
                <ArrowUpRight className="w-3 h-3" />
                <span>Withdraw</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 mt-4 pt-4 border-t border-slate-100 leading-relaxed">
          {user.bio}
        </p>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Skills & Badges */}
        <div className="space-y-6">
          
          {/* Barter Preferences Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-amber-500" />
                <span>My Skill Barter Preferences</span>
              </span>
            </h2>

            {/* Teaches */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Skills I Teach (Barter Offer):</span>
                </span>
                {!isAddingOffered && (
                  <button
                    onClick={() => setIsAddingOffered(true)}
                    className="text-[11px] text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-amber-50 border border-amber-200/80 transition-colors shadow-2xs"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Skill</span>
                  </button>
                )}
              </div>

              {/* Inline Add Offered Skill Form */}
              {isAddingOffered && (
                <form onSubmit={handleAddOfferedSkill} className="mb-3 p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2.5">
                  <div className="text-xs font-semibold text-amber-900">Add a skill you can teach</div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={newOfferedName}
                      onChange={(e) => setNewOfferedName(e.target.value)}
                      placeholder="Skill name (e.g. Next.js, SolidWorks, Guitar, ML)"
                      className="w-full text-xs px-3 py-1.5 rounded-lg border border-amber-300 bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                      autoFocus
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-600 font-medium mb-0.5">Category</label>
                        <select
                          value={newOfferedCategory}
                          onChange={(e) => setNewOfferedCategory(e.target.value as SkillCategory)}
                          className="w-full text-xs px-2 py-1.5 rounded-lg border border-amber-300 bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                        >
                          {SKILL_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-600 font-medium mb-0.5">Proficiency Level</label>
                        <select
                          value={newOfferedLevel}
                          onChange={(e) => setNewOfferedLevel(e.target.value as any)}
                          className="w-full text-xs px-2 py-1.5 rounded-lg border border-amber-300 bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                        >
                          {SKILL_LEVELS.map((lvl) => (
                            <option key={lvl} value={lvl}>{lvl}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingOffered(false);
                        setNewOfferedName('');
                      }}
                      className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!newOfferedName.trim()}
                      className="px-3 py-1 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-lg shadow-xs transition-colors"
                    >
                      Add Skill
                    </button>
                  </div>
                </form>
              )}

              {user.skillsOffered.length === 0 ? (
                <div className="p-3 text-center text-xs text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                  No skills listed yet. Click "+ Add Skill" to list skills you can teach!
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {user.skillsOffered.map((sk) => (
                    <span
                      key={sk.name}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs border border-slate-200 flex items-center gap-1.5 group hover:border-slate-300 transition-all"
                    >
                      <span className="font-medium">{sk.name}</span>
                      <span className="text-[10px] text-slate-500 px-1 py-0.2 rounded bg-slate-200/80">
                        {sk.level}
                      </span>
                      <span className="text-[10px] text-amber-600 font-semibold">
                        ★ {sk.endorsements}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOfferedSkill(sk.name)}
                        className="text-slate-400 hover:text-rose-600 p-0.5 rounded-md hover:bg-slate-200/80 transition-colors ml-0.5"
                        title={`Remove ${sk.name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Seeking */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Skills I Want to Learn:</span>
                </span>
                {!isAddingSeeking && (
                  <button
                    onClick={() => setIsAddingSeeking(true)}
                    className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-emerald-50 border border-emerald-200/80 transition-colors shadow-2xs"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Skill</span>
                  </button>
                )}
              </div>

              {/* Inline Add Seeking Skill Form */}
              {isAddingSeeking && (
                <form onSubmit={handleAddSeekingSkill} className="mb-3 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                  <div className="text-xs font-semibold text-emerald-900">Add a skill you want to learn</div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSeekingName}
                      onChange={(e) => setNewSeekingName(e.target.value)}
                      placeholder="Skill name (e.g. AWS Cloud, Machine Learning, UI/UX, Public Speaking)"
                      className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-emerald-300 bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!newSeekingName.trim()}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg shadow-xs transition-colors shrink-0"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingSeeking(false);
                        setNewSeekingName('');
                      }}
                      className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {user.skillsSeeking.length === 0 ? (
                <div className="p-3 text-center text-xs text-slate-500 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                  No learning goals listed yet. Click "+ Add Skill" to add skills you want to learn!
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {user.skillsSeeking.map((seek) => (
                    <span
                      key={seek}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs border border-emerald-200 flex items-center gap-1.5 group hover:border-emerald-300 transition-all"
                    >
                      <span className="font-medium">{seek}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSeekingSkill(seek)}
                        className="text-emerald-600 hover:text-rose-600 p-0.5 rounded-md hover:bg-emerald-100 transition-colors ml-0.5"
                        title={`Remove ${seek}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Verifiable Badges with 3D Symbolic Renderer */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-600" />
              <span>Verified Proof-of-Skill Badges</span>
            </h2>

            <div className="space-y-2.5">
              {user.badges.map((badge) => (
                <SymbolicBadge key={badge.id} badge={badge} showDetails={true} />
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Clean Barter Ledger */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">Campus Barter & Rupee Ledger</h2>
              <span className="text-xs text-slate-500 font-mono">DynamoDB Log</span>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Every completed barter trade, deposit, and withdrawal is tracked in this immutable ledger:
            </p>

            <div className="space-y-2.5">
              {transactions.map((tx) => {
                const isEarned = tx.type === 'Earned' || tx.type === 'Welcome Bonus';
                return (
                  <div
                    key={tx.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={`p-1 rounded-md mt-0.5 ${
                          isEarned ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {isEarned ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{tx.description}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {tx.counterpart} • {tx.timestamp}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`font-mono text-xs font-bold shrink-0 ${
                        isEarned ? 'text-emerald-700' : 'text-slate-700'
                      }`}
                    >
                      {tx.amountRupees !== undefined && tx.amountRupees !== 0
                        ? `${isEarned ? '+' : '-'}₹${Math.abs(tx.amountRupees)}`
                        : `${isEarned ? '+1' : '-1'} Credit`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-100 text-[10px] text-slate-500 text-center">
            Zero Platform Fees • Secured via Multi-Item DynamoDB Transactions
          </div>
        </div>

      </div>

    </div>
  );
}
