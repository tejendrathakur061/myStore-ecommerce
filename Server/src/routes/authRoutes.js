const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  register,
  login,
  logout,
  getProfile,
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/profile", authMiddleware, getProfile);

module.exports = authRouter;
