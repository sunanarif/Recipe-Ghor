"use server"

import { headers } from "next/headers"
import { auth } from "../auth"

const baseUrl = process.env.SERVER_URL

const getToken = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    return token
}

export const userInfo = async()=>{
    const token = await getToken()
    const res = await fetch(`${baseUrl}/all/user`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}