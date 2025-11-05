-- Ensure RLS is enabled
alter table public.tasks enable row level security;

-- Drop existing policies if they exist to avoid duplicates
drop policy if exists "tasks_select_own" on public.tasks;
drop policy if exists "tasks_insert_own" on public.tasks;
drop policy if exists "tasks_update_own" on public.tasks;
drop policy if exists "tasks_delete_own" on public.tasks;

-- Read: only owner can read their tasks
create policy "tasks_select_own"
on public.tasks
for select
to authenticated
using (user_id = auth.uid());

-- Insert: user_id must equal the current authenticated uid
create policy "tasks_insert_own"
on public.tasks
for insert
to authenticated
with check (user_id = auth.uid());

-- Update: only owner can update their tasks
create policy "tasks_update_own"
on public.tasks
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- Delete: only owner can delete their tasks
create policy "tasks_delete_own"
on public.tasks
for delete
to authenticated
using (user_id = auth.uid());
