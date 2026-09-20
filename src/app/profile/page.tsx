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
  ArrowRightLeft
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function ProfilePage() {
  const { user, setUser, transactions } = useAppStore();
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [rateInput, setRateInput] = useState(user.pricePerSessionInRupees.toString());

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
      
      {/* Profile Header */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          
          {/* Identity */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-800"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">{user.name}</h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  @vssut.ac.in Verified
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {user.department} • {user.year}
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {user.rating} Rating
                </span>
                <span>•</span>
                <span>{user.totalSessions} Barters Completed</span>
              </div>
            </div>
          </div>

          {/* Wallet Balance Pill */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Rupee Balance
              </span>
              <span className="text-base font-bold font-mono text-emerald-400">
                ₹{user.rupeeBalance}
              </span>
            </div>

            <div className="w-px h-7 bg-slate-800" />

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Barter Credits
              </span>
              <span className="text-base font-bold text-amber-400 flex items-center gap-1">
                <Coins className="w-3.5 h-3.5" />
                {user.campusCredits}
              </span>
            </div>
          </div>

        </div>

        {/* Bio */}
        <p className="text-xs text-slate-300 mt-4 pt-4 border-t border-slate-800/80 leading-relaxed">
          {user.bio}
        </p>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Skills & Badges */}
        <div className="space-y-6">
          
          {/* Barter Preferences Card */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-amazon-orange" />
              <span>My Skill Barter Preferences</span>
            </h2>

            {/* Teaches */}
            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1.5">
                Skills I Teach (Barter Offer):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {user.skillsOffered.map((sk) => (
                  <span
                    key={sk.name}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-200 text-xs border border-slate-800 flex items-center gap-1.5"
                  >
                    <span>{sk.name}</span>
                    <span className="text-[10px] text-amber-400 font-semibold">
                      ★ {sk.endorsements}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Seeking */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1.5">
                Skills I Want to Learn:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {user.skillsSeeking.map((seek) => (
                  <span
                    key={seek}
                    className="px-2.5 py-1 rounded-lg bg-emerald-950/30 text-emerald-300 text-xs border border-emerald-800/40"
                  >
                    {seek}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Verifiable Badges */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-400" />
              <span>Verified Proof-of-Skill Badges</span>
            </h2>

            <div className="space-y-2.5">
              {user.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white truncate">{badge.title}</h4>
                      <p className="text-[10px] text-slate-400 truncate font-mono">
                        {badge.verificationHash}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 shrink-0">
                    {badge.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Clean Barter Ledger */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white">Campus Barter & Rupee Ledger</h2>
              <span className="text-xs text-slate-400">DynamoDB Log</span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Every completed barter trade and urgent unblocking bounty is recorded here:
            </p>

            <div className="space-y-2.5">
              {transactions.map((tx) => {
                const isEarned = tx.type === 'Earned' || tx.type === 'Welcome Bonus';
                return (
                  <div
                    key={tx.id}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={`p-1 rounded-md mt-0.5 ${
                          isEarned ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                        }`}
                      >
                        {isEarned ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className="font-medium text-white">{tx.description}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {tx.counterpart} • {tx.timestamp}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`font-mono text-xs font-bold shrink-0 ${
                        isEarned ? 'text-emerald-400' : 'text-slate-400'
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

          <div className="mt-6 pt-3 border-t border-slate-800 text-[10px] text-slate-500 text-center">
            Zero Platform Fees • 100% Peer Community Driven
          </div>
        </div>

      </div>

    </div>
  );
}
