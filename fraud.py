
from flask import Flask, render_template, request, jsonify
import sqlite3
from pathlib import Path
from datetime import datetime

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / "fraudtrace.db"

ALLOWED_TYPES = {
    "Phone",
    "Email",
    "Bank Account",
    "Transaction",
    "URL",
    "IP Address",
    "Social ID",
    "Document",
}

SUSPICIOUS_URL_WORDS = [
    "verify-account",
    "login-secure",
    "claim-prize",
    "free-reward",
    "urgent-payment",
    "account-suspended",
]

SUSPICIOUS_NOTE_WORDS = [
    "impersonation",
    "unauthorized",
    "phishing",
    "reported scam",
]


def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS evidence (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                case_id TEXT NOT NULL,
                evidence_type TEXT NOT NULL,
                value TEXT NOT NULL,
                source TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                notes TEXT DEFAULT '',
                is_duplicate INTEGER DEFAULT 0,
                created_at TEXT NOT NULL
            )
        """)


def calculate_risk(item, repeated_identifier=False):
    """
    Demonstration rules only.
    The score is a review indicator, not a probability of fraud.
    """
    score = 0
    reasons = []

    evidence_type = item["evidence_type"]
    value = item["value"].strip().lower()
    notes = item["notes"].strip().lower()

    if repeated_identifier:
        score += 35
        reasons.append("Identifier appears in multiple records")

    if evidence_type == "URL":
        if any(word in value for word in SUSPICIOUS_URL_WORDS):
            score += 40
            reasons.append("URL contains a configured suspicious phrase")

        if value.startswith("http://"):
            score += 10
            reasons.append("URL uses unencrypted HTTP")

    if any(word in notes for word in SUSPICIOUS_NOTE_WORDS):
        score += 25
        reasons.append("Investigation notes contain a review keyword")

    score = min(score, 100)

    return score, reasons


def get_evidence_records():
    with get_connection() as connection:
        rows = connection.execute("""
            SELECT *
            FROM evidence
            ORDER BY timestamp DESC, id DESC
        """).fetchall()

    records = [dict(row) for row in rows]

    # Count matching identifiers across the stored records.
    identifier_counts = {}

    for item in records:
        key = (
            item["evidence_type"].lower(),
            item["value"].strip().lower()
        )
        identifier_counts[key] = identifier_counts.get(key, 0) + 1

    for item in records:
        key = (
            item["evidence_type"].lower(),
            item["value"].strip().lower()
        )

        repeated = identifier_counts[key] > 1

        item["is_duplicate"] = bool(item["is_duplicate"])
        item["risk_score"], item["risk_reasons"] = calculate_risk(
            item, repeated_identifier=repeated
        )

    return records


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/evidence", methods=["GET"])
def list_evidence():
    return jsonify({
        "evidence": get_evidence_records()
    })


@app.route("/api/evidence", methods=["POST"])
def add_evidence():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({"error": "Please submit valid evidence data."}), 400

    case_id = str(data.get("case_id", "")).strip()
    evidence_type = str(data.get("evidence_type", "")).strip()
    value = str(data.get("value", "")).strip()
    source = str(data.get("source", "")).strip()
    timestamp = str(data.get("timestamp", "")).strip()
    notes = str(data.get("notes", "")).strip()

    if not all([case_id, evidence_type, value, source, timestamp]):
        return jsonify({
            "error": "Fill in the case ID, type, value, source and date."
        }), 400

    if evidence_type not in ALLOWED_TYPES:
        return jsonify({"error": "Please select a valid evidence type."}), 400

    if len(case_id) > 80 or len(value) > 500 or len(source) > 250:
        return jsonify({
            "error": "One or more fields exceed the allowed length."
        }), 400

    if len(notes) > 2000:
        return jsonify({"error": "Notes must be under 2000 characters."}), 400

    try:
        parsed_timestamp = datetime.fromisoformat(timestamp)

        # Store dates in a consistent ISO format.
        timestamp = parsed_timestamp.isoformat(timespec="minutes")
    except ValueError:
        return jsonify({"error": "Please provide a valid date and time."}), 400

    normalized_value = value.strip().casefold()
    normalized_type = evidence_type.casefold()

    with get_connection() as connection:
        existing = connection.execute("""
            SELECT id
            FROM evidence
            WHERE lower(evidence_type) = ?
              AND lower(trim(value)) = ?
            LIMIT 1
        """, (normalized_type, normalized_value)).fetchone()

        is_duplicate = existing is not None

        connection.execute("""
            INSERT INTO evidence (
                case_id,
                evidence_type,
                value,
                source,
                timestamp,
                notes,
                is_duplicate,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            case_id,
            evidence_type,
            value,
            source,
            timestamp,
            notes,
            int(is_duplicate),
            datetime.now().isoformat(timespec="seconds")
        ))

    message = (
        "Evidence saved. Possible duplicate detected; please review."
        if is_duplicate
        else "Evidence saved successfully."
    )

    return jsonify({"message": message}), 201


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "running",
        "application": "FraudTrace"
    })


if __name__ == "__main__":
    initialize_database()
    app.run(debug=True)
