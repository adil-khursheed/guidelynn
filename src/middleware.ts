import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublicPath = ["/", "/login", "/signup", "/api/auth/**"].includes(
    pathname
  );

  const sessionCookie = getSessionCookie(req, {
    cookiePrefix: "_guidelynn",
  });

  if (!isPublicPath && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicPath && sessionCookie) {
    return NextResponse.redirect(new URL("/new", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/reset-password/:path*",
  ],
};
