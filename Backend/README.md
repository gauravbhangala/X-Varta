# X Varta Backend

Complete backend infrastructure for X Varta using Supabase (PostgreSQL).

## 📚 Documentation

- [Setup Guide](./docs/SETUP.md) - How to create and configure Supabase
- [API Reference](./docs/API.md) - All API endpoints
- [Dashboard Integration](./docs/DASHBOARD_INTEGRATION.md) - Connect dashboard to backend
- [Environment Setup](./.env.local.example) - Required environment variables

## 🗄️ Database Schema

### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| **users** | User accounts | id, email, role, company_name |
| **projects** | Client projects | id, name, client_id, budget, status |
| **project_members** | Team assignments | project_id, member_id, role, hours_logged |
| **reports** | Performance reports | project_id, type, data (JSONB) |
| **billing** | Invoices | client_id, amount, status, due_date |
| **time_entries** | Time tracking | project_id, member_id, hours_worked, entry_date |
| **activity_log** | Audit trail | user_id, action, entity_type, changes |

### Schema Files

Located in `supabase/migrations/`:
- `001_initial_schema.sql` - Complete database setup

## 🚀 Quick Start

### 1. Create Supabase Project
```bash
# Go to https://supabase.com
# Create new project
# Save Project ID and Database password
```

### 2. Copy Environment Variables
```bash
# Copy from Supabase dashboard
cp .env.local.example .env.local
# Edit .env.local with your keys
```

### 3. Run Migrations

**Option A: SQL Editor (Easy)**
1. Open Supabase SQL Editor
2. Paste entire content of `supabase/migrations/001_initial_schema.sql`
3. Run

**Option B: Supabase CLI (Recommended)**
```bash
npm install -g supabase
supabase login
supabase link --project-ref your-project-id
supabase migration up
```

### 4. Create Test User
In Supabase **Auth** section:
- Add user: `admin@xvarta.com`
- Auto-confirm: ✓
- Create

### 5. Connect Dashboard
See [Dashboard Integration Guide](./docs/DASHBOARD_INTEGRATION.md)

## 🔐 Security

### Row-Level Security (RLS)
✅ All tables have RLS enabled
✅ Users see only their own data
✅ Admins have full access
✅ Server-side enforcement

### Authentication
✅ Email/password login
✅ UUID-based user IDs
✅ JWT tokens with expiry
✅ Session management

### API Keys
- **Anon Key**: Client-side, limited permissions
- **Service Key**: Server-side admin, full permissions

## 📊 Reports Data Structure

Reports use JSONB for flexible data. Examples:

**Revenue Report**
```json
{
  "total_revenue": 45000,
  "invoiced": 45000,
  "paid": 42000,
  "pending": 3000,
  "by_month": {
    "jan": 15000,
    "feb": 15000,
    "mar": 15000
  }
}
```

**Time Tracking Report**
```json
{
  "total_hours": 240,
  "billable_hours": 200,
  "by_member": {
    "dev1": 80,
    "dev2": 160
  }
}
```

## 📡 API Integration

### With Dashboard
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Fetch projects
const { data } = await supabase
  .from('projects')
  .select('*')
```

### With Landing Page
Dashboard integration optional. Can use for:
- Contact form submissions
- Blog/content management
- SEO/metadata

## 🔄 Real-time Features

Subscribe to live updates:

```typescript
supabase
  .from('projects')
  .on('*', payload => {
    console.log('Change:', payload)
  })
  .subscribe()
```

Supported for:
- Projects updates
- Billing changes
- Time entries
- Team activity

## 🌍 Deployment

### Supabase Hosting
- Automatically included
- No extra setup needed
- Scales automatically

### Dashboard Deployment
1. Push code to Git
2. Connect to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## 📈 Scaling Considerations

**Free Tier Limits**
- 500 MB database
- 2 GB bandwidth/month
- 50,000 requests/day
- Sufficient for MVP/testing

**Pro Tier** ($25/month)
- 8 GB database
- 250 GB bandwidth/month
- Unlimited requests
- Good for production

**Enterprise**
- Custom resources
- Dedicated support
- SLA guarantees

## 🐛 Troubleshooting

### "Permission denied" on queries
- Check RLS policies are correct
- Verify user role in database
- Test with SQL editor first

### Authentication failures
- Verify email/password credentials
- Check user exists in auth.users
- Ensure profile row exists in public.users

### Connection errors
- Verify URL is correct (no typos)
- Check API key is valid
- Ensure Supabase project isn't paused

## 📞 Support Resources

- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

## 📝 Roadmap

- [ ] Database migrations complete
- [ ] Auth configured
- [ ] Dashboard connected
- [ ] Real-time subscriptions
- [ ] File storage setup
- [ ] Email notifications
- [ ] Backup strategy
- [ ] Monitoring/alerting
- [ ] Production deployment
- [ ] Performance optimization

## 📄 Files Structure

```
backend/
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql    # Complete schema
├── docs/
│   ├── SETUP.md                      # Setup instructions
│   ├── API.md                        # API endpoints
│   └── DASHBOARD_INTEGRATION.md      # Integration guide
├── .env.local.example                # Env template
└── README.md                         # This file
```

## ✅ Next Steps

1. ✅ Read [Setup Guide](./docs/SETUP.md)
2. ✅ Create Supabase project
3. ✅ Run migrations
4. ✅ Connect dashboard using [Dashboard Integration](./docs/DASHBOARD_INTEGRATION.md)
5. ✅ Test auth and data fetching
6. ✅ Deploy dashboard to Vercel
7. ✅ Monitor logs and metrics

---

**Backend Setup Complete!** Dashboard is ready to integrate. 🚀
