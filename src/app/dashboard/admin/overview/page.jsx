import DashboardStatsCards from '@/Component/Dashboard/DashboardStatsCards';
import { subscription, transaction } from '@/lib/api/action/payment';
import { getAllRecipe } from '@/lib/api/recipes';
import { userInfo } from '@/lib/api/userInfo';
import React from 'react';

const OverviewPage = async() => {
    const user = await userInfo()
    const totalUsers = user.length
    const recipes=await getAllRecipe()
    const totalRecipes = recipes.length
    const premiumMembers = await transaction()
    const totalPremiumMembers=premiumMembers.length
    return (
        <div>
            <DashboardStatsCards totalUsers={totalUsers} totalRecipes={totalRecipes} totalPremiumMembers={totalPremiumMembers}></DashboardStatsCards>
        </div>
    );
};

export default OverviewPage;