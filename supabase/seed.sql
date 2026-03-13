-- Run after supabase/schema.sql
-- Seeds branches, vehicles, and sample staff role assignment by email.
-- Replace or create these auth users first:
-- admin@bingwamagari.co.tz, sales@bingwamagari.co.tz, inspector@bingwamagari.co.tz

insert into public.branches (name, city, address, phone, upcoming)
values
  ('Dar es Salaam HQ', 'Dar es Salaam', 'Magomeni, Dar es Salaam', '+255711398600', false),
  ('Arusha Branch', 'Arusha', 'Sokoine Road, Arusha', '+255271234567', false),
  ('Mwanza Branch', 'Mwanza', 'Pamba Road, Mwanza', '+255281234567', false),
  ('Dodoma Branch', 'Dodoma', 'Nyerere Road, Dodoma', '+255261234567', true)
on conflict do nothing;

with branch_ids as (
  select id, name from public.branches
), vehicles_seed as (
  select * from (
    values
      ('BW-001', 'Toyota', 'Land Cruiser Prado', 2021, 95000000::bigint, 42000, 'Diesel', 'Automatic', 'AVAILABLE', 'Dar es Salaam HQ', true),
      ('BW-002', 'Nissan', 'X-Trail', 2020, 48000000::bigint, 61000, 'Petrol', 'Automatic', 'AVAILABLE', 'Arusha Branch', false),
      ('BW-003', 'Toyota', 'Hilux', 2022, 87000000::bigint, 18000, 'Diesel', 'Manual', 'RESERVED', 'Mwanza Branch', true),
      ('BW-004', 'Honda', 'CR-V', 2019, 42000000::bigint, 55000, 'Petrol', 'Automatic', 'AVAILABLE', 'Dodoma Branch', false)
  ) as t(stock_number, make, model, year, price, mileage, fuel_type, transmission, status, branch_name, is_featured)
)
insert into public.vehicles (
  stock_number, make, model, year, price, mileage, fuel_type, transmission, status, branch_id, is_featured, primary_image
)
select
  v.stock_number,
  v.make,
  v.model,
  v.year,
  v.price,
  v.mileage,
  v.fuel_type,
  v.transmission,
  v.status::vehicle_status,
  b.id,
  v.is_featured,
  '/hero.png'
from vehicles_seed v
join branch_ids b on b.name = v.branch_name
on conflict (stock_number) do nothing;

-- Assign roles to existing auth users by email.
-- If a user does not exist yet, that row is skipped.
with desired_staff as (
  select * from (
    values
      ('admin@bingwamagari.co.tz', 'Bingwa Admin', 'ADMIN'::app_role, 'Dar es Salaam HQ'),
      ('sales@bingwamagari.co.tz', 'Bingwa Sales', 'STAFF'::app_role, 'Arusha Branch'),
      ('inspector@bingwamagari.co.tz', 'Bingwa Inspector', 'STAFF'::app_role, 'Mwanza Branch')
  ) as t(email, full_name, role, branch_name)
), matches as (
  select
    u.id,
    d.full_name,
    d.role,
    b.id as branch_id
  from desired_staff d
  join auth.users u on lower(u.email) = lower(d.email)
  left join public.branches b on b.name = d.branch_name
)
insert into public.profiles (id, full_name, role, branch_id, is_active)
select id, full_name, role, branch_id, true
from matches
on conflict (id) do update
set
  full_name = excluded.full_name,
  role = excluded.role,
  branch_id = excluded.branch_id,
  is_active = true;

-- Optional sample inquiries and sell requests
insert into public.sell_requests (
  full_name, phone, email, city, make, model, year, mileage, transmission, fuel_type, condition, asking_price, status
)
values
  ('David Mollel', '+255754111222', 'david@bingwamagari.co.tz', 'Dar es Salaam', 'Toyota', 'Corolla', 2018, 95000, 'Automatic', 'Petrol', 'Used - Good', 28000000, 'PENDING'),
  ('Fatima Nassoro', '+255689333444', 'fatima@bingwamagari.co.tz', 'Arusha', 'Nissan', 'Juke', 2017, 113000, 'Automatic', 'Petrol', 'Used - Fair', 25000000, 'INSPECTION_ASSIGNED')
on conflict do nothing;
