'use client'

import { useState } from 'react'

export default function Filters({ onFilterChange }) {
  const [dateRange, setDateRange] = useState('7d')
  const [category, setCategory] = useState('all')

  const handleFilterChange = (field, value) => {
    if (field === 'date') setDateRange(value)
    if (field === 'category') setCategory(value)

    onFilterChange({ dateRange, category, [field]: value })
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      {/* Date Range */}
      <select
        value={dateRange}
        onChange={(e) => handleFilterChange('date', e.target.value)}
        className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
      >
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
      </select>

      {/* Category */}
      <select
        value={category}
        onChange={(e) => handleFilterChange('category', e.target.value)}
        className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
      >
        <option value="all">All Categories</option>
        <option value="sales">Sales</option>
        <option value="marketing">Marketing</option>
        <option value="users">Users</option>
      </select>
    </div>
  )
}
