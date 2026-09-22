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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Live Campus SOS Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            15-Minute Fast Help Board
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Quick 10-15 minute peer unblocking for lab evaluations, video renders, guitar technique, or urgent roadblocks.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all self-start sm:self-auto shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Post an SOS</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5 mb-6 pb-2 border-b border-slate-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
              filterCat === cat
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SOS List */}
      <div className="space-y-3">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
            <h3 className="text-sm font-semibold text-slate-900">All queues clear!</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              No pending requests in this category. Post an SOS if you need unblocking.
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => {
            const isOpen = req.status === 'Open';

            return (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 text-xs">
                    <span className="font-bold text-slate-900">{req.studentName}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 text-[11px]">{req.studentDept}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-amber-800 bg-amber-50 text-[11px] font-medium px-2 py-0.5 rounded border border-amber-200">{req.category}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {req.topic}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {req.description}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    ₹{req.bountyInRupees} Bounty
                  </span>

                  {isOpen ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAuditingSos(req)}
                        className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-all border border-amber-200 shadow-xs"
                        title="Submit your answer for AWS Bedrock audit directly"
                      >
                        <Bot className="w-3.5 h-3.5 text-amazon-orange" />
                        <span>Solve & Audit</span>
                      </button>

                      <Link
                        href={`/room/${req.id}`}
                        onClick={() => acceptSosRequest(req.id)}
                        className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs active:scale-95"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Enter Room</span>
                      </Link>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200 font-medium">
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
