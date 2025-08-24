"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userRouter = require("./user");
const router = express.Router();
router.use("/user", userRouter);
module.exports = router;
//# sourceMappingURL=index.js.map