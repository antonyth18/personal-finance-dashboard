import { PrismaClient } from "../../generated/prisma";
import { authMiddleware } from "../middleware";
const express = require("express");
const userRouter = express.Router();
const z = require("zod");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config(); 

const userSchema = z.object({
    username: z.string(),
    name: z.string(),
    password: z.string()
})

interface AuthRequest extends Request {
    userId?: string;
  }

userRouter.get(("/"), authMiddleware, async (req: AuthRequest, res: any)  => {
    const prisma = new PrismaClient();
    const userDetails = await prisma.user.findMany({
        where: { id: req.userId! }
    });

    return res.status(200).json({
        data: userDetails
    })
})

userRouter.post("/signup", async (req: { body: any; }, res: any) => {
    const { success } = userSchema.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            msg: "Incorrect inputs"
        })
    }

    const prisma = new PrismaClient();
    const existingUser = await prisma.user.findUnique({
        where: { username: req.body.username }
    })

    if(existingUser) {
        return res.status(409).json({
            msg: "User already exists"
        })
    }

    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            name: req.body.name,
            password: req.body.password
        }
    })
    
    const secretKey = process.env.JWT_SECRET;

    const token = await jwt.sign({
        id: user.id
    }, secretKey)

    return res.status(200).json({
        jwt: token
    })

})

const signSchema = z.object({
    username: z.string(),
    password: z.string()
})

userRouter.post("/signin", async (req: { body: any; }, res: any) => {
    const { success } = signSchema.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            msg: "Incorrect inputs"
        })
    }

    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
        where: { username: req.body.username, password: req.body.password }
    })

    if(!user) {
        return res.status(404).json({
            msg: "User not found, Incorrect username or password"
        })
    }
    const secretKey = process.env.JWT_SECRET;

    const token = await jwt.sign({
        id: user.id
    }, secretKey)

    return res.status(200).json({
        jwt: token
    })
    
})

module.exports = userRouter;