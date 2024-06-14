import {
  clerkMiddleware,
  createRouteMatcher,
  ClerkMiddlewareOptions,
} from "@clerk/nextjs/server";
import { cookies } from "next/headers";

const isProtectedRoute = createRouteMatcher(["/library", "/user-profile"]);

const ClerkOptions: ClerkMiddlewareOptions = {
  signInUrl: "/?m=signin",
  signUpUrl: "/?m=signup",
  afterSignInUrl: "/",
  afterSignUpUrl: "/",
};
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  if (auth().userId) {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/auth-callback",
        {
          method: "GET",
          headers: {
            Cookie: cookies().toString(),
          },
        }
      );
      const { success } = await response.json();
      if (!success) {
        return auth().redirectToSignIn();
      }
    } catch (err: any) {
      if (err.data?.success === false) {
        return auth().redirectToSignIn();
      }
    }
  }
}, ClerkOptions);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
