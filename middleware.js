import { NextResponse } from "next/server";

export const middleware = async (request) => {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const authCookie = request.cookies.get("token");
    if (!authCookie) return NextResponse.redirect(new URL("/", request.url));
  }
};
