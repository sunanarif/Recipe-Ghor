import React from 'react';
import { Eye, Receipt, Sparkles, Envelope } from '@gravity-ui/icons';
import { Button, Table, Chip } from '@heroui/react';
import Link from 'next/link';

const PaymentTable = ({ purchases = [] }) => {
  return (
    <div className="w-full bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-xl shadow-slate-200/50 dark:shadow-none mt-6 sm:mt-10 transition-colors">
      
      {/* Table Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 px-1 sm:px-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-2xl shadow-md shadow-orange-500/20 shrink-0">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Purchase History
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              View and manage all user recipe transactions
            </p>
          </div>
        </div>
        <Chip variant="flat" color="warning" size="sm" className="font-bold self-start sm:self-auto dark:bg-orange-500/10 dark:text-orange-400">
          {purchases.length} Total Purchase
        </Chip>
      </div>

      <Table aria-label="Purchase transactions table" className="w-full">
        <Table.ScrollContainer className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-x-auto">
          <Table.Content className="min-w-[600px] bg-white dark:bg-slate-900">

            {/* Columns */}
            <Table.Header className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
              <Table.Column isRowHeader className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 py-3 sm:py-4 px-3 sm:px-6">
                Recipe Details
              </Table.Column>
              <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 py-3 sm:py-4 px-3 sm:px-6">
                Customer Email
              </Table.Column>
              <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 py-3 sm:py-4 px-3 sm:px-6">
                Status
              </Table.Column>
              <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 py-3 sm:py-4 px-3 sm:px-6 text-right">
                Actions
              </Table.Column>
            </Table.Header>

            {/* Rows */}
            <Table.Body emptyContent={<div className="py-8 text-center text-slate-400 dark:text-slate-500">No purchase records found.</div>}>
              {purchases.map((purchase) => {
                return (
                  <Table.Row
                    key={purchase._id}
                    className="border-b border-slate-50 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Recipe Name Cell */}
                    <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-sm shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate max-w-[120px] sm:max-w-none">
                          {purchase.recipeName || 'Unnamed Recipe'}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Email Cell */}
                    <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                        <Envelope className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="font-medium truncate max-w-[140px] sm:max-w-none">{purchase.userEmail}</span>
                      </div>
                    </Table.Cell>

                    {/* Status Badge Cell */}
                    <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                      <span className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 whitespace-nowrap">
                        Completed
                      </span>
                    </Table.Cell>

                    {/* Action Cell */}
                    <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/recipes/${purchase.recipeId}`}>
                          <Button
                            size="sm"
                            className="bg-slate-100 hover:bg-orange-500 hover:text-white dark:bg-slate-800 dark:hover:bg-orange-500 text-slate-700 dark:text-slate-200 dark:hover:text-white font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs whitespace-nowrap"
                          >
                            <Eye className="w-4 h-4 shrink-0" />
                            <span>View</span>
                          </Button>
                        </Link>
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

export default PaymentTable;