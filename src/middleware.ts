import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';



// export function middleware(request: NextRequest) {

//   const token = request.cookies?.get("@NEXTION_TOKEN");
//   const locale = request.nextUrl.locale
//   console.log('1')

//   const logadoMaisAuthPath = token && request.nextUrl.pathname.includes(`/auth`)
//   const NaologadoDash = !token && !request.nextUrl.pathname.includes(`/auth`)

//   if (logadoMaisAuthPath) {
//     console.log('2')
//     return NextResponse.redirect(new URL(`/pt_BR`, request.url));
//   }
//   if (NaologadoDash) {
//     console.log('3')
//     return NextResponse.redirect(new URL(`/pt_BR/auth/login`, request.url));
//   }
//   console.log('4')
//   return NextResponse.next()

// }


export default createMiddleware({
  locales: ['en_US', 'pt_BR'],
  defaultLocale: 'pt_BR',
});


export const config = {
  matcher: ['/', '/:locale(en_US|pt_BR)/:path*'],
};

