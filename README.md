# FraudTrace — Evidence Intelligence & Provenance Graph

**Connect the Evidence. Reveal the Fraud.**

FraudTrace is a web-based prototype developed for the **PITCH BREAK**. It aims to help organize digital evidence, identify duplicate records, highlight suspicious patterns, and visualize connections between evidence and cases.

## About the Project

Digital fraud investigations can involve many different types of evidence, including phone numbers, email addresses, bank accounts, transactions, IP addresses, and suspicious URLs. When this information is scattered across multiple records, identifying relationships can become difficult.

FraudTrace brings these records together in one dashboard and provides a clearer view of possible connections that may require further investigation.

## Features

- **Evidence Management:** Add and organize evidence with case IDs, evidence types, sources, timestamps, and notes.
- **Duplicate Detection:** Identify repeated evidence identifiers across records and flag them for review.
- **Rule-Based Fraud Analysis:** Assign preliminary risk scores using configurable rules and suspicious-pattern indicators.
- **Evidence Provenance Graph:** Visualize relationships between cases and evidence, including repeated identifiers.
- **Case Timeline:** Display evidence chronologically to make the sequence of recorded events easier to review.
- **CSV Export:** Export evidence records for reporting and further analysis.
- **Interactive Dashboard:** View evidence statistics, risk indicators, and investigation records in one place.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure of the dashboard |
| CSS3 | Styling and responsive layout |
| JavaScript | Interactivity, filtering, graph visualization, and API requests |
| Python | Backend processing and evidence analysis |
| Flask | Web server and API endpoints |
| SQLite | Local database for storing evidence |
| CSV | Exporting evidence records |

## Project Structure

```text
FraudTrace/
├── app.py
├── requirements.txt
├── fraudtrace.db
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

**Note:** `fraudtrace.db` is generated automatically when the application starts. It does not need to be included in the repository.

## Getting Started

### Prerequisites

- Python 3.10 or newer
- A web browser
- Visual Studio Code (recommended)

## How to Use

1. Open the FraudTrace dashboard.
2. Enter a case ID and select an evidence type.
3. Add the evidence identifier, source, date, and optional investigation notes.
4. Submit the form to save the evidence.
5. Review the evidence table and preliminary risk scores.
6. Search and filter records to find possible duplicates or suspicious patterns.
7. Explore the provenance graph and chronological timeline.
8. Export the evidence records as a CSV file when required.

## How FraudTrace Works

FraudTrace follows a simple workflow:

**Collect → Store → Analyse → Match → Connect → Visualize**

1. Evidence is entered through the web interface.
2. Flask validates the submitted information.
3. SQLite stores the evidence records.
4. Python checks for repeated identifiers and configured suspicious patterns.
5. JavaScript displays the resulting records, risk indicators, relationships, and timeline.
6. Users can export the records for further review.

## Limitations

FraudTrace is currently a prototype intended for demonstration and learning purposes.

- Risk scores are generated using simple rules and are not predictions from a trained machine-learning model.
- A suspicious indicator does not prove that fraud has occurred.
- Duplicate identifiers require human review because repeated evidence may be relevant to multiple cases.
- The graph displays basic relationships and is not a complete digital-forensics provenance system.
- The application uses a local SQLite database and is not designed for production-scale investigations.
- The prototype does not independently verify evidence authenticity or guarantee chain of custody.

Use fictional or appropriately anonymized data for demonstrations.

## Future Scope

Potential improvements include:

- Machine-learning-based anomaly detection.
- More advanced graph analysis across multiple cases.
- Evidence integrity checks using cryptographic hashes.
- Improved evidence-source tracking and audit logs.
- User authentication and role-based access control.
- Secure deployment and larger-scale database support.

## Team

Developed by:

- Neha
- Pranavi
- Yusra
- Nikita

## Disclaimer

FraudTrace is an educational prototype. Its risk scores and relationship visualizations are intended to support preliminary review and must not be treated as definitive findings of fraud.

---

*FraudTrace — Connect the Evidence. Reveal the Fraud.*
