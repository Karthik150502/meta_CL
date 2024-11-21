'use server'

import { cookies } from "next/headers"


export async function getTheCookie() {
    const token = cookies().get("metacl_access")
    console.log("========================================================");
    console.log("access_token = ", token?.value);
    console.log("========================================================");
    return token?.value;
}




