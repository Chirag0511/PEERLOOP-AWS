'use client';

import React, { useState } from 'react';
import {
  Layers,
  Play,
  FileText,
  Presentation,
  Upload,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  User,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { TrainerMaterial, MaterialType } from '@/types';

export default function TrainerLibraryPage() {
  const { user, currentRole, materials, addMaterial } = useAppStore();

  const [activeType, setActiveType] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Video Player Modal State
  const [activeVideo, setActiveVideo] = useState<TrainerMaterial | null>(null);

  // Upload Material Modal State (for Trainers and Admins)
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [uploadTitle, setUploadTitle] = useState<string>('');
  const [uploadSubject, setUploadSubject] = useState<string>('Cloud & DevOps');
  const [uploadType, setUploadType] = useState<MaterialType>('Recorded Lecture');
  const [uploadFormat, setUploadFormat] = useState<'MP4' | 'PDF' | 'PPTX' | 'DOCX'>('MP4');
  const [uploadDurationOrPages, setUploadDurationOrPages] = useState<string>('45 mins');
  const [uploadDescription, setUploadDescription] = useState<string>('');
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const subjects = ['All', 'Cloud & DevOps', 'AI & Data Science', 'Cybersecurity & Governance', 'Tech & Code'];

  const filteredMaterials = materials.filter((m) => {
    const matchType = activeType === 'All' || m.type === activeType;
    const matchSubject = selectedSubject === 'All' || m.subject === selectedSubject;
    const matchSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.trainerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSubject && matchSearch;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMaterial({
      title: uploadTitle,
      subject: uploadSubject,
      type: uploadType,
      trainerId: user.id,
      trainerName: user.name,
      fileFormat: uploadFormat,
      fileSize: uploadFormat === 'MP4' ? '450 MB' : uploadFormat === 'PPTX' ? '18 MB' : '8.4 MB',
      durationOrPages: uploadDurationOrPages,
      resourceLink: '#',
      description: uploadDescription
    });

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setIsUploadOpen(false);
      setUploadTitle('');
      setUploadDescription('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                Central Learning Repository
              </span>
              <span className="text-xs text-slate-500">• Open Knowledge Bank</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Trainer Resource Library
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Access high-definition recorded lectures, presentation slide decks, and reference study materials uploaded directly by accredited trainers and mentors.
            </p>
          </div>

          {/* Upload CTA for Trainers & Admins */}
          {(currentRole === 'trainer' || currentRole === 'admin' || user.role === 'trainer' || user.role === 'admin') && (
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amazon-orange to-amber-500 hover:from-amazon-amber hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0 active:scale-95"
            >
              <Upload className="w-4 h-4" />
              <span>Upload to Trainer Library</span>
            </button>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Material Type Tabs */}
          <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            {['All', 'Recorded Lecture', 'Presentation', 'Study Material'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeType === type
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {type === 'All' ? 'All Resources' : type}
              </button>
            ))}
          </div>

          {/* Subject Pills & Search */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap ${
                    selectedSubject === sub
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((mat) => {
            const isVideo = mat.type === 'Recorded Lecture';
            const isDeck = mat.type === 'Presentation';

            return (
              <div
                key={mat.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge & Format */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                      {mat.subject}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                      {mat.fileFormat} • {mat.fileSize}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 mt-1">
                    <div className={`p-3 rounded-2xl shrink-0 ${
                      isVideo
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                        : isDeck
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {isVideo ? <Play className="w-5 h-5 fill-current" /> : isDeck ? <Presentation className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {mat.title}
                      </h3>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {mat.durationOrPages} • Uploaded {mat.uploadDate}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 line-clamp-3">
                    {mat.description}
                  </p>

                  {/* Trainer Attribution */}
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                    <User className="w-3.5 h-3.5 text-amber-500" />
                    <span>Uploaded by: <strong>{mat.trainerName}</strong></span>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  {isVideo ? (
                    <button
                      onClick={() => setActiveVideo(mat)}
                      className="w-full py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Stream Lecture Recording</span>
                    </button>
                  ) : (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Downloading: "${mat.title}" (${mat.fileFormat} - ${mat.fileSize})`);
                      }}
                      className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-800 dark:text-slate-200 hover:text-amber-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-500" />
                      <span>Download {mat.type} ({mat.fileFormat})</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 text-white">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 flex items-center justify-center text-xs"
            >
              ✕
            </button>

            {/* Simulated High-Res Video Player */}
            <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mb-4 shadow-xl">
                <Play className="w-10 h-10 fill-current ml-1" />
              </div>
              <h3 className="text-lg font-bold max-w-xl text-white">
                {activeVideo.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Faculty Instructor: {activeVideo.trainerName} • Subject: {activeVideo.subject} • {activeVideo.durationOrPages}
              </p>
              <div className="flex items-center gap-3 mt-6">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  1080p HD Stream Active
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs">
                  Trainer Library Cloud Cache
                </span>
              </div>
            </div>

            <div className="p-5 bg-slate-900 flex items-center justify-between text-xs">
              <p className="text-slate-400 max-w-xl text-[11px] truncate">
                {activeVideo.description}
              </p>
              <button
                onClick={() => setActiveVideo(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL FOR TRAINERS & ADMINS */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
            <button
              onClick={() => setIsUploadOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-amber-500" />
              Upload Material to Trainer Library
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Add recorded lectures, slide decks, or study guides for enrolled trainees.
            </p>

            {uploadSuccess ? (
              <div className="p-8 text-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 animate-bounce" />
                <p className="font-bold text-sm">Resource Uploaded & Published to Library!</p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4 mt-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Resource Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Distributed System Reliability & Sharding Workshop"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Resource Type
                    </label>
                    <select
                      value={uploadType}
                      onChange={(e) => {
                        const t = e.target.value as MaterialType;
                        setUploadType(t);
                        if (t === 'Recorded Lecture') {
                          setUploadFormat('MP4');
                          setUploadDurationOrPages('50 mins');
                        } else if (t === 'Presentation') {
                          setUploadFormat('PPTX');
                          setUploadDurationOrPages('45 Slides');
                        } else {
                          setUploadFormat('PDF');
                          setUploadDurationOrPages('60 Pages');
                        }
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Recorded Lecture">Recorded Lecture (Video)</option>
                      <option value="Presentation">Presentation (Slides)</option>
                      <option value="Study Material">Study Material (PDF/Doc)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Subject
                    </label>
                    <select
                      value={uploadSubject}
                      onChange={(e) => setUploadSubject(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Cloud & DevOps">Cloud & DevOps</option>
                      <option value="AI & Data Science">AI & Data Science</option>
                      <option value="Cybersecurity & Governance">Cybersecurity & Governance</option>
                      <option value="Tech & Code">Tech & Code</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      File Format
                    </label>
                    <input
                      type="text"
                      value={uploadFormat}
                      disabled
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                      Duration / Pages
                    </label>
                    <input
                      type="text"
                      value={uploadDurationOrPages}
                      onChange={(e) => setUploadDurationOrPages(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Description & Objectives
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide overview of key concepts taught in this resource..."
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amazon-orange hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Publish to Library</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
