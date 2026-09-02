'use client';

import { HeartFill } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LuArrowUpRight } from 'react-icons/lu';

const RecipeList = ({ initialRecipes = [] }) => {
    if (!initialRecipes.length) return null;

    const duplicatedRecipes = [...initialRecipes, ...initialRecipes];

    return (
        <div className="w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing">
            <motion.div
                className="flex gap-6 w-max"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    ease: 'linear',
                    duration: 25, 
                    repeat: Infinity,
                }}
                whileHover={{ transition: { duration: 0 } }} 
            >
                {duplicatedRecipes.map((recipe, index) => {
                    const likes = recipe?.likescount ?? recipe?.likecount ?? recipe?.likeCount ?? recipe?.likes ?? 0;

                    return (
                        <div
                            key={`${recipe._id}-${index}`}
                            className="w-[320px] flex-shrink-0 border border-gray-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm bg-background"
                        >
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />

                            <h3 className="font-bold text-lg mt-3 line-clamp-1">{recipe.title}</h3>
                            <p className="text-gray-500 text-sm mt-1 capitalize">
                                {recipe.recipeName || recipe.category || 'General'}
                            </p>

                            <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100 dark:border-zinc-800">
                                <Link href={`/recipes/${recipe._id}`}>
                                    <Button className={"font-semibold text-white bg-orange-500 rounded-md"}>Detail <LuArrowUpRight /></Button>
                                </Link>

                                <span className="text-sm font-semibold flex items-center gap-1.5 text-rose-500">
                                    <HeartFill></HeartFill>{recipe.likesCount}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default RecipeList;