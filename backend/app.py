"""
app.py — Flask REST API for NewsBrief AI.
Exposes POST /api/summarize and GET /health endpoints.
"""
from flask import Flask, request, jsonify
from flask_cors import CORS

from scraper import scrape_article
from summarizer import summarize
from keywords import extract_keywords

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/api/summarize", methods=["POST"])
def api_summarize():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Request body must be JSON."}), 400

    input_type = data.get("input_type")
    content = data.get("content", "").strip()
    length = data.get("length", "medium")

    if input_type not in ("url", "text"):
        return jsonify({"error": "input_type must be 'url' or 'text'."}), 400

    if not content:
        return jsonify({"error": "content cannot be empty."}), 400

    if length not in ("short", "medium", "detailed"):
        return jsonify({"error": "length must be 'short', 'medium', or 'detailed'."}), 400

    try:
        # Step 1: Get article text
        if input_type == "url":
            article = scrape_article(content)
            title = article["title"]
            text = article["text"]
            source_url = article["source_url"]
        else:
            title = "Pasted Article"
            text = content
            source_url = None

        word_count_original = len(text.split())

        if word_count_original < 30:
            return jsonify({
                "error": "Article is too short to summarize (less than 30 words)."
            }), 400

        # Step 2: Summarize
        summary = summarize(text, length)
        word_count_summary = len(summary.split())

        # Step 3: Extract keywords
        kw_list = extract_keywords(text, top_n=5)

        return jsonify({
            "title": title,
            "summary": summary,
            "keywords": kw_list,
            "word_count_original": word_count_original,
            "word_count_summary": word_count_summary,
            "source_url": source_url,
        }), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 422
    except Exception as e:
        return jsonify({
            "error": f"An unexpected error occurred: {str(e)}"
        }), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
