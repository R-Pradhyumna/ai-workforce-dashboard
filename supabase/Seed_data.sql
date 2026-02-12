-- ============================================================
-- AI Workforce Intelligence Dashboard - Full Seed Script
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. TABLES
-- ============================================================

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key
    references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('manager', 'employee')),
  team_id uuid references public.teams(id) on delete set null,
  manager_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_models (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  cost_per_1k_tokens numeric(10,6) not null,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_usage_logs (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null
    references public.profiles(id) on delete cascade,
  model_id uuid not null
    references public.ai_models(id) on delete restrict,
  tokens_used integer not null check (tokens_used > 0),
  cost_usd numeric(10,4) not null,
  category text not null check (
    category in ('development','research','hr','marketing','ops')
  ),
  created_at timestamptz not null default now()
);

-- ============================================================
-- 2. INDEXES
-- ============================================================

create index if not exists idx_profiles_manager_id
  on public.profiles(manager_id);

create index if not exists idx_profiles_team_id
  on public.profiles(team_id);

create index if not exists idx_usage_employee_id
  on public.ai_usage_logs(employee_id);

create index if not exists idx_usage_created_at
  on public.ai_usage_logs(created_at);

create index if not exists idx_usage_employee_created
  on public.ai_usage_logs(employee_id, created_at desc);

create index if not exists idx_usage_model_id
  on public.ai_usage_logs(model_id);

-- ============================================================
-- 3. RLS
-- ============================================================

alter table public.profiles enable row level security;
alter table public.teams enable row level security;
alter table public.ai_models enable row level security;
alter table public.ai_usage_logs enable row level security;

create policy if not exists "authenticated_read_profiles"
on public.profiles
for select
using ((select auth.role()) = 'authenticated');

create policy if not exists "authenticated_read_teams"
on public.teams
for select
using ((select auth.role()) = 'authenticated');

create policy if not exists "authenticated_read_models"
on public.ai_models
for select
using ((select auth.role()) = 'authenticated');

create policy if not exists "authenticated_read_usage_logs"
on public.ai_usage_logs
for select
using ((select auth.role()) = 'authenticated');

-- ============================================================
-- 4. TRIGGER FOR AUTO PROFILE CREATION
-- ============================================================

create or replace function public.handle_new_user()
returns trigger 
language plpgsql 
security definer
set search_path = public
as $$
declare
  user_role text;
  user_full_name text;
begin
  user_full_name := coalesce(
    new.raw_user_meta_data->>'full_name',
    'Unnamed User'
  );

  user_role := coalesce(
    new.raw_user_meta_data->>'role',
    'employee'
  );

  if user_role not in ('manager','employee') then
    user_role := 'employee';
  end if;

  insert into public.profiles (id, full_name, role)
  values (new.id, user_full_name, user_role);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- ============================================================
-- 5. SEED DATA
-- ============================================================

-- Team
insert into public.teams (name)
values ('AI Operations Team')
on conflict (name) do nothing;

-- AI Models
insert into public.ai_models (name, cost_per_1k_tokens)
values
  ('gpt-4o', 0.005),
  ('gpt-4', 0.030),
  ('gpt-4-mini', 0.0015),
  ('gpt-3.5-turbo', 0.0008)
on conflict (name) do nothing;

-- ============================================================
-- NOTE:
-- Manager & employees must be created via Supabase Auth UI
-- or via insert into auth.users with metadata:
-- {
--   "full_name": "...",
--   "role": "manager"  (for manager only)
-- }
-- ============================================================

-- After creating 1 manager + 6 employees,
-- run the following:

-- Assign team to everyone
update public.profiles p
set team_id = t.id
from public.teams t
where t.name = 'AI Operations Team';

-- Assign employees to manager
update public.profiles p
set manager_id = m.id
from public.profiles m
where m.role = 'manager'
  and p.role = 'employee';

truncate table public.ai_usage_logs cascade;

-- Insert 300 usage rows
insert into public.ai_usage_logs (
  employee_id,
  model_id,
  tokens_used,
  cost_usd,
  category,
  created_at
)
select
  employees[(floor(random() * array_length(employees, 1)) + 1)::int] as employee_id,
  models[(floor(random() * array_length(models, 1)) + 1)::int] as model_id,
  tokens,
  round((tokens / 1000.0) * model_costs[
    (floor(random() * array_length(models, 1)) + 1)::int
  ], 4),
  category,
  now() - (random() * interval '180 days')
from generate_series(1, 300),
lateral (
  select array_agg(id) as employees
  from public.profiles
  where role = 'employee'
) emp,
lateral (
  select
    array_agg(id) as models,
    array_agg(cost_per_1k_tokens) as model_costs
  from public.ai_models
) mod,
lateral (
  select
    (floor(random() * 5800) + 200)::int as tokens,
    (array['development','research','hr','marketing','ops'])
      [floor(random()*5)+1] as category
) data;

alter table public.profiles force row level security;
alter table public.teams force row level security;
alter table public.ai_models force row level security;
alter table public.ai_usage_logs force row level security;
