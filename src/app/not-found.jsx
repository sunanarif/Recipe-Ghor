import Link from 'next/link'
import { House, ArrowLeft } from '@gravity-ui/icons'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 text-center bg-gradient-to-b from-orange-50/50 to-white">
      <div className="text-7xl sm:text-8xl mb-4">🍲</div>

      <h1 className="text-5xl sm:text-6xl font-extrabold text-orange-500 tracking-tight">404</h1>

      <h2 className="mt-3 text-xl sm:text-2xl font-bold text-slate-900">
        Recipe Not Found
      </h2>
      <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-md">
        Looks like this page got lost in the kitchen. The recipe or page you're looking for doesn't exist.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link href="/">
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-orange-500/30 transition-all">
            <House className="w-4 h-4" />
            Back to Home
          </button>
        </Link>
        <Link href="/recipes">
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-all">
            <ArrowLeft className="w-4 h-4" />
            Browse Recipes
          </button>
        </Link>
      </div>
    </div>
  )
}