import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: "process.env.NEXTAUTH_SECRET",
  });


  const url = request.nextUrl.clone();


  // If no token and not trying to access login or register page, redirect to /login
  if (!token && url.pathname !== "/login" && url.pathname !== "/register") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If token exists, redirect away from login or register pages
  if (token && (url.pathname === "/login" || url.pathname === "/register")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Allow access if conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
