import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|auth|.*\\.png$).*)"
    ]
}

export default withAuth(
    async function middleware(req) {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        // Check if the user is authenticated
        if (token && Date.now() >= token.data.validity.refresh_until * 1000) {
            // Redirect to the login page
            const baseUrl = req.nextUrl.origin;
            const response = NextResponse.redirect(`${baseUrl}/api/auth/signin`);
            // Clear the session cookies
            response.cookies.delete("next-auth.session-token");
            response.cookies.delete("next-auth.csrf-token");
            response.cookies.delete("metacl_session");
            // response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
            // response.cookies.set("next-auth.csrf-token", "", { maxAge: 0 });

            return response;
        }

        // If authenticated, continue with the request
        const response = NextResponse.next();
        console.log("==============Setting cookie==============")
        response.cookies.set("metacl_access", token?.data?.tokens?.access as string);
        return response;
    },
    {
        pages: {
            signIn: "/auth/sign-in",
            error: "/auth/error",
            newUser: "/auth/sign-up"
        },
        callbacks: {
            authorized: ({ token }) => {
                // You can add custom logic here, for example, check roles
                return !!token; // if token exists, the user is authenticated
            }
        }
    }
);


