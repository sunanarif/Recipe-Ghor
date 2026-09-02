"use client";

import { Eye, Flame, Bookmark, HeartFill } from "@gravity-ui/icons";
import { Button, Card, Pagination } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";

const difficultyStyles = {
    easy: "bg-emerald-50 text-emerald-600",
    medium: "bg-amber-50 text-amber-600",
    hard: "bg-rose-50 text-rose-600",
};

export default function RecipeCard({ allRecipes }) {
    const pages = []

    for (let i = 1; i <= allRecipes.total_page; i++) {
        pages.push(i)
    }

    return (
        <div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full  py-6'>

                {
                    allRecipes.result.map(recipe => {
                        return <div key={recipe._id}>
                            <Card className=' h-full p-4'>
                                <Image src={recipe.image} alt='image' width={400} height={200} className='w-full h-[200px] object-cover rounded'></Image>
                                {recipe.difficulty && (
                                    <div
                                        className={`absolute top-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${difficultyStyles[recipe.difficulty?.toLowerCase()]}`}
                                    >
                                        <Flame className="h-3.5 w-3.5" />
                                        <span className="capitalize">{recipe.difficulty}</span>
                                    </div>
                                )}
                                <div className='space-y-1'>
                                    <h1 className='capitalize text-[20px] font-bold'>{recipe.recipeName}</h1>
                                    <div className='text-[1rem]'>
                                        <p className="text-gray-500 capitalize">{recipe.cuisine}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <Link href={`/recipes/${recipe._id}`}>
                                            <Button className={"font-semibold text-white bg-orange-500 rounded-md"}>Detail <LuArrowUpRight /></Button>
                                        </Link>
                                        <div className="flex items-center gap-2">
                                            <HeartFill />{recipe.likesCount}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                    })
                }
            </div>
            <Pagination size="sm">
                <Pagination.Summary>

                </Pagination.Summary>
                <Pagination.Content>
                    <Pagination.Item>
                        <Pagination.Previous
                            isDisabled={allRecipes.page === 1}
                        >
                            <Link className="flex gap-2" href={`/recipes?page=${allRecipes.page - 1}`}>
                                <Pagination.PreviousIcon />
                                Prev
                            </Link>
                        </Pagination.Previous>
                    </Pagination.Item>
                    {pages.map((p) => (
                        <Link key={p} href={`/recipes?page=${p}`}>
                            <Pagination.Item >
                                <Pagination.Link isActive={p === allRecipes.page} className={`${p === allRecipes.page ? "bg-red-500" : ""}`}>
                                    {p}
                                </Pagination.Link>
                            </Pagination.Item>
                        </Link>
                    ))}
                    <Pagination.Item>
                        <Pagination.Next
                            isDisabled={allRecipes.page === allRecipes.total_page}
                        >
                            <Link className="flex gap-2" href={`/recipes?page=${allRecipes.page + 1}`}>
                                Next
                            </Link>
                            <Pagination.NextIcon />
                        </Pagination.Next>
                    </Pagination.Item>
                </Pagination.Content>
            </Pagination>
        </div>
    );
}