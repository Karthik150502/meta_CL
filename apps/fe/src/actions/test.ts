'use server'

import { cookies } from "next/headers"


export async function getTheCookie() {
    const token = cookies().get("metacl_access")
    return `Bearer ${token?.value}`;
}




