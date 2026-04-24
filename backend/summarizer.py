"""
summarizer.py — BART summarization pipeline wrapper.
Uses sshleifer/distilbart-cnn-12-6 (lightweight, 307M params).
"""
from transformers import pipeline

# Load model once at module level — singleton pattern
_summarizer = None

MODEL_NAME = "sshleifer/distilbart-cnn-12-6"

# Length presets: (min_length, max_length)
LENGTH_PRESETS = {
    "short": (30, 60),
    "medium": (60, 130),
    "detailed": (100, 250),
}


def _get_pipeline():
    global _summarizer
    if _summarizer is None:
        print(f"[summarizer] Loading model: {MODEL_NAME}...")
        _summarizer = pipeline("summarization", model=MODEL_NAME)
        print(f"[summarizer] Model loaded successfully.")
    return _summarizer


def summarize(text: str, length: str = "medium") -> str:
    """Generate abstractive summary of the given text.
    
    Args:
        text: Article body text.
        length: One of 'short', 'medium', 'detailed'.
    
    Returns:
        Summary string.
    """
    pipe = _get_pipeline()
    min_len, max_len = LENGTH_PRESETS.get(length, LENGTH_PRESETS["medium"])

    # BART has a 1024 token limit. Truncate long articles.
    # Rough heuristic: 1 token ≈ 0.75 words, so 1024 tokens ≈ 768 words.
    words = text.split()
    if len(words) > 750:
        text = " ".join(words[:750])

    result = pipe(
        text,
        max_length=max_len,
        min_length=min_len,
        do_sample=False,
        truncation=True,
    )
    return result[0]["summary_text"]
