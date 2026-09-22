'use client';

import React, { useState } from 'react';
import { X, Zap, Coins, CheckCircle } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { UrgencyLevel, SkillCategory } from '@/types';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose, onCreated }) => {
  const { addSosRequest, user } = useAppStore();
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<SkillCategory>('Design & Creative');
  const [urgency, setUrgency] = useState<UrgencyLevel>('Critical (Exam/Deadline)');
  const [bountyRupees, setBountyRupees] = useState<number>(150);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addSosRequest({
        topic,
        description,
        category,
        urgency,
        creditsReward: 1,
        bountyInRupees: bountyRupees
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setTopic('');
        setDescription('');
        onClose();
        if (onCreated) onCreated();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 ring-8 ring-emerald-50 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Broadcasted to Campus!</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-xs">
              Peers in {category} have been notified. You will be alerted as soon as a mentor accepts.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-50 text-red-600 border border-red-200">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  15-Min Flash Mentoring SOS
                </h2>
                <p className="text-xs text-slate-500">
                  Stuck on a bug, lab evaluation, or video render crash? Get micro-unblocked right now.
                </p>
              </div>
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                What are you blocked on? *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. MySQL Foreign Key error 1452 or Premiere Pro render crash"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Brief Context / Error Snippet
              </label>
              <textarea
                rows={3}
                placeholder="Describe what you tried, code snippet, or software version..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-red-500 transition-colors resize-none"
              />
            </div>

            {/* Category & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SkillCategory)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500"
                >
                  <option value="Design & Creative">Design & Creative (Video Editing, UI/UX, Photography)</option>
                  <option value="Music & Arts">Music & Arts (Guitar, Audio, Chords)</option>
                  <option value="Languages & Communication">Languages & Communication (German, French, Speaking)</option>
                  <option value="Engineering & 3D">Engineering & 3D (SolidWorks, 3D CAD, Printing)</option>
                  <option value="Tech & Code">Tech & Code (Web, Python, App Dev)</option>
                  <option value="Academics & Analytics">Academics & Analytics (Math, Statistics)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Urgency
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-red-500"
                >
                  <option value="Critical (Exam/Deadline)">🔥 Critical (Exam/Submission Tonight)</option>
                  <option value="High">⚡ High (Blocking Project)</option>
                  <option value="Normal">🟢 Normal (Casual Help)</option>
                </select>
              </div>
            </div>

            {/* Bounty / Indian Rupees Selector */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Mentor Bounty (in ₹)</span>
                <span className="text-[11px] text-slate-500">Wallet balance: ₹{user.rupeeBalance}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[100, 150, 200, 300].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setBountyRupees(amt)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      bountyRupees === amt
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !topic.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:opacity-95 text-white font-bold text-sm shadow-md shadow-red-500/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Broadcasting to Campus...</span>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Broadcast 15-Min SOS with ₹{bountyRupees} Bounty</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
export default SosModal;
