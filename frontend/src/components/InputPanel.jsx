import { useState } from 'react';
import { motion } from 'framer-motion';

const URL_REGEX = /^https?:\/\/.+\..+/i;
const LENGTH_OPTIONS = [
  {
    value: 'short',
    label: 'Short',
    desc: '~2 sentences',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    value: 'medium',
    label: 'Medium',
    desc: '~4 sentences',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    value: 'detailed',
    label: 'Detailed',
    desc: '~6–8 sentences',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h6" />
      </svg>
    ),
  },
];

export default function InputPanel({ onSubmit, isLoading }) {
  const [inputType, setInputType] = useState('url');
  const [content, setContent] = useState('');
  const [length, setLength] = useState('medium');
  const [urlError, setUrlError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrlError('');
    if (!content.trim()) return;
    if (inputType === 'url' && !URL_REGEX.test(content.trim())) {
      setUrlError('Please enter a valid URL starting with http:// or https://');
      return;
    }
    onSubmit({ input_type: inputType, content: content.trim(), length });
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const isValid = content.trim() && (inputType === 'text' || URL_REGEX.test(content.trim()));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="card p-6 sm:p-7"
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-brand-glow flex-shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-display font-bold text-ink leading-none">Enter Article</h2>
          <p className="text-[11px] text-ink-muted mt-0.5">Paste a URL or the article text directly</p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="relative flex gap-1 p-1 bg-slate-100/90 rounded-2xl mb-6 border border-slate-200/50">
        <motion.div
          className="absolute top-1 bottom-1 rounded-xl bg-white shadow-soft"
          animate={{ left: inputType === 'url' ? '4px' : '50%', width: 'calc(50% - 6px)' }}
          transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        />
        {[
          { type: 'url', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1', label: 'Paste URL' },
          { type: 'text', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', label: 'Paste Text' },
        ].map(({ type, icon, label }) => (
          <button
            key={type}
            type="button"
            onClick={() => { setInputType(type); setContent(''); setUrlError(''); }}
            className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-200 ${
              inputType === type ? 'text-brand-600' : 'text-ink-secondary hover:text-ink'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
            </svg>
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Input area */}
        <div className="mb-6">
          {inputType === 'url' ? (
            <>
              <div className="relative group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${urlError ? 'text-rose-400' : 'text-ink-muted group-focus-within:text-brand-500'}`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <input
                  id="url-input"
                  type="url"
                  value={content}
                  onChange={(e) => { setContent(e.target.value); setUrlError(''); }}
                  placeholder="https://www.bbc.com/news/article..."
                  className={`input-field pl-11 pr-4 ${urlError ? 'border-rose-400/70 bg-rose-50/30 focus:border-rose-500 focus:shadow-[0_0_0_4px_rgba(225,29,72,0.08)]' : ''}`}
                  disabled={isLoading}
                />
                {content && !urlError && (
                  <button
                    type="button"
                    onClick={() => setContent('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink p-1 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              {urlError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-rose-600 flex items-center gap-1.5 font-medium"
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {urlError}
                </motion.p>
              )}
            </>
          ) : (
            <div className="relative">
              <textarea
                id="text-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste the full article text here..."
                rows={7}
                className="input-field resize-none leading-relaxed"
                disabled={isLoading}
              />
              {content && (
                <div className="flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={() => setContent('')}
                    className="text-[11px] text-ink-muted hover:text-rose-500 font-medium transition-colors"
                  >
                    Clear
                  </button>
                  <div className="flex gap-3 text-[11px] text-ink-muted font-mono">
                    <span>{wordCount} words</span>
                    <span className="text-ink-faint">·</span>
                    <span>{content.length} chars</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Length picker */}
        <div className="mb-6">
          <label className="block text-[10px] font-bold text-ink-muted uppercase tracking-[0.12em] mb-3">
            Summary Length
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {LENGTH_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setLength(opt.value)}
                className={`relative flex flex-col items-center gap-1.5 py-3.5 rounded-2xl border-2 transition-all duration-200 ${
                  length === opt.value
                    ? 'chip-active border-brand-200 shadow-soft-sm'
                    : 'chip-inactive'
                }`}
              >
                {length === opt.value && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-500" />
                )}
                <span className={length === opt.value ? 'text-brand-600' : 'text-ink-muted'}>
                  {opt.icon}
                </span>
                <span className="font-bold text-[13px] leading-none">{opt.label}</span>
                <span className="text-[10px] opacity-60 leading-none">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isLoading || !content.trim()}
          whileHover={{ scale: isLoading || !content.trim() ? 1 : 1.008 }}
          whileTap={{ scale: isLoading || !content.trim() ? 1 : 0.985 }}
          className="btn-primary w-full py-4 text-[15px] flex items-center justify-center gap-2.5 tracking-wide"
        >
          {isLoading ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Summarizing…
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Summarize Article
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
