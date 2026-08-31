import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'
import { getRecipeByUserId } from './lib/api/recipes'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    const user = session?.user
    const recipes = await getRecipeByUserId(user?.id)
    
    if (user?.plan =='free' && recipes.length == 2) {
        return NextResponse.redirect(new URL('/dashboard/user/profile', request.url))
    }

    if (!session) {
        return NextResponse.redirect(new URL('/singin', request.url))

    }

}

export const config = {
    matcher: ['/recipes/:path','/dashboard/user/add-recipe'],
}