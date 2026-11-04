const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
  try {
    const details = req.body?.details;

    if (
      !details ||
      !details.name ||
      !details.phone ||
      !details.email ||
      !details.address ||
      !details.city ||
      !details.pincode
    ) {
      return res.status(400).json({
        message: "Please fill all delivery details",
      });
    }

    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({
          message: "Insufficient stock for " + product.name,
        });
      }

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        qty: item.qty,
      });

      total += product.price * item.qty;
    }

    const order = await Order.create({
      userId: req.user.id,
      orderId: "ORD-" + Date.now(),
      items: orderItems,
      details: req.body.details,
      payment: "COD",
      total: total,
    });

    for (const item of cart.items) {
      const product = await Product.findById(item.productId);

      product.stock -= item.qty;
      await product.save();
    }

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" },
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
