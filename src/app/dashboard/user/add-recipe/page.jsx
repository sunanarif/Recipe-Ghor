'use client'

import { useState } from 'react'
import { Button, Card } from '@heroui/react'
import { Camera, Clock, Flame } from '@gravity-ui/icons'
import { addRecipe } from '@/lib/api/action/action'
import { uploadImage } from '@/lib/api/uploadImage'
import { authClient } from '@/lib/auth-client'

export default function AddRecipePage() {
  const [loading, setLoading] = useState(false)

  const { data: session } = authClient.useSession()
  const user = session?.user

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const formValues = Object.fromEntries(formData.entries())

      const image = await uploadImage(formValues.image)

      const data = {
        ...formValues,
        image: image?.url || '',
        userId: user?.id,
        userEmail: user?.email,
        userName: user?.name,
        isFeatured:false,
        likesCount:0
      }
      console.log(data);
      const res = await addRecipe(data)

      console.log('Recipe added:', res)
    } catch (error) {
      console.error('Error adding recipe:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <Card className="p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-100">
        
        {/* Page Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
          <div className="p-3 bg-orange-500 text-white rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center text-xl shrink-0">
            🍲
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              Add New Recipe
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Share your culinary magic with the Recipe Ghor community
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Recipe Name & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">
                Recipe Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="recipeName"
                required
                placeholder="e.g., Kacchi Biryani"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Camera className="h-4 w-4 text-slate-500" />
                Recipe Image (ImgBB) <span className="text-rose-500">*</span>
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          {/* Row 2: Category, Cuisine, Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                name="category"
                required
                defaultValue=""
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              >
                <option value="" disabled>Select category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">
                Cuisine Type <span className="text-rose-500">*</span>
              </label>
              <select
                name="cuisine"
                required
                defaultValue=""
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              >
                <option value="" disabled>Select cuisine</option>
                <option value="bangladeshi">Bangladeshi</option>
                <option value="indian">Indian</option>
                <option value="chinese">Chinese</option>
                <option value="italian">Italian</option>
                <option value="thai">Thai</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-1">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-orange-500" />
                Difficulty Level <span className="text-rose-500">*</span>
              </label>
              <select
                name="difficulty"
                required
                defaultValue=""
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              >
                <option value="" disabled>Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Row 3: Prep Time */}
          <div className="w-full sm:max-w-xs flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-slate-500" />
              Prep Time (mins) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              name="prepTime"
              required
              min="1"
              placeholder="e.g., 45"
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          {/* Row 4: Ingredients */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Ingredients <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="ingredients"
              required
              rows={4}
              placeholder="Write ingredients (e.g. 1 kg Rice, 500g Chicken)..."
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          {/* Row 5: Instructions */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Cooking Instructions <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="instructions"
              required
              rows={4}
              placeholder="Write step-by-step instructions..."
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              color="warning"
              isLoading={loading}
              className="w-full sm:w-auto bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all"
            >
              Publish Recipe
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}