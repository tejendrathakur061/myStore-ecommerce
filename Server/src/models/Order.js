const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        name: String,
        price: Number,
        qty: Number,
      },
    ],

    details: {
      name: String,
      phone: String,
      email: String,
      address: String,
      city: String,
      pincode: String,
      date: String,
    },

    payment: {
      type: String,
      default: "COD",
    },

    status: {
      type: String,
      default: "Pending",
    },

    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
