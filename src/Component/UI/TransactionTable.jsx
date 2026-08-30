import React from 'react';
import { ArrowUpRightFromSquare, Envelope, Eye, Pencil, Sparkles, TrashBin } from '@gravity-ui/icons';
import { Button, Chip, Table, Tooltip } from '@heroui/react';
import Link from 'next/link';

import { IoSparklesSharp } from 'react-icons/io5';
const TransactionTable = ({ transactions }) => {
    return (
        <div className="w-full bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-xl shadow-slate-200/50 mt-6 sm:mt-10">

            {/* Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 px-1 sm:px-2">
                <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-2xl shadow-md shadow-orange-500/20 shrink-0">
                        <ArrowUpRightFromSquare className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Transaction</h2>
                    </div>
                </div>
                <Chip variant="flat" color="warning" size="sm" className="font-bold self-start sm:self-auto">
                    {transactions.length} Transaction
                </Chip>
            </div>

            <Table aria-label="Recipes management table" className="w-full">
                <Table.ScrollContainer className="rounded-2xl border border-slate-100 overflow-x-auto">
                    <Table.Content className="min-w-[650px] bg-white">

                        {/* Columns */}
                        <Table.Header className="bg-slate-50/80 border-b border-slate-100">
                            <Table.Column isRowHeader className="text-xs font-bold uppercase tracking-wider text-slate-500 py-3 sm:py-4 px-3 sm:px-6">
                                Name
                            </Table.Column>
                            <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 py-3 sm:py-4 px-3 sm:px-6">
                                Email
                            </Table.Column>
                            <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 py-3 sm:py-4 px-3 sm:px-6">
                                Price
                            </Table.Column>
                            <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 py-3 sm:py-4 px-3 sm:px-6 text-right">
                                Status
                            </Table.Column>
                            <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 py-3 sm:py-4 px-3 sm:px-6 text-right">
                                Transaction ID
                            </Table.Column>
                        </Table.Header>

                        {/* Rows */}
                        <Table.Body emptyContent={<div className="py-8 text-center text-slate-400">No purchase records found.</div>}>
                            {transactions.map((transaction) => {
                                return (
                                    <Table.Row
                                        key={transaction._id}
                                        className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors group"
                                    >
                                        {/* Name Cell */}
                                        <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0">
                                                    <IoSparklesSharp className="w-4 h-4" />
                                                </div>
                                                <span className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-orange-600 transition-colors truncate max-w-[100px] sm:max-w-none">
                                                    {transaction.name}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* Email Cell */}
                                        <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                                            <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm">
                                                <Envelope className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span className="font-medium truncate max-w-[140px] sm:max-w-none">{transaction.email}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* Price Cell */}
                                        <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                                            <span className="uppercase inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60 whitespace-nowrap">
                                                14.00
                                            </span>
                                        </Table.Cell>

                                        {/* Status Cell */}
                                        <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6 text-right">
                                            {
                                                transaction.session_id ? (
                                                    <span className="uppercase inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60 whitespace-nowrap">
                                                        Paid
                                                    </span>
                                                ) : <div></div>
                                            }
                                        </Table.Cell>

                                        {/* Transaction ID Cell */}
                                        <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6 text-right">
                                            <span className="uppercase inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60 truncate max-w-[100px] sm:max-w-none">
                                                {transaction.session_id}
                                            </span>
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

export default TransactionTable;