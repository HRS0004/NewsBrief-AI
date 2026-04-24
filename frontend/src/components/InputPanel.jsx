import { useState } from 'react';
import { motion } from 'framer-motion';

const URL_REGEX = /^https?:\/\/.+\..+/i;
const LENGTH_OPTIONS = [
  { value: 'short', label: 'Short', desc: '~2 sentences', icon: '⚡' },
  { value: 'medium', label: 'Medium', desc: '~4 sentences', icon: '📄' },
  { value: 'detailed', label: 'Detailed', desc: '~6-8 sentences', icon: '📋' },
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

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="card p-6 sm:p-7">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
          <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div>
          <h2 className="text-base font-display font-bold text-ink">Enter Article</h2>
          <p className="text-[11px] text-ink-muted">Paste a URL or the article text directly</p>
        </div>
      </div>

      <div className="relative flex gap-1 p-1 bg-slate-100/80 rounded-xl mb-5">
        <motion.div className="absolute top-1 bottom-1 rounded-lg bg-white shadow-soft-sm"
          animate={{ left: inputType === 'url' ? '4px' : '50%', width: 'calc(50% - 6px)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
        {['url', 'text'].map((type) => (
          <button key={type} type="button"
            onClick={() => { setInputType(type); setContent(''); setUrlError(''); }}
            className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
              inputType === type ? 'text-brand-600' : 'text-ink-secondary hover:text-ink'}`}>
            <span className="text-sm">{type === 'url' ? '🔗' : '📝'}</span>
            {type === 'url' ? 'Paste URL' : 'Paste Text'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {inputType === 'url' ? (
          <div className="mb-5">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <input id="url-input" type="url" value={content}
                onChange={(e) => { setContent(e.target.value); setUrlError(''); }}
                placeholder="https://www.bbc.com/news/article..."
                className={`input-field pl-11 ${urlError ? 'border-rose-600/50 bg-rose-50/30' : ''}`}
                disabled={isLoading} />
            </div>
            {urlError && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs text-rose-600 flex items-center gap-1.5 font-medium">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {urlError}
              </motion.p>
            )}
          </div>
        ) : (
          <div className="mb-5">
            <textarea id="text-input" value={content} onChange={(e) => setContent(e.target.value)}
              placeholder="Paste the full article text here..." rows={7}
              className="input-field resize-none" disabled={isLoading} />
            {content && (
              <div className="flex justify-end mt-1.5 gap-3 text-[11px] text-ink-muted font-mono">
                <span>{wordCount} words</span>
                <span>{content.length} chars</span>
              </div>
            )}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-[10px] font-bold text-ink-muted uppercase tracking-[0.1em] mb-2.5">Summary Length</label>
          <div className="grid grid-cols-3 gap-2">
            {LENGTH_OPTIONS.map((opt) => (
              <button key={opt.value} type="button" onClick={() => setLength(opt.value)}
                className={`chip py-3 justify-center flex-col gap-0.5 ${
                  length === opt.value ? 'chip-active shadow-soft-sm' : 'chip-inactive'}`}>
                <span className="text-base leading-none">{opt.icon}</span>
                <span className="font-bold text-[13px]">{opt.label}</span>
                <span className="text-[10px] opacity-60">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.button type="submit" disabled={isLoading || !content.trim()}
          whileHover={{ scale: isLoading || !content.trim() ? 1 : 1.008 }}
          whileTap={{ scale: isLoading || !content.trim() ? 1 : 0.985 }}
          className="btn-primary w-full py-4 text-[15px] flex items-center justify-center gap-2.5">
          {isLoading ? (
            <><svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>Summarizing...</>
          ) : (
            <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>Summarize Article</>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
