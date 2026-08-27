"use server"
const baseUrl = process.env.SERVER_URL
export const getRecipeByUserId=async(userId)=>{
    console.log(userId);
    const res = await fetch(`${baseUrl}/recipe/${userId}`)
    return res.json()
}

export const getRecipeById=async(id)=>{
    const res = await fetch(`${baseUrl}/recipe/single/${id}`)
    return res.json()
}