import { NextResponse } from "next/server";

export function middleware(request) {
  const accessToken = request.cookies.get("accessToken")?.value;

  // Redirect to login if no token is found for protected routes
  if (request.nextUrl.pathname.startsWith("/dashboard") && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Config for middleware
export const config = {
  matcher: ["/dashboard/:path*", "/auth/login/:path*"], // Add paths as needed
};
