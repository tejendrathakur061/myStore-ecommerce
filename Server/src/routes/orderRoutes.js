const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  createOrder,
  getOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/", authMiddleware, getOrders);
orderRouter.get("/:id", authMiddleware, getOrderById);
orderRouter.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  getAllOrders,
);
orderRouter.put(
  "/admin/:id",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus,
);

module.exports = orderRouter;
