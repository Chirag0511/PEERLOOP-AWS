'use client';

import React, { useState } from 'react';
import {
  Compass,
  Star,
  Award,
  CheckCircle2,
  Users,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Send,
  BookOpen
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { CompetencyMatch } from '@/types';

export default function CompetencyMappingPage() {
  const { currentRole, competencyMatches, courses } = useAppStore();

  const [selectedSubject, setSelectedSubject] = useState<string>('Cloud & DevOps');
  const [assignmentNotice, setAssignmentNotice] = useState<string | null>(null);

  const subjectsList = [
    { name: 'Cloud & DevOps', icon: '☁️', demand: 'High Demand', requiredSkills: ['AWS Cloud Architecture', 'Serverless Microservices', 'DynamoDB NoSQL Design', 'CI/CD Pipelines'] },
    { name: 'AI & Data Science', icon: '🤖', demand: 'Critical Growth', requiredSkills: ['Transformer Attention Models', 'Vector Embeddings & RAG', 'Machine Learning & PyTorch', 'AI Solution Auditing'] },
    { name: 'Cybersecurity & Governance', icon: '🛡️', demand: 'Priority Defense', requiredSkills: ['Zero-Trust Network Architecture', 'Identity Domain & JWT Verification', 'Penetration Testing', 'Critical Infrastructure Defense'] },
    { name: 'Tech & Code', icon: '💻', demand: 'Core Foundation', requiredSkills: ['Next.js 14 App Router', 'TypeScript Engineering', 'Distributed Microservices', 'REST & GraphQL APIs'] }
  ];

  const activeSubjectInfo = subjectsList.find((s) => s.name === selectedSubject) || subjectsList[0];

  const handleAssignTrainer = (trainerName: string) => {
    setAssignmentNotice(`Trainer ${trainerName} successfully designated as Lead Instructor for ${selectedSubject}!`);
    setTimeout(() => setAssignmentNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              Organizational Capacity Engine
            </span>
            <span className="text-xs text-slate-500">• AI Competency Mapping</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <Compass className="w-8 h-8 text-amber-500" />
            Subject Competency Mapping & Trainer Discovery
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            Algorithmic capability matching that analyzes trainer academic qualifications, certified competencies, verified industry experience, and student performance metrics to identify the most suitable faculty trainers for every curriculum domain.
          </p>
        </div>

        {assignmentNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{assignmentNotice}</span>
          </div>
        )}

        {/* Subject Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {subjectsList.map((sub) => {
            const isSelected = selectedSubject === sub.name;
            return (
              <button
                key={sub.name}
                onClick={() => setSelectedSubject(sub.name)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                    : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{sub.icon}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {sub.demand}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {sub.name}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Competency Criteria Header */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/20 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1">
                Domain Competency Requirements: {selectedSubject}
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {activeSubjectInfo.requiredSkills.map((sk) => (
                  <span
                    key={sk}
                    className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className="text-xs text-slate-500 block">Matched Certified Trainers</span>
              <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
                {competencyMatches.length} Evaluated
              </span>
            </div>
          </div>
        </div>

        {/* Matched Trainers Ranking Cards */}
        <div className="space-y-6">
          {competencyMatches.map((trainer, index) => {
            const isPrimary = trainer.status === 'Primary Trainer';

            return (
              <div
                key={trainer.trainerId}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left: Trainer Profile & Suitability Meter */}
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={trainer.trainerAvatar}
                      alt={trainer.trainerName}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400 shrink-0"
                    />
                    <span className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold flex items-center justify-center border-2 border-white dark:border-slate-900">
                      #{index + 1}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        {trainer.trainerName}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isPrimary
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                          : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                      }`}>
                        {trainer.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      {trainer.qualification} • <strong>{trainer.experienceYears} Years Experience</strong>
                    </p>

                    {/* Matched Skills */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {trainer.matchingSkills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                        >
                          ✓ {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Suitability Score Gauge & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:border-l lg:border-slate-100 dark:lg:border-slate-800 lg:pl-6 shrink-0">
                  <div className="text-center sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      Competency Suitability
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-24 bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full"
                          style={{ width: `${trainer.suitabilityScore}%` }}
                        ></div>
                      </div>
                      <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                        {trainer.suitabilityScore}%
                      </span>
                    </div>
                    <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold block mt-0.5">
                      ★ {trainer.trainerRating} Trainer Rating
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 w-full sm:w-auto">
                    {currentRole === 'admin' ? (
                      <button
                        onClick={() => handleAssignTrainer(trainer.trainerName)}
                        className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Approve Course Lead</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Connecting with ${trainer.trainerName} for ${selectedSubject}...`)}
                        className="px-4 py-2 rounded-xl bg-amazon-orange hover:bg-amber-500 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Request Masterclass</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
