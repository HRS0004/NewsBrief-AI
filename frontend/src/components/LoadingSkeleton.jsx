import { motion } from 'framer-motion';

export default function LoadingSkeleton() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="card p-6 sm:p-7">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="skeleton-block h-5 w-3/4 mb-2" />
          <div className="skeleton-block h-4 w-28 rounded-full" />
        </div>
        <div className="skeleton-block h-7 w-24 rounded-full ml-4" />
      </div>

      <div className="p-5 bg-slate-50/70 rounded-2xl border border-slate-100 mb-5">
        <div className="skeleton-block h-3.5 w-full mb-3" />
        <div className="skeleton-block h-3.5 w-full mb-3" />
        <div className="skeleton-block h-3.5 w-5/6 mb-3" />
        <div className="skeleton-block h-3.5 w-4/5 mb-3" />
        <div className="skeleton-block h-3.5 w-2/3" />
      </div>

      <div className="flex gap-2 mb-5">
        <div className="skeleton-block h-6 w-32 rounded-lg" />
        <div className="skeleton-block h-6 w-28 rounded-lg" />
      </div>

      <div className="flex gap-2 mb-6">
        {[16, 20, 14, 18].map((w, i) => (
          <div key={i} className="skeleton-block h-7 rounded-xl" style={{ width: `${w * 4}px` }} />
        ))}
      </div>

      <div className="flex gap-2.5">
        <div className="skeleton-block h-12 flex-1 rounded-xl" />
        <div className="skeleton-block h-12 flex-1 rounded-xl" />
      </div>

      <div className="flex items-center justify-center gap-2.5 mt-6 text-ink-muted">
        <div className="relative w-5 h-5">
          <div className="absolute inset-0 rounded-full border-2 border-brand-200" />
          <div className="absolute inset-0 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
        </div>
        <span className="text-xs font-medium">Analyzing article with AI...</span>
      </div>
    </motion.div>
  );
}
