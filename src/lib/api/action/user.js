"use server"
const baseUrl = process.env.SERVER_URL

export const editBlockUser = async(id,isBlock)=>{
    const res = await fetch(`${baseUrl}/admin/blockUser/${id}`,{
        method:"PATCH",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({isBlock})
    })
    return res.json()
}