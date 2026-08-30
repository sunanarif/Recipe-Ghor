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

export const getAllRecipe=async()=>{
    const res = await fetch(`${baseUrl}/all/recipe`);
    return res.json()
}

export const getFavoritesByUserId = async(userId)=>{
    // console.log("recive uesr id",userId);
    const res = await fetch(`${baseUrl}/favorites/user/${userId}`)
    return res.json()
}

export const getPaymentDetailById = async(userId)=>{
    const res = await fetch(`${baseUrl}/purchase/user/${userId}`)
    return res.json()
}
export const getReport = async()=>{
    const res = await fetch(`${baseUrl}/report`)
    return res.json()
}