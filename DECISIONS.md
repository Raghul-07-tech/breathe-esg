# Architectural Decisions

### 1. Resolved Ambiguities
- **Data Density:** Real-world corporate travel files provide messy granular details (e.g., flight seat configurations, connection layovers). We resolved this ambiguity by stripping outputs down to total segment mileage metrics to prioritize scalable carbon conversion formulas.
- **Utility Multi-Factor Gaps:** Utility providers format invoices differently across municipal grids. We standardized incoming variables into a uniform metric of Kilowatt-hours (kWh) at ingestion time.

### 2. Handled Subsets vs. Ignored Components
- **Handled:** Standard flat-file relational outputs from SAP accounting matrices, utility portal metric extractions, and corporate travel agency ledger exports.
- **Ignored:** Unstructured text attachments, loose PDF receipt uploads, and peripheral metadata (e.g., invoice payment terms, traveler meal preferences).