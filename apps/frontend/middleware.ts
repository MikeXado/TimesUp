import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  beforeAuth: (req) => {
    if (req.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.next();
    }
  },
  publicRoutes: ['/'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
