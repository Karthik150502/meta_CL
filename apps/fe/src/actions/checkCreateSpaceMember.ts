'use server'
import prisma from "@repo/db/client"
import axios from "axios";
import { getTheCookie } from "./test";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

type Props = {
    spaceId: string
}



export async function createSpaceMember({ spaceId }: Props) {

    const session = await getServerSession(authOptions);

    const spaceMember = await prisma.spaceMember.findFirst({
        where: {
            userId: session?.user.id, spaceId
        }
    })
    if (spaceMember) {
        return spaceMember
    }
    const res = await axios.post("http://localhost:3001/space/space-member",
        {
            userId: session?.user.id, spaceId
        },
        {
            headers: {
                Authorization: await getTheCookie()
            }
        }
    )

    return res.data.spaceMemberId
}