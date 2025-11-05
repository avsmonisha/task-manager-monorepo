"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import Navbar from "@/components/landing/navbar"
import LivePreview from "@/components/landing/live-preview"
import Footer from "@/components/landing/footer"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="min-h-[100svh] bg-background">
      <Navbar />
      <Hero />

      <LivePreview />

      <Features />

      {/* CTA Section */}
      <section className="py-12 md:py-16 border-t border-border bg-gradient-to-br from-pink-50 via-white to-blue-50">
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <motion.h2
            className="text-2xl md:text-3xl font-medium text-gray-800 tracking-tight mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ready to organize your day?
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
           Create tasks, mark them done, and stay focused. All your tasks are stored securely and organized for you.
          </motion.p>
          <div className="flex items-center justify-center gap-3">
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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-pink-400 text-pink-600 bg-white/60 hover:bg-white/70 shadow-sm transition-all duration-300"
              >
                <Link href="/auth/login" aria-label="Sign in to your account">
                  Sign in
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
