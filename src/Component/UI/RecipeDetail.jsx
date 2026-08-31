"use client"
import { ArrowLeft, Bookmark, Clock, Flame, ThumbsUpFill, BookmarkFill } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaLocationArrow } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { addFavorites, updateLike } from "@/lib/api/action/action";
import { getFavoritesByUserId } from "@/lib/api/recipes";
import ReportModal from "./ReportModal";
import toast from "react-hot-toast";

const difficultyStyles = {
    easy: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
    medium: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
    hard: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",
};

const RecipeDetail = ({ recipe }) => {
    const {
        recipeName,
        image,
        category,
        cuisine,
        difficulty,
        prepTime,
        ingredients,
        instructions,
        userName,
        likesCount,
        _id
    } = recipe;

    const difficultyClass =
        difficultyStyles[difficulty?.toLowerCase()] || "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300";

    const ingredientList = ingredients
        ?.split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

    const instructionList = instructions
        ?.split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleFavorites = async () => {
        if (!user?.id) return;
        
        const data = await getFavoritesByUserId(user?.id);
        const favoritesData = {
            userId: user?.id,
            userEmail: user?.email,
            recipeId: _id,
            recipeName,
            category,
            image
        };
        
        const isAlreadyFavorite = data.some((fav) => fav.recipeId === _id);
        if (isAlreadyFavorite) {
            toast.error("You already added this");
            return;
        }

        await addFavorites(favoritesData);
        toast.success('Added to favorites');
    };

    const handleLike = async (id, likesCount) => {
        await updateLike(id, likesCount);
        toast.success('You liked the recipe');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Back Button */}
            <Link href="/recipes" className="inline-block mb-6">
                <Button
                    variant="secondary"
                    className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </Link>

            {/* Image Banner */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800">
                {image && (
                    <Image 
                        src={image} 
                        alt={recipeName || 'Recipe image'} 
                        width={800} 
                        height={400} 
                        className="w-full h-full object-cover rounded unoptimized"
                    />
                )}

                {difficulty && (
                    <div className={`absolute top-4 right-4 flex items-center gap-1 backdrop-blur-md rounded-full px-3 py-1.5 text-sm font-semibold shadow-sm ${difficultyClass}`}>
                        <Flame className="h-4 w-4" />
                        <span className="capitalize">{difficulty}</span>
                    </div>
                )}
            </div>

            {/* Header Details */}
            <div className="mt-6">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{recipeName}</h1>
                {userName && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">By {userName}</p>
                )}

                <div className="flex flex-wrap gap-3 mt-4">
                    <span className="flex items-center gap-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-3 py-1.5 text-sm font-semibold capitalize">
                        <Bookmark className="h-4 w-4" />
                        {category}
                    </span>

                    <span className="flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 text-sm font-semibold capitalize">
                        <FaLocationArrow className="h-4 w-4" />
                        {cuisine}
                    </span>

                    <span className="flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 text-sm font-semibold">
                        <Clock className="h-4 w-4" />
                        {prepTime} mins
                    </span>
                </div>
            </div>

            {/* Ingredients + Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {/* Ingredients Card */}
                <Card className="md:col-span-1 p-5 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-2xl h-fit">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Ingredients</h2>
                    <ul className="space-y-2.5">
                        {ingredientList?.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* Instructions Card */}
                <Card className="md:col-span-2 p-5 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-2xl h-fit">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Instructions</h2>
                    <ol className="space-y-4">
                        {instructionList?.map((step, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-orange-500 text-white text-xs font-bold shrink-0">
                                    {idx + 1}
                                </span>
                                <span className="pt-0.5">{step}</span>
                            </li>
                        ))}
                    </ol>
                </Card>
            </div>

            {/* Action Buttons Card */}
            <Card className="my-6 p-4 border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm rounded-2xl">
                <div className="space-y-3">
                    <Button 
                        onClick={() => handleLike(_id, (likesCount || 0) + 1)} 
                        variant="outline" 
                        className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-200 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white font-bold text-[15px] transition-colors"
                    >
                        <ThumbsUpFill className="w-4 h-4" /> Like
                    </Button>

                    <Button 
                        onClick={handleFavorites} 
                        variant="outline" 
                        className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-200 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white font-bold text-[15px] transition-colors"
                    >
                        <BookmarkFill className="w-4 h-4" /> Favorite Button
                    </Button>

                    <form method="POST" action="/api/payment">
                        <input type="hidden" value={recipeName || ''} name="recipeName" />
                        <input type="hidden" value={_id || ''} name="recipeId"/>
                        
                        <Button 
                            type="submit" 
                            variant="outline" 
                            className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-200 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white font-bold text-[15px] transition-colors"
                        >
                            <BiSolidPurchaseTag className="w-4 h-4" /> Purchase Button
                        </Button>
                    </form>

                    <ReportModal recipeId={_id} />
                </div>
            </Card>
        </div>
    );
};

export default RecipeDetail;