import { NextResponse } from "next/server";

export default async function checkNode(request: {
  nextUrl: { pathname: string };
  cookies: { get: (arg0: string) => any };
  url: string | URL | undefined;
}) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const authCookie = request.cookies.get("session-token");

    if (!authCookie)
      return NextResponse.redirect(new URL("/signIn", request.url));
  }
}
