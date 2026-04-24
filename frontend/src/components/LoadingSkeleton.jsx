import { motion } from 'framer-motion';

export default function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card p-6 sm:p-7 overflow-hidden"
    >
      {/* Top accent bar skeleton */}
      <div className="h-1 -mx-6 sm:-mx-7 -mt-6 sm:-mt-7 mb-6 skeleton-block rounded-t-3xl" />

      {/* Badge + title */}
      <div className="mb-5">
        <div className="skeleton-block h-5 w-28 rounded-full mb-3" />
        <div className="skeleton-block h-5 w-full mb-2" />
        <div className="skeleton-block h-5 w-4/5 mb-3" />
        <div className="skeleton-block h-4 w-32 rounded-full mt-1" />
      </div>

      {/* Summary body */}
      <div className="p-5 bg-slate-50/70 rounded-2xl border border-slate-100 mb-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full skeleton-block rounded-l-2xl" />
        <div className="pl-2 space-y-2.5">
          <div className="skeleton-block h-3.5 w-full" />
          <div className="skeleton-block h-3.5 w-full" />
          <div className="skeleton-block h-3.5 w-5/6" />
          <div className="skeleton-block h-3.5 w-4/5" />
          <div className="skeleton-block h-3.5 w-2/3" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-2 mb-5">
        <div className="skeleton-block h-7 w-36 rounded-xl" />
        <div className="skeleton-block h-7 w-40 rounded-xl" />
      </div>

      {/* Keywords */}
      <div className="mb-3">
        <div className="skeleton-block h-3 w-20 mb-3" />
        <div className="flex gap-1.5 flex-wrap">
          {[60, 80, 52, 72, 64].map((w, i) => (
            <div key={i} className="skeleton-block h-7 rounded-xl" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100 my-5" />

      {/* Actions */}
      <div className="flex gap-2.5">
        <div className="skeleton-block h-12 flex-1 rounded-2xl" />
        <div className="skeleton-block h-12 flex-1 rounded-2xl" />
      </div>

      {/* Loading indicator */}
      <div className="flex items-center justify-center gap-3 mt-6 text-ink-muted">
        <div className="relative w-5 h-5 flex-shrink-0">
          <div className="absolute inset-0 rounded-full border-2 border-brand-100" />
          <div className="absolute inset-0 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
        </div>
        <span className="text-xs font-medium text-ink-secondary">
          Analyzing article with AI<span className="animate-pulse">…</span>
        </span>
      </div>
    </motion.div>
  );
}
