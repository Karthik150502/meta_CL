import { withAuth } from "next-auth/middleware";
// import withAuth from "next-auth/middleware";
export const config = {
    matcher: [
        "/dashboard/:path*"
    ]
}

export default withAuth({
    pages: {
        signIn: "/auth/sign-in",
        error: "/auth/error",
        signOut: "/auth/sign-up"
    },
});