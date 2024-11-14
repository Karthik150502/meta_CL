import { Request, Response, Router } from "express";
import { userMiddleware } from "../../middlewares/user";
import { AddElementSchema, CreateElementSchema, CreateSpaceSchema, DeleteElementSchema } from "../../types";
import prisma from "@repo/db/client"


const router = Router();


router.post("/", userMiddleware, async (req: Request, res: Response) => {
    const parsedData = CreateSpaceSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({
            status: 400,
            message: "Validation Failed"
        })
        return;
    }


    const dimensions = parsedData.data.dimensions.split("x") as string[]
    const width = Number(dimensions[0])
    const height = Number(dimensions[1])


    if (!parsedData.data.mapId) {
        let space = await prisma.space.create({
            data: {
                name: parsedData.data.name,
                width,
                height,
                creatorId: req.userId!
            }
        })

        res.status(200).json({
            status: 200,
            message: "Space created.",
            id: space.id
        })
        return;
    }


    const map = await prisma.map.findUnique(({
        where: {
            id: parsedData.data.mapId
        },
        select: {
            mapElements: true,
            width: true,
            height: true,
        }
    }))


    if (!map) {
        console.log("The map does not exist.")
        res.status(400).json({
            status: 400,
            message: "The map does not exist."
        })
        return;
    }



    let space = await prisma.$transaction(async () => {
        const space = await prisma.space.create({
            data: {
                name: parsedData.data.name,
                width: map.width,
                height: map.height,
                creatorId: req.userId!,
            }
        })
        await prisma.spaceElements.createMany({
            data: map.mapElements.map(m => {
                return {
                    spaceId: space.id,
                    elementId: m.elementId,
                    x: m.x,
                    y: m.y,
                }
            })
        })
        return space;
    })




    res.status(200).json({
        status: 200,
        message: "Space has been created.",
        id: space.id
    })
    return;
})


router.get("/all", userMiddleware, async (req: Request, res: Response) => {

    let spaces = await prisma.space.findMany({
        where: {
            creatorId: req.userId
        }
    })

    res.status(200).json({
        status: 200,
        message: "Spaces retrieved",
        spaces: spaces.map((s) => {
            return {
                id: s.id,
                name: s.name,
                thumbnail: s.thumbnail,
                dimensions: `${s.width}x${s.height}`
            }
        })
    })
    return;
})



router.get("/:spaceId", async (req: Request, res: Response) => {

    const space = await prisma.space.findUnique({
        where: {
            id: req.params.spaceId
        },
        include: {
            spaceElements: {
                include: {
                    element: true
                }
            }
        }
    })


    if (!space) {
        res.status(400).json({
            status: 400,
            message: "Space not found"
        })
        return;
    }


    res.status(200).json({
        status: 200,
        message: "Fetched the space elements",
        dimension: `${space.width}x${space.height}`,
        elements: space.spaceElements.map(se => {
            return {
                id: se.id,
                x: se.x,
                y: se.y,
                element: {
                    id: se.element.id,
                    imageUrl: se.element.imageUrl,
                    static: se.element.static,
                    height: se.element.height,
                    width: se.element.width
                }
            }
        })
    })

    return;

})

router.delete("/element", userMiddleware, async (req: Request, res: Response) => {


    const parsedData = DeleteElementSchema.safeParse(req.body)


    if (!parsedData.success) {
        res.status(400).json({
            status: 400,
            message: "Validation Failed"
        })
        return;
    }


    let spaceElement = await prisma.spaceElements.findFirst({
        where: {
            id: parsedData.data.id
        },
        include: {
            space: true
        }
    })



    console.log(spaceElement?.space.creatorId)
    console.log(req.userId)

    if (spaceElement?.space.creatorId !== req.userId) {
        res.status(403).json({
            status: 403,
            message: "Unauthorized"
        })
        return;
    }

    await prisma.spaceElements.delete({
        where: {
            id: parsedData.data.id
        }
    })
    res.status(200).json({
        status: 200,
        message: "Space element from space"
    })
    return;

})


router.delete("/:spaceId", userMiddleware, async (req: Request, res: Response) => {


    let { spaceId } = req.params;

    let space = await prisma.space.findUnique({
        where: {
            id: spaceId
        },
        select: {
            creatorId: true
        }
    })
    if (!space) {
        res.status(400).json({
            status: 400,
            message: "Space not found"
        })
        return;
    }


    if (space.creatorId !== req.userId) {
        res.status(403).json({
            status: 403,
            message: "Unauthorized to delete the space"
        })
        return;
    }


    await prisma.space.delete({
        where: {
            id: spaceId
        }
    })

    res.status(200).json({
        status: 200,
        message: "Space deleted"
    })


    return;

})


router.post("/element", userMiddleware, async (req: Request, res: Response) => {

    const parsedData = AddElementSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({
            status: 400,
            message: "Validation Failed"
        })
        return;
    }

    const space = await prisma.space.findUnique({
        where: {
            id: req.body.spaceId,
            creatorId: req.userId
        },
        select: {
            width: true,
            height: true
        }
    })


    if (!space) {
        res.status(400).json({
            status: 400,
            message: "Space not found"
        })
        return;
    }



    if (req.body.x < 0 || req.body.y < 0 || req.body.x > space?.width! || req.body.y > space?.height!) {
        res.status(400).json({
            status: 400,
            message: "Point is outside of the boundary"
        })
        return;
    }

    await prisma.spaceElements.createMany({
        data: {
            spaceId: req.body.spaceId,
            elementId: parsedData.data.elementId,
            x: parsedData.data.x,
            y: parsedData.data.y,
        }
    })


    res.status(200).json({
        status: 200,
        message: "Space created"
    })
    return;
})






export default router;