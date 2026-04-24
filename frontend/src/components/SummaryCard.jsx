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
      const ta = document.createElement('textarea'); ta.value = summary;
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = `${title}\n${'='.repeat(title.length)}\n\nSummary:\n${summary}\n\nKeywords: ${keywords.join(', ')}\n\nOriginal: ${word_count_original} words | Summary: ${word_count_summary} words\n${source_url ? `Source: ${source_url}` : ''}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `${title.slice(0, 40).replace(/[^a-zA-Z0-9]/g, '_')}_summary.txt`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="card p-6 sm:p-7 border-brand-100/60">

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <h3 className="text-lg font-display font-bold text-ink leading-snug mb-2">{title}</h3>
          {source_url && (
            <a href={source_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full hover:bg-brand-100 transition-colors">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Source
            </a>
          )}
        </div>
        <div className={`badge flex-shrink-0 border ${
          isShorter ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-200'
        }`}>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={isShorter
              ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              : "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            } />
          </svg>
          {isShorter ? `${percentSaved}% shorter` : 'Analyzed'}
        </div>
      </div>

      {/* Summary body */}
      <div className="mb-5 p-5 bg-slate-50/70 rounded-2xl border border-slate-100">
        <p className="text-[15px] text-ink leading-[1.75] font-body">{summary}</p>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <span className="text-[11px] font-mono text-ink-muted bg-slate-100 px-2.5 py-1 rounded-lg">
          {word_count_original} → {word_count_summary} words
        </span>
        {isShorter && (
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
            Saved {wordsSaved} words
          </span>
        )}
      </div>

      {/* Keywords */}
      {keywords?.length > 0 && (
        <div className="mb-6">
          <label className="block text-[10px] font-bold text-ink-muted uppercase tracking-[0.1em] mb-2">Keywords</label>
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((kw, i) => (
              <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-xl bg-brand-50/60 text-brand-700 border border-brand-100/80">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2.5">
        <button id="copy-btn" onClick={handleCopy}
          className={`flex-1 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border-2 transition-all duration-200 ${
            copied ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-slate-200 text-ink-secondary hover:border-brand-200 hover:text-brand-600 hover:bg-brand-50/50'
          }`}>
          {copied ? (
            <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Copied!</>
          ) : (
            <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>
          )}
        </button>
        <button id="download-btn" onClick={handleDownload}
          className="flex-1 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border-2 border-slate-200 text-ink-secondary hover:border-brand-200 hover:text-brand-600 hover:bg-brand-50/50 transition-all duration-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Download .txt
        </button>
      </div>
    </motion.div>
  );
}
