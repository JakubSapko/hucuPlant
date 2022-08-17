import { Plant, PrismaClient, User } from "@prisma/client";
import { Request, Response, Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

export const plant = Router();
const prisma = new PrismaClient();

plant.get("/", isAuthenticated, async (req: Request, res: Response) => {
    
    const {username} = req.body;

    const plants: Plant[] | null = await prisma.plant.findMany({
        where: {
            ownerName: username
        }
    })

    if (!plants){
        return res.status(400).json({success: false, message: "Database error"});
    }

    return res.status(200).json({success: true, plants: plants})
})

