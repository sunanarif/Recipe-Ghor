"use server"

import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.SERVER_URL

const getToken = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    return token
}

export const getRecipeByUserId = async (userId) => {
    const res = await fetch(`${baseUrl}/recipe/${userId}`)
    return res.json()
}

export const getRecipeById = async (id) => {
    const token = await getToken()
    const res = await fetch(`${baseUrl}/recipe/single/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const getAllRecipe = async () => {
    const res = await fetch(`${baseUrl}/all/recipe`);
    return res.json()
}

export const getFavoritesByUserId = async (userId) => {
    const token = await getToken()
    const res = await fetch(`${baseUrl}/favorites/user/${userId}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const getPaymentDetailById = async (userId) => {
    const token = await getToken()
    const res = await fetch(`${baseUrl}/purchase/user/${userId}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const getReport = async () => {
    const token = await getToken()
    const res = await fetch(`${baseUrl}/report`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}