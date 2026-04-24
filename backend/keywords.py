"""
keywords.py — Keyword extraction using KeyBERT with RAKE fallback.
"""
from keybert import KeyBERT

_kw_model = None


def _get_model():
    global _kw_model
    if _kw_model is None:
        print("[keywords] Loading KeyBERT model...")
        _kw_model = KeyBERT("all-MiniLM-L6-v2")
        print("[keywords] KeyBERT loaded successfully.")
    return _kw_model


def extract_keywords(text: str, top_n: int = 5) -> list[str]:
    """Extract top keywords from article text.
    
    Uses KeyBERT (BERT embeddings + cosine similarity).
    Falls back to simple frequency-based extraction on failure.
    """
    try:
        model = _get_model()
        keywords = model.extract_keywords(
            text,
            keyphrase_ngram_range=(1, 2),
            stop_words="english",
            top_n=top_n,
            use_mmr=True,
            diversity=0.5,
        )
        return [kw[0] for kw in keywords]
    except Exception:
        return _fallback_extraction(text, top_n)


def _fallback_extraction(text: str, top_n: int) -> list[str]:
    """Simple frequency-based keyword extraction as fallback."""
    import re
    from collections import Counter

    stop_words = {
        "the", "a", "an", "is", "are", "was", "were", "be", "been",
        "being", "have", "has", "had", "do", "does", "did", "will",
        "would", "could", "should", "may", "might", "can", "shall",
        "to", "of", "in", "for", "on", "with", "at", "by", "from",
        "as", "into", "through", "during", "before", "after", "and",
        "but", "or", "nor", "not", "so", "yet", "both", "either",
        "neither", "each", "every", "all", "any", "few", "more",
        "most", "other", "some", "such", "no", "only", "own", "same",
        "than", "too", "very", "just", "because", "about", "that",
        "this", "these", "those", "it", "its", "he", "she", "they",
        "we", "you", "i", "me", "him", "her", "us", "them", "my",
        "his", "our", "your", "their", "what", "which", "who",
        "when", "where", "how", "said", "also", "one", "two",
    }
    words = re.findall(r'\b[a-z]{3,}\b', text.lower())
    filtered = [w for w in words if w not in stop_words]
    counter = Counter(filtered)
    return [word for word, _ in counter.most_common(top_n)]
