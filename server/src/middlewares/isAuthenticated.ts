import { PrismaClient, User } from '@prisma/client';
import {Request, Response, NextFunction} from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";


const prisma = new PrismaClient();

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers["authorization"]){
        return res.status(400).json({success: false, error: "Missing authorization header"});
    }

    const authHeader: string = req.headers["authorization"];
    const authMethod: string = authHeader.split(" ")[0];
    const accessToken: string = authHeader.split(" ")[1];

    if(!authMethod || !accessToken){
        return res.status(400).json({success: false, error: "Invalid auth header"});
    } else if (authMethod !== "Bearer"){
        return res.status(400).json({success: false, error: "Invalid auth method"});
    }

    let tokenBody: any;

    try {
        tokenBody = jwt.verify(accessToken, "secret");
    } catch {
        return res.status(400).json({success: false, error: "Invalid token"});
    }

    if (!tokenBody.userId){
        return res.status(400).json({success: false, error: "Invalid token"});
    }

    const user: User | null = await prisma.user.findUnique({
        where: {
            id: tokenBody.userId,
        }
    });

    if (!user) {
        return res.status(400).json({success: false, error: "User does not exist"});
    }

    req.User = user;

    next();
}