import { Router } from "express";
import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";
import argon2 from 'argon2';

export const auth = Router();
const prisma = new PrismaClient();

auth.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user: User | null = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, error: "User of that name was not found" });
  }

  try {
    if (await argon2.verify(user.password, password)) {
      const accessToken: string = jwt.sign({ userId: user.id }, "secret");
      return res.status(200).json({ success: true, accessToken: accessToken });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Invalid password" });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, error: "Internal server errror" });
  }
});

auth.post("/register", async (req, res) => {
  const { email, username, password } = req.body;

  const usernameResult: User | null = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (usernameResult) {
    return res
      .status(400)
      .json({ success: false, error: "User of that name already exists" });
  }

  const emailResult: User | null = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (emailResult) {
    return res
      .status(400)
      .json({ success: false, error: "User with that email already exists" });
  }

  const hashedPassword: string = await argon2.hash(password);
  const user: User = await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: password,
    },
  });

  const accessToken: string = jwt.sign({ userId: user.id }, "secret");

  return res.status(200).json({ success: true, accessToken: accessToken });
});
