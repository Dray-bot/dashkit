'use client'

import { useState, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import DashboardCharts from '@/components/DashboardCharts'
import DataTable from '@/components/DataTable'
import Filters from '@/components/Filters'
import { ChevronDown } from 'lucide-react'

export default function Analytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filters, setFilters] = useState({ dateRange: '7d', category: 'all' })
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const chartRef = useRef(null)

  const handleExport = (type) => {
    if (!chartRef.current) return
    if (type === 'csv') chartRef.current.exportCSV()
    if (type === 'line') chartRef.current.exportLinePNG()
    if (type === 'bar') chartRef.current.exportBarPNG()
    setDropdownOpen(false)
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6 space-y-6">
          {/* Page Header with Export */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Analytics</h1>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Export <ChevronDown className="ml-2 h-4 w-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1 text-sm text-gray-700">
                    <button
                      onClick={() => handleExport('csv')}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Export CSV
                    </button>
                    <button
                      onClick={() => handleExport('line')}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Line Chart PNG
                    </button>
                    <button
                      onClick={() => handleExport('bar')}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Bar Chart PNG
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Filters */}
          <Filters onFilterChange={setFilters} />

          {/* Charts Section */}
          <DashboardCharts ref={chartRef} filters={filters} />

          {/* Table Section */}
          <DataTable filters={filters} />
        </main>
      </div>
    </div>
  )
}
