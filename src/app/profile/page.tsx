'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Star,
  Award,
  GraduationCap,
  Briefcase,
  BookOpen,
  Plus,
  Trash2,
  CheckCircle2,
  FileCheck,
  ExternalLink,
  Tag,
  Clock,
  Sparkles,
  Edit3
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { SkillCategory, Qualification, WorkExperience, Certificate } from '@/types';
import { SymbolicBadge } from '@/components/SymbolicBadge';

export default function ProfilePage() {
  const {
    user,
    setUser,
    courses,
    submissions,
    addQualification,
    removeQualification,
    addWorkExperience,
    removeWorkExperience,
    addCertificate,
    removeCertificate,
    updateInterests
  } = useAppStore();

  // Modals state
  const [isAddQualOpen, setIsAddQualOpen] = useState(false);
  const [qualDegree, setQualDegree] = useState('');
  const [qualInstitution, setQualInstitution] = useState('');
  const [qualYear, setQualYear] = useState('');
  const [qualGrade, setQualGrade] = useState('');

  const [isAddExpOpen, setIsAddExpOpen] = useState(false);
  const [expRole, setExpRole] = useState('');
  const [expOrg, setExpOrg] = useState('');
  const [expDuration, setExpDuration] = useState('');
  const [expDesc, setExpDesc] = useState('');

  const [isAddCertOpen, setIsAddCertOpen] = useState(false);
  const [certTitle, setCertTitle] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certId, setCertId] = useState('');

  const [newInterestInput, setNewInterestInput] = useState('');

  const handleAddQual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qualDegree.trim()) return;
    addQualification({
      degree: qualDegree,
      institution: qualInstitution || 'National Institute of Technology',
      year: qualYear || '2023 - 2027',
      grade: qualGrade || 'First Class'
    });
    setQualDegree('');
    setQualInstitution('');
    setQualYear('');
    setQualGrade('');
    setIsAddQualOpen(false);
  };

  const handleAddExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expRole.trim()) return;
    addWorkExperience({
      role: expRole,
      organization: expOrg || 'Enterprise Systems Lab',
      duration: expDuration || '2024 - 2025',
      description: expDesc || 'Engineered scalable full-stack features and automated workflows.'
    });
    setExpRole('');
    setExpOrg('');
    setExpDuration('');
    setExpDesc('');
    setIsAddExpOpen(false);
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certTitle.trim()) return;
    addCertificate({
      title: certTitle,
      issuer: certIssuer || 'National Accreditation Board',
      date: certDate || '2026',
      credentialId: certId || `CRED-${Date.now().toString().slice(-6)}`
    });
    setCertTitle('');
    setCertIssuer('');
    setCertDate('');
    setCertId('');
    setIsAddCertOpen(false);
  };

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInterestInput.trim()) return;
    if (!user.interests.includes(newInterestInput.trim())) {
      updateInterests([...user.interests, newInterestInput.trim()]);
    }
    setNewInterestInput('');
  };

  const handleRemoveInterest = (interest: string) => {
    updateInterests(user.interests.filter((i) => i !== interest));
  };

  const userEnrolledCourses = courses.filter((c) => user.enrolledCourseIds.includes(c.id));
  const userSubmissions = submissions.filter((s) => s.traineeId === user.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Profile Hero Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-3xl object-cover ring-4 ring-amber-400/80 shadow-md"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                    {user.name}
                  </h1>
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700">
                    Role: {user.role.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Status: {user.status}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {user.email} • {user.organization || 'Institutional Capacity Mission'}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 max-w-xl">
                  {user.bio}
                </p>
              </div>
            </div>

            {/* Trainee Stats Pill */}
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Enrolled Courses</span>
                <span className="text-xl font-black text-slate-900 dark:text-white font-mono">{user.enrolledCourseIds.length}</span>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
              <div className="text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Certifications</span>
                <span className="text-xl font-black text-amber-500 font-mono">{user.certificates.length}</span>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
              <div className="text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Assessments</span>
                <span className="text-xl font-black text-emerald-500 font-mono">{userSubmissions.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: QUALIFICATIONS & WORK EXPERIENCE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Qualifications */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-amber-500" />
                  Academic Qualifications ({user.qualifications.length})
                </h3>
                <button
                  onClick={() => setIsAddQualOpen(true)}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Degree</span>
                </button>
              </div>

              <div className="space-y-3">
                {user.qualifications.map((q) => (
                  <div
                    key={q.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs flex items-start justify-between gap-3"
                  >
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{q.degree}</p>
                      <p className="text-[11px] text-slate-500">{q.institution}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span>{q.year}</span>
                        {q.grade && (
                          <>
                            <span>•</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{q.grade}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeQualification(q.id)}
                      className="text-slate-400 hover:text-rose-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-500" />
                  Work Experience & Internships ({user.workExperience.length})
                </h3>
                <button
                  onClick={() => setIsAddExpOpen(true)}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-3">
                {user.workExperience.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No professional work experience listed yet.</p>
                ) : (
                  user.workExperience.map((we) => (
                    <div
                      key={we.id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs flex items-start justify-between gap-3"
                    >
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{we.role}</p>
                        <p className="text-[11px] text-slate-500">{we.organization} • {we.duration}</p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{we.description}</p>
                      </div>
                      <button
                        onClick={() => removeWorkExperience(we.id)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 2: INTERESTS & SKILLS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Interests & Learning Goals */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Tag className="w-5 h-5 text-amber-500" />
              Trainee Interests & Target Competencies
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Add your learning goals to receive tailored recommendations from the competency mapping engine.
            </p>

            <form onSubmit={handleAddInterest} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="e.g. Distributed Consensus, Bedrock RAG, Quantum..."
                value={newInterestInput}
                onChange={(e) => setNewInterestInput(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-xs"
              >
                Add
              </button>
            </form>

            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5"
                >
                  <span>{interest}</span>
                  <button
                    onClick={() => handleRemoveInterest(interest)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Certified Skills Offered */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-emerald-500" />
              Verified Skills & Endorsements
            </h3>
            <div className="space-y-2.5">
              {user.skillsOffered.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{s.name}</span>
                    <span className="text-[10px] text-slate-400">{s.category} • Level: {s.level}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold font-mono text-[10px]">
                    ★ {s.endorsements} Endorsements
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SECTION 3: CERTIFICATES & CREDENTIALS */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-amber-500" />
              Official Certificates & Verifiable Micro-Credentials ({user.certificates.length})
            </h3>
            <button
              onClick={() => setIsAddCertOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Certificate</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user.certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                    Certified Credential
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white leading-snug">{cert.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{cert.issuer} • Issued {cert.date}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-2">ID: {cert.credentialId}</p>
                </div>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-700">
                  <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Valid
                  </span>
                  <button
                    onClick={() => removeCertificate(cert.id)}
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: ENROLLED COURSES & ASSESSMENT PERFORMANCE */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            Currently Enrolled Curricula ({userEnrolledCourses.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userEnrolledCourses.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">{c.subject}</span>
                  <h4 className="font-bold text-slate-900 dark:text-white">{c.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Instructor: {c.trainerName} • {c.duration}</p>
                </div>
                <Link
                  href="/courses"
                  className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-[11px] hover:bg-amber-400 shrink-0"
                >
                  Continue →
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODAL: ADD QUALIFICATION */}
      {isAddQualOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
            <button onClick={() => setIsAddQualOpen(false)} className="absolute top-4 right-4 text-slate-400">✕</button>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Add Academic Qualification</h3>
            <form onSubmit={handleAddQual} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Degree (e.g. B.Tech Computer Science)"
                value={qualDegree}
                onChange={(e) => setQualDegree(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                required
                placeholder="University / Institution"
                value={qualInstitution}
                onChange={(e) => setQualInstitution(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Passing Years (e.g. 2023 - 2027)"
                  value={qualYear}
                  onChange={(e) => setQualYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="CGPA or Grade (e.g. 8.9 / 10)"
                  value={qualGrade}
                  onChange={(e) => setQualGrade(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs mt-3 shadow-md"
              >
                Save Qualification to Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD WORK EXPERIENCE */}
      {isAddExpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
            <button onClick={() => setIsAddExpOpen(false)} className="absolute top-4 right-4 text-slate-400">✕</button>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Add Work Experience</h3>
            <form onSubmit={handleAddExp} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Role / Title (e.g. Software Engineer Intern)"
                value={expRole}
                onChange={(e) => setExpRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                required
                placeholder="Company / Organization"
                value={expOrg}
                onChange={(e) => setExpOrg(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Duration (e.g. May 2025 - Aug 2025)"
                value={expDuration}
                onChange={(e) => setExpDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              <textarea
                rows={2}
                placeholder="Key responsibilities and technical tools..."
                value={expDesc}
                onChange={(e) => setExpDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              ></textarea>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs mt-3 shadow-md"
              >
                Save Experience to Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CERTIFICATE */}
      {isAddCertOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl">
            <button onClick={() => setIsAddCertOpen(false)} className="absolute top-4 right-4 text-slate-400">✕</button>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Add Certified Credential</h3>
            <form onSubmit={handleAddCert} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Certificate Title (e.g. AWS Solutions Architect)"
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                required
                placeholder="Issuing Organization (e.g. AWS, Coursera, NPTEL)"
                value={certIssuer}
                onChange={(e) => setCertIssuer(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Issue Date / Year"
                  value={certDate}
                  onChange={(e) => setCertDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Credential ID"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs mt-3 shadow-md"
              >
                Save Certificate
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
