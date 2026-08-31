'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#eb6834', '#1baf7a', '#6250d6', '#e34948']

// Custom Tooltip with Dark Mode support
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 p-2.5 rounded-xl shadow-lg text-xs">
        <p className="font-semibold text-slate-700 dark:text-slate-200">{label}</p>
        <p className="font-bold text-orange-500 dark:text-orange-400 mt-0.5">
          Value: {payload[0].value}
        </p>
      </div>
    )
  }
  return null
}

export default function DashboardStatsChart({ totalUsers, totalRecipes, totalPremiumMembers, totalReport }) {
  const data = [
    { name: 'Users', value: totalUsers || 0 },
    { name: 'Recipes', value: totalRecipes || 0 },
    { name: 'Premium', value: totalPremiumMembers || 0 },
    { name: 'Reports', value: totalReport || 0 },
  ]

  return (
    <div className="bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-xl shadow-slate-200/50 dark:shadow-none h-[320px] sm:h-[420px] w-full transition-colors">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 11, fill: 'currentColor' }} 
            className="text-slate-500 dark:text-slate-400 font-medium"
            angle={-20} 
            textAnchor="end" 
            height={40} 
          />
          <YAxis 
            allowDecimals={false} 
            tick={{ fontSize: 11, fill: 'currentColor' }} 
            className="text-slate-500 dark:text-slate-400 font-medium"
            width={30} 
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}