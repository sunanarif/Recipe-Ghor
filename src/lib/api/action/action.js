"use server"
const baseUrl = process.env.SERVER_URL
export const addRecipe=async(formData)=>{
     const res = await fetch(`${baseUrl}/recipe`,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(formData)
     })
     const data = await res.json()
     return data
}

export const deleteRecipeById = async (id) => {
    const res = await fetch(`${baseUrl}/recipe/${id}`, {
      method: "DELETE"
    })
    const data = await res.json()

    return data
}

export const editRecipeById = async(id,formData)=>{
    const res = await fetch(`${baseUrl}/recipe/edit/${id}`,{
        method:"PATCH",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(formData)
    })
    return res.json()
}

export const addFavorites = async(favoritesdata)=>{
    const res = await fetch(`${baseUrl}/favorites`,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(favoritesdata)
     })
     const data = await res.json()
     return data
}

export const editFeature = async (id, isFeatured) => {
    try {
        const res = await fetch(`${baseUrl}/edit/feature/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isFeatured }),
            cache: 'no-store' // ক্যাশ বন্ধ রাখার জন্য
        });

        if (!res.ok) {
            throw new Error('Failed to update feature status');
        }

        const data = await res.json();

        // UI সাথে সাথে রিফ্রেশ করতে আপনার ড্যাশবোর্ডের Route পাথ দিন
        revalidatePath('/dashboard/user/my-recipe');

        return data;
    } catch (error) {
        console.error("Error in editFeature:", error);
        return { success: false, error: error.message };
    }
}
export const updateLike = async(id,likesCount)=>{
    const res = await fetch(`${baseUrl}/edit/recipeLike/${id}`,{
        method:"PATCH",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({likesCount})
    })
    return res.json()
}

export const reportRecipe = async (report) => {
  const res = await fetch(`${baseUrl}/report`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(report),
  })
  return await res.json()
}

export const deleteReportById = async (id) => {
    const res = await fetch(`${baseUrl}/report/${id}`, {
      method: "DELETE"
    })
    const data = await res.json()

    return data
}
export const deleteFavorites = async (id) => {
    const res = await fetch(`${baseUrl}/favorites/${id}`, {
      method: "DELETE"
    })
    const data = await res.json()

    return data
}