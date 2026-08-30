import DashboardStatsChart from '@/Component/Dashboard/DashboardStatsChart';


import { subscription, transaction } from '@/lib/api/action/payment';
import { getAllRecipe } from '@/lib/api/recipes';
import { userInfo } from '@/lib/api/userInfo';
import React from 'react';

const OverviewPage = async () => {
    const user = await userInfo()
    const totalUsers = user.length
    const recipes = await getAllRecipe()
    const totalRecipes = recipes.length
    const premiumMembers = await transaction()
    const totalPremiumMembers = premiumMembers.length

    return (
        <div className="w-full flex flex-col items-center space-y-6 p-4 sm:p-6 mt-[50%] md:mt-[10%]">
            <DashboardStatsChart
                totalUsers={totalUsers}
                totalRecipes={totalRecipes}
                totalPremiumMembers={totalPremiumMembers}
            />
            
        </div>
    );
};

export default OverviewPage;