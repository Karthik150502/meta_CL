import { Account, AuthOptions, ISODateString, User } from "next-auth"
import { JWT } from "next-auth/jwt";
import axios from "axios"
const LOGIN_URL = ""
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

export type CustomSession = {
    user?: CustomUser,
    expires: ISODateString
}


export type CustomUser = {
    id?: string | null,
    name?: string | null,
    email?: string | null,
    image?: string | null,
    provider?: string | null,
    token?: string | null,
}






export const authOptions: AuthOptions = {
    pages: {
        signIn: "/auth/sign-in",
        error: "/auth/error",
        signOut: "/auth/sign-up"
    },


    session: {
        maxAge: 2 * 60 * 60, // 2 Hours,
        //strategy: "jwt", // For credentials login
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],

    callbacks: {

    }
}