import {  Heart, Sparkles, Person } from '@gravity-ui/icons'
import { GiCookingPot } from 'react-icons/gi'
import { LuChefHat } from 'react-icons/lu'

const stats = [
  { label: 'Recipes Shared', value: '500+', icon: GiCookingPot },
  { label: 'Home Cooks', value: '1,200+', icon: Person },
  { label: 'Cuisines Covered', value: '10+', icon: Sparkles },
]

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10 sm:py-16">

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 text-white rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center text-3xl">
          🍲
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          About Recipe Ghor
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mt-3 max-w-xl mx-auto">
          A home for anyone who loves cooking, sharing, and discovering recipes — from traditional Bangladeshi dishes to flavors from around the world.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-center"
            >
              <div className="w-10 h-10 mx-auto mb-3 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Story */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-2xl shadow-md shadow-orange-500/20">
            <LuChefHat className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Our Story</h2>
        </div>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Recipe Ghor started with a simple idea — cooking is better when it's shared. Whether it's a family Kacchi Biryani recipe passed down for generations or a quick weeknight dinner idea, everyone has something worth sharing. We built this platform so home cooks could publish their own recipes, discover new ones, save their favorites, and connect over good food.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-gradient-to-tr from-rose-500 to-pink-500 text-white rounded-2xl shadow-md shadow-rose-500/20">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Our Mission</h2>
        </div>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          To make cooking accessible and enjoyable for everyone — no matter your skill level. We celebrate home cooking, support recipe creators, and keep our community a safe, welcoming place to explore new dishes every day.
        </p>
      </div>

    </div>
  )
}