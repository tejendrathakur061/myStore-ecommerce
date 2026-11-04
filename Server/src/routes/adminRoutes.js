const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { getDashboard, getAllUsers } = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.get("/dashboard", authMiddleware, adminMiddleware, getDashboard);
adminRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers);

module.exports = adminRouter;
