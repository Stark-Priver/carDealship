-- Run this file in Supabase SQL editor.

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type app_role as enum ('ADMIN', 'STAFF', 'BUYER', 'SELLER');
  end if;

  if not exists (select 1 from pg_type where typname = 'vehicle_status') then
    create type vehicle_status as enum ('AVAILABLE', 'RESERVED', 'SOLD');
  end if;

  if not exists (select 1 from pg_type where typname = 'inquiry_status') then
    create type inquiry_status as enum ('NEW', 'CONTACTED', 'NEGOTIATING', 'CLOSED_WON', 'CLOSED_LOST');
  end if;

  if not exists (select 1 from pg_type where typname = 'sell_request_status') then
    create type sell_request_status as enum ('PENDING', 'INSPECTION_ASSIGNED', 'INSPECTED', 'APPROVED', 'REJECTED');
  end if;

  if not exists (select 1 from pg_type where typname = 'import_request_status') then
    create type import_request_status as enum ('NEW', 'REVIEWING', 'QUOTED', 'CLOSED');
  end if;

  if not exists (select 1 from pg_type where typname = 'inspection_status') then
    create type inspection_status as enum ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED');
  end if;

  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type order_status as enum ('PLACED', 'CONFIRMED', 'CANCELLED');
  end if;
end
$$;

create table if not exists public.branches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  address text not null,
  phone text not null,
  upcoming boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role app_role not null default 'BUYER',
  branch_id uuid references public.branches(id) on delete set null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  stock_number text unique not null,
  make text not null,
  model text not null,
  year int not null,
  price bigint not null,
  mileage int not null,
  fuel_type text not null,
  transmission text not null,
  body_type text,
  color text,
  engine_size text,
  import_country text,
  description text,
  description_sw text,
  status vehicle_status not null default 'AVAILABLE',
  branch_id uuid not null references public.branches(id) on delete restrict,
  primary_image text,
  is_featured boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.vehicle_images (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  buyer_id uuid references public.profiles(id) on delete set null,
  customer_name text not null,
  phone text not null,
  email text,
  message text,
  status inquiry_status not null default 'NEW',
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.sell_requests (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  phone text not null,
  email text,
  city text not null,
  make text not null,
  model text not null,
  year int not null,
  mileage int not null,
  transmission text not null,
  fuel_type text not null,
  condition text not null,
  asking_price bigint not null,
  status sell_request_status not null default 'PENDING',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.sell_request_photos (
  id uuid primary key default gen_random_uuid(),
  sell_request_id uuid not null references public.sell_requests(id) on delete cascade,
  image_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.import_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  phone text not null,
  email text,
  country text not null,
  make text not null,
  model text not null,
  year_from int,
  year_to int,
  budget bigint,
  fuel_type text,
  transmission text,
  additional_notes text,
  status import_request_status not null default 'NEW',
  created_at timestamptz not null default now()
);

create table if not exists public.inspections (
  id uuid primary key default gen_random_uuid(),
  sell_request_id uuid references public.sell_requests(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete cascade,
  inspector_id uuid references public.profiles(id) on delete set null,
  scheduled_at timestamptz,
  completed_at timestamptz,
  status inspection_status not null default 'SCHEDULED',
  rating numeric(3, 1),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  vehicle_id uuid not null references public.vehicles(id) on delete restrict,
  status order_status not null default 'PLACED',
  total_amount bigint not null,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_vehicles_status on public.vehicles(status);
create index if not exists idx_vehicles_created_at on public.vehicles(created_at desc);
create index if not exists idx_inquiries_status on public.inquiries(status);
create index if not exists idx_sell_requests_status on public.sell_requests(status);
create index if not exists idx_orders_buyer_id on public.orders(buyer_id);

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'BUYER'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user_profile();

create or replace function public.current_app_role()
returns app_role
language sql
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

alter table public.branches enable row level security;
alter table public.profiles enable row level security;
alter table public.vehicles enable row level security;
alter table public.vehicle_images enable row level security;
alter table public.inquiries enable row level security;
alter table public.sell_requests enable row level security;
alter table public.sell_request_photos enable row level security;
alter table public.import_requests enable row level security;
alter table public.inspections enable row level security;
alter table public.orders enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "branches_read_all" on public.branches;
create policy "branches_read_all" on public.branches
for select using (true);

drop policy if exists "branches_manage_staff_admin" on public.branches;
create policy "branches_manage_staff_admin" on public.branches
for all using (public.current_app_role() in ('ADMIN', 'STAFF'))
with check (public.current_app_role() in ('ADMIN', 'STAFF'));

drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin" on public.profiles
for select using (id = auth.uid() or public.current_app_role() in ('ADMIN', 'STAFF'));

drop policy if exists "profiles_update_self_or_admin" on public.profiles;
create policy "profiles_update_self_or_admin" on public.profiles
for update using (id = auth.uid() or public.current_app_role() in ('ADMIN', 'STAFF'))
with check (id = auth.uid() or public.current_app_role() in ('ADMIN', 'STAFF'));

drop policy if exists "vehicles_select_public" on public.vehicles;
create policy "vehicles_select_public" on public.vehicles
for select using (true);

drop policy if exists "vehicles_manage_staff_admin" on public.vehicles;
create policy "vehicles_manage_staff_admin" on public.vehicles
for all using (public.current_app_role() in ('ADMIN', 'STAFF'))
with check (public.current_app_role() in ('ADMIN', 'STAFF'));

drop policy if exists "vehicle_images_select_public" on public.vehicle_images;
create policy "vehicle_images_select_public" on public.vehicle_images
for select using (true);

drop policy if exists "vehicle_images_manage_staff_admin" on public.vehicle_images;
create policy "vehicle_images_manage_staff_admin" on public.vehicle_images
for all using (public.current_app_role() in ('ADMIN', 'STAFF'))
with check (public.current_app_role() in ('ADMIN', 'STAFF'));

drop policy if exists "inquiries_insert_public" on public.inquiries;
create policy "inquiries_insert_public" on public.inquiries
for insert with check (true);

drop policy if exists "inquiries_select_own_or_staff" on public.inquiries;
create policy "inquiries_select_own_or_staff" on public.inquiries
for select using (
  public.current_app_role() in ('ADMIN', 'STAFF')
  or buyer_id = auth.uid()
);

drop policy if exists "inquiries_update_staff" on public.inquiries;
create policy "inquiries_update_staff" on public.inquiries
for update using (public.current_app_role() in ('ADMIN', 'STAFF'))
with check (public.current_app_role() in ('ADMIN', 'STAFF'));

drop policy if exists "sell_requests_insert_public" on public.sell_requests;
create policy "sell_requests_insert_public" on public.sell_requests
for insert with check (true);

drop policy if exists "sell_requests_select_own_or_staff" on public.sell_requests;
create policy "sell_requests_select_own_or_staff" on public.sell_requests
for select using (
  public.current_app_role() in ('ADMIN', 'STAFF')
  or seller_id = auth.uid()
);

drop policy if exists "sell_requests_update_staff" on public.sell_requests;
create policy "sell_requests_update_staff" on public.sell_requests
for update using (public.current_app_role() in ('ADMIN', 'STAFF'))
with check (public.current_app_role() in ('ADMIN', 'STAFF'));

drop policy if exists "sell_request_photos_select_public" on public.sell_request_photos;
create policy "sell_request_photos_select_public" on public.sell_request_photos
for select using (true);

drop policy if exists "sell_request_photos_insert_public" on public.sell_request_photos;
create policy "sell_request_photos_insert_public" on public.sell_request_photos
for insert with check (true);

drop policy if exists "import_requests_insert_public" on public.import_requests;
create policy "import_requests_insert_public" on public.import_requests
for insert with check (true);

drop policy if exists "import_requests_select_own_or_staff" on public.import_requests;
create policy "import_requests_select_own_or_staff" on public.import_requests
for select using (
  public.current_app_role() in ('ADMIN', 'STAFF')
  or requester_id = auth.uid()
);

drop policy if exists "import_requests_update_staff" on public.import_requests;
create policy "import_requests_update_staff" on public.import_requests
for update using (public.current_app_role() in ('ADMIN', 'STAFF'))
with check (public.current_app_role() in ('ADMIN', 'STAFF'));

drop policy if exists "inspections_select_own_or_staff" on public.inspections;
create policy "inspections_select_own_or_staff" on public.inspections
for select using (
  public.current_app_role() in ('ADMIN', 'STAFF')
  or inspector_id = auth.uid()
);

drop policy if exists "inspections_manage_staff" on public.inspections;
create policy "inspections_manage_staff" on public.inspections
for all using (public.current_app_role() in ('ADMIN', 'STAFF'))
with check (public.current_app_role() in ('ADMIN', 'STAFF'));

drop policy if exists "orders_insert_buyer" on public.orders;
create policy "orders_insert_buyer" on public.orders
for insert with check (buyer_id = auth.uid());

drop policy if exists "orders_select_buyer_or_staff" on public.orders;
create policy "orders_select_buyer_or_staff" on public.orders
for select using (buyer_id = auth.uid() or public.current_app_role() in ('ADMIN', 'STAFF'));

drop policy if exists "orders_update_staff" on public.orders;
create policy "orders_update_staff" on public.orders
for update using (public.current_app_role() in ('ADMIN', 'STAFF'))
with check (public.current_app_role() in ('ADMIN', 'STAFF'));

drop policy if exists "contact_messages_insert_public" on public.contact_messages;
create policy "contact_messages_insert_public" on public.contact_messages
for insert with check (true);

drop policy if exists "contact_messages_select_staff" on public.contact_messages;
create policy "contact_messages_select_staff" on public.contact_messages
for select using (public.current_app_role() in ('ADMIN', 'STAFF'));

insert into storage.buckets (id, name, public)
values
  ('vehicle-images', 'vehicle-images', true),
  ('sell-request-images', 'sell-request-images', true)
on conflict (id) do nothing;

drop policy if exists "vehicle_bucket_public_read" on storage.objects;
create policy "vehicle_bucket_public_read" on storage.objects
for select using (bucket_id in ('vehicle-images', 'sell-request-images'));

drop policy if exists "vehicle_bucket_staff_write" on storage.objects;
create policy "vehicle_bucket_staff_write" on storage.objects
for insert to authenticated
with check (
  bucket_id = 'vehicle-images'
  and public.current_app_role() in ('ADMIN', 'STAFF')
);

drop policy if exists "sell_bucket_auth_write" on storage.objects;
create policy "sell_bucket_auth_write" on storage.objects
for insert to authenticated
with check (bucket_id = 'sell-request-images');
