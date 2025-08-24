
import { PrismaClient } from "../../generated/prisma";
import { authMiddleware } from "../middleware";
import { Router, Request, Response } from "express";
import cron from "node-cron";

const express = require("express");
const expenseRouter = express.Router();

interface AuthRequest extends Request {
    userId?: string;
  }

expenseRouter.get(("/"), authMiddleware, async (req: AuthRequest, res: Response)  => {
    const prisma = new PrismaClient();
    const expenseList = await prisma.expense.findMany({
        where: { userId: req.userId! }
    });

    return res.status(200).json({
        data: expenseList
    })
})

expenseRouter.post(("/"), authMiddleware, async (req: AuthRequest, res: Response) => {

    const prisma = new PrismaClient();
    const expense = await prisma.expense.create({
        data: {
            date: new Date(req.body.date),
            category: req.body.category,
            amount: req.body.amount,
            userId: req.userId!,
        }
    })

    return res.status(200).json({
        id: expense.id,
        msg: "expense added successfully"
    })

})

expenseRouter.post(("/recurring"), authMiddleware, async (req: AuthRequest, res: Response) => {
    const prisma = new PrismaClient();

    const expense = await prisma.recurringExpense.create({
        data: {
            startDate: new Date(req.body.date),
            category: req.body.category,
            amount: req.body.amount,
            recurringAmount: req.body.amount,
            frequency: req.body.frequency,
            lastUpdated: new Date(),
            userId: req.userId!
        }
    })

    return res.status(200).json({
        id: expense.id,
        msg: "recurring expense created successfully"
    });
})

expenseRouter.get(("/recurring"), authMiddleware, async (req: AuthRequest, res: Response)  => {
    const prisma = new PrismaClient();
    const recExpenseList = await prisma.recurringExpense.findMany({
        where: { userId: req.userId! }
    });

    return res.status(200).json({
        data: recExpenseList
    })
})

cron.schedule("0 0 * * *", async () => {
    const prisma = new PrismaClient();
    const recurs = await prisma.recurringExpense.findMany();
  
    for (const rec of recurs) {
      const passed = cyclesPassed(rec.lastUpdated, rec.frequency);
  
      if (passed > 0) {
        const increment = rec.recurringAmount * passed;
  
        await prisma.recurringExpense.update({
          where: { id: rec.id },
          data: {
            amount: rec.amount + increment,
            lastUpdated: new Date()
          }
        });
      }
    }
})

function cyclesPassed(lastUpdated: Date, frequency: string): number {
    const now = new Date();
    let diff = 0;
  
    if (frequency === "DAILY") {
      diff = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24));
    } else if (frequency === "WEEKLY") {
      diff = Math.floor((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24 * 7));
    } else if (frequency === "MONTHLY") {
      diff = (now.getFullYear() - lastUpdated.getFullYear()) * 12 +
             (now.getMonth() - lastUpdated.getMonth());
    }
    return diff;
  }

module.exports = expenseRouter;