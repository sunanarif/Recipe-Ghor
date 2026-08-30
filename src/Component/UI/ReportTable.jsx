'use client'
import React from 'react';
import { Envelope, Eye, Receipt, Sparkles } from '@gravity-ui/icons';
import { Button, Chip, Table } from '@heroui/react';
import { GoBlocked } from 'react-icons/go';
import { deleteRecipeById, deleteReportById } from '@/lib/api/action/action';
import { useRouter } from 'next/navigation';

const ReportTable = ({ reports }) => {
    const router = useRouter();
    const handleDeleteItem = async (recipeId,_id) => {
        // console.log(id);
        const confirmDelete = confirm("Are you sure you want to delete this recipe?");
        if (!confirmDelete) return;

        
        try {
            const res = await deleteRecipeById(recipeId);
            const reportRes = await deleteReportById(_id);
            console.log(res);
            if (res?.deletedCount > 0 || res?.success) {
                router.refresh();
            }
        } catch (error) {
            console.error("Failed to delete recipe:", error);
        } 
    };
    const handleDeleteReport = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this recipe?");
        if (!confirmDelete) return;

        
        try {
            const res = await deleteReportById(id);
            if (res?.deletedCount > 0 || res?.success) {
                router.refresh();
            }
        } catch (error) {
            console.error("Failed to delete recipe:", error);
        }
    };
    return (
        <div className="w-full bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-xl shadow-slate-200/50 mt-6 sm:mt-10">
            {/* Table Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 px-1 sm:px-2">
                <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-2xl shadow-md shadow-orange-500/20 shrink-0">
                        <Receipt className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Reports</h2>
                        <p className="text-xs text-slate-500">View and manage all report</p>
                    </div>
                </div>
                <Chip variant="flat" color="warning" size="sm" className="font-bold self-start sm:self-auto">
                    {reports.length} Total Reports
                </Chip>
            </div>

            <Table aria-label="Purchase transactions table" className="w-full">
                <Table.ScrollContainer className="rounded-2xl border border-slate-100 overflow-x-auto">
                    <Table.Content className="min-w-[600px] bg-white">

                        {/* Columns */}
                        <Table.Header className="bg-slate-50/80 border-b border-slate-100">
                            <Table.Column isRowHeader className="text-xs font-bold uppercase tracking-wider text-slate-500 py-3 sm:py-4 px-3 sm:px-6">
                                Reporter Email
                            </Table.Column>
                            <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 py-3 sm:py-4 px-3 sm:px-6">
                                Resson
                            </Table.Column>
                            <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 py-3 sm:py-4 px-3 sm:px-6">
                                Date
                            </Table.Column>
                            <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 py-3 sm:py-4 px-3 sm:px-6 text-right">
                                Actions
                            </Table.Column>
                        </Table.Header>

                        {/* Rows */}
                        <Table.Body emptyContent={<div className="py-8 text-center text-slate-400">No purchase records found.</div>}>
                            {reports.map((report) => {
                                return (
                                    <Table.Row
                                        key={report._id}
                                        className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors group"
                                    >
                                        {/* Recipe Name Cell */}
                                        <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                                            <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm">
                                                <Envelope className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span className="font-medium truncate max-w-[140px] sm:max-w-none">{report.reporterEmail}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* Email Cell */}
                                        <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                                            {report.reason}
                                        </Table.Cell>

                                        {/* Status Badge Cell */}
                                        <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                                            <span className="uppercase inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                                                {new Date(report.createdAt).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </Table.Cell>

                                        {/* Action Cell */}
                                        <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    onClick={() => handleDeleteItem(report.recipeId,report._id)}
                                                    size="sm"
                                                    className="bg-slate-100 hover:bg-red-500 hover:text-white text-slate-700 font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs whitespace-nowrap"
                                                >
                                                    <GoBlocked className="w-4 h-4 shrink-0" />
                                                    <span>Remove</span>
                                                </Button>

                                                <Button
                                                    onClick={() => handleDeleteReport(report._id)}
                                                    size="sm"
                                                    className="bg-slate-100 hover:bg-red-500 hover:text-white text-slate-700 font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs whitespace-nowrap"
                                                >
                                                    <GoBlocked className="w-4 h-4 shrink-0" />
                                                    <span>Dismiss</span>
                                                </Button>

                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default ReportTable;