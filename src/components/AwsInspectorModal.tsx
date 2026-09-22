'use client';

import React from 'react';
import { Layers, Cloud, Cpu, Database, ShieldCheck, Sparkles, X, CheckCircle2, ArrowRight } from 'lucide-react';

interface AwsInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AwsInspectorModal: React.FC<AwsInspectorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const awsServices = [
    {
      name: 'Amazon Bedrock (Claude 3 & Titan)',
      role: 'GenAI Matchmaking & Session Summarization',
      color: 'from-amber-500 to-orange-600',
      icon: Sparkles,
      details: 'Generates semantic embeddings from student bios & project descriptions to compute multi-dimensional compatibility. Also summarizes 1-on-1 sessions and verifies technical milestones for badges.'
    },
    {
      name: 'AWS Lambda & API Gateway',
      role: 'Serverless Event-Driven API',
      color: 'from-orange-500 to-red-600',
      icon: Cpu,
      details: 'Executes matchmaking algorithms, manages peer room lifecycles, and processes time-credit transactions with zero idle infrastructure costs.'
    },
    {
      name: 'Amazon DynamoDB',
      role: 'High-Velocity Student & Credit Ledger',
      color: 'from-blue-500 to-indigo-600',
      icon: Database,
      details: 'Single-table design storing student profiles, skills offered/seeking, karma balances, and real-time SOS queue with sub-10ms latency.'
    },
    {
      name: 'Amazon Cognito',
      role: 'Institutional Campus Auth & Trust',
      color: 'from-emerald-500 to-teal-600',
      icon: ShieldCheck,
      details: 'Restricts user sign-ups strictly to institutional domains (e.g., @vssut.ac.in), preventing spam, fraud, and impersonation across campus.'
    },
    {
      name: 'AWS Amplify & Amazon CloudFront',
      role: 'Edge Delivery & Next.js Hosting',
      color: 'from-sky-500 to-cyan-600',
      icon: Cloud,
      details: 'Distributes the static UI and Server-Side Rendered (SSR) routes with global low latency and automated CI/CD pipeline from GitHub.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-amazon-orange to-amber-500 text-slate-950 shadow-md shadow-amber-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              AWS Cloud Architecture Inspector
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Hackathon Presentation Mode
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Production-ready serverless topology designed for Amazon Code Conquest
            </p>
          </div>
        </div>

        {/* Architecture Flow Diagram Box */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
            <Cloud className="w-4 h-4 text-amazon-orange" />
            End-to-End AWS Request Pipeline
          </h4>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
            <div className="w-full md:w-auto px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 shadow-xs text-center">
              <span className="font-bold text-slate-900 block">Next.js Client</span>
              <span className="text-[10px] text-slate-500">AWS Amplify / CloudFront</span>
            </div>
            <ArrowRight className="w-4 h-4 text-amazon-orange rotate-90 md:rotate-0" />
            <div className="w-full md:w-auto px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 shadow-xs text-center">
              <span className="font-bold text-slate-900 block">API Gateway</span>
              <span className="text-[10px] text-slate-500">REST & WebSockets</span>
            </div>
            <ArrowRight className="w-4 h-4 text-amazon-orange rotate-90 md:rotate-0" />
            <div className="w-full md:w-auto px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 shadow-xs text-center">
              <span className="font-bold text-slate-900 block">AWS Lambda</span>
              <span className="text-[10px] text-slate-500">Matchmaker & Ledger</span>
            </div>
            <ArrowRight className="w-4 h-4 text-amazon-orange rotate-90 md:rotate-0" />
            <div className="w-full md:w-auto px-3.5 py-2.5 rounded-xl bg-amber-50 border border-amber-300 text-center shadow-xs">
              <span className="font-bold text-amber-900 block">Amazon Bedrock</span>
              <span className="text-[10px] text-amber-700 font-medium">Claude 3 / Titan</span>
            </div>
          </div>
        </div>

        {/* AWS Services Cards */}
        <div className="space-y-3">
          {awsServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.name}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex items-start gap-3.5"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${svc.color} text-white shrink-0 mt-0.5 shadow-xs`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-bold text-slate-900">{svc.name}</h5>
                    <span className="text-[11px] font-medium text-amber-800">{svc.role}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {svc.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cost & Scalability Footnote */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Operational cost for 5,000 active campus students: <strong>&lt; $12 / month</strong></span>
          </div>
          <span className="text-slate-400 hidden sm:inline">Serverless Auto-Scaling</span>
        </div>

      </div>
    </div>
  );
};
export default AwsInspectorModal;
