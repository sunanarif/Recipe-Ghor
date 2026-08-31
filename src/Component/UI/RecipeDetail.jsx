"use client"
import { ArrowLeft, Bookmark, BookmarkFill, Clock, Flame, LogoOsi, ThumbsUpFill } from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { MdReport } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { addFavorites, updateLike } from "@/lib/api/action/action";
import { getFavoritesByUserId } from "@/lib/api/recipes";
import ReportModal from "./ReportModal";
import toast from "react-hot-toast";

const difficultyStyles = {
    easy: "bg-emerald-50 text-emerald-600",
    medium: "bg-amber-50 text-amber-600",
    hard: "bg-rose-50 text-rose-600",
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
    console.log(_id);

    const difficultyClass =
        difficultyStyles[difficulty?.toLowerCase()] || "bg-slate-100 text-slate-600";

    const ingredientList = ingredients
        ?.split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

    const instructionList = instructions
        ?.split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

    const {
        data: session,
    } = authClient.useSession()

    const user = session?.user
    console.log("user id", user?.id);
    const handleFavorites = async () => {
        const data = await getFavoritesByUserId(user?.id)
        console.log(data);
        if (user?.id === undefined) {
            return
        }
        const favoritesData = {
            userId: user?.id,
            userEmail: user?.email,
            recipeId: _id,
            recipeName,
            category,
            image
        }
        const isAlreadyFavorite = data.some((fav) => fav.recipeId === _id)
        console.log(isAlreadyFavorite);
        if (isAlreadyFavorite) {
            toast.error("you already add this")
            return
        }
        console.log("sending favorites data", favoritesData);
        const res = await addFavorites(favoritesData)
        toast.success('You add favorites')
        console.log("favorites data res ", res);
    }
    const handleLike = async(id,likesCount)=>{
        console.log(likesCount);
        const res = updateLike(id,likesCount)
        toast.success('You like the recipe')
        console.log(res);
    }
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <Link href="/recipes" className="inline-block mb-6">
                <Button
                    variant="secondary"
                    className="flex items-center gap-2 text-slate-600 font-medium"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </Link>


            <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl bg-slate-100">
                {image && (
                    <Image src={image} alt='image' width={400} height={200} className='w-full h-full object-cover rounded unoptimized'></Image>
                )}

                {difficulty && (
                    <div
                        className={`absolute top-4 right-4 flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold shadow-sm ${difficultyClass}`}
                    >
                        <Flame className="h-4 w-4" />
                        <span className="capitalize">{difficulty}</span>
                    </div>
                )}
            </div>


            <div className="mt-6">
                <h1 className="text-3xl font-bold text-slate-900">{recipeName}</h1>
                {userName && (
                    <p className="text-sm text-slate-500 mt-1">By {userName}</p>
                )}

                <div className="flex flex-wrap gap-3 mt-4">

                    <span className="flex items-center gap-1.5 rounded-full bg-orange-50 text-orange-600 px-3 py-1.5 text-sm font-semibold capitalize">
                        <Bookmark className="h-4 w-4" />
                        {category}
                    </span>

                    <span className="flex items-center gap-1.5 rounded-full bg-slate-100 text-slate-700 px-3 py-1.5 text-sm font-semibold capitalize">
                        <FaLocationArrow className="h-4 w-4" />
                        {cuisine}
                    </span>


                    <span className="flex items-center gap-1.5 rounded-full bg-slate-100 text-slate-700 px-3 py-1.5 text-sm font-semibold">
                        <Clock className="h-4 w-4" />
                        {prepTime} mins
                    </span>

                </div>
            </div>

            {/* Ingredients + Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card className="md:col-span-1 p-5 border border-slate-100 shadow-sm rounded-2xl h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Ingredients</h2>
                    <ul className="space-y-2.5">
                        {ingredientList?.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card className="md:col-span-2 p-5 border border-slate-100 shadow-sm rounded-2xl h-fit">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Instructions</h2>
                    <ol className="space-y-4">
                        {instructionList?.map((step, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-slate-600">
                                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-orange-500 text-white text-xs font-bold shrink-0">
                                    {idx + 1}
                                </span>
                                <span className="pt-0.5">{step}</span>
                            </li>
                        ))}
                    </ol>
                </Card>
            </div>
            <Card className="my-4">
                <div className="space-y-3 mt-2 ">
                    <Button onClick={()=> handleLike(_id,likesCount+1)} variant="outline" className={"w-full rounded-md hover:bg-orange-500 hover:text-white font-bold text-[15px]"}><ThumbsUpFill />Like</Button>
                    <Button onClick={handleFavorites} variant="outline" className={"w-full rounded-md hover:bg-orange-500 hover:text-white font-bold text-[15px]"}><BookmarkFill />Favorite Button</Button>
                    <form method="POST" action={'/api/payment'}>
                        <input type="hidden" value={recipeName} name="recipeName" />
                        <input type="hidden" value={_id} name="recipeId"/>
                        
                        <Button type="submit" variant="outline" className={"w-full rounded-md hover:bg-orange-500 hover:text-white font-bold text-[15px]"}><BiSolidPurchaseTag />Purchase Button</Button>
                    </form>
                    {/* <Button variant="outline" className={"w-full rounded-md hover:bg-orange-500 hover:text-white font-bold text-[15px]"}><MdReport />Report <ReportModal/></Button> */}
                    <ReportModal recipeId={_id} />
                </div>
            </Card>
        </div>
    );
};

export default RecipeDetail;