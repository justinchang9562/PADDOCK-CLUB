begin;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url text,
  preferred_locale text not null default 'zh',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_display_name_length check (
    display_name is null
    or char_length(btrim(display_name)) between 1 and 50
  ),
  constraint profiles_avatar_url_length check (
    avatar_url is null
    or char_length(avatar_url) <= 2048
  ),
  constraint profiles_preferred_locale_check check (
    preferred_locale in ('zh', 'en')
  )
);

comment on table public.profiles is 'Private application profile for each Supabase Auth user.';
comment on column public.profiles.id is 'Matches auth.users.id and is never exposed as a separate identity.';

create table if not exists public.favorites (
  user_id uuid not null references public.profiles (id) on delete cascade,
  entity_type text not null,
  entity_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, entity_type, entity_id),
  constraint favorites_entity_type_check check (
    entity_type in ('driver', 'team', 'circuit', 'car', 'race')
  ),
  constraint favorites_entity_id_length check (
    char_length(btrim(entity_id)) between 1 and 160
  )
);

comment on table public.favorites is 'User-owned references to entities in the PADDOCK INDEX catalog.';

create index if not exists favorites_user_created_at_idx
  on public.favorites (user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.favorites enable row level security;

revoke all on table public.profiles from anon;
revoke all on table public.favorites from anon;

grant select, insert, update on table public.profiles to authenticated;
grant select, insert, delete on table public.favorites to authenticated;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles
  for insert
  to authenticated
  with check ((select auth.uid()) = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "favorites_select_own" on public.favorites;
create policy "favorites_select_own"
  on public.favorites
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "favorites_insert_own" on public.favorites;
create policy "favorites_insert_own"
  on public.favorites
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "favorites_delete_own" on public.favorites;
create policy "favorites_delete_own"
  on public.favorites
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.set_profile_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profile_updated_at on public.profiles;
create trigger set_profile_updated_at
  before update on public.profiles
  for each row execute procedure public.set_profile_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url, preferred_locale)
  values (
    new.id,
    nullif(btrim(coalesce(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'full_name',
      ''
    )), ''),
    nullif(btrim(coalesce(
      new.raw_user_meta_data ->> 'avatar_url',
      new.raw_user_meta_data ->> 'picture',
      ''
    )), ''),
    case when new.raw_user_meta_data ->> 'preferred_locale' = 'en' then 'en' else 'zh' end
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

insert into public.profiles (id, display_name, avatar_url, preferred_locale)
select
  users.id,
  nullif(btrim(coalesce(
    users.raw_user_meta_data ->> 'display_name',
    users.raw_user_meta_data ->> 'full_name',
    ''
  )), ''),
  nullif(btrim(coalesce(
    users.raw_user_meta_data ->> 'avatar_url',
    users.raw_user_meta_data ->> 'picture',
    ''
  )), ''),
  case when users.raw_user_meta_data ->> 'preferred_locale' = 'en' then 'en' else 'zh' end
from auth.users as users
on conflict (id) do nothing;

commit;
