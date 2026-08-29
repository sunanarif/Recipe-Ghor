"use server"
const baseUrl = process.env.SERVER_URL

export const userInfo = async()=>{
    const res = await fetch(`${baseUrl}/all/user`)
    return res.json()
}