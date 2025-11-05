"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-white to-blue-50">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            <h1 className="text-gray-800 text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Task Manager that feels fast and stays organized
            </h1>
            <p className="mt-2 text-gray-600 leading-relaxed max-w-prose">
               Create, edit, complete, and delete your tasks easily. Enjoy a smooth, responsive interface with thoughtful defaults to keep you organized.
            
            </p>
            <div className="mt-6 flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link href="/dashboard" aria-label="Get started and open dashboard">
                    Get Started
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border-pink-300 text-pink-600 bg-white/60 hover:bg-white/70 shadow-sm transition-all duration-300"
                >
                  <Link href="/auth/sign-up" aria-label="Create an account">
                    Create Account
                  </Link>
                </Button>
              </motion.div>
            </div>
            <p className="sr-only">Manage your personal tasks securely.</p>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-xl pointer-events-none">
              <div className="h-full w-full rounded-xl ring-1 ring-gray-300/40" />
            </div>
            <div className="relative rounded-xl border border-gray-300 bg-white/70 backdrop-blur-sm overflow-hidden shadow-md">
              <img
                src="/task-management-dashboard-ui.jpg"
                alt="Preview of the task dashboard interface"
                className="w-full h-auto"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 backdrop-blur bg-white/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tasks demo preview</span>
                  <Button
                    asChild
                    size="sm"
                    className="bg-pink-400 text-white hover:opacity-90 transition-opacity rounded-lg"
                  >
                    <Link href="/dashboard" aria-label="Open dashboard from preview">
                      Open
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subtle animated dots row */}
        <div className="mt-8 flex items-center gap-2 justify-center">
          <span className="h-2 w-2 rounded-full bg-pink-400/80 animate-pulse" />
          <span className="h-2 w-2 rounded-full bg-purple-400/60 animate-pulse [animation-delay:120ms]" />
          <span className="h-2 w-2 rounded-full bg-blue-400/40 animate-pulse [animation-delay:240ms]" />
        </div>
      </div>
    </header>
  )
}
