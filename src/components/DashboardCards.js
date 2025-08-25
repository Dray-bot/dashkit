export default function DashboardCards() {
  const stats = [
    { title: 'Total Users', value: '12,450', change: '+4.2%' },
    { title: 'Active Subscriptions', value: '3,210', change: '+2.1%' },
    { title: 'Monthly Revenue', value: '$24,800', change: '+8.4%' },
    { title: 'Bounce Rate', value: '32%', change: '-1.2%' },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
        >
          <p className="text-sm text-neutral-500">{stat.title}</p>
          <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
          <p
            className={`mt-1 text-sm font-medium ${
              stat.change.startsWith('+')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  )
}
