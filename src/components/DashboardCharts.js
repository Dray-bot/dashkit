'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import html2canvas from 'html2canvas'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

// helper to generate mock data for last N days
function generateData(days) {
  const today = new Date()
  const data = []

  for (let i = days; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)

    data.push({
      date: date.toISOString().slice(5, 10), // MM-DD format
      sales: Math.floor(Math.random() * 500) + 100,
      users: Math.floor(Math.random() * 300) + 50,
      marketing: Math.floor(Math.random() * 150) + 20,
    })
  }
  return data
}

const allData = generateData(90)

const DashboardCharts = forwardRef(function DashboardCharts({ filters }, ref) {
  const lineRef = useRef(null)
  const barRef = useRef(null)

  // apply date range filter
  const rangeDays =
    filters.dateRange === '7d'
      ? 7
      : filters.dateRange === '30d'
      ? 30
      : 90

  let chartData = allData.slice(-rangeDays).map((item) => {
    let value
    if (filters.category === 'sales') value = item.sales
    else if (filters.category === 'users') value = item.users
    else if (filters.category === 'marketing') value = item.marketing
    else value = item.sales + item.users + item.marketing

    return { date: item.date, value }
  })

  const downloadPNG = async (targetRef, filename) => {
    if (!targetRef.current) return
    const canvas = await html2canvas(targetRef.current)
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
  }

  const downloadCSV = () => {
    const headers = 'Date,Value\n'
    const rows = chartData.map((d) => `${d.date},${d.value}`).join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `data_${filters.dateRange}_${filters.category}.csv`
    link.click()
  }

  // expose functions to parent
  useImperativeHandle(ref, () => ({
    exportLinePNG: () => downloadPNG(lineRef, 'line_chart.png'),
    exportBarPNG: () => downloadPNG(barRef, 'bar_chart.png'),
    exportCSV: downloadCSV,
  }))

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Line Chart */}
      <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="mb-4 text-lg font-semibold">Trends</h2>
        <div ref={lineRef} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="mb-4 text-lg font-semibold">Performance</h2>
        <div ref={barRef} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
})

export default DashboardCharts
