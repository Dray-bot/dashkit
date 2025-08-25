'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, Bell, Search as SearchIcon, Sun, Moon, Plus } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Navbar({ onMenuClick }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white dark:bg-neutral-950 dark:border-neutral-800 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Open sidebar"
          onClick={() => onMenuClick && onMenuClick()}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 md:hidden dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        >
          <Menu className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
        </button>

        {/* Logo */}
        <Link href="/" className="hidden md:flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-sm" />
          <span className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            DashKit
          </span>
        </Link>

        {/* Search (desktop) */}
        <div className="relative hidden md:flex flex-1 max-w-md items-center">
          <SearchIcon className="pointer-events-none absolute left-3 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search"
            className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 text-sm outline-none placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />
        </div>

        {/* Right-side icons */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Mobile search toggle */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => setMobileSearchOpen(v => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 md:hidden dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          >
            <SearchIcon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
          </button>

          {/* New button (desktop) */}
          <button className="hidden md:flex h-9 items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-3 text-sm font-medium text-white shadow-md hover:opacity-90">
            <Plus className="h-4 w-4" />
            New
          </button>

          {/* Notifications */}
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
            <Bell className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
            <span className="absolute right-2 top-2 inline-flex h-2 w-2 animate-ping rounded-full bg-rose-500" />
            <span className="absolute right-2 top-2 inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </button>

          {/* Theme toggle */}
          {mounted && (
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-500" />
              )}
            </button>
          )}

          {/* User avatar */}
          <button className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 text-white shadow-sm hover:opacity-90 dark:border-neutral-700">
            <span className="text-xs font-medium">DK</span>
          </button>
        </div>
      </div>

      {/* Mobile search input */}
      {mobileSearchOpen && (
        <div className="border-t border-neutral-200 p-3 md:hidden dark:border-neutral-800">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search"
              className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-3 text-sm outline-none placeholder:text-neutral-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
            />
          </div>
        </div>
      )}
    </header>
  )
}
