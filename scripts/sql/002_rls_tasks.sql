alter table public.tasks enable row level security;

-- Select: owner can read
create policy if not exists "Users can read their own tasks"
on public.tasks
for select
to authenticated
using (auth.uid() = user_id);

-- Insert: owner can insert rows for themselves
create policy if not exists "Users can insert their own tasks"
on public.tasks
for insert
to authenticated
with check (auth.uid() = user_id);

-- Update: owner can update own tasks
create policy if not exists "Users can update their own tasks"
on public.tasks
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Delete: owner can delete own tasks
create policy if not exists "Users can delete their own tasks"
on public.tasks
for delete
to authenticated
using (auth.uid() = user_id);
