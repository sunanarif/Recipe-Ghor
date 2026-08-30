export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-4 bg-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-orange-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          🍲
        </div>
      </div>
      <p className="text-sm font-semibold text-slate-500 animate-pulse">
        Cooking things up...
      </p>
    </div>
  )
}