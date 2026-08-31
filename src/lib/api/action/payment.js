"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const baseUrl = process.env.SERVER_URL
const getToken = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    return token
}

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

export const purchase = async(data)=>{
    const res = await fetch(`${baseUrl}/purchase`,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data)
    })
    return res.json()
}

export const transaction = async()=>{
    const token = await getToken()
    const res = await fetch(`${baseUrl}/subscription`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}
