"use server"
import axios from "axios"
import { cookies } from "next/headers"

export async function getAllUserSpaces() {
    const token = cookies().get("metacl_access")?.value;
    const res = await axios.get("http://localhost:3001/api/v1/space/user-spaces",
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
    )

    return res.data.spaces;
}