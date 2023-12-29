import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from "next-auth/middleware"

const safePages = ['/','/login'];
const protectedApis = ['/api/'];

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req });
  console.log('token: ', token);
  

  if (protectedApis.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.rewrite(new URL('/api/unauthorised', req.nextUrl.origin));
  }

  if (!safePages.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  return NextResponse.next();
};