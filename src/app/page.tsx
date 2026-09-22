'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Zap, ArrowRight, ArrowRightLeft, Search, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MOCK_STUDENTS } from '@/lib/mockData';
import { MentorCard } from '@/components/MentorCard';
import { SosModal } from '@/components/SosModal';
import { AwsInspectorModal } from '@/components/AwsInspectorModal';
import { useAppStore } from '@/lib/store';
import { SkillCategory } from '@/types';

export default function HomePage() {
  const { sosList } = useAppStore();
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isAwsModalOpen, setIsAwsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [wantToLearn, setWantToLearn] = useState('');
  const [canTeach, setCanTeach] = useState('');

  const categories = [
    'All',
    'Design & Creative',
    'Music & Arts',
    'Languages & Communication',
    'Engineering & 3D',
    'Tech & Code',
    'Academics & Analytics'
  ];

  const filteredStudents = MOCK_STUDENTS.filter((s) => {
    if (selectedCategory === 'All') return true;
    return s.skillsOffered.some((sk) => sk.category === selectedCategory);
  });

  const activeSos = sosList.filter((s) => s.status === 'Open').slice(0, 2);

  return (
    <div className="min-h-screen">
      
      {/* Modals */}
      <SosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
      <AwsInspectorModal isOpen={isAwsModalOpen} onClose={() => setIsAwsModalOpen(false)} />

      {/* Hero Section */}
      <section className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        
        {/* Minimal Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs text-slate-700 mb-6 font-medium">
          <span className="w-2 h-2 rounded-full bg-amazon-orange animate-pulse" />
          <span>VSSUT Campus Skill Barter Network</span>
        </div>

        {/* Minimalist Heading */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Trade What You Know. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amazon-orange to-orange-500">
            Learn What You Love.
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Swap 30-min skills across campus. Trade <strong className="text-slate-900 font-semibold">Guitar lessons</strong> for <strong className="text-slate-900 font-semibold">Video Editing</strong>, or <strong className="text-slate-900 font-semibold">Figma UI</strong> for <strong className="text-slate-900 font-semibold">German conversation</strong>. 100% free with campus peer credits.
        </p>

        {/* Minimal CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/explore"
            className="px-6 py-3 rounded-xl bg-amazon-orange hover:bg-amber-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Search className="w-4 h-4" />
            <span>Browse Skill Barters</span>
          </Link>

          <button
            onClick={() => setIsSosOpen(true)}
            className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm flex items-center gap-2 transition-all shadow-xs"
          >
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Need Fast Help (15m SOS)</span>
          </button>
        </div>

        {/* 3-Step Simple Barter Concept */}
        <div className="mt-14 pt-10 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <span className="text-xs font-mono font-bold text-amber-700">01</span>
            <h3 className="text-sm font-bold text-slate-900 mt-1">List What You Offer</h3>
            <p className="text-xs text-slate-600 mt-1">
              Offer anything you're good at: Guitar, Video Editing, CAD, Public Speaking, or Coding.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <span className="text-xs font-mono font-bold text-amazon-orange">02</span>
            <h3 className="text-sm font-bold text-slate-900 mt-1">AI Finds Reciprocal Matches</h3>
            <p className="text-xs text-slate-600 mt-1">
              Bedrock AI instantly pairs you with peers who want what you teach and teach what you seek.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <span className="text-xs font-mono font-bold text-emerald-700">03</span>
            <h3 className="text-sm font-bold text-slate-900 mt-1">Swap 30-Min Sessions</h3>
            <p className="text-xs text-slate-600 mt-1">
              Meet 1-on-1, learn for ₹0, and earn verifiable peer badges on your profile.
            </p>
          </div>
        </div>

      </section>

      {/* Interactive Barter Matcher Widget */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-amazon-orange uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Barter Matcher</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                I want to learn:
              </label>
              <input
                type="text"
                placeholder="e.g. Acoustic Guitar, Video Editing, French..."
                value={wantToLearn}
                onChange={(e) => setWantToLearn(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                I can teach:
              </label>
              <input
                type="text"
                placeholder="e.g. UI/UX Design, SolidWorks, Spoken German..."
                value={canTeach}
                onChange={(e) => setCanTeach(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Link
              href={`/explore?q=${encodeURIComponent(wantToLearn || 'Guitar Video Editing')}&offering=${encodeURIComponent(canTeach)}`}
              className="px-5 py-2.5 rounded-xl bg-amazon-orange hover:bg-amber-500 text-slate-950 text-xs font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Find Mutual Barter Partner</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Urgent 15-Minute Unblocking Ticker (Minimal) */}
      {activeSos.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-red-100 text-red-600">
                <Zap className="w-4 h-4 fill-current" />
              </span>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Campus SOS Queue: {activeSos[0].topic}
                </span>
                <span className="text-[11px] text-slate-600">
                  {activeSos[0].studentName} • {activeSos[0].studentDept} • Bounty: ₹{activeSos[0].bountyInRupees}
                </span>
              </div>
            </div>

            <Link
              href="/sos"
              className="text-xs font-semibold text-red-700 hover:text-red-800 shrink-0 flex items-center gap-1"
            >
              <span>View SOS Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* Community Barter Directory */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Community Skill Swaps</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified campus peers ready to trade knowledge 1-on-1
            </p>
          </div>

          {/* Minimal Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student) => (
            <MentorCard key={student.id} student={student} />
          ))}
        </div>
      </section>

      {/* Minimal Footer Note */}
      <section className="max-w-4xl mx-auto px-4 text-center pb-12">
        <button
          onClick={() => setIsAwsModalOpen(true)}
          className="text-xs text-slate-500 hover:text-slate-700 inline-flex items-center gap-1.5 transition-colors"
        >
          <span>Amazon Code Conquest 2026 • Powered by AWS Serverless & Bedrock</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </section>

    </div>
  );
}
