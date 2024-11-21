"use server"
import { CreateSpaceSchemaType } from "@repo/common"
import axios from "axios"
import { cookies } from "next/headers"

export async function spaceCreateHandler(data: CreateSpaceSchemaType) {
    const token = cookies().get("metacl_access")?.value;
    const res = await axios.post("http://localhost:3001/api/v1/space",
        {
            ...data
        },
        {
            headers: {
                authorization: `Bearer ${token}`
            },
        }
    )
    return res.data;
}