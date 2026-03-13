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
```

## 2. Supabase Database Setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run the script in `supabase/schema.sql`.
4. Confirm buckets exist:
- `vehicle-images`
- `sell-request-images`

## 3. Install and Run

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

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
