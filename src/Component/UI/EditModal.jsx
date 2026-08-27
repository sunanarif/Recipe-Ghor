"use client";

import { editRecipeById } from "@/lib/api/action/action";
import { uploadImage } from "@/lib/api/uploadImage";
import { Camera, Clock, Flame, Pencil, Rocket } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    Select,
    ListBox,
    Card,
} from '@heroui/react'
import { redirect } from "next/navigation";
export function EditModal({ recipe }) {
    // console.log(recipe);
    const { _id } = recipe
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const formValues = Object.fromEntries(formData.entries())

        let imageUrl = recipe.image  // default: purono image rekhe dao

        // Notun file select korle tokhoni upload koro
        if (formValues.image && formValues.image.size > 0) {
            const uploaded = await uploadImage(formValues.image)
            imageUrl = uploaded.url
        }

        const res = await editRecipeById( _id,{ ...formValues, image: imageUrl })
        console.log(res)
        if(res.modifiedCount>0){
            redirect("/dashboard/user/my-recipe")
        }
    }
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">

            <div className="flex gap-3 pb-6 border-b border-slate-100 mb-6">
                <div className="p-3 bg-orange-500 text-white rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center text-xl">
                    🍲
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Edit Recipe</h1>
                    <p className="text-sm text-slate-500">
                        Share your culinary magic with the Recipe Ghor community
                    </p>
                </div>
            </div>

            <Form onSubmit={handleSubmit} className="space-y-6">

                <Fieldset>
                    <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField name="recipeName" isRequired defaultValue={recipe.recipeName}>
                            <Label>Recipe Name</Label>
                            <Input placeholder="e.g., Kacchi Biryani" />
                        </TextField>

                        <div className="flex flex-col gap-1.5">
                            <TextField name='image' type='file'>
                                <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                                    <Camera className="h-4 w-4" /> Recipe Image (ImgBB)
                                </label>

                                {recipe.image && (
                                    <img
                                        src={recipe.image}
                                        alt="Current recipe"
                                        className="w-16 h-16 object-cover rounded-lg mb-1.5 border border-slate-200"
                                    />
                                )}

                                <input
                                    type="file"
                                    name='image'
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer border border-slate-200 rounded-xl"
                                />
                            </TextField>
                        </div>
                    </Fieldset.Group>
                </Fieldset>

                <Fieldset>
                    <Fieldset.Group className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Select name="category" isRequired placeholder="Select category" defaultValue={recipe.category}>
                            <Label>Category</Label>
                            <Select.Trigger>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="breakfast" textValue="Breakfast">Breakfast</ListBox.Item>
                                    <ListBox.Item id="lunch" textValue="Lunch">Lunch</ListBox.Item>
                                    <ListBox.Item id="dinner" textValue="Dinner">Dinner</ListBox.Item>
                                    <ListBox.Item id="dessert" textValue="Dessert">Dessert</ListBox.Item>
                                    <ListBox.Item id="snacks" textValue="Snacks">Snacks</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <Select name="cuisine" isRequired placeholder="Select cuisine" defaultValue={recipe.cuisine}>
                            <Label>Cuisine Type</Label>
                            <Select.Trigger>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="bangladeshi" textValue="Bangladeshi">Bangladeshi</ListBox.Item>
                                    <ListBox.Item id="indian" textValue="Indian">Indian</ListBox.Item>
                                    <ListBox.Item id="chinese" textValue="Chinese">Chinese</ListBox.Item>
                                    <ListBox.Item id="italian" textValue="Italian">Italian</ListBox.Item>
                                    <ListBox.Item id="thai" textValue="Thai">Thai</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <Select name="difficulty" isRequired placeholder="Select difficulty" defaultValue={recipe.difficulty}>
                            <Label className="flex items-center gap-1">
                                <Flame className="h-4 w-4 text-slate-400" /> Difficulty Level
                            </Label>
                            <Select.Trigger>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="easy" textValue="Easy">Easy</ListBox.Item>
                                    <ListBox.Item id="medium" textValue="Medium">Medium</ListBox.Item>
                                    <ListBox.Item id="hard" textValue="Hard">Hard</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </Fieldset.Group>
                </Fieldset>

                <div className="max-w-xs">
                    <TextField name="prepTime" isRequired type="number" defaultValue={recipe.prepTime}>
                        <Label className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-slate-400" /> Preparation Time (mins)
                        </Label>
                        <Input placeholder="e.g., 45" />
                    </TextField>
                </div>

                <div className="w-full space-y-3">
                    <TextField name="ingredients" isRequired defaultValue={recipe.ingredients}>
                        <label className="text-sm font-semibold text-slate-700">Ingredients</label>

                        <TextArea placeholder="Write Ingredients..." rows={4} />
                    </TextField>



                </div>

                <TextField name="instructions" isRequired defaultValue={recipe.instructions}>
                    <Label>Cooking Instructions</Label>
                    <TextArea placeholder="Write step-by-step instructions..." rows={4} />
                </TextField>

                <div className="flex justify-end pt-4">
                    <Button
                        type="submit"
                        color="warning"

                        className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600"
                    >
                        Save Change
                    </Button>
                </div>
            </Form>

        </div>
    );
}