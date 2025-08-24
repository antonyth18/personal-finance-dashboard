import { PrismaClient } from "../../generated/prisma";
import { authMiddleware } from "../middleware";
import { Router, Request, Response } from "express";

const express = require("express");
const savingsRouter = express.Router();

interface AuthRequest extends Request {
    userId?: string;
  }

savingsRouter.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
    const prisma = new PrismaClient();
    const savingsList = await prisma.goal.findMany({
        where: { userId: req.userId! }
    });

    return res.status(200).json({
        data: savingsList
    })
})

savingsRouter.post("/contribution", authMiddleware, async (req: AuthRequest, res: Response) => {
    const prisma = new PrismaClient();

    console.log(req.body)

    const contribution = await prisma.goal.update({
        where: {
            id: req.body.id
        },
        data: {
            goal: req.body.goal,
            saved_amt: {increment: Number(req.body.amount)},
            userId: req.userId!
        }
    })

    return res.status(200).json({
        id: contribution.id,
        msg: "contribution added successfully"
    })
})

savingsRouter.post("/goal", authMiddleware, async (req: AuthRequest, res: Response) => {
    const prisma = new PrismaClient();

    const goal = await prisma.goal.create({
        data: {
            goal: req.body.goal,
            target_amt: req.body.target_amt,
            userId: req.userId!
        }
    })

    return res.status(200).json({
        id: goal.id,
        msg: "Goal added successfully"
    })
})

module.exports = savingsRouter