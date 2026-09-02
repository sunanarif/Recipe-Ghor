import { getAllRecipeWithoutPagination } from '@/lib/api/recipes';
import React from 'react';
import RecipeList from './RecipeList';

const MostLike = async () => {
    const data = await getAllRecipeWithoutPagination();
    
    // ১. নিরাপদভাবে অ্যারে এক্সট্র্যাক্ট করা
    const recipes = Array.isArray(data) ? data : data?.recipes || [];

    // ২. likecount অনুযায়ী সোর্ট করে সেরা ৬টি ফিল্টার করা
    const sortedRecipes = [...recipes]
        .sort((a, b) => (Number(b?.likesCount) || 0) - (Number(a?.likesCount) || 0))
        .slice(0, 6);

    return (
        <div className="max-w-[1200px] mx-auto my-10">
            <h2 className="text-[32px] font-bold mb-6">Most Liked Recipes</h2>
            {/* সঠিকভাবে initialRecipes নামে Prop পাস করা হলো */}
            <RecipeList initialRecipes={sortedRecipes} />
        </div>
    );
};

export default MostLike;