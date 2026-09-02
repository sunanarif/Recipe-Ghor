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

export const editFeature = async(id,isFeatured)=>{
    const res = await fetch(`${baseUrl}/edit/feature/${id}`,{
        method:"PATCH",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({isFeatured}),
        cache:'no-store'
    })
    return res.json()
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