import { NextResponse } from "next/server";

export async function middleware(req) {
  const auth = req.cookies.get("auth");
  const pathArr = ["", "/myaccount", "/checkout", "/wishlist"];

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (auth !== undefined && auth !== null && auth !== "") {
      return NextResponse.redirect(new URL("/myaccount", req.nextUrl));
    }
  }

  if (pathArr.includes(req.nextUrl.pathname)) {
    if (auth == undefined || auth == null || auth == "") {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }
}

export const config = {
  matcher: [
    "/myaccount/:path*",
    "/login/:path*",
    "/checkout/:path*",
    "/wishlist/:path*",
  ],
};
