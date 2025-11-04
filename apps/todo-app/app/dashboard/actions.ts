"use server"

import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const AddTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
})

const UpdateTaskSchema = z.object({
  id: z.string().min(1, "Missing task id"),
  title: z.string().trim().min(1, "Title is required"),
})

export async function addTask(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error("Unauthorized")
  }

  const parsed = AddTaskSchema.safeParse({
    title: formData.get("title"),
  })
  if (!parsed.success) {
    // Silently ignore for now; could wire into useFormState if desired
    return
  }

  const { title } = parsed.data
  const { error } = await supabase.from("tasks").insert({
    title,
    is_completed: false,
    user_id: user.id,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard")
}

export async function updateTaskTitle(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error("Unauthorized")
  }

  const parsed = UpdateTaskSchema.safeParse({
    id: String(formData.get("id") || ""),
    title: formData.get("title"),
  })
  if (!parsed.success) {
    // Could wire into useFormState to show inline errors
    return
  }

  const { id, title } = parsed.data
  const { error } = await supabase.from("tasks").update({ title }).eq("id", id).eq("user_id", user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard")
  redirect("/dashboard")
}

export async function toggleTask(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error("Unauthorized")
  }

  const id = String(formData.get("id") || "")
  const current = String(formData.get("is_completed") || "false") === "true"

  const { error } = await supabase.from("tasks").update({ is_completed: !current }).eq("id", id).eq("user_id", user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard")
}

export async function deleteTask(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error("Unauthorized")
  }

  const id = String(formData.get("id") || "")
  const { error } = await supabase.from("tasks").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/dashboard")
}
