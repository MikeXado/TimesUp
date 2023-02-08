import { NextResponse } from "next/server";
import nextConnect from "next-connect";
// import parseMultipartForm from "./multipart-form-parser";
// import parseMultipartForm from "./multipart-form-parser";
const middleware = nextConnect();

export default async function checkNode(request) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const authCookie = request.cookies.get("token");
    if (!authCookie) return NextResponse.redirect(new URL("/", request.url));
  }
}
