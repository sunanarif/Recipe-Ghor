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