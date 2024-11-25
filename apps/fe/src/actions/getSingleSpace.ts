"use server"

import prisma from "@repo/db/client"


export async function getSpaceById(id: string) {
    return await prisma.space.findUnique({
        where: {
            id
        }
    })
}