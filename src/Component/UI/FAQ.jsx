'use client'

import { useState } from 'react'
import { ChevronDown } from '@gravity-ui/icons'

const faqs = [
  {
    question: 'How do I add my own recipe?',
    answer: 'Sign in, go to your dashboard, and click "Add Recipe". Fill in the details, upload a photo, and publish it for everyone to see.',
  },
  {
    question: 'Is Recipe Ghor free to use?',
    answer: 'Yes, browsing and saving favorites is completely free. Free accounts can add up to 2 recipes — upgrade to premium for unlimited recipes and extra features.',
  },
  {
    question: 'What do I get with a premium membership?',
    answer: 'Premium members can add unlimited recipes, get a premium badge on their profile, and unlock access to exclusive purchased recipes from other creators.',
  },
  {
    question: 'How does purchasing a recipe work?',
    answer: 'Some creators mark their recipes as paid. You can purchase these directly through the recipe page, and they will appear in your "Purchased Recipes" section.',
  },
  {
    question: 'Can I report a recipe?',
    answer: 'Yes. On any recipe page, click the "Report" button and choose a reason (spam, inappropriate content, incorrect info, etc). Our team reviews all reports.',
  },
  {
    question: 'How do I edit or delete my recipe?',
    answer: 'Go to "My Recipes" in your dashboard. You will find Edit and Delete options next to each recipe you have created.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10 sm:py-16">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
          Everything you need to know about Recipe Ghor
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 text-left px-4 sm:px-6 py-4 sm:py-5 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-orange-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}