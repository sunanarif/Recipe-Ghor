import FavoritesCard from '@/Component/UI/FavoritesCard';
import RecipeCard from '@/Component/UI/RecepiCard';
import { getFavoritesByUserId } from '@/lib/api/recipes';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyFavoritesPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    const user = session?.user
    const favoritesData = await getFavoritesByUserId(user.id)
    console.log(favoritesData);
    return (
        <div className='space-y-2 mt-5 w-full'>
            <h1 className='text-[32px] font-bold'>ALL Favorites</h1>
            <div className='grid grid-cols-4 gap-6 w-full'>

                {
                    favoritesData.map(favoriteData => <FavoritesCard favoriteData={favoriteData} key={favoriteData._id}></FavoritesCard>)
                }
            </div>

        </div>
    );
};

export default MyFavoritesPage;