import RecipeCard from '@/Component/UI/RecepiCard';
import { getAllRecipe } from '@/lib/api/recipes';
import React from 'react';

const RecipePage = async ({searchParams}) => {
    const searchQuery = await searchParams
    const page = searchQuery.page
    const limit = searchQuery.limit
    const allRecipes = await getAllRecipe(page,limit)
    console.log(allRecipes);
    return (
        <div className='max-w-[1200px] mx-auto py-2'>
            <h1 className="text-[32px] font-bold">Recipes</h1>
            <div>
                <RecipeCard allRecipes={allRecipes}></RecipeCard>

            </div>
        </div>
    );
};

export default RecipePage;