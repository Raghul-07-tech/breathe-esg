# Data Model Architecture

### 1. Multi-Tenancy Design
Our schema implements logical multi-tenancy using a tenant foreign key identifier (`organization_id` or `company_id`) indexed across all core operational tables. This guarantees strict data isolation between onboarding enterprise clients while allowing an aggregated single-database architecture fit for global horizontal scaling.

### 2. Scope 1, 2, and 3 Categorization
Data records map strictly against Greenhouse Gas (GHG) Protocol definitions:
- **Scope 1 (Direct):** Fuel consumption fields tracked via direct volume metrics (Liters, Gallons).
- **Scope 2 (Indirect - Owned):** Purchased electricity tracked via utility portal consumption arrays (kWh).
- **Scope 3 (Indirect - Value Chain):** Business travel distances and lifecycle procurement logistics computed dynamically through passenger-kilometer variables.

### 3. Source of Truth & Audit Trail Tracking
To provide institutional compliance grade audits, every row preserves immutable lineage tracking:
- `source_type`: Identity of origin interface (e.g., SAP, UTILITY, TRAVEL).
- `created_at` / `updated_at`: Automated system epoch timestamps.
- `status`: Lifecycle indicators tracking data records through ('PENDING', 'APPROVED', 'REJECTED').
- `modified_by`: Foreign key pointer tracking the internal analyst signature executing state updates.