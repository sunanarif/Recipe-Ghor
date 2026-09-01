import { purchase } from '@/lib/api/action/payment'
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { ArrowRight, BookOpen, Check, Clock, Envelope } from '@gravity-ui/icons'
import { Button, Card } from '@heroui/react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })
  const user = session?.user



  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const payment = await purchase({...metadata,session_id})
    console.log(payment);
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50/50">
        <Card className="max-w-xl w-full p-6 sm:p-10 shadow-xl border border-slate-100 bg-white text-center rounded-3xl">

          {/* Animated Check Icon */}
          <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100/80 text-emerald-600 shadow-inner">
            <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
          </div>

          {/* Header */}
          <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-orange-600 bg-orange-50 rounded-full border border-orange-100">
            Payment Successful 🎉
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome to Premium Chef Club!
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Thank you for subscribing! Your journey to mastering culinary skills starts now.
          </p>

          {/* Receipt Box */}
          <div className="my-6 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Envelope className="w-4 h-4 text-orange-500 shrink-0" />
              <span>
                Confirmation sent to: <strong className="text-slate-800">{customerEmail}</strong>
              </span>
            </div>

            {session_id && (
              <div className="flex items-center gap-2 text-slate-500 pt-2 border-t border-slate-200/60 text-xs font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">Session ID: {session_id}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link href="/recipes" className="w-full sm:w-auto">
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Explore Recipes
              </Button>
            </Link>

            <Link href="/dashboard/user/profile" className="w-full sm:w-auto">
              <Button
                variant="bordered"
                className="w-full border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Footer Support */}
          <p className="text-xs text-slate-400 mt-8">
            Have any questions? Reach out to us at{' '}
            <a
              href="mailto:support@recipeghor.com"
              className="text-orange-500 font-medium hover:underline"
            >
              support@recipeghor.com
            </a>
          </p>
        </Card>
      </div>
    )
  }
}