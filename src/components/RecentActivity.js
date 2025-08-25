'use client'

import { Bell, CheckCircle, AlertCircle, UserPlus } from 'lucide-react'

export default function RecentActivity() {
  const activities = [
    { id: 1, icon: UserPlus, message: 'New user registered: Sarah Connor', time: '2m ago' },
    { id: 2, icon: CheckCircle, message: 'Payment of $99 completed by John Doe', time: '15m ago' },
    { id: 3, icon: AlertCircle, message: 'Server downtime reported in EU region', time: '1h ago' },
    { id: 4, icon: Bell, message: 'New feature deployed: Dark Mode', time: '3h ago' },
  ]

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
      <ul className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <li key={activity.id} className="flex items-start space-x-3">
              <div className="mt-1 rounded-full bg-neutral-100 p-2 dark:bg-neutral-800">
                <Icon className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
              </div>
              <div>
                <p className="text-sm text-neutral-900 dark:text-neutral-100">
                  {activity.message}
                </p>
                <p className="text-xs text-neutral-500">{activity.time}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
