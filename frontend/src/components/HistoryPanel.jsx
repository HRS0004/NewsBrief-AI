import { motion, AnimatePresence } from 'framer-motion';

export default function HistoryPanel({ history, onSelect, isOpen, onToggle }) {
  if (!history || history.length === 0) return null;

  const PanelContent = () => (
    <div className="lg:card lg:p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display font-bold text-ink flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-100 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          Recent Summaries
        </h3>
        <button
          onClick={onToggle}
          className="text-ink-muted hover:text-ink p-1.5 rounded-xl hover:bg-slate-100 transition-all lg:hidden"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-2">
        {history.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(item)}
            className="w-full text-left p-3.5 rounded-2xl bg-slate-50/80 hover:bg-brand-50/70 border border-slate-100 hover:border-brand-100/80 transition-all duration-200 group"
          >
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-lg bg-white border border-slate-200 group-hover:border-brand-200 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                <svg className="w-2.5 h-2.5 text-ink-muted group-hover:text-brand-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-ink group-hover:text-brand-700 line-clamp-2 leading-snug transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <svg className="w-2.5 h-2.5 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] text-ink-muted font-mono">{item.timestamp}</span>
                  <span className="w-1 h-1 rounded-full bg-ink-faint" />
                  <span className="text-[10px] text-ink-muted font-mono">{item.word_count_summary}w</span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {history.length > 0 && (
        <p className="text-center text-[10px] text-ink-faint mt-4 font-medium">
          Showing last {history.length} {history.length === 1 ? 'summary' : 'summaries'}
        </p>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden lg:block">
        <PanelContent />
      </div>

      {/* Mobile: slide-in drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-30 lg:hidden"
            />
            <motion.aside
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 240 }}
              className="fixed top-0 right-0 h-full w-72 bg-white border-l border-slate-200 shadow-soft-xl z-40 p-5 overflow-y-auto lg:hidden"
            >
              <PanelContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
