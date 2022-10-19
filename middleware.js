import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token");
  if (req.nextUrl.pathname.startsWith("/login")) {
    if (token !== undefined && token !== null && token !== "") {
      return NextResponse.redirect(new URL("/myaccount", req.nextUrl));
    }
  }

  if (req.nextUrl.pathname.startsWith("/myaccount")) {
    if (token == undefined || token == null || token == "") {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }
  if (req.nextUrl.pathname.startsWith("/checkout")) {
    if (token == undefined || token == null || token == "") {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/myaccount/:path*", "/login/:path*", "/checkout/:path*"],
};
