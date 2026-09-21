'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, Plus, CheckCircle, Bot } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { SosModal } from '@/components/SosModal';
import { AiAuditorModal } from '@/components/AiAuditorModal';
import { SOSRequest } from '@/types';

export default function SosPage() {
  const { sosList, acceptSosRequest, user, completeSessionAndAward, resolveSosRequest } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auditingSos, setAuditingSos] = useState<SOSRequest | null>(null);
  const [filterCat, setFilterCat] = useState('All');

  const categories = [
    'All',
    'Design & Creative',
    'Music & Arts',
    'Languages & Communication',
    'Engineering & 3D',
    'Tech & Code'
  ];

  const filteredRequests = sosList.filter((req) => {
    if (filterCat === 'All') return true;
    return req.category === filterCat;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <SosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Direct AI Auditor Modal */}
      {auditingSos && (
        <AiAuditorModal
          isOpen={Boolean(auditingSos)}
          topic={auditingSos.topic}
          description={auditingSos.description}
          category={auditingSos.category}
          solutionNotes=""
          mentorName={user.name}
          learnerName={auditingSos.studentName}
          bountyRupees={auditingSos.bountyInRupees}
          onClose={() => setAuditingSos(null)}
          onApproved={(badge) => {
            completeSessionAndAward(
              auditingSos.id,
              auditingSos.topic,
              auditingSos.bountyInRupees,
              1,
              badge
            );
            resolveSosRequest(auditingSos.id);
            setAuditingSos(null);
          }}
        />
      )}


      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Live Campus SOS Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            15-Minute Fast Help Board
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Quick 10-15 minute peer unblocking for lab evaluations, video renders, guitar technique, or urgent roadblocks.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Post an SOS</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1 mb-6 pb-2 border-b border-slate-900">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              filterCat === cat
                ? 'bg-slate-800 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SOS List */}
      <div className="space-y-3">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-70" />
            <h3 className="text-sm font-semibold text-white">All queues clear!</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              No pending requests in this category. Post an SOS if you need unblocking.
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => {
            const isOpen = req.status === 'Open';

            return (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 text-xs">
                    <span className="font-bold text-white">{req.studentName}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 text-[11px]">{req.studentDept}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-amber-400 text-[11px] font-medium">{req.category}</span>
                  </div>

                  <h3 className="text-sm font-semibold text-white truncate">
                    {req.topic}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {req.description}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                    ₹{req.bountyInRupees} Bounty
                  </span>

                  {isOpen ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAuditingSos(req)}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 font-bold text-xs flex items-center gap-1.5 transition-all border border-slate-700/80 shadow-sm"
                        title="Submit your answer for AWS Bedrock audit directly"
                      >
                        <Bot className="w-3.5 h-3.5 text-amazon-orange" />
                        <span>Solve & Audit</span>
                      </button>

                      <Link
                        href={`/room/${req.id}`}
                        onClick={() => acceptSosRequest(req.id)}
                        className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Enter Room</span>
                      </Link>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 px-2.5 py-1 bg-slate-950 rounded-lg border border-slate-800 font-medium">
                      {req.status === 'Resolved' ? 'Resolved' : 'In Session'}
                    </span>
                  )}

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
