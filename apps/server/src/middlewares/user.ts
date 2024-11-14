import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../lib/config";







export function userMiddleware(req: Request, res: Response, next: NextFunction) {
    const headerToken = req.headers.authorization;
    const token = headerToken?.split(" ")[1]

    if (!token) {
        res.status(403).json({
            status: 403,
            message: "Unauthorized"
        })
        return;
    }


    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, role: string }
        req.userId = decoded.id;
        next()
    } catch (e) {
        res.status(403).json({
            status: 403,
            message: "Unauthorized"
        })
        return;
    }

}