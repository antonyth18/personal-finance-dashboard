const express = require("express");
const userRouter = require("./user");
const expenseRouter = require("./expense");
const incomeRouter = require("./income");
const savingsRouter = require("./savings");
const router = express.Router();

router.use("/user", userRouter);
router.use("/expense", expenseRouter);
router.use("/income", incomeRouter);
router.use("/savings", savingsRouter);

module.exports = router