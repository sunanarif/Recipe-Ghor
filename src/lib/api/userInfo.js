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

export const userInfo = async () => {
    const token = await getToken()
    const res = await fetch(`${baseUrl}/all/user`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const editUserInfo = async (id,editedUser) => {
    const res = await fetch(`${baseUrl}/edit/user/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(editedUser)
        })
        const editData = await res.json()
    return editData
}