'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#eb6834', '#1baf7a', '#6250d6', '#e34948']

export default function DashboardStatsChart({ totalUsers, totalRecipes, totalPremiumMembers, totalReports }) {
  const data = [
    { name: 'Users', value: totalUsers || 0 },
    { name: 'Recipes', value: totalRecipes || 0 },
    { name: 'Premium', value: totalPremiumMembers || 0 },
    { name: 'Reports', value: totalReports || 0 },
  ]

  return (
    <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-3xl p-5 shadow-xl shadow-slate-200/50 h-[300px] mt-[10%]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}