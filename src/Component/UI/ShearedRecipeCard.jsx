"use client";

import { Eye, Flame, Bookmark } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";

const difficultyStyles = {
    easy: "bg-emerald-50 text-emerald-600",
    medium: "bg-amber-50 text-amber-600",
    hard: "bg-rose-50 text-rose-600",
};

export default function ShearedRecipeCard({ recipe }) {
    const { _id, recipeName, image, category, difficulty, cuisine } = recipe;

    const difficultyClass =
        difficultyStyles[difficulty?.toLowerCase()] || "bg-slate-100 text-slate-600";

    return (
        <div>
            
            <Card className=' h-full p-4'>
                <Image src={image} alt='image' width={400} height={200} className='w-full h-[200px] object-cover rounded'></Image>
                {difficulty && (
                    <div
                        className={`absolute top-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${difficultyClass}`}
                    >
                        <Flame className="h-3.5 w-3.5" />
                        <span className="capitalize">{difficulty}</span>
                    </div>
                )}
                <div className='space-y-1'>
                    <h1 className='capitalize text-[20px] font-bold'>{recipeName}</h1>
                    <div className='text-[1rem]'>
                        <p className="text-gray-500 capitalize">{cuisine}</p>
                    </div>
                    <Link href={`/recipes/${_id}`}>
                        <Button className={"font-semibold text-white bg-orange-500 rounded-md"}>Detail <LuArrowUpRight /></Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}