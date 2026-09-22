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
  Wallet
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { SymbolicBadge } from '@/components/SymbolicBadge';
import { WalletActionModal } from '@/components/WalletActionModal';

export default function ProfilePage() {
  const { user, setUser, transactions } = useAppStore();
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [rateInput, setRateInput] = useState(user.pricePerSessionInRupees.toString());

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
            <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-amazon-orange" />
              <span>My Skill Barter Preferences</span>
            </h2>

            {/* Teaches */}
            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1.5">
                Skills I Teach (Barter Offer):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {user.skillsOffered.map((sk) => (
                  <span
                    key={sk.name}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs border border-slate-200 flex items-center gap-1.5"
                  >
                    <span>{sk.name}</span>
                    <span className="text-[10px] text-amber-600 font-semibold">
                      ★ {sk.endorsements}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Seeking */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1.5">
                Skills I Want to Learn:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {user.skillsSeeking.map((seek) => (
                  <span
                    key={seek}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs border border-emerald-200"
                  >
                    {seek}
                  </span>
                ))}
              </div>
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
