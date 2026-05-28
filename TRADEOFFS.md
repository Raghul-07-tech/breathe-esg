# Architectural Tradeoffs

Given the hyper-accelerated 4-day sprint timeline, the following elements were deliberately deferred to prioritize a functional end-to-end processing pipeline:

1. **Granular User Access Control (RBAC):** We omitted full row-level workspace separation profiles (e.g., separating regional reviewers from corporate auditors), using standard global analyst review overrides instead.
2. **Asynchronous Processing Queues:** Large batch file ingestion executes synchronously rather than throwing jobs into a Celery/Redis cluster background thread.
3. **Automated Grid Factor API Mapping:** Grid emission conversion rates use static regional lookup values rather than querying real-time dynamic environmental APIs.