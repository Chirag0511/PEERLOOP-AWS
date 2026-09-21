'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  Play,
  Pause,
  Sparkles,
  FileText,
  Send,
  ShieldCheck,
  Award,
  CheckCircle2,
  Coins,
  ArrowLeft,
  Copy,
  Check,
  Bot
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { ProofBadge } from '@/types';
import { SymbolicBadge } from '@/components/SymbolicBadge';
import { AiAuditorModal } from '@/components/AiAuditorModal';

export default function SessionRoomPage() {
  const params = useParams();
  const sessionId = (params?.id as string) || 'session-demo';
  const { user, completeSessionAndAward, sosList } = useAppStore();

  const matchingSos = sosList.find((s) => s.id === sessionId || `sos-${s.id}` === sessionId);

  const sessionTopic = matchingSos
    ? matchingSos.topic
    : 'Acoustic Guitar Fingerstyle Technique & Barre Chords';

  const sessionDescription = matchingSos
    ? matchingSos.description
    : 'Needs 15 mins with an experienced mentor to diagnose technique, check thumb placement, and resolve barre chord buzz.';

  const sessionCategory = matchingSos ? matchingSos.category : 'Music & Arts';

  const peerName = matchingSos ? matchingSos.studentName : 'Debasish Panda';
  const sessionBounty = matchingSos ? matchingSos.bountyInRupees : 0;

  // 15-min countdown timer
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Scratchpad - initialized with problem context
  const [workspaceContent, setWorkspaceContent] = useState(
    `### Solution & Resolution Steps: ${sessionTopic}\nPeer Learner: ${peerName}\nDemanded Roadblock: ${sessionDescription}\n\n1. Root Cause Analysis:\n- \n\n2. Step-by-Step Practical Remediation:\n- \n\n3. Verification & Follow-up:\n- `
  );


  const [chatMessages, setChatMessages] = useState([
    { sender: peerName, text: `Hey ${user.name}! Ready to swap? Let's check out your hand position first.`, time: '14:02' },
    { sender: user.name, text: 'Sounds great! After this I will show you how to structure the YouTube thumbnail in Figma.', time: '14:03' }
  ]);
  const [newChat, setNewChat] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // AI Auditor & Summary states
  const [isAuditorOpen, setIsAuditorOpen] = useState(false);
  const [summaryData, setSummaryData] = useState<{
    overview: string;
    keyConceptsLearned: string[];
    actionItems: string[];
    badgeAwarded: ProofBadge;
    source: string;
  } | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChat.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: user.name, text: newChat.trim(), time: 'Just now' }
    ]);
    setNewChat('');
  };

  // Trigger Bedrock AI Auditor before payout
  const handleStartAudit = () => {
    setIsAuditorOpen(true);
  };

  const handleAuditorApproved = (badge: ProofBadge) => {
    setIsAuditorOpen(false);
    setIsTimerRunning(false);
    completeSessionAndAward(sessionId, sessionTopic, sessionBounty, 1, badge);
    setSummaryData({
      overview: `AWS Bedrock verified 1-on-1 session on "${sessionTopic}". Technical resolution and practical remediation passed with a 94% quality score. Bounty and karma credit released from escrow.`,
      keyConceptsLearned: [
        `Core principles and diagnostic methodology for ${sessionTopic}`,
        'Practical hands-on resolution and error prevention steps',
        'Demonstrated competence verified by AWS Bedrock Escrow Guard'
      ],
      actionItems: [
        'Apply the validated resolution in your repository or project',
        'Review the minted proof-of-skill badge on your verified profile',
        'Leave reciprocal peer feedback on the campus barter ledger'
      ],
      badgeAwarded: badge,
      source: 'AWS Bedrock Solution Auditor'
    });
  };

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(workspaceContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* AI Solution Auditor Modal */}
      <AiAuditorModal
        isOpen={isAuditorOpen}
        topic={sessionTopic}
        description={sessionDescription}
        category={sessionCategory}
        solutionNotes={workspaceContent}
        mentorName={user.name}
        learnerName={peerName}
        bountyRupees={sessionBounty}
        onClose={() => setIsAuditorOpen(false)}
        onApproved={handleAuditorApproved}
      />

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/explore"
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live 1-on-1 Barter Session</span>
              <span className="text-slate-500">• with {peerName}</span>
              {sessionBounty > 0 && (
                <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  ₹{sessionBounty} Bounty in Escrow
                </span>
              )}
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white truncate max-w-lg mt-0.5">
              {sessionTopic}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <Clock className={`w-3.5 h-3.5 ${secondsLeft < 180 ? 'text-red-400 animate-pulse' : 'text-amber-400'}`} />
            <span className="font-mono font-bold text-white">{formatTimer(secondsLeft)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="text-slate-400 hover:text-white ml-1"
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>

          <button
            onClick={handleStartAudit}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Submit Solution for AI Audit</span>
          </button>
        </div>
      </div>

      {/* Demanded Roadblock Context Banner */}
      <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/15 text-amazon-orange mt-0.5 border border-amber-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold text-white">Student's Demanded Problem</span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-amber-400 font-medium">{sessionCategory}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{sessionDescription}"
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400">Escrow Payout:</span>
          <span className="font-mono font-bold text-emerald-400">₹{sessionBounty}</span>
          <span className="text-[10px] text-amber-300 font-semibold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
            Audit Required (≥70%)
          </span>
        </div>
      </div>


      {/* Main Workspace Split */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 h-[600px]">
        
        {/* Left: Shared Notes / Practice Workspace (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2 font-medium">
              <FileText className="w-4 h-4 text-amazon-orange" />
              <span>Shared Barter Practice Notes & Resolution Steps</span>
            </div>
            <button
              onClick={handleCopyNotes}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800"
            >
              {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <textarea
            value={workspaceContent}
            onChange={(e) => setWorkspaceContent(e.target.value)}
            className="w-full flex-1 p-4 bg-slate-950/50 text-slate-200 text-xs leading-relaxed focus:outline-none resize-none font-sans selection:bg-slate-800"
            placeholder="Document shared drills, takeaways, links, and action items..."
          />
        </div>

        {/* Right: Peer Discussion (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs font-medium text-slate-300 flex items-center justify-between">
            <span>Peer Discussion</span>
            <span className="text-[10px] text-emerald-400">Connected</span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
            {chatMessages.map((msg, i) => {
              const isMe = msg.sender === user.name;
              return (
                <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-slate-500 mb-0.5">{msg.sender}</span>
                  <div
                    className={`px-3 py-2 rounded-xl max-w-[85%] leading-relaxed ${
                      isMe ? 'bg-amazon-orange text-slate-950 font-medium' : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-2.5 bg-slate-950 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Type a message or share a link..."
              value={newChat}
              onChange={(e) => setNewChat(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-amazon-orange text-slate-950 hover:bg-amber-400 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

      {/* Final AI Summary Modal with 3D Symbolic Badge */}
      {summaryData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            
            <div className="text-center mb-5">
              <div className="inline-flex p-3 rounded-2xl bg-amber-400 text-slate-950 mb-2">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-white">Skill Barter Verified!</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Validated by {summaryData.source} • Funds & Badge Released
              </p>
            </div>

            {/* Render 3D Symbolic Badge */}
            <div className="mb-4">
              <SymbolicBadge badge={summaryData.badgeAwarded} showDetails={true} />
            </div>

            {/* Overview */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 mb-5 leading-relaxed">
              {summaryData.overview}
            </div>

            <div className="flex justify-end">
              <Link
                href="/profile"
                className="px-5 py-2 rounded-xl bg-amazon-orange hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all"
              >
                View in My Profile & Ledger
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
