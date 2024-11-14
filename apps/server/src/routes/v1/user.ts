import { Request, Response, Router } from "express";
import { UpdateMetadataSchema } from "../../types";
import prisma from "@repo/db/client"
import { userMiddleware } from "../../middlewares/user";


const router = Router();




router.post("/metadata", userMiddleware, async (req: Request, res: Response) => {

    const parsedData = UpdateMetadataSchema.safeParse(req.body);


    if (!parsedData.success) {
        res.status(400).json({
            status: 400,
            message: "Validation Failed.",
        })
        return;
    }



    let avatar = await prisma.avatar.findFirst({
        where: {
            id: parsedData.data.avatarId
        }
    })

    if (!avatar) {
        res.status(400).json({
            status: 400,
            message: "Wrong Avatar id, avatar not found.",
        })
        return;
    }

    try {
        await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                avatarId: parsedData.data.avatarId
            }
        })
    } catch (e) {
        console.log(e)
    }


    res.status(200).json({
        status: 200,
        message: "User data has been updated successfully."
    })
})





router.get("/metadata/bulk", async (req: Request, res: Response) => {


    const ids = (req.query.ids ?? "[]") as string;



    const userIds = ids.slice(1, ids.length - 1).split(",");

    const metadata = await prisma.user.findMany({
        where: {
            id: {
                in: userIds
            }
        },
        select: {
            id: true,
            avatar: true,
        }
    })




    let result = metadata.map((m) => {
        return {
            userId: m.id,
            avatarId: m.avatar?.imageUrl,
        }
    })


    res.status(200).json({
        status: 200,
        avatars: result
    })
})



export default router;