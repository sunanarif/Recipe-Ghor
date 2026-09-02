import ManageRecipeTable from '@/Component/UI/ManageRecipeTable';
import {  getAllRecipeWithoutPagination } from '@/lib/api/recipes';
import React from 'react';

const ManageRecipePage = async() => {
    const recipes = await getAllRecipeWithoutPagination()
    console.log(recipes);
    return (
        <div>
            <ManageRecipeTable recipes={recipes}></ManageRecipeTable>
        </div>
    );
};

export default ManageRecipePage;