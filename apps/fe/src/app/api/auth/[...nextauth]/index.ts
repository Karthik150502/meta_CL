import NextAuth from "next-auth";
import { cache } from "react";
import { authOptions } from "./options";

const { auth: uncachedAuth } = NextAuth(authOptions);

const auth = cache(uncachedAuth);


export { auth };