# X Varta API Endpoints

This document outlines all API endpoints available through Supabase for the X Varta dashboard.

## 📍 Base URL

```
https://your-project.supabase.co
```

## 🔑 Authentication

All requests require the Supabase auth token in the header:

```
Authorization: Bearer {access_token}
```

The access token is obtained after sign-in and included automatically by the Supabase client.

---

## 👥 Users Endpoints

### GET /rest/v1/users

Fetch current user profile

**Response:**
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "role": "client",
  "company_name": "Acme Corp",
  "avatar_url": "https://...",
  "phone": "+1234567890",
  "created_at": "2026-04-10T10:00:00Z"
}
```

### PATCH /rest/v1/users

Update user profile

**Request:**
```json
{
  "full_name": "Jane Doe",
  "phone": "+1987654321"
}
```

---

## 📁 Projects Endpoints

### GET /rest/v1/projects

List all projects for current user

**Query Parameters:**
- `status=in_progress` - Filter by status
- `order=due_date.asc` - Order by field
- `limit=10&offset=0` - Pagination

**Response:**
```json
[
  {
    "id": "project-uuid",
    "name": "Website Redesign",
    "description": "Modern responsive website",
    "client_id": "user-uuid",
    "status": "in_progress",
    "budget": 15000,
    "spent": 8500,
    "start_date": "2026-01-15",
    "due_date": "2026-05-30",
    "completion_percentage": 65,
    "created_at": "2026-01-15T10:00:00Z"
  }
]
```

### POST /rest/v1/projects

Create new project

**Request:**
```json
{
  "name": "New Project",
  "description": "Project description",
  "budget": 10000,
  "start_date": "2026-04-20",
  "due_date": "2026-06-30"
}
```

### GET /rest/v1/projects/{id}

Get single project with team members

**Response:**
```json
{
  "id": "project-uuid",
  "name": "Website Redesign",
  "budget": 15000,
  "spent": 8500,
  "completion_percentage": 65,
  "project_members": [
    {
      "id": "member-uuid",
      "member_id": "user-uuid",
      "role": "developer",
      "hourly_rate": 150,
      "hours_logged": 56.5
    }
  ]
}
```

### PATCH /rest/v1/projects/{id}

Update project

**Request:**
```json
{
  "status": "completed",
  "completion_percentage": 100,
  "spent": 14800
}
```

### DELETE /rest/v1/projects/{id}

Archive/delete project

---

## 👥 Project Members Endpoints

### GET /rest/v1/project_members

List team members for user's projects

**Response:**
```json
[
  {
    "id": "member-uuid",
    "project_id": "project-uuid",
    "member_id": "user-uuid",
    "role": "developer",
    "hourly_rate": 150,
    "hours_logged": 56.5,
    "joined_at": "2026-02-01T10:00:00Z"
  }
]
```

### POST /rest/v1/project_members

Add team member to project

**Request:**
```json
{
  "project_id": "project-uuid",
  "member_id": "user-uuid",
  "role": "developer",
  "hourly_rate": 150
}
```

### PATCH /rest/v1/project_members/{id}

Update team member

**Request:**
```json
{
  "hours_logged": 60,
  "hourly_rate": 165
}
```

---

## ⏱️ Time Entries Endpoints

### GET /rest/v1/time_entries

Get time entries for user's projects

**Query Parameters:**
- `entry_date=gte.2026-04-01&entry_date=lte.2026-04-30` - Date range
- `project_id=eq.project-uuid` - Filter by project
- `billable=eq.true` - Filter by billable status

**Response:**
```json
[
  {
    "id": "entry-uuid",
    "project_id": "project-uuid",
    "member_id": "user-uuid",
    "task_description": "Frontend development",
    "hours_worked": 8,
    "entry_date": "2026-04-10",
    "billable": true,
    "created_at": "2026-04-10T17:00:00Z"
  }
]
```

### POST /rest/v1/time_entries

Log time entry

**Request:**
```json
{
  "project_id": "project-uuid",
  "member_id": "user-uuid",
  "task_description": "Frontend implementation",
  "hours_worked": 8,
  "entry_date": "2026-04-10",
  "billable": true
}
```

### PATCH /rest/v1/time_entries/{id}

Update time entry

### DELETE /rest/v1/time_entries/{id}

Delete time entry

---

## 📊 Reports Endpoints

### GET /rest/v1/reports

Get reports for user's projects

**Query Parameters:**
- `report_type=eq.revenue` - Filter by type
- `period_start=gte.2026-04-01` - Date range

**Response:**
```json
[
  {
    "id": "report-uuid",
    "project_id": "project-uuid",
    "report_type": "revenue",
    "title": "Q1 Revenue Report",
    "period_start": "2026-01-01",
    "period_end": "2026-03-31",
    "data": {
      "total_revenue": 45000,
      "invoiced": 45000,
      "paid": 42000,
      "pending": 3000
    },
    "created_at": "2026-04-01T10:00:00Z"
  }
]
```

### POST /rest/v1/reports

Create new report

**Request:**
```json
{
  "project_id": "project-uuid",
  "report_type": "revenue",
  "title": "Q1 Revenue Report",
  "period_start": "2026-01-01",
  "period_end": "2026-03-31",
  "data": {
    "total_revenue": 45000,
    "paid": 42000
  }
}
```

---

## 💳 Billing Endpoints

### GET /rest/v1/billing

Get invoices for current user

**Query Parameters:**
- `status=eq.pending` - Filter by status
- `due_date=lte.2026-05-01` - Due before date

**Response:**
```json
[
  {
    "id": "billing-uuid",
    "client_id": "user-uuid",
    "invoice_number": "INV-2026-001",
    "project_id": "project-uuid",
    "amount": 5000,
    "tax_amount": 500,
    "total_amount": 5500,
    "status": "pending",
    "billing_date": "2026-04-01",
    "due_date": "2026-05-01",
    "paid_date": null,
    "payment_method": "credit_card"
  }
]
```

### POST /rest/v1/billing

Create new invoice

**Request:**
```json
{
  "project_id": "project-uuid",
  "amount": 10000,
  "tax_amount": 1000,
  "total_amount": 11000,
  "billing_date": "2026-04-10",
  "due_date": "2026-05-10"
}
```

### PATCH /rest/v1/billing/{id}

Update invoice

**Request:**
```json
{
  "status": "paid",
  "paid_date": "2026-04-15",
  "payment_method": "bank_transfer"
}
```

---

## 📋 Activity Log Endpoints

### GET /rest/v1/activity_log

Get activity history

**Query Parameters:**
- `project_id=eq.project-uuid` - Filter by project
- `created_at=gte.2026-04-01` - Recent activities
- `limit=50&order=created_at.desc` - Latest first

**Response:**
```json
[
  {
    "id": "activity-uuid",
    "user_id": "user-uuid",
    "project_id": "project-uuid",
    "action": "updated",
    "entity_type": "project",
    "entity_id": "project-uuid",
    "changes": {
      "status": "in_progress",
      "completion_percentage": 65
    },
    "created_at": "2026-04-10T15:30:00Z"
  }
]
```

---

## 🔍 Search & Filter Syntax

### Date Range Filters
```
created_at=gte.2026-01-01&created_at=lte.2026-12-31
```

### Exact Match
```
status=eq.completed
```

### Numeric Range
```
budget=gte.10000&budget=lte.50000
```

### Multiple Values
```
status=in.(in_progress,completed)
```

### Ordering
```
order=due_date.asc
order=created_at.desc
```

### Pagination
```
limit=10&offset=0
limit=20&offset=20
```

---

## 🔄 Real-time Subscriptions

Subscribe to real-time updates using Supabase client:

```typescript
const subscription = supabase
  .from('projects')
  .on('*', (payload) => {
    console.log('Change:', payload)
  })
  .subscribe()

// Unsubscribe
subscription.unsubscribe()
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid input",
  "details": "Field 'email' is required"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid or expired token"
}
```

### 403 Forbidden (RLS)
```json
{
  "message": "Policy violation"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "message": "Internal server error"
}
```

---

## 📝 Rate Limits

- **Free tier**: 50,000 requests/day
- **Pro tier**: Unlimited (with fair use policy)
- **Rate limit headers**: Included in response

---

## 🧪 Testing Endpoints

Use REST client or Postman:

```
Authorization: Bearer {your_token}
```

Example with cURL:
```bash
curl -H "Authorization: Bearer token" \
  "https://your-project.supabase.co/rest/v1/projects"
```
