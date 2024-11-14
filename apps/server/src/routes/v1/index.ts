import { Request, Response, Router } from "express";
import prisma from "@repo/db/client"
import { hash, compare } from "../../lib/scrypt";
import jwt from "jsonwebtoken";
import userRouter from "./user"
import spaceRouter from "./space"
import adminRouter from "./admin"
import elementsRouter from "./elements"
import avatarRouter from "./avatar"
import { SignInSchema, SignUpSchema } from "../../types";
import { JWT_SECRET } from "../../lib/config";


const router = Router();





router.post("/sign-up", async (req: Request, res: Response) => {

    const parsedData = SignUpSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(403).json({
            status: 403,
            message: "Validation Failed, enter all the Fields.",
        })
        return;
    }


    let userExists = await prisma.user.findFirst({
        where: {
            username: parsedData.data.username
        }
    })

    if (userExists) {
        res.status(403).json({
            status: 403,
            message: "User already exists, try another username.",
        })
        return;
    }


    try {
        const user = await prisma.user.create({
            data: {
                ...parsedData.data,
                password: await hash(parsedData.data.password)
            }
        })

        res.status(200).json({
            status: 200,
            message: "User signed up successfully",
            id: user?.id
        })
        return;
    } catch (e) {
        res.status(403).json({
            status: 403,
            message: "Some error occured, kindly try again later",
        })
        return;
    }
})


router.post("/sign-in", async (req: Request, res: Response) => {
    const parsedData = SignInSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(403).json({
            status: 403,
            message: "Validation Failed, enter all the Fields.",
        })
        return;
    }


    try {

        let userExists = await prisma.user.findFirst({
            where: {
                username: parsedData.data.username
            }
        })

        if (!userExists) {
            res.status(403).json({
                status: 403,
                message: "User does not exist, check the username"
            })
            return;
        }


        let passwordCorrect = await compare(parsedData.data.password, userExists.password);
        if (!passwordCorrect) {
            res.status(403).json({
                status: 403,
                message: "Password incorrect"
            })
            return;
        }
        const token = jwt.sign({
            id: userExists.id,
            role: userExists.role
        }, JWT_SECRET)

        res.status(200).json({
            status: 200,
            message: "User signed in successfully",
            id: userExists.id,
            token: `Bearer ${token}`
        })
        return;
    } catch (e) {
        res.status(403).json({
            status: 403,
            message: "Some error occured, try again later."
        })
    }

})




router.use("/user", userRouter);
router.use("/space", spaceRouter);
router.use("/admin", adminRouter);
router.use("/elements", elementsRouter);
router.use("/avatar", avatarRouter);




export default router;

