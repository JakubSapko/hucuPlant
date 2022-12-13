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

plant.put("/:plantID(\d+)", isAuthenticated, async (req: Request, res: Response) => {
    const plantID: number = parseInt(req.params.plantID);
    const requestedChange: Partial<Plant> =  req.body;
    
    if(!requestedChange){
        return res.status(400).json({success: false, message: "No data provided"})
    }

    const updatePlant = await prisma.plant.update({
        where: {
            id: plantID
        },
        data: requestedChange
    })

    if (!updatePlant){
        return res.status(400).json({success: false, message: "Could not update record"})
    }

    return res.status(200).json({success: true, message: "Plant updated successfully"})
})

plant.post("/add", isAuthenticated, async (req: Request, res: Response) => {
    const requestedPlant: Partial<Plant> = req.body;

    if (!requestedPlant.name || !requestedPlant.ownerName){
        return res.status(400).json({success: false, message: "Missing required data"})
    }

    const plant = await prisma.plant.create({
        data: req.body
    });

    if (!plant){
        return res.status(400).json({success: false, message: "Plant couldn't be created"})
    }

    return res.status(200).json({success: true, message: "Plant successfully added"})
})

plant.post("/delete/:plantID(\d+)", isAuthenticated, async (req: Request, res: Response) => {
    const plantID: number = parseInt(req.params.plantID);

    if (!plantID){
        return res.status(400).json({success: false, message: "Invalid ID provided"});
    }

    const deletedPlant = await prisma.plant.delete({
        where: {
            id: plantID
        }
    });

    if (!deletedPlant){
        return res.status(400).json({success: false, message: "Plant could not be found"});
    }

    return res.status(200).json({success: true, message: "Plant deleted successfully"});
})