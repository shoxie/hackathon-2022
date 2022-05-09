import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const user = req.cookies.user ? JSON.parse(req.cookies.user) : null;

  if (!user) {
    return NextResponse.rewrite(new URL('/', req.url))
  }
  const verify = axios
    .get("/user/me", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    .then(() => true)
    .catch(() => false);
  if (!verify) {
    return NextResponse.rewrite(new URL('/', req.url))
  } else return NextResponse.next();
}
