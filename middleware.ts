import { COOKIE_TOKEN } from "@modules/Auth/constants/cookies";
// import { NEWSLETTER_STORAGE_KEY } from "@modules/Newsletter/constants/newsletter";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_TOKEN);
  // const previewPushInformation = request.cookies.get(NEWSLETTER_STORAGE_KEY);

  if (request.nextUrl.pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // if (request.nextUrl.pathname.startsWith("/dashboard")) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  //   if (
  //     request.nextUrl.pathname ===
  //       "/dashboard/newsletter/push-information/preview" &&
  //     !previewPushInformation
  //   ) {
  //     return NextResponse.redirect(
  //       new URL("/dashboard/newsletter/push-information", request.url)
  //     );
  //   }
  // }

  return NextResponse.next();
}
