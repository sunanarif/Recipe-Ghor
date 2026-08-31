"use client"
import { deleteRecipeById } from '@/lib/api/action/action';
import { ArrowUpRightFromSquare, Eye, Pencil, TrashBin } from '@gravity-ui/icons';
import { Button, Chip, Table, Tooltip } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const MyRecipeTable = ({ recipes = [] }) => {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState(null);

    const handleDeleteItem = async (id) => {
        setLoadingId(id);
        try {
            const res = await deleteRecipeById(id);
            if (res?.deletedCount > 0 || res?.success) {
                toast.error('Recipe Delete');
                router.refresh();
            }
        } catch (error) {
            console.error("Failed to delete recipe:", error);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-xl shadow-slate-200/50 dark:shadow-none transition-colors">

            {/* Header Info */}
            <div className="flex items-center justify-between mb-4 sm:mb-5 px-1 sm:px-2">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 sm:p-2.5 bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-xl sm:rounded-2xl shadow-md shadow-orange-500/20 shrink-0">
                        <ArrowUpRightFromSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                            My Recipes
                        </h2>
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                            Manage, edit, or remove your created recipes
                        </p>
                    </div>
                </div>
                <Chip variant="flat" color="warning" size="sm" className="font-bold text-xs dark:bg-orange-500/10 dark:text-orange-400">
                    {recipes.length} Recipes
                </Chip>
            </div>

            {/* Responsive Table Container */}
            <div className="w-full rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                <Table aria-label="Recipes management table" className="w-full">
                    <Table.ScrollContainer className="overflow-x-auto">
                        <Table.Content className="min-w-[550px] bg-white dark:bg-slate-900">
                            <Table.Header className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800">
                                <Table.Column isRowHeader className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 py-3 sm:py-4 px-3 sm:px-6">
                                    Recipe
                                </Table.Column>
                                <Table.Column className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 py-3 sm:py-4 px-3 sm:px-6">
                                    Category
                                </Table.Column>
                                <Table.Column className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 py-3 sm:py-4 px-3 sm:px-6">
                                    Cuisine
                                </Table.Column>
                                <Table.Column className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 py-3 sm:py-4 px-3 sm:px-6 text-right">
                                    Actions
                                </Table.Column>
                            </Table.Header>

                            <Table.Body emptyContent={<div className="py-8 text-center text-slate-400 dark:text-slate-500 text-sm">No recipes found.</div>}>
                                {recipes.map((recipe) => (
                                    <Table.Row
                                        key={recipe._id}
                                        className="border-b border-slate-50 dark:border-slate-800/50 last:border-0 hover:bg-orange-50/30 dark:hover:bg-slate-800/40 transition-colors group"
                                    >
                                        {/* Recipe Name Cell */}
                                        <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                                            <div className="flex items-center gap-2.5 sm:gap-3">
                                                {recipe.image ? (
                                                    <img
                                                        src={recipe.image}
                                                        alt={recipe.recipeName}
                                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl object-cover border border-slate-100 dark:border-slate-800 shadow-sm shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                                                        🍲
                                                    </div>
                                                )}
                                                <span className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                                                    {recipe.recipeName}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* Category Cell */}
                                        <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                                            <Chip variant="flat" color="warning" size="sm" className="font-semibold text-[10px] sm:text-xs capitalize dark:bg-orange-500/10 dark:text-orange-400">
                                                {recipe.category || 'General'}
                                            </Chip>
                                        </Table.Cell>

                                        {/* Cuisine Cell */}
                                        <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6">
                                            <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 capitalize">
                                                {recipe.cuisine || 'Standard'}
                                            </span>
                                        </Table.Cell>

                                        {/* Action Cell */}
                                        <Table.Cell className="py-3 sm:py-4 px-3 sm:px-6 text-right">
                                            <div className="flex items-center justify-end gap-1 sm:gap-1.5">

                                                {/* View Button */}
                                                <Tooltip content="View Recipe">
                                                    <Link href={`/recipes/${recipe._id}`}>
                                                        <Button
                                                            size="sm"
                                                            className="w-7 h-7 sm:w-8 sm:h-8 min-w-0 p-0 bg-slate-100 hover:bg-orange-500 hover:text-white dark:bg-slate-800 dark:hover:bg-orange-500 text-slate-600 dark:text-slate-300 rounded-lg sm:rounded-xl transition-all shadow-sm flex items-center justify-center"
                                                        >
                                                            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                        </Button>
                                                    </Link>
                                                </Tooltip>

                                                {/* Edit Button */}
                                                <Tooltip content="Edit Recipe">
                                                    <Link href={`/dashboard/user/my-recipe/${recipe._id}/edit`}>
                                                        <Button
                                                            size="sm"
                                                            className="w-7 h-7 sm:w-8 sm:h-8 min-w-0 p-0 bg-slate-100 hover:bg-blue-500 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-500 text-slate-600 dark:text-slate-300 rounded-xl transition-all shadow-sm flex items-center justify-center"
                                                        >
                                                            <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                        </Button>
                                                    </Link>
                                                </Tooltip>

                                                {/* Delete Button */}
                                                <Tooltip content="Delete Recipe">
                                                    <Button
                                                        size="sm"
                                                        isLoading={loadingId === recipe._id}
                                                        onClick={() => handleDeleteItem(recipe._id)}
                                                        className="w-7 h-7 sm:w-8 sm:h-8 min-w-0 p-0 bg-rose-50 hover:bg-rose-500 hover:text-white dark:bg-rose-950/40 dark:hover:bg-rose-600 text-rose-600 dark:text-rose-400 dark:hover:text-white rounded-lg sm:rounded-xl transition-all shadow-sm flex items-center justify-center"
                                                    >
                                                        {!loadingId && <TrashBin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                                                    </Button>
                                                </Tooltip>

                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
};

export default MyRecipeTable;