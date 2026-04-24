"""
scraper.py — Article scraping with newspaper3k + trafilatura fallback.
"""
import newspaper
import trafilatura


def scrape_article(url: str) -> dict:
    """Scrape article title and body text from a URL.
    
    Uses newspaper3k first, falls back to trafilatura if it fails.
    Returns dict with title, text, source_url.
    """
    result = _try_newspaper(url)
    if result and len(result.get("text", "").split()) > 30:
        return result

    result = _try_trafilatura(url)
    if result and len(result.get("text", "").split()) > 30:
        return result

    raise ValueError(
        "Could not extract article content from this URL. "
        "The site may be paywalled or blocking scrapers. "
        "Try pasting the article text directly."
    )


def _try_newspaper(url: str) -> dict | None:
    try:
        article = newspaper.Article(url)
        article.download()
        article.parse()
        if not article.text:
            return None
        return {
            "title": article.title or "Untitled Article",
            "text": article.text,
            "source_url": url,
        }
    except Exception:
        return None


def _try_trafilatura(url: str) -> dict | None:
    try:
        downloaded = trafilatura.fetch_url(url)
        if not downloaded:
            return None
        text = trafilatura.extract(downloaded)
        metadata = trafilatura.extract(downloaded, output_format="json", include_comments=False)
        title = "Untitled Article"
        if metadata:
            import json
            meta = json.loads(metadata)
            title = meta.get("title", title)
        if not text:
            return None
        return {
            "title": title,
            "text": text,
            "source_url": url,
        }
    except Exception:
        return None
