import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SummaryCard({ data }) {
  const [copied, setCopied] = useState(false);
  const { title, summary, keywords, word_count_original, word_count_summary, source_url } = data;
  const wordsSaved = word_count_original - word_count_summary;
  const percentSaved = word_count_original > 0 ? Math.round((wordsSaved / word_count_original) * 100) : 0;
  const isShorter = percentSaved > 0;

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(summary); } catch {
      const ta = document.createElement('textarea');
      ta.value = summary;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = `${title}\n${'='.repeat(title.length)}\n\nSummary:\n${summary}\n\nKeywords: ${keywords.join(', ')}\n\nOriginal: ${word_count_original} words | Summary: ${word_count_summary} words\n${source_url ? `Source: ${source_url}` : ''}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.slice(0, 40).replace(/[^a-zA-Z0-9]/g, '_')}_summary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="card card-highlight p-6 sm:p-7"
    >
      {/* Top accent bar */}
      <div className="h-1 -mx-6 sm:-mx-7 -mt-6 sm:-mt-7 mb-6 rounded-t-3xl bg-gradient-to-r from-brand-500 via-brand-400 to-emerald-500" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="min-w-0 flex-1">
          {/* Success badge */}
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Summary Ready
            </div>
          </div>
          <h3 className="text-lg font-display font-bold text-ink leading-snug text-balance">{title}</h3>
          {source_url && (
            <a
              href={source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-600 hover:text-brand-700 mt-2 group"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="group-hover:underline">View Original Source</span>
              <svg className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>

        {/* Compression badge */}
        <div className={`badge flex-shrink-0 border text-sm ${
          isShorter
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
            : 'bg-amber-50 text-amber-700 border-amber-200'
        }`}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={
              isShorter
                ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                : 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
            } />
          </svg>
          {isShorter ? `${percentSaved}% shorter` : 'Analyzed'}
        </div>
      </div>

      {/* Summary body */}
      <div className="mb-5 p-5 bg-gradient-to-br from-slate-50 to-brand-50/30 rounded-2xl border border-slate-100/80 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-400 to-brand-600 rounded-l-2xl" />
        <p className="text-[15px] text-ink leading-[1.8] font-body pl-2">{summary}</p>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <div className="flex items-center gap-2 text-[11px] font-mono text-ink-muted bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
          <svg className="w-3 h-3 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-ink-secondary">{word_count_original}</span>
          <svg className="w-3 h-3 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
          <span className="text-brand-600 font-semibold">{word_count_summary} words</span>
        </div>
        {isShorter && (
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            Saved {wordsSaved} words ({percentSaved}%)
          </div>
        )}
      </div>

      {/* Keywords */}
      {keywords?.length > 0 && (
        <div className="mb-6">
          <label className="block text-[10px] font-bold text-ink-muted uppercase tracking-[0.12em] mb-2.5">
            Key Topics
          </label>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-brand-50 text-brand-700 border border-brand-100/80 hover:bg-brand-100 transition-colors cursor-default"
              >
                #{kw}
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="section-divider" />

      {/* Actions */}
      <div className="flex gap-2.5 mt-5">
        <button
          onClick={handleCopy}
          className={`flex-1 py-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 border-2 transition-all duration-200 ${
            copied
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-slate-200 text-ink-secondary hover:border-brand-200 hover:text-brand-600 hover:bg-brand-50/50 hover:shadow-soft-sm'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Summary
            </>
          )}
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 py-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 border-2 border-slate-200 text-ink-secondary hover:border-brand-200 hover:text-brand-600 hover:bg-brand-50/50 hover:shadow-soft-sm transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download .txt
        </button>
      </div>
    </motion.div>
  );
}
