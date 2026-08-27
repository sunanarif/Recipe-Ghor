import MyRecipeTable from '@/Component/UI/MyRecipeTable';
import {  getRecipeByUserId } from '@/lib/api/recipes';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyRecipePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    const user = session?.user
    const recipes = await getRecipeByUserId(user?.id)

    return (
        <div className='my-20'>
            <MyRecipeTable recipes={recipes}></MyRecipeTable>


        </div>
    );
};

export default MyRecipePage;