"use client"
import React from 'react';
import { ArrowUpRightFromSquare, Eye, Pencil, TrashBin } from '@gravity-ui/icons';
import { Button, Chip, Table, Tooltip } from '@heroui/react';

import Link from 'next/link';
import { deleteRecipeById, editFeature } from '@/lib/api/action/action';
import { redirect, useRouter } from 'next/navigation';


const ManageRecipeTable = ({ recipes }) => {
    const router = useRouter()
    const handleFeature = async (id, isFeatured) => {
        console.log(isFeatured);
        const res = await editFeature(id, isFeatured)
        if (res.modifiedCount > 0) {
            router.refresh()
        }
        // console.log(res);
    }
    const handleDeleteItem = async (id) => {

        const res = await deleteRecipeById(id)
        console.log("DELETE RESPONSE:", res)
        if (res.deletedCount > 0) {
            router.refresh()
        }

    }
    return (
        <div className="w-full bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-3xl p-4 sm:p-6 shadow-xl shadow-slate-200/50 mt-[10%]">

            {/* Header Info */}
            <div className="flex items-center justify-between mb-5 px-2">
                <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-2xl shadow-md shadow-orange-500/20">
                        <ArrowUpRightFromSquare className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight">My Recipes</h2>
                        <p className="text-xs text-slate-500">Manage, edit, or remove your created recipes</p>
                    </div>
                </div>
                <Chip variant="flat" color="warning" size="sm" className="font-bold">
                    {recipes.length} Recipes
                </Chip>
            </div>

            <Table aria-label="Recipes management table" className="w-full">
                <Table.ScrollContainer className="rounded-2xl border border-slate-100 overflow-hidden">
                    <Table.Content className="min-w-[650px] bg-white">

                        {/* Columns */}
                        <Table.Header className="bg-slate-50/80 border-b border-slate-100">
                            <Table.Column isRowHeader className="text-xs font-bold uppercase tracking-wider text-slate-500 py-4 px-6">
                                Recipe
                            </Table.Column>
                            <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 py-4 px-6">
                                Category
                            </Table.Column>
                            <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 py-4 px-6">
                                Cuisine
                            </Table.Column>
                            <Table.Column className="text-xs font-bold uppercase tracking-wider text-slate-500 py-4 px-6 text-right">
                                Actions
                            </Table.Column>
                        </Table.Header>

                        {/* Rows */}
                        <Table.Body emptyContent={<div className="py-8 text-center text-slate-400">No recipes found.</div>}>
                            {recipes.map((recipe) => {
                                return (
                                    <Table.Row
                                        key={recipe._id}
                                        className="border-b border-slate-50 last:border-0 hover:bg-orange-50/30 transition-colors group"
                                    >
                                        {/* Recipe Name Cell */}
                                        <Table.Cell className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                {recipe.image ? (
                                                    <img
                                                        src={recipe.image}
                                                        alt={recipe.recipeName}
                                                        className="w-10 h-10 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0">
                                                        🍲
                                                    </div>
                                                )}
                                                <span className="font-bold text-slate-800 text-sm group-hover:text-orange-600 transition-colors">
                                                    {recipe.recipeName}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* Category Cell */}
                                        <Table.Cell className="py-4 px-6">
                                            <Chip variant="flat" color="warning" size="sm" className="font-semibold text-xs capitalize">
                                                {recipe.category || 'General'}
                                            </Chip>
                                        </Table.Cell>

                                        {/* Cuisine Cell */}
                                        <Table.Cell className="py-4 px-6">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
                                                {recipe.cuisine || 'Standard'}
                                            </span>
                                        </Table.Cell>

                                        {/* Action Cell */}
                                        <Table.Cell className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-1.5">


                                                <Tooltip content="View Recipe">

                                                    {
                                                        recipe.isFeatured ? <Button
                                                            onClick={() => handleFeature(recipe._id, !recipe.isFeatured)}
                                                            size="sm"
                                                            className=" p-4 bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-600 rounded-xl transition-all shadow-sm flex items-center justify-center"
                                                        >
                                                            UnFetature
                                                        </Button> :
                                                            <Button
                                                                onClick={() => handleFeature(recipe._id, !recipe.isFeatured)}
                                                                size="sm"
                                                                className=" p-4 bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-600 rounded-xl transition-all shadow-sm flex items-center justify-center"
                                                            >
                                                                Fetature
                                                            </Button>
                                                    }

                                                </Tooltip>

                                                {/* Edit Button */}
                                                <Tooltip content="Edit Recipe">
                                                    <Link href={`/dashboard/user/my-recipe/${recipe._id}/edit`}>
                                                        <Button
                                                            size="sm"
                                                            className=" p-4 bg-slate-100 hover:bg-blue-500 hover:text-white text-slate-600 rounded-xl transition-all shadow-sm flex items-center justify-center"
                                                        >
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                </Tooltip>

                                                {/* Delete Button */}
                                                <Tooltip content="Delete Recipe">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleDeleteItem(recipe._id)}
                                                        className=" p-4 bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-600 rounded-xl transition-all shadow-sm flex items-center justify-center"
                                                    >
                                                        Delete
                                                    </Button>
                                                </Tooltip>

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

export default ManageRecipeTable;