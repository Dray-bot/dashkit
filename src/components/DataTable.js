'use client'

import { useState } from 'react'

function generateUsers(days) {
  const today = new Date()
  const data = []
  for (let i = days; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    data.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: i % 2 === 0 ? 'Admin' : 'Editor',
      category: i % 3 === 0 ? 'sales' : i % 3 === 1 ? 'users' : 'marketing',
      status: i % 2 === 0 ? 'Active' : 'Inactive',
      date: date.toISOString().slice(0, 10),
    })
  }
  return data
}

const allUsers = generateUsers(90)

export default function DataTable({ filters }) {
  const [downloading, setDownloading] = useState(false)

  const rangeDays =
    filters.dateRange === '7d'
      ? 7
      : filters.dateRange === '30d'
      ? 30
      : 90

  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - rangeDays)

  let filteredData = allUsers.filter((user) => {
    const userDate = new Date(user.date)
    const dateMatch = userDate >= cutoff
    const categoryMatch = filters.category === 'all' || user.category === filters.category
    return dateMatch && categoryMatch
  })

  const handleDownloadCSV = () => {
    setDownloading(true)

    const headers = ['Name', 'Email', 'Role', 'Category', 'Date', 'Status']
    const rows = filteredData.map((user) => [
      user.name,
      user.email,
      user.role,
      user.category,
      user.date,
      user.status,
    ])

    const csvContent =
      [headers, ...rows].map((row) => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `analytics_${filters.dateRange}_${filters.category}.csv`)
    link.click()

    URL.revokeObjectURL(url)
    setDownloading(false)
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      {/* Header with Download button */}
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
        <h2 className="text-lg font-semibold">User Data</h2>
        <button
          onClick={handleDownloadCSV}
          disabled={downloading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {downloading ? 'Downloading...' : 'Download CSV'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
          <thead className="bg-neutral-50 dark:bg-neutral-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {filteredData.map((user) => (
              <tr key={user.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">{user.name}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">{user.email}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">{user.role}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">{user.category}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-500">{user.date}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
