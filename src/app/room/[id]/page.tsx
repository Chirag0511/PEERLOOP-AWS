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
  const isSqlSession = sessionTopic.toLowerCase().includes('sql');
  const [workspaceContent, setWorkspaceContent] = useState(
    isSqlSession
      ? `### SQL Query Solution: ${sessionTopic}\nPeer Learner: ${peerName}\nTable: students\n\n-- Which command is used to show the full table?\nSELECT * FROM students;\n`
      : `### Solution & Resolution Steps: ${sessionTopic}\nPeer Learner: ${peerName}\nDemanded Roadblock: ${sessionDescription}\n\n1. Root Cause Analysis:\n- \n\n2. Step-by-Step Practical Remediation:\n- \n\n3. Verification & Follow-up:\n- `
  );

  const [chatMessages, setChatMessages] = useState(
    isSqlSession
      ? [
          { sender: peerName, text: `Hey ${user.name}! Can you show me the SQL command to view all records and columns in the students table?`, time: '14:02' },
          { sender: user.name, text: 'Sure! You use "SELECT * FROM students;" which uses the asterisk (*) wildcard operator.', time: '14:03' }
        ]
      : [
          { sender: peerName, text: `Hey ${user.name}! Ready to swap? Let's check out your hand position first.`, time: '14:02' },
          { sender: user.name, text: 'Sounds great! After this I will show you how to structure the YouTube thumbnail in Figma.', time: '14:03' }
        ]
  );
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/explore"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live 1-on-1 Barter Session</span>
              <span className="text-slate-400">• with {peerName}</span>
              {sessionBounty > 0 && (
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ₹{sessionBounty} Bounty in Escrow
                </span>
              )}
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate max-w-lg mt-0.5">
              {sessionTopic}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs shadow-xs">
            <Clock className={`w-3.5 h-3.5 ${secondsLeft < 180 ? 'text-red-500 animate-pulse' : 'text-amber-500'}`} />
            <span className="font-mono font-bold text-slate-900">{formatTimer(secondsLeft)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="text-slate-400 hover:text-slate-700 ml-1"
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>

          <button
            onClick={handleStartAudit}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Submit Solution for AI Audit</span>
          </button>
        </div>
      </div>

      {/* Demanded Roadblock Context Banner */}
      <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-100 text-amazon-orange mt-0.5 border border-amber-200">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-bold text-slate-900">Student's Demanded Problem</span>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-amber-800 font-medium">{sessionCategory}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              "{sessionDescription}"
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs shadow-xs">
          <span className="text-slate-500">Escrow Payout:</span>
          <span className="font-mono font-bold text-emerald-700">₹{sessionBounty}</span>
          <span className="text-[10px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Audit Required (≥70%)
          </span>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 h-[600px]">
        
        {/* Left: Shared Notes / Practice Workspace (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 flex flex-col overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-700">
            <div className="flex items-center gap-2 font-medium">
              <FileText className="w-4 h-4 text-amazon-orange" />
              <span>Shared Barter Practice Notes & Resolution Steps</span>
            </div>
            <button
              onClick={handleCopyNotes}
              className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 px-2 py-0.5 rounded bg-white border border-slate-200 shadow-xs"
            >
              {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <textarea
            value={workspaceContent}
            onChange={(e) => setWorkspaceContent(e.target.value)}
            className="w-full flex-1 p-4 bg-white text-slate-800 text-xs leading-relaxed focus:outline-none resize-none font-sans selection:bg-amber-100"
            placeholder="Document shared drills, takeaways, links, and action items..."
          />
        </div>

        {/* Right: Peer Discussion (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 flex flex-col overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-xs font-medium text-slate-700 flex items-center justify-between">
            <span>Peer Discussion</span>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Connected
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs bg-slate-50/50">
            {chatMessages.map((msg, i) => {
              const isMe = msg.sender === user.name;
              return (
                <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-slate-400 mb-0.5">{msg.sender}</span>
                  <div
                    className={`px-3 py-2 rounded-xl max-w-[85%] leading-relaxed shadow-xs ${
                      isMe ? 'bg-amazon-orange text-slate-950 font-medium' : 'bg-white text-slate-800 border border-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-2.5 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              placeholder="Type a message or share a link..."
              value={newChat}
              onChange={(e) => setNewChat(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-amazon-orange text-slate-950 hover:bg-amber-500 transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

      {/* Final AI Summary Modal with 3D Symbolic Badge */}
      {summaryData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-slate-800">
            
            <div className="text-center mb-5">
              <div className="inline-flex p-3 rounded-2xl bg-amber-100 text-amber-800 mb-2">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Skill Barter Verified!</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Validated by {summaryData.source} • Funds & Badge Released
              </p>
            </div>

            {/* Render 3D Symbolic Badge */}
            <div className="mb-4">
              <SymbolicBadge badge={summaryData.badgeAwarded} showDetails={true} />
            </div>

            {/* Overview */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 mb-5 leading-relaxed">
              {summaryData.overview}
            </div>

            <div className="flex justify-end">
              <Link
                href="/profile"
                className="px-5 py-2.5 rounded-xl bg-amazon-orange hover:bg-amber-500 text-slate-950 font-bold text-xs transition-all shadow-sm active:scale-95"
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
