# X Varta Database Schema Overview

## 📊 Entity Relationship Diagram

```
┌─────────────────┐
│     auth.users  │ (Supabase managed)
│   (Built-in)    │
└────────┬────────┘
         │ links to
         │
┌────────▼────────────────────────┐
│       public.users              │
├─────────────────────────────────┤
│ id (UUID)                       │
│ email (TEXT)                    │
│ full_name (TEXT)                │
│ role (user_role enum)           │◄──┐
│   - admin                       │   │
│   - client                      │   │
│   - team_member                 │   │
│ company_name (TEXT)             │   │
│ avatar_url (TEXT)               │   │
│ phone (TEXT)                    │   │
│ status (TEXT)                   │   │
└────────┬──────────────────────────┘  │
         │ owner_of                    │
         │                            │
┌────────▼──────────────────────────┐ │
│      public.projects             │ │
├───────────────────────────────────┤ │
│ id (UUID) PK                      │ │
│ name (TEXT)                       │ │
│ description (TEXT)                │ │
│ client_id (UUID) FK ─────────────────┘
│ status (project_status enum)      │
│   - planning                      │
│   - in_progress                   │
│   - on_hold                       │
│   - completed                     │
│   - archived                      │
│ budget (DECIMAL)                  │
│ spent (DECIMAL)                   │
│ start_date (DATE)                 │
│ due_date (DATE)                   │
│ completion_percentage (INT)       │
└────────┬──────────────────────────┘
         │ has_members
         │ generates
         │ requires_billing
         │
    ┌────┴─────────────────────────────────────────┬──────────────────┬──────────────┐
    │                                              │                  │              │
┌───▼────────────────────────────┐  ┌──────────────▼──────────────┐  │    ...       │
│   public.project_members       │  │   public.reports           │  │              │
├────────────────────────────────┤  ├───────────────────────────┤  │              │
│ id (UUID) PK                   │  │ id (UUID) PK              │  │              │
│ project_id (UUID) FK ──┐       │  │ project_id (UUID) FK  ●  │  │              │
│ member_id (UUID) FK ───┼──┐    │  │ report_type enum  ────┐  │  │              │
│ role (TEXT)            │  │    │  │   - revenue           │  │  │              │
│   - manager            │  │    │  │   - time_tracking     │  │  │              │
│   - developer          │  │    │  │   - project_status    │  │  │              │
│   - designer           │  │    │  │   - team_performance  │  │  │              │
│   - consultant         │  │    │  │ title (TEXT)          │  │  │              │
│ hourly_rate (DECIMAL)  │  │    │  │ data (JSONB) ◄────────┘  │  │              │
│ hours_logged (DECIMAL) │  │    │  │ period_start (DATE)       │  │              │
└────────────────────────┘  │    │  │ period_end (DATE)         │  │              │
                             │    │  │ generated_by (UUID) FK    │  │              │
                             │    │  └──────────────────────────┘  │              │
                             │    │                                │              │
                        ┌────┘    │  ┌──────────────────────────┐  │              │
                        │         └──┤  public.time_entries     │  │              │
                        │            ├──────────────────────────┤  │              │
                        │            │ id (UUID) PK             │  │              │
    ┌───────────────────┼────────────┤ project_id (UUID) FK ●  │  │              │
    │                   │            │ member_id (UUID) FK  ●  │  │              │
    │                   │            │ task_description (TEXT)  │  │              │
    │                   │            │ hours_worked (DECIMAL)   │  │              │
    │                   │            │ entry_date (DATE)        │  │              │
    │                   │            │ billable (BOOLEAN)       │  │              │
    │                   │            └──────────────────────────┘  │              │
    │                   │                                           │              │
    │                   │            ┌──────────────────────────┐  │              │
    │                   │         ┌──┤  public.billing         │  │              │
    │                   │         │  ├──────────────────────────┤  │              │
    │                   │         │  │ id (UUID) PK             │  │              │
    │                   │         │  │ client_id (UUID) FK ────┼──────┐          │
    │                   │         │  │ invoice_number (TEXT)    │  │   │          │
    │                   │         │  │ project_id (UUID) FK ──┐ │  │   │          │
    │                   └─────────┼──┤ amount (DECIMAL)        │ │  │   │          │
    │                            │  │ tax_amount (DECIMAL)    │ │  │   │          │
    │                            │  │ total_amount (DECIMAL)  │ │  │   │          │
    │                            │  │ status (TEXT)           │ │  │   │          │
    │                            │  │   - draft               │ │  │   │          │
    │                            │  │   - sent                │ │  │   │          │
    │                            │  │   - pending             │ │  │   │          │
    │                            │  │   - paid                │ │  │   │          │
    │                            │  │   - overdue             │ │  │   │          │
    │                            │  │ billing_date (DATE)     │ │  │   │          │
    │                            │  │ due_date (DATE)         │ │  │   │          │
    │                            │  │ paid_date (DATE)        │ │  │   │          │
    │                            │  │ payment_method (TEXT)   │ │  │   │          │
    │                            └──┤◄─ project_id ──────────┐│  │   │          │
    │                               └──────────────────────────┘│  │   │          │
    │                                                            │  │   │          │
    └────────────────────────────────────────────────────────────┘  │   │          │
                                                                     │   │          │
    ┌────────────────────────────────────────────────────────────────┘   │          │
    │                                                                     │          │
┌───▼──────────────────────────────────────────────────────────────┐  │          │
│       public.activity_log                                        │  │          │
├────────────────────────────────────────────────────────────────┤  │          │
│ id (UUID) PK                                                   │  │          │
│ user_id (UUID) FK ─────────────────────────────────────────────────┘          │
│ project_id (UUID) FK ──────────────────────────────────────────────────────────┘
│ action (TEXT)                                                  │
│   - created                                                    │
│   - updated                                                    │
│   - deleted                                                    │
│   - commented                                                  │
│ entity_type (TEXT)                                             │
│   - project                                                    │
│   - report                                                     │
│   - billing                                                    │
│   - time_entry                                                 │
│   - team_member                                                │
│ entity_id (UUID)                                               │
│ changes (JSONB) - What was changed                             │
│ created_at (TIMESTAMP)                                         │
└────────────────────────────────────────────────────────────────┘
```

## 📌 Key Relationships

### One-to-Many
- **users** → **projects** (1 client has many projects)
- **projects** → **project_members** (1 project has many team members)
- **projects** → **reports** (1 project has many reports)
- **projects** → **time_entries** (1 project has many time entries)
- **users** → **billing** (1 client has many invoices)

### Many-to-Many
- **projects** ↔ **users** (through project_members)

## 🔐 Role-Based Access

| Role | Users | Billing | Projects | Team Members | Reports | Time Entries |
|------|-------|---------|----------|--------------|---------|--------------|
| **admin** | View All | View All | View All | View All | View All | View All |
| **client** | Own Only | Own Only | Own Only | Own projects | Own projects | Own projects |
| **team_member** | Own Only | View None | Assigned | Own projects | Own projects | Own projects |

## 📊 Data Types

### Enums
```sql
user_role: admin | client | team_member
project_status: planning | in_progress | on_hold | completed | archived
report_type: revenue | time_tracking | project_status | team_performance
```

### JSONB Fields
Reports use JSONB for flexible schemas:
```json
{
  "revenue_data": {...},
  "time_data": {...},
  "custom_fields": {...}
}
```

## 🔍 Key Indexes

All major lookups are indexed for performance:
- `client_id` - Fast project lookups by client
- `project_id` - Fast member/time entry lookups
- `member_id` - Fast team lookups
- `status` - Fast filtering
- `due_date` - Fast deadline queries
- `entry_date` - Fast time tracking reports

## 💾 Storage Estimates

| Table | Rows (est.) | Size |
|-------|-------------|------|
| users | 100 | < 1 MB |
| projects | 500 | 2 MB |
| project_members | 2,000 | 1 MB |
| billing | 5,000 | 5 MB |
| time_entries | 50,000 | 10 MB |
| reports | 500 | 2 MB |
| activity_log | 100,000 | 30 MB |
| **TOTAL** | **~180,000** | **~50 MB** |

Well within free tier (500 MB).
