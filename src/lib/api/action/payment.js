"use server"
const baseUrl = process.env.SERVER_URL

export const subscription = async(data)=>{
    const res = await fetch(`${baseUrl}/subscription`,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data)
    })
    return res.json()
}