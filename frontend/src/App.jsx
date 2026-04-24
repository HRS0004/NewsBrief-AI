import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import InputPanel from './components/InputPanel';
import SummaryCard from './components/SummaryCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorAlert from './components/ErrorAlert';
import HistoryPanel from './components/HistoryPanel';
import { postSummarize } from './api/summarize';

const MAX_HISTORY = 5;

export default function App() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleSubmit = async (payload) => {
    setLoading(true);
    setError(null);
    setSummary(null);

    try {
      const data = await postSummarize(payload);
      const result = {
        ...data,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setSummary(result);
      setHistory((prev) => [result, ...prev].slice(0, MAX_HISTORY));
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'Failed to summarize. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (item) => {
    setSummary(item);
    setError(null);
    setHistoryOpen(false);
  };

  return (
    <div className="min-h-screen relative">
      {/* Decorative background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-400/[0.06] rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/2 -left-48 w-80 h-80 bg-emerald-600/[0.04] rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* ─── Header ─── */}
      <header className="sticky top-0 z-30 glass-subtle">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Logo mark */}
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-brand-glow">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-600 rounded-full border-2 border-white" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-ink tracking-tight">
                NewsBrief<span className="text-gradient">.AI</span>
              </h1>
              <p className="text-[11px] text-ink-muted font-medium -mt-0.5 tracking-wide">
                NLP-Powered Summarizer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {history.length > 0 && (
              <button
                onClick={() => setHistoryOpen(!historyOpen)}
                className="flex items-center gap-2 text-xs font-semibold text-ink-secondary bg-white/60 hover:bg-white border border-slate-200/60 hover:border-brand-200 rounded-xl px-3.5 py-2 transition-all duration-200 hover:text-brand-600"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="hidden sm:inline">History</span>
                <span className="w-5 h-5 rounded-md bg-brand-50 text-brand-600 text-[10px] font-bold flex items-center justify-center">
                  {history.length}
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ─── Main ─── */}
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-7">
          {/* Left column */}
          <div className="flex-1 min-w-0 space-y-6">
            <InputPanel onSubmit={handleSubmit} isLoading={loading} />

            <AnimatePresence mode="wait">
              {error && (
                <ErrorAlert key="error" message={error} onDismiss={() => setError(null)} />
              )}
              {loading && <LoadingSkeleton key="loading" />}
              {!loading && !error && summary && <SummaryCard key="summary" data={summary} />}
              {!loading && !error && !summary && <EmptyState key="empty" />}
            </AnimatePresence>
          </div>

          {/* Right column: history */}
          {history.length > 0 && (
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                <HistoryPanel
                  history={history}
                  onSelect={handleHistorySelect}
                  isOpen={true}
                  onToggle={() => {}}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile history */}
      <div className="lg:hidden">
        <HistoryPanel
          history={history}
          onSelect={handleHistorySelect}
          isOpen={historyOpen}
          onToggle={() => setHistoryOpen(!historyOpen)}
        />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="card p-10 text-center"
    >
      <div className="relative w-20 h-20 mx-auto mb-5">
        <div className="absolute inset-0 bg-brand-100/50 rounded-3xl animate-pulse-soft" />
        <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
          <svg className="w-9 h-9 text-brand-500 animate-float" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
      </div>
      <h3 className="text-lg font-display font-bold text-ink mb-2">Ready to summarize</h3>
      <p className="text-sm text-ink-secondary max-w-sm mx-auto leading-relaxed">
        Paste a news article URL or text above, pick your preferred summary length, and let AI do the reading for you.
      </p>
      <div className="flex items-center justify-center gap-6 mt-6 text-ink-muted">
        <div className="flex items-center gap-1.5 text-xs">
          <svg className="w-3.5 h-3.5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI-powered
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Under 10 seconds
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Private
        </div>
      </div>
    </motion.div>
  );
}
