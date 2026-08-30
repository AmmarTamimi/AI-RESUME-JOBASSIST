'use client';

import { useState } from 'react';
import { Search, Loader2, ExternalLink, Building, MapPin, Clock, Briefcase, DollarSign, Link, ChevronDown, ChevronRight, Copy } from 'lucide-react';

export default function JobTestPage() {
  const [keyword, setKeyword] = useState('software engineer');
  const [location, setLocation] = useState('Pakistan');
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleTest = async () => {
    setLoading(true);
    setError('');
    setJobs([]);
    setDebugInfo(null);

    try {
      const url = `/api/job-search/test?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Search failed');
      }

      setJobs(data.jobs || []);
      setDebugInfo({
        total: data.total,
        searchMetadata: data.searchMetadata,
        pagination: data.pagination,
        rawSample: data.jobs?.[0]?.rawData || null,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to search jobs');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">🔍 Job Search Test</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Test the SerpApi integration and see complete job data</p>
        </div>

        {/* Search Form */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Keyword
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g., software engineer, developer, designer"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleTest()}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Pakistan, Karachi, London"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onKeyDown={(e) => e.key === 'Enter' && handleTest()}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleTest}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                {loading ? 'Searching...' : 'Test Search'}
              </button>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        {debugInfo && (
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300">📊 Search Results</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Total Jobs</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{debugInfo.total}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Query</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {debugInfo.searchMetadata?.query || 'N/A'}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Location</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {debugInfo.searchMetadata?.location || 'N/A'}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Has Pagination</p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {debugInfo.pagination ? '✅ Yes' : '❌ No'}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const json = JSON.stringify(debugInfo, null, 2);
                  const blob = new Blob([json], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'job-search-debug.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>📥 Download Debug</span>
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8 text-red-700 dark:text-red-300">
            <p className="font-medium">❌ Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Results */}
        {jobs.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                📋 Job Results ({jobs.length})
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {jobs.length > 0 ? `Showing ${Math.min(jobs.length, 20)} jobs` : ''}
              </span>
            </div>

            {jobs.map((job, index) => (
              <JobDebugCard
                key={job.id || index}
                job={job}
                index={index}
                isExpanded={expandedJob === job.id}
                onToggle={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                onCopy={copyToClipboard}
                copiedId={copiedId}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !jobs.length && !error && (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-6xl mb-4">🔎</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No jobs found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try searching with different keywords or location
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Job Debug Card Component
function JobDebugCard({ 
  job, 
  index, 
  isExpanded, 
  onToggle, 
  onCopy,
  copiedId 
}: { 
  job: any; 
  index: number; 
  isExpanded: boolean; 
  onToggle: () => void; 
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                #{index + 1}
              </span>
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded truncate max-w-[150px]">
                {job.id?.slice(0, 12)}...
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-2">
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                <Building className="h-4 w-4" />
                {job.company}
              </span>
              {job.location && (
                <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>
              )}
              {job.postedAt && (
                <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <Clock className="h-4 w-4" />
                  {job.postedAt}
                </span>
              )}
              {job.salary && (
                <span className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  <DollarSign className="h-4 w-4" />
                  {job.salary}
                </span>
              )}
              {job.employmentType && (
                <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <Briefcase className="h-4 w-4" />
                  {job.employmentType}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {job.applyUrl && (
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-1"
              >
                Apply <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <button
              onClick={onToggle}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Summary */}
        {job.snippet && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 line-clamp-2">
            {job.snippet}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
          {job.via && <span>Via: {job.via}</span>}
          {job.companyRating && <span>⭐ {job.companyRating} ({job.companyReviewCount || 0} reviews)</span>}
          {job.source && <span>Source: {job.source}</span>}
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="border-t border-slate-200 dark:border-slate-700 p-6 bg-slate-50 dark:bg-slate-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">📄 Full Description</h4>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                  {job.description || 'No description available'}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">🔍 Raw Data</h4>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 overflow-auto max-h-[400px]">
                <pre className="text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                  {JSON.stringify(job.rawData || job, null, 2)}
                </pre>
              </div>
              <button
                onClick={() => onCopy(JSON.stringify(job.rawData || job, null, 2), job.id)}
                className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                {copiedId === job.id ? (
                  <span>✅ Copied!</span>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy JSON
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}