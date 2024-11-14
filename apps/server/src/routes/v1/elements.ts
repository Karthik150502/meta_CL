import { Request, Response, Router } from "express";
import prisma from "@repo/db/client"


const router = Router();



router.get("/", async (req: Request, res: Response) => {



    let elements = await prisma.element.findMany()


    res.status(200).json({
        status: 200,
        elements: elements.map((a) => {
            return {
                id: a.id,
                imageUrl: a.imageUrl,
                width: a.width,
                height: a.height,
                statis: a.static
            }
        })
    })

    return;


})






export default router;