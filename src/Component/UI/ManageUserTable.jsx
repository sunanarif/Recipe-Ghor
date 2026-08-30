"use client"
import { editBlockUser } from '@/lib/api/action/user';
import { Envelope, Eye, Receipt, Sparkles } from '@gravity-ui/icons';
import { Button, Chip, Table } from '@heroui/react';
import { GoBlocked } from 'react-icons/go';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';



const ManageUserTable = ({ usersData }) => {
  const router = useRouter()
  const handleBlock = async (isBlock, id) => {
    const res = await editBlockUser(id, isBlock)
    if (res.modifiedCount > 0) {
      router.refresh()
    }
  }
  return (
    <div className="w-full bg-white/70 backdrop-blur-md border border-slate-200/80 rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-xl shadow-slate-200/50 mt-6 sm:mt-10">
      {/* Table Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 px-1 sm:px-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-2xl shadow-md shadow-orange-500/20 shrink-0">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">User History</h2>
            <p className="text-xs text-slate-500">View and manage all user</p>
          </div>
        </div>
        <Chip variant="flat" color="warning" size="sm" className="font-bold self-start sm:self-auto">
          {usersData.length} Total Users
        </Chip>
      </div>

      <Table aria-label="Purchase transactions table" className="w-full">
        <Table.ScrollContainer className="rounded-2xl border border-slate-100 overflow-x-auto">
          <Table.Content className="min-w-[600px] bg-white">

            {/* Columns */}
            <Table.Header className="bg-slate-50/80 border-b border-slate-100">
              <Table.Column isRowHeader className="text-xs font-bold uppercase tracking-wider text-slate-500 py-3 sm:py-4 px-3 sm:px-6">
                Recipe Details
              </Table.Column>
              <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 py-3 sm:py-4 px-3 sm:px-6">
                Customer Email
              </Table.Column>
              <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 py-3 sm:py-4 px-3 sm:px-6">
                Role
              </Table.Column>
              <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 py-3 sm:py-4 px-3 sm:px-6 text-right">
                Actions
              </Table.Column>
            </Table.Header>

            {/* Rows */}
            <Table.Body emptyContent={<div className="py-8 text-center text-slate-400">No purchase records found.</div>}>
              {usersData.map((user) => {
                return (
                  <Table.Row
                    key={user._id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Recipe Name Cell */}
                    <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-orange-600 transition-colors truncate max-w-[120px] sm:max-w-none">
                          {user.name}
                        </span>
                      </div>
                    </Table.Cell>

                    {/* Email Cell */}
                    <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                      <div className="flex items-center gap-2 text-slate-600 text-xs sm:text-sm">
                        <Envelope className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="font-medium truncate max-w-[140px] sm:max-w-none">{user.email}</span>
                      </div>
                    </Table.Cell>

                    {/* Status Badge Cell */}
                    <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                      <span className="uppercase inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                        {user.role}
                      </span>
                    </Table.Cell>

                    {/* Action Cell */}
                    <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {
                          user.isBlock ? <Button
                            onClick={() => handleBlock(!user.isBlock, user._id)}
                            size="sm"
                            className="bg-slate-100 hover:bg-green-500 hover:text-white text-slate-700 font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs whitespace-nowrap"
                          >
                            <GoBlocked className="w-4 h-4 shrink-0" />
                            <span>Unblock</span>
                          </Button>
                            :
                            <Button
                              onClick={() => handleBlock(!user.isBlock, user._id)}
                              size="sm"
                              className="bg-slate-100 hover:bg-red-500 hover:text-white text-slate-700 font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs whitespace-nowrap"
                            >
                              <GoBlocked className="w-4 h-4 shrink-0" />
                              <span>Block</span>
                            </Button>
                        }
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

export default ManageUserTable;