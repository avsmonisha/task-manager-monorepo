"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <motion.footer
      className="border-t border-gray-200 bg-white/70 backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
         Task Manager — Effortlessly organize and manage your tasks with confidence.
        </p>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/auth/login"
            className="text-gray-700 transition-all duration-300 hover:text-purple-500"
            aria-label="Sign in"
          >
            Sign in
          </Link>
          <Link
            href="/auth/sign-up"
            className="text-gray-700 transition-all duration-300 hover:text-purple-500"
            aria-label="Create account"
          >
            Sign up
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-700 hover:opacity-90 transition-opacity"
            aria-label="Open dashboard"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </motion.footer>
  )
}
