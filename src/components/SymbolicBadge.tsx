'use client';

import React from 'react';
import { ProofBadge } from '@/types';

interface SymbolicBadgeProps {
  badge: ProofBadge;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export const SymbolicBadge: React.FC<SymbolicBadgeProps> = ({
  badge,
  size = 'md',
  showDetails = true
}) => {
  const isDiamond = badge.level === 'Diamond';
  const isGold = badge.level === 'Gold';

  // Visual Emblem Renderer
  const renderEmblem = () => {
    if (isDiamond) {
      return (
        <div className="relative flex items-center justify-center group">
          {/* Diamond Glow Aura */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/40 via-sky-400/40 to-blue-500/40 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
          
          {/* Diamond Hexagon / Jewel Shape */}
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-200 via-sky-400 to-blue-600 p-0.5 shadow-md shadow-cyan-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/85 rounded-[10px] flex items-center justify-center relative overflow-hidden">
              {/* Facet Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-300/30 to-white/40 pointer-events-none" />
              {/* Faceted SVG Diamond */}
              <svg className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 9L12 22L22 9L12 2Z" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M2 9H22M12 2L7 9L12 22L17 9L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      );
    }

    if (isGold) {
      return (
        <div className="relative flex items-center justify-center group">
          {/* Gold Glow Aura */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/40 via-yellow-400/40 to-orange-500/40 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
          
          {/* Gold Medallion Shape */}
          <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 p-0.5 shadow-md shadow-amber-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/85 rounded-full flex items-center justify-center relative overflow-hidden">
              {/* Gold Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-300/30 to-amber-200/50 pointer-events-none" />
              {/* Medallion Star / Laurel */}
              <svg className="w-6 h-6 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="9" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 6L13.8 9.6L17.8 10.2L14.9 13L15.6 17L12 15.1L8.4 17L9.1 13L6.2 10.2L10.2 9.6L12 6Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      );
    }

    // Silver Tier
    return (
      <div className="relative flex items-center justify-center group">
        <div className="absolute -inset-1 bg-slate-400/30 rounded-2xl blur-sm opacity-50" />
        <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 p-0.5 shadow-md flex items-center justify-center">
          <div className="w-full h-full bg-slate-950/90 rounded-[10px] flex items-center justify-center">
            <svg className="w-6 h-6 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M12 2L4 5V11C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11V5L12 2Z" fill="currentColor" fillOpacity="0.2" />
              <path d="M12 7L13.5 10L17 10.5L14.5 13L15 16.5L12 15L9 16.5L9.5 13L7 10.5L10.5 10L12 7Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  if (!showDetails) {
    return renderEmblem();
  }

  return (
    <div className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between gap-3.5 shadow-sm">
      <div className="flex items-center gap-3.5 min-w-0">
        {renderEmblem()}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-slate-900 truncate">{badge.title}</h4>
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                isDiamond
                  ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                  : isGold
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {badge.level} Badge
            </span>
          </div>

          <p className="text-[11px] text-slate-500 mt-0.5 truncate">
            {badge.skill} • {badge.issuer}
          </p>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
            Hash: {badge.verificationHash}
          </p>
        </div>
      </div>

      <span className="text-[10px] text-slate-400 font-mono shrink-0">
        {badge.issuedAt}
      </span>
    </div>
  );
};
export default SymbolicBadge;

