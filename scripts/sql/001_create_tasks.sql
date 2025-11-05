-- Enable pgcrypto for gen_random_uuid if needed (Supabase typically has it)
create extension if not exists pgcrypto;

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  is_completed boolean not null default false,
  user_id uuid not null references auth.users(id) on delete cascade
);

create index if not exists tasks_user_id_idx on public.tasks(user_id);
