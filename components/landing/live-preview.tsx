"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

type Task = { id: string; title: string; is_completed: boolean }

export default function LivePreview() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Plan project outline", is_completed: false },
    { id: "2", title: "Create first task", is_completed: true },
    { id: "3", title: "Invite teammate", is_completed: false },
  ])
  const [newTitle, setNewTitle] = useState("")

  function addTask() {
    const title = newTitle.trim()
    if (!title) return
    setTasks((prev) => [{ id: crypto.randomUUID(), title, is_completed: false }, ...prev])
    setNewTitle("")
  }

  function toggleTask(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, is_completed: !t.is_completed } : t)))
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function updateTaskTitle(id: string, title: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)))
  }

  return (
    <section className="py-12 md:py-16 border-y border-border motion-safe:animate-in motion-safe:fade-in-50">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-800">Live Preview</h2>
            <p className="text-sm text-gray-500">
              Try the task interactions below. The dashboard connects to your account; this demo runs locally.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-pink-400/80 animate-pulse" aria-hidden />
            <span className="text-xs text-gray-500">Real-time feel demo</span>
          </div>
        </div>

        {/* Tasks Card */}
        <Card className="border-border bg-white/80 backdrop-blur-sm shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg">My Tasks (Demo)</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add Task */}
            <div className="flex items-center gap-2 mb-4">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Add a task..."
                aria-label="New task title"
                className="rounded-lg focus:ring-2 focus:ring-pink-400"
              />
              <Button
                onClick={addTask}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Add
              </Button>
            </div>

            {/* Task List */}
            <ul className="space-y-2">
              {tasks.map((t) => (
                <motion.li
                  key={t.id}
                  className="group flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white/50 p-3 shadow-sm transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Checkbox
                      checked={t.is_completed}
                      onCheckedChange={() => toggleTask(t.id)}
                      aria-label={`Toggle ${t.title}`}
                      className="data-[state=checked]:bg-pink-400"
                    />
                    <input
                      className={`min-w-0 flex-1 bg-transparent outline-none text-sm ${
                        t.is_completed ? "line-through text-gray-400" : "text-gray-800"
                      }`}
                      value={t.title}
                      onChange={(e) => updateTaskTitle(t.id, e.target.value)}
                      aria-label={`Edit title for ${t.title}`}
                    />
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:translate-y-[-1px] transition-transform bg-transparent"
                      onClick={() => toggleTask(t.id)}
                      aria-label={`Mark ${t.title} ${t.is_completed ? "incomplete" : "complete"}`}
                    >
                      {t.is_completed ? "Undo" : "Complete"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deleteTask(t.id)}
                      aria-label={`Delete ${t.title}`}
                    >
                      Delete
                    </Button>
                  </div>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
