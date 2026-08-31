"use client"
import { editBlockUser } from '@/lib/api/action/user';
import { Envelope, Receipt, Sparkles } from '@gravity-ui/icons';
import { Button, Chip, Table } from '@heroui/react';
import { GoBlocked } from 'react-icons/go';
import React from 'react';
import { useRouter } from 'next/navigation';

const ManageUserTable = ({ usersData = [] }) => {
  const router = useRouter();

  const handleBlock = async (isBlock, id) => {
    const res = await editBlockUser(id, isBlock);
    if (res?.modifiedCount > 0) {
      router.refresh();
    }
  };

  return (
    <div className="w-full bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl  sm:rounded-3xl p-3 sm:p-6 shadow-xl shadow-slate-200/50 dark:shadow-none mt-6 sm:mt-10 transition-colors">
      
      {/* Table Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 px-1 sm:px-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-2xl shadow-md shadow-orange-500/20 shrink-0">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              User History
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              View and manage all users
            </p>
          </div>
        </div>
        <Chip variant="flat" color="warning" size="sm" className="font-bold self-start sm:self-auto dark:bg-orange-500/10 dark:text-orange-400">
          {usersData.length} Total Users
        </Chip>
      </div>

      <Table aria-label="User management table" className="w-full">
        <Table.ScrollContainer className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-x-auto">
          <Table.Content className="min-w-[600px] bg-white dark:bg-slate-900">

            {/* Columns */}
            <Table.Header className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
              <Table.Column isRowHeader className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 py-3 sm:py-4 px-3 sm:px-6">
                User Details
              </Table.Column>
              <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 py-3 sm:py-4 px-3 sm:px-6">
                Customer Email
              </Table.Column>
              <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 py-3 sm:py-4 px-3 sm:px-6">
                Role
              </Table.Column>
              <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 py-3 sm:py-4 px-3 sm:px-6 text-right">
                Actions
              </Table.Column>
            </Table.Header>

            {/* Rows */}
            <Table.Body emptyContent={<div className="py-8 text-center text-slate-400 dark:text-slate-500 text-sm">No user records found.</div>}>
              {usersData.map((user) => (
                <Table.Row
                  key={user._id}
                  className="border-b border-slate-50 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  {/* User Name Cell */}
                  <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-sm shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate max-w-[120px] sm:max-w-none">
                        {user.name}
                      </span>
                    </div>
                  </Table.Cell>

                  {/* Email Cell */}
                  <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                      <Envelope className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                      <span className="font-medium truncate max-w-[140px] sm:max-w-none">{user.email}</span>
                    </div>
                  </Table.Cell>

                  {/* Role Badge Cell */}
                  <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                    <span className="uppercase inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                      {user.role}
                    </span>
                  </Table.Cell>

                  {/* Action Cell */}
                  <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {user.isBlock ? (
                        <Button
                          onClick={() => handleBlock(!user.isBlock, user._id)}
                          size="sm"
                          className="bg-slate-100 dark:bg-slate-800 hover:bg-green-500 dark:hover:bg-green-600 hover:text-white text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs whitespace-nowrap"
                        >
                          <GoBlocked className="w-4 h-4 shrink-0" />
                          <span>Unblock</span>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleBlock(!user.isBlock, user._id)}
                          size="sm"
                          className="bg-slate-100 dark:bg-slate-800 hover:bg-red-500 dark:hover:bg-red-600 hover:text-white text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs whitespace-nowrap"
                        >
                          <GoBlocked className="w-4 h-4 shrink-0" />
                          <span>Block</span>
                        </Button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default ManageUserTable;