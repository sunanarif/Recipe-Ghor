'use client'

import { Sparkles, Heart, ChartPie, PersonFill } from '@gravity-ui/icons'

export default function UserStatsCards({
  totalRecipes = 0,
  totalFavorites ,
  totalLikesReceived = 0,
  isPremium = false,
}) {
  const FREE_RECIPE_LIMIT = 2
  const recipeLimitReached = !isPremium && totalRecipes >= FREE_RECIPE_LIMIT

  const stats = [
    { label: 'Total Recipes', value: totalRecipes, icon: Sparkles, from: 'from-orange-500', to: 'to-amber-500' },
    { label: 'Total Favorites', value: totalFavorites, icon: Heart, from: 'from-rose-500', to: 'to-pink-500' },
    { label: 'Total Likes Received', value: totalLikesReceived, icon: ChartPie, from: 'from-emerald-500', to: 'to-teal-500' },
  ]

  return (
    <div className="w-full space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl shadow-slate-200/50 flex items-center gap-4"
            >
              <div className={`p-3 bg-gradient-to-tr ${stat.from} ${stat.to} text-white rounded-2xl shadow-md shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 leading-tight">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Membership Status */}
      <div className="bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl shadow-slate-200/50 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl shadow-md text-white shrink-0 ${isPremium ? 'bg-gradient-to-tr from-violet-500 to-purple-500' : 'bg-slate-300'}`}>
            <PersonFill className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">
              {isPremium ? 'Premium Member' : 'Free Member'}
            </p>
            {!isPremium && (
              <p className="text-xs text-slate-500">
                {totalRecipes}/{FREE_RECIPE_LIMIT} recipes used
              </p>
            )}
          </div>
        </div>

        {isPremium ? (
          <span className="uppercase inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200/60">
            Premium
          </span>
        ) : recipeLimitReached ? (
          <span className="uppercase inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200/60">
            Limit reached
          </span>
        ) : (
          <span className="uppercase inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200/60">
            Free plan
          </span>
        )}
      </div>
    </div>
  )
}