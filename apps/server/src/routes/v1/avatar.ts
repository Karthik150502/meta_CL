import { Request, Response, Router } from "express";
import prisma from "@repo/db/client"



const router = Router();



router.get("/", async (req: Request, res: Response) => {

    let avatars = await prisma.avatar.findMany()


    res.status(200).json({
        status: 200,
        avatars: avatars.map((a) => {
            return {
                id: a.id,
                imageUrl: a.imageUrl,
                name: a.name
            }
        })
    })

    return;

})


export default router;