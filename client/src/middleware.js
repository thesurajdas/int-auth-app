import { NextResponse } from "next/server";

export function middleware(request) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Redirect to login if no token is found for protected routes
  if (request.nextUrl.pathname.startsWith("/dashboard") && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Config for middleware
export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*"], // Add paths as needed
};
