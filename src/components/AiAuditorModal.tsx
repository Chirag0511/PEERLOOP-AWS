'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  Bot,
  Cpu,
  RefreshCw,
  Send,
  HelpCircle,
  Check
} from 'lucide-react';
import { ProofBadge, SolutionAuditResult } from '@/types';
import { SymbolicBadge } from './SymbolicBadge';

interface AiAuditorModalProps {
  isOpen: boolean;
  topic: string;
  description?: string;
  category?: string;
  solutionNotes?: string;
  mentorName: string;
  learnerName: string;
  bountyRupees: number;
  onClose: () => void;
  onApproved: (badgeAwarded: ProofBadge) => void;
}

export const AiAuditorModal: React.FC<AiAuditorModalProps> = ({
  isOpen,
  topic,
  description = 'Troubleshoot and resolve roadblock with actionable instructions.',
  category = 'General',
  solutionNotes = '',
  mentorName,
  learnerName,
  bountyRupees,
  onClose,
  onApproved
}) => {
  const [solutionText, setSolutionText] = useState(solutionNotes);
  const [clarificationText, setClarificationText] = useState('');
  const [auditStatus, setAuditStatus] = useState<'idle' | 'auditing' | 'failed' | 'approved'>('idle');
  const [auditResult, setAuditResult] = useState<SolutionAuditResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync solutionNotes when modal opens
  useEffect(() => {
    if (isOpen) {
      setSolutionText(solutionNotes || '');
      setClarificationText('');
      setAuditStatus('idle');
      setAuditResult(null);
      setErrorMessage('');
    }
  }, [isOpen, solutionNotes]);

  if (!isOpen) return null;

  const runAudit = async (additionalClarification: string = '') => {
    if (!solutionText.trim() && !additionalClarification.trim()) {
      setErrorMessage('Please provide your solution or diagnostic steps to verify resolution.');
      return;
    }

    setErrorMessage('');
    setAuditStatus('auditing');

    try {
      const response = await fetch('/api/audit-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          description,
          category,
          solution: solutionText,
          clarification: additionalClarification
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Audit evaluation failed');
      }

      const result: SolutionAuditResult = data.data;
      setAuditResult(result);

      if (result.passed && result.score >= 70) {
        setAuditStatus('approved');
      } else {
        setAuditStatus('failed');
      }
    } catch (err: any) {
      console.error('Audit failed:', err);
      setAuditStatus('idle');
      setErrorMessage(err.message || 'Failed to connect to AWS Bedrock Auditor service.');
    }
  };

  const handleClarificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clarificationText.trim()) return;
    runAudit(clarificationText);
  };

  const mockBadge: ProofBadge = {
    id: `bdg-${Date.now()}`,
    title: `${topic.slice(0, 24)} Certified Mentor`,
    skill: topic,
    issuer: 'AWS Student Builder Group VSSUT',
    issuedAt: new Date().toISOString().split('T')[0],
    verificationHash:
      '0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6),
    level: bountyRupees >= 150 ? 'Diamond' : 'Gold'
  };

  const handleClaimEscrow = () => {
    if (auditStatus === 'approved') {
      onApproved(mockBadge);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 md:p-7 shadow-2xl my-8 text-slate-800">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-amazon-orange text-slate-950 shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              AWS Bedrock Solution Auditor
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                AI Escrow Guard
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Evaluates answer against student's demanded roadblock before releasing escrow bounty
            </p>
          </div>
        </div>

        {/* Demanded Problem Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
          <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">{learnerName}</span>
              <span className="text-slate-400">•</span>
              <span className="text-amber-800 bg-amber-50 font-medium text-[11px] px-2 py-0.5 rounded border border-amber-200">{category}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded border border-amber-300">
              <Lock className="w-3 h-3 text-amber-700" />
              <span>₹{bountyRupees} Bounty in Escrow</span>
            </div>
          </div>
          <h4 className="text-xs font-semibold text-slate-900 mb-1">
            Demanded Problem: {topic}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed italic">
            "{description}"
          </p>
        </div>

        {/* Main Body depending on auditStatus */}
        {auditStatus === 'auditing' ? (
          <div className="py-12 text-center flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amazon-orange flex items-center justify-center animate-spin">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Inspecting Solution with Amazon Bedrock Claude 3...
            </h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Analyzing relevance, technical diagnostic accuracy, and actionable resolution against the demanded roadblock.
            </p>
          </div>
        ) : auditStatus === 'approved' && auditResult ? (
          <div className="space-y-4">
            {/* Audit Results Box */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Solution Verified & Approved
                </span>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300">
                  Audit Score: {auditResult.score}% (Passed)
                </span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed mb-3 font-medium">
                {auditResult.feedback}
              </p>

              {/* Rubric Breakdown */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-emerald-200 text-[11px]">
                <div className="bg-white p-2 rounded-lg text-center border border-emerald-200/80 shadow-xs">
                  <span className="text-slate-500 block text-[10px]">Relevance</span>
                  <span className="font-bold font-mono text-emerald-700">{auditResult.criteriaScores.relevance}/30</span>
                </div>
                <div className="bg-white p-2 rounded-lg text-center border border-emerald-200/80 shadow-xs">
                  <span className="text-slate-500 block text-[10px]">Accuracy</span>
                  <span className="font-bold font-mono text-emerald-700">{auditResult.criteriaScores.technicalAccuracy}/30</span>
                </div>
                <div className="bg-white p-2 rounded-lg text-center border border-emerald-200/80 shadow-xs">
                  <span className="text-slate-500 block text-[10px]">Actionable</span>
                  <span className="font-bold font-mono text-emerald-700">{auditResult.criteriaScores.completeness}/25</span>
                </div>
                <div className="bg-white p-2 rounded-lg text-center border border-emerald-200/80 shadow-xs">
                  <span className="text-slate-500 block text-[10px]">Clarity</span>
                  <span className="font-bold font-mono text-emerald-700">{auditResult.criteriaScores.clarity}/15</span>
                </div>
              </div>
            </div>

            {/* Escrow Bounty Release Box */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 via-white to-white border border-emerald-300 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 font-bold font-mono text-sm">
                  ₹
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    {bountyRupees > 0 ? `₹${bountyRupees} Bounty Released from Escrow` : 'Barter Credits Released'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Transferred to {mentorName}'s verified campus balance
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 font-mono">
                {bountyRupees > 0 ? `+₹${bountyRupees}` : '+1 Credit'}
              </span>
            </div>

            {/* Minted Symbolic Badge Preview */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-2">
                Verifiable Micro-Credential Minted:
              </span>
              <SymbolicBadge badge={mockBadge} showDetails={true} />
            </div>

            {/* Action */}
            <button
              onClick={handleClaimEscrow}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 mt-2"
            >
              <span>Accept Bounty & Mint to Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* If Failed / Needs Clarification */}
            {auditStatus === 'failed' && auditResult && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-red-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    Verification Failed — Bounty Withheld
                  </span>
                  <span className="text-xs font-mono font-bold text-red-800 bg-red-100 px-2.5 py-0.5 rounded border border-red-300">
                    Audit Score: {auditResult.score}% (Requires 70%)
                  </span>
                </div>
                <p className="text-xs text-red-950 leading-relaxed mb-3">
                  {auditResult.feedback}
                </p>

                {/* Clarification prompt from Bedrock */}
                {auditResult.clarificationQuestion && (
                  <div className="p-3 rounded-xl bg-white border border-amber-300 text-xs text-amber-900 shadow-xs">
                    <span className="font-bold block mb-1 flex items-center gap-1.5 text-amber-800">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                      AWS Bedrock Auditor Demands Clarification:
                    </span>
                    <p className="text-slate-700 text-xs leading-relaxed">
                      {auditResult.clarificationQuestion}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Solution Input Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Your Resolution & Diagnostic Steps *
                </label>
                <span className="text-[11px] text-slate-400">
                  Must address the demanded problem
                </span>
              </div>
              <textarea
                value={solutionText}
                onChange={(e) => setSolutionText(e.target.value)}
                rows={5}
                className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 leading-relaxed resize-none transition-all shadow-xs"
                placeholder="Explain the step-by-step resolution, commands, technique adjustments, or code fix you used to solve this specific roadblock..."
              />
            </div>

            {/* Clarification Chat Box (if already failed once) */}
            {auditStatus === 'failed' && (
              <form onSubmit={handleClarificationSubmit}>
                <label className="text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-1.5">
                  Provide Clarification or Extra Steps:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={clarificationText}
                    onChange={(e) => setClarificationText(e.target.value)}
                    placeholder="e.g. Applied ALTER TABLE to add foreign key constraint..."
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Clarify</span>
                  </button>
                </div>
              </form>
            )}

            {errorMessage && (
              <p className="text-xs text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200">
                {errorMessage}
              </p>
            )}

            {/* Audit Trigger Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => runAudit(clarificationText)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>
                  {auditStatus === 'failed'
                    ? 'Re-Submit Answer for Bedrock Audit'
                    : 'Submit Solution for AWS Bedrock Audit'}
                </span>
              </button>
              <p className="text-[11px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-slate-400" />
                Escrow funds (₹{bountyRupees}) will only release if solution score is ≥ 70%.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AiAuditorModal;
