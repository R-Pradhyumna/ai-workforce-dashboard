import { NextResponse } from "next/server";

export default function proxy(req) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const projectRef = new URL(supabaseUrl).hostname.split(".")[0];

  const authCookie = req.cookies.get(`sb-${projectRef}-auth-token`);

  if (!authCookie && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
