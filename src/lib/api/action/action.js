"use server"

export const addRecipe=async(formData)=>{
     const res = await fetch(`${process.env.SERVER_URL}/recipe`,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(formData)
     })
     const data = await res.json()
     return data
}