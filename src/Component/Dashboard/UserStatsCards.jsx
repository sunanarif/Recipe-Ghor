'use client'

import { authClient } from '@/lib/auth-client'
import { Sparkles, Heart, ChartPie, PersonFill } from '@gravity-ui/icons'
import Link from 'next/link'

export default function UserStatsCards({
  totalRecipes = 0,
  totalFavorites = 0,
  totalLikesReceived = 0,
  
}) {
  const {
          data: session,
          isPending, //loading state
          error, //error object
          refetch //refetch the session
      } = authClient.useSession()
      
      const user = session?.user
  const isPremium = user?.plan
  const FREE_RECIPE_LIMIT = 2
  const recipeLimitReached = !isPremium && totalRecipes >= FREE_RECIPE_LIMIT
  const progressPercent = Math.min((totalRecipes / FREE_RECIPE_LIMIT) * 100, 100)

  const stats = [
    { label: 'Total Recipes', value: totalRecipes, icon: Sparkles, from: 'from-orange-500', to: 'to-amber-500', shadow: 'shadow-orange-500/20' },
    { label: 'Total Favorites', value: totalFavorites, icon: Heart, from: 'from-rose-500', to: 'to-pink-500', shadow: 'shadow-rose-500/20' },
    { label: 'Total Likes Received', value: totalLikesReceived, icon: ChartPie, from: 'from-emerald-500', to: 'to-teal-500', shadow: 'shadow-emerald-500/20' },
  ]

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      
      {/* 3 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl shadow-slate-200/40 dark:shadow-none flex items-center gap-4 transition-all hover:translate-y-[-2px]"
            >
              <div className={`p-3 bg-gradient-to-tr ${stat.from} ${stat.to} text-white rounded-2xl shadow-md ${stat.shadow} shrink-0`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight mt-0.5">
                  {stat.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Membership Status & Recipe Limit Banner */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className={`p-3 rounded-2xl shadow-md text-white shrink-0 ${isPremium ? 'bg-gradient-to-tr from-violet-500 to-purple-500 shadow-purple-500/20' : 'bg-slate-300 dark:bg-slate-700'}`}>
            <PersonFill className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {isPremium ? 'Premium Member' : 'Free Member'}
              </p>
              {isPremium ? (
                <span className="uppercase inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800">
                  Pro
                </span>
              ) : recipeLimitReached ? (
                <span className="uppercase inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                  Limit reached
                </span>
              ) : (
                <span className="uppercase inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  Free plan
                </span>
              )}
            </div>

            {/* Progress indicator for free members */}
            {!isPremium && (
              <div className="mt-2 w-full max-w-[200px]">
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1 font-medium">
                  <span>Recipes Limit</span>
                  <span>{totalRecipes}/{FREE_RECIPE_LIMIT}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${recipeLimitReached ? 'bg-rose-500' : 'bg-orange-500'}`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upgrade Call To Action for free users */}
        {isPremium ?<Link
            href="/dashboard/user/profile"
            className="w-full sm:w-auto text-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-xl shadow-md shadow-purple-500/20 transition-all shrink-0"
          >
            Go to Profile
          </Link>: (
          <Link
            href="/dashboard/user/profile"
            className="w-full sm:w-auto text-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-xl shadow-md shadow-purple-500/20 transition-all shrink-0"
          >
            Upgrade to Premium
          </Link>
        )}

      </div>
    </div>
  )
}