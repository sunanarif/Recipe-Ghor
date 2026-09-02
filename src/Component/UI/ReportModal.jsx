import { reportRecipe } from '@/lib/api/action/action';
import { authClient } from '@/lib/auth-client';
import { TriangleExclamation, XmarkShapeFill } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
const REASONS = [
    'Spam or misleading',
    'Inappropriate content',
    'Copyright violation',
    'Incorrect ingredients/instructions',
    'Other',
]
const ReportModal = ({ recipeId }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [reason, setReason] = useState('')
    const [details, setDetails] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const { data: session } = authClient.useSession()
    const user = session?.user

    const handleClose = () => {
        setIsOpen(false)
        setReason('')
        setDetails('')
        setSubmitted(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!reason) return
        setLoading(true)
        try {
            await reportRecipe({
                recipeId,
                reporterEmail: user?.email,
                reason: details ? `${reason}: ${details}` : reason,
                status: 'pending',
                createdAt: new Date().toISOString(),
            })
            setSubmitted(true)
        } catch (error) {
            console.error('Failed to submit report:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                size="sm"
                variant="outline"
                className="w-full rounded-md hover:bg-orange-500 hover:text-white font-bold text-[15px] dark:border-slate-700 dark:text-slate-200"
            >
                <TriangleExclamation className="w-4 h-4" />
                <span>Report</span>
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm transition-opacity"
                    />

                    {/* Modal Card */}
                    <div className="relative bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 w-full max-w-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl z-10 transition-colors">
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200 transition-colors"
                        >
                            <XmarkShapeFill className="w-5 h-5" />
                        </button>

                        {submitted ? (
                            <div className="text-center py-6">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                                    <TriangleExclamation className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Report Submitted</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Thanks — our team will review this recipe.</p>
                                <Button
                                    onClick={handleClose}
                                    className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold px-6 py-2.5 rounded-xl"
                                >
                                    Close
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl shrink-0">
                                        <TriangleExclamation className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">Report Recipe</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Tell us what&lsquo;s wrong with this recipe</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            Reason <span className="text-rose-500">*</span>
                                        </label>
                                        <select
                                            required
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                                        >
                                            <option value="" disabled>Select a reason</option>
                                            {REASONS.map((r) => (
                                                <option key={r} value={r}>{r}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                            Additional details
                                        </label>
                                        <textarea
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            rows={3}
                                            placeholder="Optional — add more context..."
                                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all resize-none"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button
                                            type="button"
                                            onClick={handleClose}
                                            className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold px-4 py-2.5 rounded-xl"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            isLoading={loading}
                                            className="bg-rose-500 dark:bg-rose-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-rose-500/30 hover:bg-rose-600 dark:hover:bg-rose-500 transition-all"
                                        >
                                            Submit Report
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default ReportModal;