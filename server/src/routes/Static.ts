import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import multer from "multer";

export const staticR = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "static/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({storage: storage}).single('plantImg');

const prisma = new PrismaClient();

interface Image {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

staticR.post(
    "",
    async (req: Request, res: Response) => {
        upload(req, res, (err) => {
            if (!req.file){
                return res.status(500).json({success:false, msg: "No file was provided!"})
            }
            if (err instanceof multer.MulterError){
                return res.status(500).json({success: false, msg: "A server service error occured."})
            }
            if (err){
                return res.status(500).json({success: false, msg: "Unknown error occured"})
            }
            return res.status(200).json({success: true, msg: "Your file was uploaded!"})
        });
    }
);
