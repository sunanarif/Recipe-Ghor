import { getAllRecipeWithoutPagination } from '@/lib/api/recipes';
import React from 'react';
import RecipeList from './RecipeList';

const MostLike = async () => {
    const data = await getAllRecipeWithoutPagination();
    

    const recipes = Array.isArray(data) ? data : data?.recipes || [];

  
    const sortedRecipes = [...recipes]
        .sort((a, b) => (Number(b?.likesCount) || 0) - (Number(a?.likesCount) || 0))
        .slice(0, 6);

    return (
        <div className="max-w-[1200px] mx-auto my-10">
            <h2 className="text-[32px] font-bold mb-6">Most Liked Recipes</h2>
           
            <RecipeList initialRecipes={sortedRecipes} />
        </div>
    );
};

export default MostLike;