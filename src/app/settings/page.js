'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Sun, Moon, User, Mail, Lock } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isDark = resolvedTheme === 'dark'

  useEffect(() => setMounted(true), [])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 md:p-8 space-y-8">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Settings
          </h1>

          {/* Profile Section */}
          <motion.section
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-950 transition-colors hover:shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <h2 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
              Profile
            </h2>
            <form className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Name
                </label>
                <User className="absolute left-3 top-10 h-4 w-4 text-neutral-400 dark:text-neutral-500" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="mt-1 w-full rounded-lg border border-neutral-300 bg-neutral-50 pl-10 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-500 transition"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Email
                </label>
                <Mail className="absolute left-3 top-10 h-4 w-4 text-neutral-400 dark:text-neutral-500" />
                <input
                  type="email"
                  placeholder="johndoe@email.com"
                  className="mt-1 w-full rounded-lg border border-neutral-300 bg-neutral-50 pl-10 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-500 transition"
                />
              </div>

              <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-700 transition shadow hover:shadow-lg">
                Save Profile
              </button>
            </form>
          </motion.section>

          {/* Security Section */}
          <motion.section
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-950 transition-colors hover:shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <h2 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
              Security
            </h2>
            <form className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  New Password
                </label>
                <Lock className="absolute left-3 top-10 h-4 w-4 text-neutral-400 dark:text-neutral-500" />
                <input
                  type="password"
                  placeholder="********"
                  className="mt-1 w-full rounded-lg border border-neutral-300 bg-neutral-50 pl-10 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-500 transition"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Confirm Password
                </label>
                <Lock className="absolute left-3 top-10 h-4 w-4 text-neutral-400 dark:text-neutral-500" />
                <input
                  type="password"
                  placeholder="********"
                  className="mt-1 w-full rounded-lg border border-neutral-300 bg-neutral-50 pl-10 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder-neutral-500 transition"
                />
              </div>

              <button className="rounded-lg bg-green-600 px-4 py-2 text-white text-sm font-medium hover:bg-green-700 transition shadow hover:shadow-lg">
                Update Password
              </button>
            </form>
          </motion.section>

          {/* Preferences Section */}
          <motion.section
            className="rounded-xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-950 transition-colors hover:shadow-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <h2 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-100">
              Preferences
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Dark Mode
              </span>
              {mounted && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className="flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800 transition shadow hover:shadow-md"
                >
                  {isDark ? <Moon className="h-4 w-4 text-yellow-400" /> : <Sun className="h-4 w-4 text-indigo-500" />}
                  {isDark ? 'On' : 'Off'}
                </motion.button>
              )}
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  )
}
