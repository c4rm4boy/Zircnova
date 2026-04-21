-- ═══════════════════════════════════════════════════════════
-- Zircnova — Supabase Auth & Profile Setup
-- Run this in your Supabase project SQL editor
-- ═══════════════════════════════════════════════════════════

-- 1. User profiles (extends auth.users)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  first_name  text,
  last_name   text,
  avatar_url  text,
  phone       text,
  company     text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table public.profiles enable row level security;

-- Users can read and update only their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Auto-create profile on new user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, first_name, last_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Auto-update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_profile_updated on public.profiles;
create trigger on_profile_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- 4. Orders table (for the Orders nav button)
create table if not exists public.orders (
  id          bigserial primary key,
  user_id     uuid references auth.users(id) on delete set null,
  status      text not null default 'pending',
  total       numeric(10,2) not null default 0,
  items       jsonb,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);


-- ═══════════════════════════════════════════════════════════
-- Social Auth Providers — Enable in Supabase Dashboard:
-- Authentication → Providers → enable each one below and
-- paste in the Client ID + Secret from each developer portal.
--
-- Facebook  → developers.facebook.com → App → Facebook Login
-- Google    → console.cloud.google.com → APIs & Services → Credentials
-- LinkedIn  → developer.linkedin.com → My Apps → Auth
-- Microsoft → portal.azure.com → App registrations → Authentication
-- Amazon    → developer.amazon.com → Login with Amazon
--
-- Callback URL for all providers:
--   https://<your-project-ref>.supabase.co/auth/v1/callback
-- ═══════════════════════════════════════════════════════════
