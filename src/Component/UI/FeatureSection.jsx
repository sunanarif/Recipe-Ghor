import { getAllRecipe } from '@/lib/api/recipes';
import React from 'react';
import RecipeCard from './RecepiCard';

const FeatureSection = async () => {
    const recipes = await getAllRecipe()
    const filterRecipes = recipes.filter(recipe => recipe.isFeatured === true)
    console.log(filterRecipes);
    return (
        <div className='max-w-[1200px] mx-auto py-2'>
            <h1 className="text-[32px] font-bold mt-4">Feature Recipes</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 w-full  py-6'>
                {
                    filterRecipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe}></RecipeCard>)
                }
            </div>
        </div>
    );
};

export default FeatureSection;