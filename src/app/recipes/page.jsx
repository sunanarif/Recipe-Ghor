import RecipeCard from '@/Component/UI/RecepiCard';
import { getAllRecipe } from '@/lib/api/recipes';
import React from 'react';

const RecipePage = async () => {
    const allRecipes = await getAllRecipe()
    console.log(allRecipes);
    return (
        <div className='max-w-[1200px] mx-auto py-2'>
            <h1 className="text-[32px] font-bold">Recipes</h1>
            <div className='grid grid-cols-3 w-full  py-6'>
                {
                    allRecipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe}></RecipeCard>)
                }

            </div>
        </div>
    );
};

export default RecipePage;