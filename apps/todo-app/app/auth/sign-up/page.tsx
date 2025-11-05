"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"

export default function Page() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/dashboard`,
        },
      })
      if (error) throw error
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="flex min-h-svh w-full items-center justify-center bg-gradient-to-br from-blue-200 via-white to-purple-300 p-6 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-sm"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl backdrop-blur-sm bg-white/80 border border-gray-200">
          <CardHeader>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Sign Up
              </CardTitle>
              <CardDescription className="text-center text-gray-500 mt-2">
                 Create your account to get started
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <motion.div
                  className="grid gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl focus:ring-2 focus:ring-indigo-400"
                  />
                </motion.div>

                <motion.div
                  className="grid gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl focus:ring-2 focus:ring-indigo-400"
                  />
                </motion.div>

                <motion.div
                  className="grid gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="repeat-password">Repeat Password</Label>
                  <Input
                    id="repeat-password"
                    type="password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="rounded-xl focus:ring-2 focus:ring-indigo-400"
                  />
                </motion.div>

                {error && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {error}
                  </motion.p>
                )}

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md hover:shadow-lg transition duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Sign Up"}
                  </Button>
                </motion.div>
              </div>

              <div className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4 text-indigo-600 hover:text-purple-500 transition-colors"
                >
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
