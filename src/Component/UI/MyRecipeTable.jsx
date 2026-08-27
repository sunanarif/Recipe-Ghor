"use client"
import { deleteRecipeById } from '@/lib/api/action/action';
import { Eye, Pencil, TrashBin } from '@gravity-ui/icons';
import { Button, Table } from '@heroui/react';
import { redirect } from 'next/navigation';
import React from 'react';
import { EditModal } from './EditModal';
import EditMyRecipePage from '@/app/dashboard/user/my-recipe/[id]/edit/page';
import Link from 'next/link';

const MyRecipeTable = ({ recipes }) => {
    const handleDeleteItem = async (id) => {

        const res = await deleteRecipeById(id)
        console.log("DELETE RESPONSE:", res)
        if (res.deletedCount > 0) {
            redirect('/dashboard/user/my-recipe')
        }

    }
    return (
        <div>
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Team members" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>Recipe</Table.Column>
                            <Table.Column>Category</Table.Column>
                            <Table.Column>Cuisine</Table.Column>
                            <Table.Column>Action</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                recipes.map(
                                    (recipe) => {
                                        return <Table.Row key={recipe._id}>
                                            <Table.Cell>{recipe.recipeName}</Table.Cell>
                                            <Table.Cell>{recipe.category}</Table.Cell>
                                            <Table.Cell>{recipe.cuisine}</Table.Cell>
                                            <Table.Cell >
                                                <div className={"flex gap-2"}>

                                                    <Button variant='secondary'><Eye/></Button>
                                                    <Button variant='secondary' onClick={() => { handleDeleteItem(recipe._id) }}><TrashBin /></Button>
                                                    <Link href={`/dashboard/user/my-recipe/${recipe._id}/edit`}>
                                                        <Button variant='secondary'><Pencil/></Button>

                                                    </Link>
                                                </div>

                                            </Table.Cell>

                                        </Table.Row>
                                    }
                                )
                            }


                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default MyRecipeTable; 