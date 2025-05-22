import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(req: NextRequest){
    const token = req.cookies.get('access_token')?.value
    const protectedroute = ['/form']
    const guestroute = ['/register', '/login']
    const isprotected = protectedroute.some(path => req.nextUrl.pathname.startsWith(path)) 
    const isGuest = guestroute.some(path => req.nextUrl.pathname.startsWith(path)) 

    if(!token && isprotected){
        return NextResponse.redirect(new URL('/', req.url))
    }
    if(isGuest && token){
        return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
}
