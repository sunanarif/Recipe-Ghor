import UserStatsCards from '@/Component/Dashboard/UserStatsCards';
import { getFavoritesByUserId, getRecipeById, getRecipeByUserId } from '@/lib/api/recipes';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const OverviewPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // pass headers object
    })
    const user = session?.user
    const favorites = await getFavoritesByUserId(user?.id)
    const recipes = await getRecipeByUserId(user?.id)
    const totalRecipes = recipes.length
    const totalFavorites = favorites.length
    return (
        <div>
            <UserStatsCards totalFavorites={totalFavorites} totalRecipes={totalRecipes}></UserStatsCards>
        </div>
    );
};

export default OverviewPage;