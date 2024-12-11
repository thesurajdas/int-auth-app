import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Redirect to login if no token is found for protected routes
  if (request.nextUrl.pathname.startsWith("/dashboard") && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register")) &&
    refreshToken
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  // Decode roles from refreshToken
  let roles = [];
  if (refreshToken) {
    try {
      const decodedToken = jwt.decode(refreshToken);
      roles = decodedToken?.roles || [];
    } catch (error) {
      console.error("Failed to decode access token:", error);
    }
  }

  // Protect an admin route
  if (
    request.nextUrl.pathname.startsWith("/dashboard/admin") &&
    !roles.includes("admin")
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

// Config for middleware
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
