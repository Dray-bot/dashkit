'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BarChart2, Users, Settings } from 'lucide-react'

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-neutral-200 bg-white shadow-md transition-transform dark:border-neutral-800 dark:bg-neutral-950 md:static md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-neutral-200 px-6 dark:border-neutral-800">
        <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-sm" />
        <span className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          DashKit
        </span>
      </div>

      {/* Nav Links */}
      <nav className="mt-6 flex flex-col gap-1 px-3">
        <NavLink href="/" icon={<Home className="h-5 w-5" />} label="Home" />
        <NavLink href="/analytics" icon={<BarChart2 className="h-5 w-5" />} label="Analytics" />
        <NavLink href="/users" icon={<Users className="h-5 w-5" />} label="Users" />
        <NavLink href="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
      </nav>
    </aside>
  )
}

function NavLink({ href, icon, label }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
          : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
