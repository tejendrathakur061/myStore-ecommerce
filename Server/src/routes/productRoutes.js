const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", authMiddleware, adminMiddleware, createProduct);
productRouter.put("/:id", authMiddleware, adminMiddleware, updateProduct);
productRouter.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = productRouter;
