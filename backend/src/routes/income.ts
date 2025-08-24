import { PrismaClient } from "../../generated/prisma";
import { authMiddleware } from "../middleware";
import { Router, Request, Response } from "express";

const express = require("express");
const incomeRouter = express.Router();

interface AuthRequest extends Request {
    userId?: string;
  }

incomeRouter.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
    const prisma = new PrismaClient();

    const incomeList = await prisma.income.findMany({
        where: { userId: req.userId! }
    });

    return res.status(200).json({
        data: incomeList
    })
})

incomeRouter.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
    const prisma = new PrismaClient();

    const income = await prisma.income.create({
        data: {
            source: req.body.source,
            amount: req.body.amount,
            userId: req.userId!
        }
    })

    return res.status(200).json({
        id: income.id,
        msg: "income added successfully"
    })
})

module.exports = incomeRouter;