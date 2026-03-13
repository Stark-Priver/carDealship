# Bingwa Magari - Production App

This project is a production-ready Next.js + Supabase car marketplace with:

- Public vehicle browsing and details
- Inquiry workflow
- Buyer order placement and order tracking
- Seller sell-request submission with photo uploads to Supabase Storage
- Import request submission
- Contact message submission
- Role-based dashboard for ADMIN, STAFF, BUYER, and SELLER
- Supabase Row Level Security (RLS) policies and storage policies

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth, Postgres, Storage)

## 1. Environment Setup

Copy `.env.example` to `.env.local` and fill values:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://bingwamagari.co.tz
```

## 2. Supabase Database Setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run the script in `supabase/schema.sql`.
4. Run `supabase/seed.sql` for starter branches, vehicles, and sample staff role mapping by email.
5. Confirm buckets exist:
- `vehicle-images`
- `sell-request-images`

## 3. Install and Run

```bash
npm install
npm run dev
```

Local: `http://localhost:3000`
Production domain: `https://bingwamagari.co.tz`

## 4. Authentication and Roles

- Sign up from `/auth/login`
- New users default to `BUYER`
- To set admin/staff/seller roles, update `public.profiles.role` in Supabase

Example SQL:

```sql
update public.profiles
set role = 'ADMIN'
where id = '<auth-user-uuid>';
```

## 5. Core Routes

- Public:
- `/vehicles`
- `/vehicles/[id]`
- `/sell-your-car`
- `/import/request`
- `/contact`

- Auth:
- `/auth/login`

- Dashboard:
- `/dashboard`
- `/dashboard/vehicles`
- `/dashboard/vehicles/add`
- `/dashboard/inquiries`
- `/dashboard/sell-requests`
- `/dashboard/orders`
- `/dashboard/inspections`
- `/dashboard/branches`
- `/dashboard/staff`
- `/dashboard/reports`

## 6. Production Checklist

- Set production env vars in hosting provider
- Ensure Supabase RLS policies remain enabled
- Restrict who can become `ADMIN` and `STAFF`
- Configure domain and HTTPS
- Run build validation:

```bash
npm run build
```

## 7. Notes

- Dashboard navigation is role-aware.
- File uploads are stored in Supabase Storage buckets.
- All business workflows are backed by Supabase tables (no mock data in core paths).
- Admin UI now supports:
	- Branch create/edit from `/dashboard/branches`
	- Staff role/branch/status management from `/dashboard/staff`

## 8. E2E Tests (Playwright)

Install browser binaries:

```bash
npx playwright install
```

Set test users in `.env.local` (these should exist in Supabase Auth):

```env
E2E_BUYER_EMAIL=buyer@bingwamagari.co.tz
E2E_BUYER_PASSWORD=yourpassword
E2E_SELLER_EMAIL=seller@bingwamagari.co.tz
E2E_SELLER_PASSWORD=yourpassword
E2E_STAFF_EMAIL=sales@bingwamagari.co.tz
E2E_STAFF_PASSWORD=yourpassword
```

Run tests:

```bash
npm run test:e2e
```

Covered flows:
- Buyer order placement
- Seller sell-request submission
- Staff processing (inquiries and sell requests)
