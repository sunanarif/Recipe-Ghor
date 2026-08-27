import { EditModal } from '@/Component/UI/EditModal';
import { getRecipeById } from '@/lib/api/recipes';
import React from 'react';

const EditMyRecipePage = async({params}) => {
    const {id} = await params
    console.log(id);
    const recipe = await getRecipeById(id)
    // console.log(recipe);
    return (
        <div>
            <EditModal key={recipe._id} recipe={recipe}></EditModal>
        </div>
    );
};

export default EditMyRecipePage;