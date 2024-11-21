'use server'
import prisma from "@repo/db/client"

export async function getMaps() {
    const res = await prisma.map.findMany();
    return res;
}