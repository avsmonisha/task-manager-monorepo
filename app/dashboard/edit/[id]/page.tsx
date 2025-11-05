import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { updateTaskTitle } from "../../actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Task = {
  id: string
  title: string
  is_completed: boolean
  user_id: string
}

async function getTask(id: string): Promise<Task | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, is_completed, user_id")
    .eq("id", id)
    .maybeSingle()

  if (error || !data) redirect("/dashboard")

  return data
}

export default async function EditTaskPage({ params }: { params: { id: string } }) {
  const task = await getTask(params.id)

  return (
    <main className="flex items-center justify-center min-h-screen p-6 
      bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Task</h1>
          <p className="text-gray-600 text-sm">Update your task title below.</p>
        </header>

        {/* Task Card */}
        <Card className="rounded-2xl border border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateTaskTitle} className="flex flex-col md:flex-row items-center gap-3">
              <input type="hidden" name="id" value={task!.id} />
              <Input
                name="title"
                defaultValue={task!.title}
                aria-label="Task title"
                className="flex-1 rounded-xl focus:ring-2 focus:ring-pink-400"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl shadow hover:shadow-lg transition-all duration-300"
              >
                Save
              </Button>
              <Link href="/dashboard">
                <Button type="button" variant="outline" className="rounded-xl">
                  Cancel
                </Button>
              </Link>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
