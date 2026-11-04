const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

const cartRouter = express.Router();

cartRouter.get("/", authMiddleware, getCart);
cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.put("/:productId", authMiddleware, updateCartItem);
cartRouter.delete("/:productId", authMiddleware, removeFromCart);

module.exports = cartRouter;
