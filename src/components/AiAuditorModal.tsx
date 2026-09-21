'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, Coins, ArrowRight, Bot, Cpu } from 'lucide-react';
import { ProofBadge } from '@/types';
import { SymbolicBadge } from './SymbolicBadge';

interface AiAuditorModalProps {
  isOpen: boolean;
  topic: string;
  solutionNotes: string;
  mentorName: string;
  learnerName: string;
  bountyRupees: number;
  onClose: () => void;
  onApproved: (badgeAwarded: ProofBadge) => void;
}

export const AiAuditorModal: React.FC<AiAuditorModalProps> = ({
  isOpen,
  topic,
  solutionNotes,
  mentorName,
  learnerName,
  bountyRupees,
  onClose,
  onApproved
}) => {
  const [step, setStep] = useState<'auditing' | 'approved'>('auditing');
  const [auditScore, setAuditScore] = useState<number>(0);
  const [auditFeedback, setAuditFeedback] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setStep('auditing');
      setAuditScore(0);

      // Simulate AWS Bedrock Automated Solution Auditor
      const timer = setTimeout(() => {
        setAuditScore(94);
        setAuditFeedback(
          `AWS Bedrock Claude 3 evaluated the solution: Root-cause correctly diagnosed, actionable remediation steps verified, and practical implementation guidelines provided.`
        );
        setStep('approved');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const mockBadge: ProofBadge = {
    id: `bdg-${Date.now()}`,
    title: `${topic.slice(0, 24)} Certified Mentor`,
    skill: topic,
    issuer: 'AWS Student Builder Group VSSUT',
    issuedAt: new Date().toISOString().split('T')[0],
    verificationHash: '0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6),
    level: bountyRupees >= 150 ? 'Diamond' : 'Gold'
  };

  const handleClaimEscrow = () => {
    onApproved(mockBadge);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-7 shadow-2xl">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-amazon-orange text-slate-950 shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              AWS Bedrock Solution Auditor
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amazon-orange/10 text-amazon-orange border border-amazon-orange/20">
                AI Escrow Guard
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Validating solution accuracy before releasing bounty funds
            </p>
          </div>
        </div>

        {step === 'auditing' ? (
          <div className="py-10 text-center flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amazon-orange/15 text-amazon-orange flex items-center justify-center animate-spin">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">
              Inspecting Solution with Amazon Bedrock...
            </h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Analyzing resolution steps, code validity, and problem matching against: "{topic}"
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* Audit Results Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Solution Verified & Approved
                </span>
                <span className="text-xs font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Audit Score: {auditScore}%
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {auditFeedback}
              </p>
            </div>

            {/* Escrow Bounty Release Box */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold font-mono text-sm">
                  ₹
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {bountyRupees > 0 ? `₹${bountyRupees} Bounty Released from Escrow` : 'Barter Credits Released'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Transferred to {mentorName}'s verified campus wallet
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 font-mono">
                {bountyRupees > 0 ? `+₹${bountyRupees}` : '+1 Credit'}
              </span>
            </div>

            {/* Minted Symbolic Badge Preview */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Verifiable Micro-Credential Minted:
              </span>
              <SymbolicBadge badge={mockBadge} showDetails={true} />
            </div>

            {/* Action */}
            <button
              onClick={handleClaimEscrow}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 mt-2"
            >
              <span>Accept & Claim to Profile Ledger</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
export default AiAuditorModal;
