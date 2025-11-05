import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { addTask, toggleTask, deleteTask } from "./actions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type Task = {
  id: string
  title: string
  is_completed: boolean
  user_id: string
}

async function getTasks(): Promise<Task[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, is_completed, user_id")
    .eq("user_id", user.id)
    .order("id", { ascending: true })

  if (error) return []
  return data ?? []
}

export default async function DashboardPage() {
  const tasks = await getTasks()

  return (
    <main className="flex items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-600 text-sm">
            Add, complete, edit, and manage your tasks seamlessly. Your data stays private and secure.
          </p>
        </header>

        {/* Add Task Card */}
        <Card className="mb-6 rounded-2xl border border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle>Add a New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={addTask} className="flex items-center gap-2">
              <Input
                name="title"
                placeholder="e.g. Study for exam"
                aria-label="Task title"
                className="flex-1 rounded-xl focus:ring-2 focus:ring-pink-400"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl shadow hover:shadow-lg transition-all duration-300"
              >
                Add
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Task List */}
        <section aria-label="Tasks list" className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet. Add one above.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between p-3">
                    {/* Task Info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        aria-hidden="true"
                        className={`h-3 w-3 rounded-full ${
                          t.is_completed ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                      <span
                        className={`${
                          t.is_completed ? "line-through opacity-70" : ""
                        } text-gray-800 truncate`}
                      >
                        {t.title}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Link href={`/dashboard/edit/${t.id}`}>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="hover:bg-gray-100"
                        >
                          Edit
                        </Button>
                      </Link>

                      <form action={toggleTask}>
                        <input type="hidden" name="id" value={t.id} />
                        <input
                          type="hidden"
                          name="is_completed"
                          value={String(t.is_completed)}
                        />
                        <Button
                          type="submit"
                          variant="secondary"
                          size="sm"
                          className="hover:bg-green-100 transition-colors"
                        >
                          {t.is_completed ? "Mark Undone" : "Mark Done"}
                        </Button>
                      </form>

                      <Separator orientation="vertical" className="h-6" />

                      <form action={deleteTask}>
                        <input type="hidden" name="id" value={t.id} />
                        <Button
                          type="submit"
                          variant="destructive"
                          size="sm"
                          className="hover:bg-red-500 transition-colors"
                          aria-label={`Delete ${t.title}`}
                        >
                          Delete
                        </Button>
                      </form>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
