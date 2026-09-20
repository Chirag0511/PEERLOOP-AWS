'use client';

import React from 'react';
import Link from 'next/link';
import {
  Layers,
  Sparkles,
  Database,
  Cpu,
  ShieldCheck,
  Cloud,
  CheckCircle2,
  DollarSign,
  Zap,
  ArrowRight,
  Server,
  FileCode2
} from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Banner */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amazon-orange/10 border border-amazon-orange/20 text-xs font-semibold text-amazon-orange mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Amazon Code Conquest 2026 • Judging & Technical Deep-Dive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          AWS Cloud & Serverless Architecture
        </h1>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          How PeerLoop leverages Amazon Bedrock GenAI, AWS Lambda, Amazon DynamoDB, and Cognito to build a hyper-scalable, zero-idle-cost campus ecosystem.
        </p>
      </div>

      {/* Cloud Architecture Interactive Diagram */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-amazon-orange/30 mb-12 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cloud className="w-5 h-5 text-amazon-orange" />
            End-to-End Serverless Architecture Diagram
          </h2>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
            100% Serverless
          </span>
        </div>

        {/* Diagram Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          
          {/* Layer 1: Edge & Auth */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
                <Cloud className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block">
                Edge Delivery & Identity
              </span>
              <h3 className="font-bold text-white mt-1">AWS Amplify & Cognito</h3>
              <p className="text-slate-400 mt-1.5 leading-relaxed">
                Next.js SSR distributed via CloudFront edge locations. Amazon Cognito enforces strict email domain validation (@vssut.ac.in).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] text-slate-500">
              Latency: &lt; 25ms Edge Cache
            </div>
          </div>

          {/* Layer 2: API & Gateway */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 block">
                API & Real-time WebSockets
              </span>
              <h3 className="font-bold text-white mt-1">Amazon API Gateway</h3>
              <p className="text-slate-400 mt-1.5 leading-relaxed">
                Routes HTTP REST queries and maintains bidirectional WebSocket channels for 15-minute SOS flash broadcasts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] text-slate-500">
              Protocol: REST + WSS
            </div>
          </div>

          {/* Layer 3: Compute & Logic */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                Event-Driven Compute
              </span>
              <h3 className="font-bold text-white mt-1">AWS Lambda</h3>
              <p className="text-slate-400 mt-1.5 leading-relaxed">
                Stateless Node.js microservices executing matchmaking, peer session orchestrations, and atomic credit transactions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] text-slate-500">
              Execution: Zero Idle Billing
            </div>
          </div>

          {/* Layer 4: AI & Database */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-amber-500/40 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                GenAI & High-Speed Data
              </span>
              <h3 className="font-bold text-white mt-1">Bedrock & DynamoDB</h3>
              <p className="text-slate-400 mt-1.5 leading-relaxed">
                Bedrock Claude 3 computes semantic compatibility vectors and auto-summarizes notes. DynamoDB records immutable karma transactions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] text-amber-400 font-medium">
              Sub-10ms DynamoDB Reads
            </div>
          </div>

        </div>
      </div>

      {/* Deep-Dive Grid: Bedrock GenAI + DynamoDB Single-Table Schema */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Amazon Bedrock GenAI Pipeline (6 Cols) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border-slate-800/80">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Amazon Bedrock GenAI Pipeline</h3>
          </div>

          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Unlike simplistic keyword search engines, PeerLoop uses foundation models on Amazon Bedrock for two mission-critical tasks:
          </p>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-amber-300 block mb-1">
                1. Semantic Barter Matchmaking (Claude 3 Haiku & Titan)
              </span>
              <p className="text-slate-400 leading-relaxed">
                Embeds unstructured project descriptions and cross-references them against complementary peer needs to discover zero-cost barter pairings.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-sky-300 block mb-1">
                2. Automated Session Synthesis & Micro-Credentials
              </span>
              <p className="text-slate-400 leading-relaxed">
                Parses live code scratchpad diffs and shared notes to output bulleted takeaways, next steps, and issues a cryptographically-hashed proof-of-skill badge.
              </p>
            </div>
          </div>
        </div>

        {/* DynamoDB Single-Table Design (6 Cols) */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border-slate-800/80">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold text-white">DynamoDB Single-Table Design</h3>
          </div>

          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Modeled with a single partition key / sort key pattern for ultra-low latency reads and ACID multi-item transactions:
          </p>

          {/* Schema Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-2 font-semibold">Entity</th>
                  <th className="pb-2 font-semibold">PK (Partition)</th>
                  <th className="pb-2 font-semibold">SK (Sort)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-2 text-amber-400 font-sans font-semibold">Student Profile</td>
                  <td className="py-2">USER#&lt;id&gt;</td>
                  <td className="py-2">METADATA</td>
                </tr>
                <tr>
                  <td className="py-2 text-emerald-400 font-sans font-semibold">Credit Ledger</td>
                  <td className="py-2">USER#&lt;id&gt;</td>
                  <td className="py-2">TX#&lt;timestamp&gt;</td>
                </tr>
                <tr>
                  <td className="py-2 text-red-400 font-sans font-semibold">SOS Ticket</td>
                  <td className="py-2">SOS#&lt;category&gt;</td>
                  <td className="py-2">QUEUE#&lt;id&gt;</td>
                </tr>
                <tr>
                  <td className="py-2 text-sky-400 font-sans font-semibold">Proof Badge</td>
                  <td className="py-2">BADGE#&lt;id&gt;</td>
                  <td className="py-2">VERIFY#&lt;hash&gt;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Cost & Scalability Matrix */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800/80 mb-12">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">
            Cost & Scalability Model for Universities
          </h3>
        </div>

        <p className="text-xs text-slate-400 mb-6 max-w-3xl leading-relaxed">
          Traditional student management platforms cost institutions thousands of dollars annually in EC2 and RDS licenses. Because PeerLoop is 100% serverless, its cost curves scale strictly with active usage:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 font-semibold block">Campus Pilots (0 - 500 Students)</span>
            <div className="text-2xl font-extrabold text-emerald-400 my-1">$0.00 / month</div>
            <p className="text-[11px] text-slate-500">Fully covered under AWS Free Tier (1M Lambda requests, 25GB DynamoDB).</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 font-semibold block">Full University (5,000 Students)</span>
            <div className="text-2xl font-extrabold text-white my-1">~$8.40 / month</div>
            <p className="text-[11px] text-slate-500">Bedrock Claude 3 Haiku token consumption + API Gateway HTTP requests.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 font-semibold block">Multi-College Network (50,000 Students)</span>
            <div className="text-2xl font-extrabold text-amber-400 my-1">~$65.00 / month</div>
            <p className="text-[11px] text-slate-500">High availability, global CloudFront distribution, auto-partitioning DynamoDB.</p>
          </div>
        </div>
      </div>

      {/* Back to Discovery */}
      <div className="text-center">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 font-bold text-xs shadow-lg active:scale-95 transition-all"
        >
          <span>Test Live Semantic Matchmaker</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
