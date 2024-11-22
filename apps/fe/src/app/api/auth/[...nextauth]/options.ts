import { AuthOptions, AuthValidity, DecodedJWT, ISODateString, Session, User, UserObject } from "next-auth"
import { JWT } from "next-auth/jwt";
import axios from "axios"
import { SIGN_IN_URL } from "@/lib/api";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken"
import { AdapterUser } from "next-auth/adapters";
import { refreshAccessToken } from "./utils";
export type CustomSession = {
    user?: CustomUser,
    expires: ISODateString
}


`https://sourcehawk.medium.com/next-auth-with-a-custom-authentication-backend-12c8f54ed4ce`

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
        newUser: "/auth/sign-up"
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
            async authorize(credentials) {
                // Add logic here to look up the user from the credentials supplied.
                try {
                    const res = await axios.post(SIGN_IN_URL, {
                        username: credentials?.username,
                        password: credentials?.password
                    })
                    console.log("@res = ", res.data)
                    const accessTokenBody = res.data.token.split(" ")[1];
                    const refreshTokenBody = res.data.refreshToken.split(" ")[1];
                    const access = jwt.decode(accessTokenBody) as DecodedJWT;
                    const refresh = jwt.decode(refreshTokenBody) as DecodedJWT;

                    console.log({ access, refresh })
                    if (!access || !refresh) {
                        return null
                    }

                    const user: UserObject = {
                        username: access.username,
                        role: access.role,
                        id: access.id
                    };

                    // Extract the auth validity from the tokens
                    const validity: AuthValidity = {
                        valid_until: access.exp,
                        refresh_until: refresh.exp
                    };


                    return {
                        id: String(user.id),
                        tokens: {
                            access: accessTokenBody,
                            refresh: refreshTokenBody
                        },
                        user: user,
                        validity: validity
                    }
                } catch {
                    return null
                }
            }
        })
    ],

    callbacks: {

        async jwt({ user, token }: { token: JWT, user: User }) {
            console.dir({ token, user }, { depth: null })
            // Initial signin contains a 'User' object from authorize method
            if (user) {
                console.debug("Initial signin");
                return { ...token, data: user };
            }
            // The current access token is still valid
            if (Date.now() < token.data.validity.valid_until * 1000) {
                return token;
            }
            // The current access token has expired, but the refresh token is still valid
            if (Date.now() < token.data.validity.refresh_until * 1000) {
                console.debug("Access token is being refreshed");
                return await refreshAccessToken(token);
            }
            console.debug("Both tokens have expired");
            return { ...token, error: "RefreshTokenExpired" } as JWT;
        },

        async session({ session, user, token }: { user: AdapterUser, session: Session, token: JWT }) {
            console.log("Session Data")
            console.dir({ session, user, token }, { depth: null })
            if (token.data.user) {
                session.user = token.data.user as UserObject
            }
            return session;
        }
    }
}