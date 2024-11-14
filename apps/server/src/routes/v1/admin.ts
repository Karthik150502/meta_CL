import { Request, Response, Router } from "express";
import prisma from "@repo/db/client"
import { CreateAvatarSchema, CreateElementSchema, CreateMapSchema, UpdateElementSchema } from "../../types";
import { adminMiddleware } from "../../middlewares/admin";

const router = Router();
router.use(adminMiddleware);



router.post("/element", async (req: Request, res: Response) => {


    const parsedData = CreateElementSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({
            status: 400,
            message: "Validation Failed"
        })
        return;
    }


    const element = await prisma.element.create({
        data: {
            imageUrl: parsedData.data.imageUrl,
            static: parsedData.data.static,
            height: parsedData.data.height,
            width: parsedData.data.width,
        }
    })

    res.status(200).json({
        status: 200,
        message: "THe element has been created",
        id: element.id
    })
})


router.put("/element/:elementId", async (req: Request, res: Response) => {


    const parsedData = UpdateElementSchema.safeParse(req.body)
    if (!parsedData.success) {
        console.log("Validation Failed");
        res.status(400).json({
            status: 400,
            message: "Validation Failed"
        })
        return;
    }


    await prisma.element.update({
        where: {
            id: req.params.elementId
        },
        data: {
            imageUrl: parsedData.data.imageUrl
        }
    })


    res.status(200).json({
        status: 200,
        message: "The element has been updated",

    })
})


router.post("/avatar", async (req: Request, res: Response) => {


    const parsedData = CreateAvatarSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({
            status: 400,
            message: "Validation Failed"
        })
        return;
    }



    let avatar = await prisma.avatar.create({
        data: {
            imageUrl: parsedData.data.imageUrl,
            name: parsedData.data.name,
        }
    })


    res.status(200).json({
        status: 200,
        message: "The avatar has been created",
        id: avatar.id
    })
})



router.post("/map", async (req: Request, res: Response) => {


    const parsedData = CreateMapSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({
            status: 400,
            message: "Validation Failed"
        })
        return;
    }


    let dimensions = parsedData.data.dimension.split("x")
    let width = Number(dimensions[0])
    let height = Number(dimensions[1])

    let map = await prisma.map.create({
        data: {
            thumbnail: parsedData.data.thumbnail,
            width,
            height,
            name: parsedData.data.name,
            mapElements: {
                create: parsedData.data.defaultElements.map((e) => {
                    return {
                        x: e.x,
                        y: e.y,
                        elementId: e.elementId,
                    }
                })
            }

        }
    })


    res.status(200).json({
        status: 200,
        message: "Map has been created",
        id: map.id
    })
})

router.get("/:spaceId", async (req: Request, res: Response) => {


    const parsedData = CreateMapSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({
            status: 400,
            message: "Validation Failed"
        })
        return;
    }


    let dimensions = parsedData.data.dimension.split("x")
    let width = Number(dimensions[0])
    let height = Number(dimensions[1])

    let map = await prisma.map.create({
        data: {
            width: width,
            height: height,
            name: parsedData.data.name,
            thumbnail: parsedData.data.thumbnail,
            mapElements: {
                create: parsedData.data.defaultElements.map((e) => {
                    return {
                        elementId: e.elementId,
                        x: e.x,
                        y: e.y,
                    }
                })
            }

        }
    })


    res.status(200).json({
        status: 200,
        message: "The map has been created",
        id: map.id
    })
})


export default router;