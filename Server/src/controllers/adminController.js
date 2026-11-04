const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getDashboard = async (req, res) => {
  try {
    const [totalProducts, totalOrders, totalUsers, revenueData] =
      await Promise.all([
        Product.countDocuments(),
        Order.countDocuments(),
        User.countDocuments({ role: "user" }),
        Order.aggregate([
          { $match: { status: { $ne: "Cancelled" } } },
          { $group: { _id: null, total: { $sum: "$total" } } },
        ]),
      ]);

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: revenueData[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
  getAllUsers,
};
