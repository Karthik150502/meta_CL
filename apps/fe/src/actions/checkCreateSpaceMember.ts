'use server'
import prisma from "@repo/db/client"
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { cookies } from "next/headers";

type Props = {
    spaceId: string
}



export async function checkSpaceMember({ spaceId }: Props) {
    const session = await getServerSession(authOptions);

    const spaceMember = await prisma.spaceMember.findFirst({
        where: {
            userId: session?.user.id, spaceId
        }
    })
    if (spaceMember) {
        return true
    }
    return false
}


export async function createSpaceMember({ spaceId }: Props) {
    const session = await getServerSession(authOptions);
    const token = cookies().get("metacl_access")?.value;
    const res = await axios.post("http://localhost:3001/api/v1/space/space-member",
        {
            userId: session?.user.id, spaceId
        },
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    )
    return res.data.spaceMemberId
}