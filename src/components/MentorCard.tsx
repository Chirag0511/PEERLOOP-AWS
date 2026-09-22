'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ArrowRightLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { Student } from '@/types';

interface MentorCardProps {
  student: Student;
  matchScore?: number;
  aiMatchReason?: string;
  onBookSession?: (student: Student) => void;
}

export const MentorCard: React.FC<MentorCardProps> = ({
  student,
  matchScore,
  aiMatchReason
}) => {
  const isFreeBarter = student.pricePerSessionInRupees === 0;
  const primaryOffer = student.skillsOffered[0]?.name || 'Skill Exchange';
  const primarySeeking = student.skillsSeeking[0] || 'Open to Barter';

  return (
    <div className="bg-white hover:bg-white border border-slate-200 hover:border-amber-400/80 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md">
      
      <div>
        {/* AI Match Badge (if from Bedrock search) */}
        {matchScore && (
          <div className="mb-3.5 flex items-center justify-between text-xs text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
            <span className="flex items-center gap-1.5 font-semibold text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amazon-orange" />
              {matchScore}% Barter Compatibility
            </span>
            <span className="text-[10px] text-amber-700/80 font-medium">AWS Bedrock</span>
          </div>
        )}

        {/* Student Profile Header */}
        <div className="flex items-center gap-3.5">
          <div className="relative shrink-0">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shadow-sm"
            />
            {student.isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-amber-600 transition-colors">
                {student.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold shrink-0">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{student.rating}</span>
                <span className="text-slate-400 text-[11px]">({student.totalSessions})</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 truncate mt-0.5">
              {student.department.split(' ')[0]} • {student.year.split(' ')[0]}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
          {student.bio}
        </p>

        {/* Minimal Barter Exchange Card */}
        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
          {/* Teaches */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
              Teaches
            </span>
            <span className="text-xs font-semibold text-slate-800 truncate ml-2">
              {primaryOffer}
            </span>
          </div>

          {/* Barter Icon Divider */}
          <div className="flex items-center justify-center -my-1">
            <span className="p-1 rounded-full bg-white text-slate-400 border border-slate-200/80 shadow-xs">
              <ArrowRightLeft className="w-3 h-3 text-amazon-orange" />
            </span>
          </div>

          {/* Wants */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Seeks
            </span>
            <span className="text-xs font-semibold text-slate-700 truncate ml-2">
              {primarySeeking}
            </span>
          </div>
        </div>

        {/* AI Reason (if present) */}
        {aiMatchReason && (
          <p className="mt-2.5 text-[11px] text-slate-500 italic line-clamp-2">
            "{aiMatchReason}"
          </p>
        )}
      </div>

      {/* Card Footer: Rate & Action Button */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
        <div>
          {isFreeBarter ? (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              0-Cost Barter
            </span>
          ) : (
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              ₹{student.pricePerSessionInRupees} <span className="text-[10px] text-slate-400 font-sans font-normal">/ 30m</span>
            </span>
          )}
        </div>

        <Link
          href={`/room/session-${student.id}`}
          className="px-4 py-2 rounded-xl bg-amazon-orange hover:bg-amber-500 text-slate-950 text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Propose Barter</span>
        </Link>
      </div>

    </div>
  );
};
export default MentorCard;
