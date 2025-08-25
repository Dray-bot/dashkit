'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { PlusCircle, Users, BarChart2, Activity, Bell, TrendingUp } from 'lucide-react'
import { Line } from 'react-chartjs-2'
import { motion, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [greeting, setGreeting] = useState('Hello')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [recentActivities, setRecentActivities] = useState([
    { text: 'Jane Doe added a report', time: '2h ago' },
    { text: 'John Smith updated permissions', time: '3h ago' },
    { text: 'Emily commented on a report', time: '5h ago' }
  ])

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  const quickStats = [
    { title: 'Active Users', value: 120, icon: <Users className="h-5 w-5 text-white" />, color: 'from-blue-400 to-blue-600', trend: '+12%' },
    { title: 'Reports Generated', value: 34, icon: <BarChart2 className="h-5 w-5 text-white" />, color: 'from-green-400 to-green-600', trend: '+8%' },
    { title: 'Recent Activities', value: 18, icon: <Activity className="h-5 w-5 text-white" />, color: 'from-purple-400 to-purple-600', trend: '+5%' },
  ]

  const trendData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'User Growth',
        data: [12, 19, 14, 20, 18, 24, 22],
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99,102,241,0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  const reportData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Reports Generated',
        data: [5, 8, 6, 9, 12, 10, 11],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16,185,129,0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <motion.h1
              className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 relative"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {greeting}, User
              <motion.div
                className="absolute left-0 bottom-0 h-1 w-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '4rem' }}
                transition={{ duration: 1 }}
              />
            </motion.h1>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button onClick={() => setNotificationsOpen(!notificationsOpen)}>
                  <Bell className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
                  <span className="absolute -top-1 -right-1 inline-flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg dark:bg-neutral-900 p-2 z-50"
                    >
                      {recentActivities.map((n, i) => (
                        <div key={i} className="flex justify-between p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded">
                          <span className="text-sm text-neutral-700 dark:text-neutral-300">{n.text}</span>
                          <span className="text-xs text-neutral-400 dark:text-neutral-500">{n.time}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 px-4 py-2 text-white hover:opacity-90 transition">
                <PlusCircle className="h-5 w-5" />
                New Task
              </button>
            </div>
          </div>

          {/* Quick Stats Cards with animated numbers and trends */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex items-center justify-between rounded-xl p-4 shadow-lg bg-gradient-to-tr ${stat.color} cursor-pointer hover:scale-[1.02] transition-transform`}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">{stat.title}</span>
                  <div className="flex items-center gap-2">
                    <CountUp end={stat.value} duration={1.5} className="text-xl font-bold text-white" />
                    <span className="flex items-center gap-1 text-sm text-white/80">
                      <TrendingUp className="h-3 w-3" /> {stat.trend}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20">
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trends Charts */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Trends</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="rounded-xl bg-white p-4 shadow-md dark:bg-neutral-900">
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">User Growth</span>
                <div className="mt-2">
                  <Line data={trendData} options={{ responsive: true, plugins: { legend: { display: false } }, animation: { duration: 1200 } }} />
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-xl bg-white p-4 shadow-md dark:bg-neutral-900">
                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Reports Generated</span>
                <div className="mt-2">
                  <Line data={reportData} options={{ responsive: true, plugins: { legend: { display: false } }, animation: { duration: 1200 } }} />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Recent Activity</h2>
            <div className="space-y-2">
              {recentActivities.map((act, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex justify-between rounded-xl bg-white p-3 shadow-sm dark:bg-neutral-900 hover:scale-[1.01] transition-transform"
                >
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">{act.text}</span>
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">{act.time}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
