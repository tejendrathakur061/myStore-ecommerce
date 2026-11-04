const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user.id,
    }).populate("items.productId");

    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    if (product.stock < 1) {
      return res.status(400).json({
        message: "Product Out Of Stock",
      });
    }

    let cart = await Cart.findOne({
      userId: req.user.id,
    });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === product._id.toString(),
    );

    if (existingItem) {
      if (existingItem.qty >= product.stock) {
        return res.status(400).json({
          message: "Available Stock Limit Reached",
        });
      }

      existingItem.qty += 1;
    } else {
      cart.items.push({
        productId,
        qty: 1,
      });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({
      userId: req.user.id,
    }).populate("items.productId");

    res.status(200).json({
      message: "Product Added To Cart",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { qty } = req.body;
    const { productId } = req.params;

    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({
        message: "Invalid Quantity",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    if (qty > product.stock) {
      return res.status(400).json({
        message: "Available Stock Limit Reached",
      });
    }

    const cart = await Cart.findOne({
      userId: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart Not Found",
      });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === product._id.toString(),
    );

    if (!item) {
      return res.status(404).json({
        message: "Product Not Found In Cart",
      });
    }

    item.qty = qty;
    await cart.save();

    const updatedCart = await Cart.findOne({
      userId: req.user.id,
    }).populate("items.productId");

    res.json({
      message: "Quantity Updated",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart Not Found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId,
    );

    await cart.save();

    const updatedCart = await Cart.findOne({
      userId: req.user.id,
    }).populate("items.productId");

    res.json({
      message: "Product Removed",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
