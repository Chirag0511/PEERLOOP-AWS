'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Sparkles, RefreshCw, ArrowRightLeft, AlertCircle } from 'lucide-react';
import { MentorCard } from '@/components/MentorCard';
import { performSemanticMatch } from '@/lib/bedrock';
import { SemanticMatchResult } from '@/types';

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialOffering = searchParams.get('offering') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [offeringQuery, setOfferingQuery] = useState(initialOffering);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);
  const [matchResults, setMatchResults] = useState<SemanticMatchResult[]>([]);
  const [matchSource, setMatchSource] = useState<string>('');

  const categories = [
    'All',
    'Design & Creative',
    'Music & Arts',
    'Languages & Communication',
    'Engineering & 3D',
    'Tech & Code',
    'Academics & Analytics'
  ];

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    try {
      const q = searchQuery.trim() || 'Acoustic Guitar Video Editing UI Design';
      const res = await performSemanticMatch(q, offeringQuery);
      setMatchResults(res.results);
      setMatchSource(res.source);
    } catch (err) {
      console.error('Semantic search failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const filteredResults = matchResults.filter((item) => {
    const student = item.student;
    if (selectedCategory === 'All') return true;
    return student.skillsOffered.some((s) => s.category === selectedCategory);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Discover Skill Barters
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Search for any skill you want to learn: Guitar, Video Editing, French, SolidWorks, or UI/UX.
        </p>
      </div>

      {/* Clean Minimal Search Form */}
      <form onSubmit={handleSearch} className="mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5">
          
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="What do you want to learn? (e.g., 'Acoustic guitar', 'Premiere Pro', 'German')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="relative sm:w-64">
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="What you can teach (0-cost swap)"
              value={offeringQuery}
              onChange={(e) => setOfferingQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-amazon-orange hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shrink-0"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Find Barter</span>
              </>
            )}
          </button>

        </div>

        {/* Minimal Category Pills */}
        <div className="flex flex-wrap gap-1 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </form>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-2 border-b border-slate-900">
        <span>Showing {filteredResults.length} campus peers</span>
        {matchSource && <span>Matched via {matchSource}</span>}
      </div>

      {/* Grid of Minimal Cards */}
      {filteredResults.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
          <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-white">No exact barter partners found</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Try broader keywords like "Music", "Video", or "Languages".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResults.map((result) => (
            <MentorCard
              key={result.student.id}
              student={result.student}
              matchScore={result.matchScore}
              aiMatchReason={result.aiMatchReason}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-slate-400 text-xs">
        Loading Barter Discoveries...
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
