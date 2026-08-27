'use client'
import { useState } from 'react'
import {
    Form,
    Fieldset,
    TextField,
    Label,
    Input,
    TextArea,
    Select,
    ListBox,
    Button,
    Card,
} from '@heroui/react'
import { Plus, TrashBin, Camera, Clock, Flame } from '@gravity-ui/icons'
import { addRecipe } from '@/lib/api/action/action'
import { uploadImage } from '@/lib/api/uploadImage'
import { authClient } from '@/lib/auth-client'

export default function AddRecipePage() {
    const [loading, setLoading] = useState(false)

    const {
            data: session,
            isPending, //loading state
            error, //error object
            refetch //refetch the session
        } = authClient.useSession()
    
        const user = session?.user
        // console.log(user.id);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const formValues = Object.fromEntries(formData.entries())
        console.log(formValues);

        const image = await uploadImage(formValues.image)
        console.log(image.url);

        const res = await addRecipe({...formValues,image:image.url,userId:user?.id,userEmail:user?.email,userName:user?.name})
        console.log(res);

    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <Card className="p-6 shadow-lg border border-slate-100">
                <div className="flex gap-3 pb-6 border-b border-slate-100 mb-6">
                    <div className="p-3 bg-orange-500 text-white rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center text-xl">
                        🍲
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Add New Recipe</h1>
                        <p className="text-sm text-slate-500">
                            Share your culinary magic with the Recipe Ghor community
                        </p>
                    </div>
                </div>

                <Form onSubmit={handleSubmit} className="space-y-6">

                    <Fieldset>
                        <Fieldset.Group className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField name="recipeName" isRequired>
                                <Label>Recipe Name</Label>
                                <Input placeholder="e.g., Kacchi Biryani" />
                            </TextField>

                            <div className="flex flex-col gap-1.5">
                                <TextField name='image' type='file'>
                                    <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
                                        <Camera className="h-4 w-4" /> Recipe Image (ImgBB)
                                    </label>
                                    <input
                                        type="file"
                                        name='image'
                                        required
                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer border border-slate-200 rounded-xl"
                                    />
                                </TextField>
                            </div>
                        </Fieldset.Group>
                    </Fieldset>

                    <Fieldset>
                        <Fieldset.Group className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Select name="category" isRequired placeholder="Select category">
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

                            <Select name="cuisine" isRequired placeholder="Select cuisine">
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

                            <Select name="difficulty" isRequired placeholder="Select difficulty">
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
                        <TextField name="prepTime" isRequired type="number">
                            <Label className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-slate-400" /> Preparation Time (mins)
                            </Label>
                            <Input placeholder="e.g., 45" />
                        </TextField>
                    </div>

                    <div className="w-full space-y-3">
                        <TextField name="ingredients" isRequired>
                            <label className="text-sm font-semibold text-slate-700">Ingredients</label>

                            <TextArea placeholder="Write Ingredients..." rows={4} />
                        </TextField>



                    </div>

                    <TextField name="instructions" isRequired>
                        <Label>Cooking Instructions</Label>
                        <TextArea placeholder="Write step-by-step instructions..." rows={4} />
                    </TextField>

                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            color="warning"
                            isLoading={loading}
                            className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600"
                        >
                            Publish Recipe
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}