'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#eb6834', '#1baf7a', '#6250d6', '#e34948']

export default function DashboardStatsChart({ totalUsers, totalRecipes, totalPremiumMembers, totalReport }) {
  const data = [
    { name: 'Users', value: totalUsers || 0 },
    { name: 'Recipes', value: totalRecipes || 0 },
    { name: 'Premium', value: totalPremiumMembers || 0 },
    { name: 'Reports', value: totalReport || 0 },
  ]

  return (
    <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-xl shadow-slate-200/50 h-[320px] sm:h-[420px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={40} />
          <YAxis allowDecimals={false} tick={{ fontSize: 10 }} width={30} />
          <Tooltip />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}