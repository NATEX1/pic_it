import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function proxy(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.redirect(new URL('/api/auth/signin', req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'], 
};