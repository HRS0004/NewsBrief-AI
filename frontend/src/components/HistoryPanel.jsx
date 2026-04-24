import { motion, AnimatePresence } from 'framer-motion';

export default function HistoryPanel({ history, onSelect, isOpen, onToggle }) {
  if (!history || history.length === 0) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay (mobile) */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-30 lg:hidden" />

            {/* Panel */}
            <motion.aside
              initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 300, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-72 bg-white border-l border-slate-200 shadow-soft-xl z-40 p-5 overflow-y-auto lg:static lg:shadow-none lg:border-0 lg:p-0 lg:h-auto">

              <div className="lg:card lg:p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-display font-bold text-ink flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-brand-50 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Recent
                  </h3>
                  <button onClick={onToggle} className="text-ink-muted hover:text-ink p-1 rounded-lg hover:bg-slate-100 lg:hidden">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2">
                  {history.map((item, i) => (
                    <motion.button key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }} onClick={() => onSelect(item)}
                      className="w-full text-left p-3 rounded-xl bg-slate-50/80 hover:bg-brand-50 border border-slate-100 hover:border-brand-100 transition-all duration-200 group">
                      <p className="text-xs font-semibold text-ink group-hover:text-brand-700 line-clamp-2 leading-snug">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] text-ink-muted font-mono">{item.timestamp}</span>
                        <span className="w-1 h-1 rounded-full bg-ink-faint" />
                        <span className="text-[10px] text-ink-muted font-mono">{item.word_count_summary}w</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
