"use client"

import { motion } from "framer-motion"

export default function Features() {
  const items = [
    {
      title: "Secure by default",
      desc: "Row Level Security ensures only you can read or modify your tasks. Policies protect SELECT, INSERT, UPDATE, and DELETE.",
    },
    {
      title: "Server Actions + Zod",
      desc: "Create, edit, toggle, and delete tasks via server actions validated with Zod. The UI refreshes with revalidatePath.",
    },
    {
      title: "Polished UX",
      desc: "Subtle animations and fast feedback keep you in flow. Clean, realistic styling with a focused 4-color palette.",
    },
  ]

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, index) => (
            <motion.article
              key={it.title}
              className="group rounded-2xl border border-border bg-white/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-transform duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white text-sm font-semibold shadow">
                <span className="sr-only">{it.title}</span>
                {it.title[0]}
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-gray-800">{it.title}</h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">{it.desc}</p>
              <div className="mt-4 h-px bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 scale-x-100 group-hover:scale-x-105 transition-transform duration-300" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
