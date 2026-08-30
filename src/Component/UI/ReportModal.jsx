import { reportRecipe } from '@/lib/api/action/action';
import { authClient } from '@/lib/auth-client';
import { TriangleExclamation, XmarkShapeFill } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import React, { useState } from 'react';
const REASONS = [
    'Spam or misleading',
    'Inappropriate content',
    'Copyright violation',
    'Incorrect ingredients/instructions',
    'Other',
]
const ReportModal = ({recipeId}) => {
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
                variant="outline" className={"w-full rounded-md hover:bg-orange-500 hover:text-white font-bold text-[15px]"}
            >
                <TriangleExclamation className="w-4 h-4" />
                <span>Report</span>
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                    />

                    {/* Modal Card */}
                    <div className="relative bg-white w-full max-w-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl z-10">
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
                        >
                            <XmarkShapeFill className="w-5 h-5" />
                        </button>

                        {submitted ? (
                            <div className="text-center py-6">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                                    <TriangleExclamation className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Report Submitted</h3>
                                <p className="text-sm text-slate-500 mb-4">Thanks — our team will review this recipe.</p>
                                <Button
                                    onClick={handleClose}
                                    className="bg-slate-900 text-white font-semibold px-6 py-2.5 rounded-xl"
                                >
                                    Close
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl shrink-0">
                                        <TriangleExclamation className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">Report Recipe</h3>
                                        <p className="text-xs text-slate-500">Tell us what&lsquo;s wrong with this recipe</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700">
                                            Reason <span className="text-rose-500">*</span>
                                        </label>
                                        <select
                                            required
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                                        >
                                            <option value="" disabled>Select a reason</option>
                                            {REASONS.map((r) => (
                                                <option key={r} value={r}>{r}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700">
                                            Additional details
                                        </label>
                                        <textarea
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            rows={3}
                                            placeholder="Optional — add more context..."
                                            className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all resize-none"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button
                                            type="button"
                                            onClick={handleClose}
                                            className="bg-slate-100 text-slate-600 font-semibold px-4 py-2.5 rounded-xl"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            isLoading={loading}
                                            className="bg-rose-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition-all"
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