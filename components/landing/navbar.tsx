"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Navbar() {
  return (
    <motion.nav
      className="
        sticky top-0 z-40 border-b border-gray-200 bg-white/80
        backdrop-blur supports-[backdrop-filter]:bg-white/60
      "
      aria-label="Primary"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-gray-900 text-lg md:text-xl tracking-tight hover:text-gray-700 transition-colors"
          aria-label="Go to home"
        >
          Task Manager
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          {/* Sign In */}
          <Button
            asChild
            variant="ghost"
            className="hover:-translate-y-0.5 transition-transform text-gray-700 hover:bg-gray-300 rounded-md px-3 py-1"
          >
            <Link href="/auth/login" aria-label="Sign in">
              Sign in
            </Link>
          </Button>

          {/* Sign Up */}
          <Button
            asChild
            variant="outline"
            className="hover:-translate-y-0.5 transition-transform text-pink-600 border-pink-400 hover:bg-pink-100 rounded-md px-3 py-1"
          >
            <Link href="/auth/sign-up" aria-label="Create account">
              Sign up
            </Link>
          </Button>

          {/* Dashboard */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              asChild
              className="bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link href="/dashboard" aria-label="Open your personal dashboard">
                Open Dashboard
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}
