import { getAllRecipeWithoutPagination } from '@/lib/api/recipes';
import React from 'react';

import ShearedRecipeCard from './ShearedRecipeCard';

const FeatureSection = async () => {
    const recipes = await getAllRecipeWithoutPagination()
    const filterRecipes = recipes.filter(recipe => recipe.isFeatured === true)
    console.log(filterRecipes);
    return (
        <div className='max-w-[1200px] mx-auto py-2'>
            <h1 className="text-[32px] font-bold mt-4">Feature Recipes</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 w-full gap-4 py-6'>
                {
                    filterRecipes.map(recipe => <ShearedRecipeCard key={recipe._id} recipe={recipe}></ShearedRecipeCard>)
                }
            </div>
        </div>
    );
};

export default FeatureSection;