import RecipeCard from '@/Component/UI/RecepiCard';
import { getAllRecipe } from '@/lib/api/recipes';
import { Button, Input } from '@heroui/react';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { Label, ListBox, Select } from "@heroui/react";
import CategoryFilter from '@/Component/UI/CategoryFilter';
const RecipePage = async ({ searchParams }) => {
    const searchQuery = await searchParams
    const searchText = searchQuery.search || ''
    const category = searchQuery?.category || '';
    const page = searchQuery.page || 1
    const limit = searchQuery.limit
    const allRecipes = await getAllRecipe(page, searchText,category)
    console.log(allRecipes);
    return (
        <div className='max-w-[1200px] mx-auto py-2'>
            <h1 className="text-[32px] font-bold">Recipes</h1>
            <div className='my-10 '>
                <form className='flex gap-2 items-center' action={'/recipes'}>
                    <Input name='search' placeholder='Search Recipe' />
                    
                    <Button type='submit'><BiSearch /> Search</Button>
                </form>
            </div>
            <CategoryFilter></CategoryFilter>
            <div>
                <RecipeCard allRecipes={allRecipes}></RecipeCard>

            </div>
        </div>
    );
};

export default RecipePage;