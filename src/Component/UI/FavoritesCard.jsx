"use client";

import { Eye, Flame, Bookmark } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
const FavoritesCard = ({ favoriteData }) => {
    const { recipeId, recipeName, image, category, difficulty, cuisine } = favoriteData;
    return (
        <div className="">

            <Card className="w-full max-w-xs h-full p-4 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow rounded-2xl border border-slate-100">
                <div className="space-y-3">
                    {/* Fixed Image Container */}
                    <div className="relative h-48 w-full overflow-hidden rounded-xl bg-slate-100">
                        <Image
                            src={image}
                            alt={recipeName || "Recipe image"}
                            fill
                            sizes="(max-width: 768px) 100vw, 320px"
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                        <h1 className="capitalize text-lg font-bold text-slate-900 line-clamp-1">
                            {recipeName}
                        </h1>
                        <p className="text-sm font-medium text-slate-500 capitalize">
                            {category}
                        </p>
                    </div>
                </div>
                <Link href={`/recipes/${recipeId}`}>
                    <Button className={"font-semibold text-white bg-orange-500 rounded-md"}>Detail <LuArrowUpRight /></Button>
                </Link>

            </Card >
        </div >
    );
};

export default FavoritesCard;