import { motion } from 'framer-motion';

export default function ErrorAlert({ message, onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="bg-rose-50 border border-rose-200/80 rounded-2xl p-5 shadow-soft-sm"
    >
      <div className="flex items-start gap-3.5">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-rose-100 border border-rose-200/60 flex items-center justify-center">
          <svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-display font-bold text-rose-700 mb-0.5 leading-none">
            Something went wrong
          </h4>
          <p className="text-xs text-rose-600/80 leading-relaxed mt-1">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            aria-label="Dismiss error"
            className="flex-shrink-0 text-rose-400 hover:text-rose-600 transition-colors p-1.5 rounded-xl hover:bg-rose-100"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
}
