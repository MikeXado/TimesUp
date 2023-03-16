import { NextResponse } from "next/server";
// import parseMultipartForm from "./multipart-form-parser";
// import parseMultipartForm from "./multipart-form-parser";

export default async function checkNode(request: {
  nextUrl: { pathname: string };
  cookies: { get: (arg0: string) => any };
  url: string | URL | undefined;
}) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const authCookie = request.cookies.get("token");
    if (!authCookie) return NextResponse.redirect(new URL("/", request.url));
  }
}
