import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export const auth = Router();
const prisma = new PrismaClient();

auth.post("/login", async (req, res) => {
});

auth.post("/register", async (req, res) => {
    const { email, username, password } = req.body;

    const usernameResult = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    if (usernameResult) {
        return res.status(400).json({success: false, error: "User of that name already exists"})
    }

    const emailResult = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (emailResult) {
        return res.status(400).json({success: false, error: "User with that email already exists"})
    }

    const user = await prisma.user.create({
        data: {
            email: email,
            username: username,
            password: password
        }
    });

    const accessToken = jwt.sign({userId: user.id}, "secret");

    return res.status(200).json({success: true, accessToken: accessToken});
});
