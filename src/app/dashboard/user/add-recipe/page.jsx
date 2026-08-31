'use client'

import { useState } from 'react'
import { Button, Card } from '@heroui/react'
import { Camera, Clock, Flame } from '@gravity-ui/icons'
import { addRecipe } from '@/lib/api/action/action'
import { uploadImage } from '@/lib/api/uploadImage'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AddRecipePage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const { data: session } = authClient.useSession()
  const user = session?.user

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const imageFile = formData.get('image')
      
      const image = await uploadImage(imageFile)
      const formValues = Object.fromEntries(formData.entries())

      const data = {
        ...formValues,
        image: image?.url || '',
        userId: user?.id,
        userEmail: user?.email,
        userName: user?.name,
        isFeatured: false,
        likesCount: 0
      }
      
      const res = await addRecipe(data);
      if (res.insertedId) {
        toast.success('Recipe Added Successfully! 🍲')
        router.push('/dashboard/user/my-recipe')
      }
    } catch (error) {
      console.error('Error adding recipe:', error)
      toast.error('Failed to add recipe!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
      <Card className="p-4 sm:p-6 md:p-8 shadow-sm sm:shadow-md border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 transition-colors">
        
        {/* Header Section */}
        <div className="flex items-center gap-3 pb-5 sm:pb-6 border-b border-slate-100 dark:border-slate-800 mb-6 sm:mb-8">
          <div className="p-2.5 sm:p-3 bg-orange-500 text-white rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center text-lg sm:text-2xl shrink-0">
            🍲
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              Add New Recipe
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Share your culinary magic with the Recipe Ghor community
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          
          {/* Grid Layout for Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Recipe Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                Recipe Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="recipeName"
                required
                placeholder="e.g., Kacchi Biryani"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>

            {/* Recipe Image */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Camera className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                Recipe Image (ImgBB) <span className="text-rose-500">*</span>
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className="block w-full text-xs sm:text-sm text-slate-500 dark:text-slate-400 file:mr-3 file:py-2 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-50 dark:file:bg-orange-950/50 file:text-orange-700 dark:file:text-orange-400 hover:file:bg-orange-100 dark:hover:file:bg-orange-900/50 cursor-pointer border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/30 dark:bg-slate-800/50"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                name="category"
                required
                defaultValue=""
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              >
                <option value="" disabled>Select category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>

            {/* Cuisine Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                Cuisine Type <span className="text-rose-500">*</span>
              </label>
              <select
                name="cuisine"
                required
                defaultValue=""
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              >
                <option value="" disabled>Select cuisine</option>
                <option value="bangladeshi">Bangladeshi</option>
                <option value="indian">Indian</option>
                <option value="chinese">Chinese</option>
                <option value="italian">Italian</option>
                <option value="thai">Thai</option>
              </select>
            </div>

            {/* Difficulty Level */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-orange-500" />
                Difficulty Level <span className="text-rose-500">*</span>
              </label>
              <select
                name="difficulty"
                required
                defaultValue=""
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              >
                <option value="" disabled>Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Prep Time */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                Prep Time (mins) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="prepTime"
                required
                min="1"
                placeholder="e.g., 45"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>

          </div>

          {/* Full Width Textareas */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              Ingredients <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="ingredients"
              required
              rows={3}
              placeholder="Write ingredients (e.g. 1 kg Rice, 500g Chicken)..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-y"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              Cooking Instructions <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="instructions"
              required
              rows={4}
              placeholder="Write step-by-step instructions..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-y"
            />
          </div>

          {/* Responsive Submit Button */}
          <div className="flex justify-end pt-2 sm:pt-4">
            <Button
              type="submit"
              color="warning"
              isLoading={loading}
              className="w-full sm:w-auto min-w-[160px] bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-orange-500/20 hover:bg-orange-600 transition-all"
            >
              Publish Recipe
            </Button>
          </div>

        </form>
      </Card>
    </div>
  )
}