import { NextResponse } from "next/server";
import axios from "axios";

export async function middleware(req) {
  const token = req.cookies.get("token");
  const pathArr = ["", "/myaccount", "/checkout", "/wishlist"];

  if (req.nextUrl.pathname.startsWith("/login")) {
    if (token !== undefined && token !== null && token !== "") {
      return NextResponse.redirect(new URL("/myaccount", req.nextUrl));
    }
  }

  if (pathArr.includes(req.nextUrl.pathname)) {
    if (token == undefined || token == null || token == "") {
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
