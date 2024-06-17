const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/auth");
const AuthenticatedRoles = require("../middleware/authrole");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const jsonMiddleware = require("../middleware/bodyParser");
const { default: mongoose } = require("mongoose");
// Create a new order
router.post("/orders", isAuthenticated, jsonMiddleware, async (req, res) => {
  try {
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      user: req.user.id,
      orderAt: new Date(),
      orderStatus: "Pending",
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });

    await newOrder.save();

    res.status(201).json({ msg: "Order Placed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//get all order by admin
router.get(
  "/allorders",
  isAuthenticated,
  AuthenticatedRoles("admin"),
  async (req, res) => {
    try {
      const orders = await Order.find();

      res.status(200).json(orders);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// Get all orders for a user
router.get("/orders", isAuthenticated, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({ orders });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// Update order status (for admin)
router.put(
  "/order-deliver/:id",
  jsonMiddleware,
  isAuthenticated,
  AuthenticatedRoles("admin"),
  async (req, res) => {
    try {
      const { orderStatus } = req.body;

      const order = await Order.findOne({ _id: req.params.id });

      if (!order) {
        return res.status(404).json({ msg: "Order not found" });
      }

      if (order.orderStatus === "Pending") {
        // Reduce stock for each product in the order
        for (const item of order.orderItems) {
          const product = await Product.findOne({ _id: item.product });
          console.log(product);

          if (!product) {
            throw new Error(`Product with id ${item.productId} not found`);
          }

          if (product.stock < item.qty) {
            throw new Error(
              `Not enough stock for product ${product.productName}`
            );
          }

          product.stock -= item.qty;
          await product.save();
        }
      }
      order.orderStatus = orderStatus;

      await order.save();

      // Check if the status change requires stock adjustment
      res.status(200).json({ msg: "Order status updated successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  }
);

// Get order by ID
// router.get("/orders/:orderId", isAuthenticated, async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.orderId);

//     if (!order) {
//       return res.status(404).json({ msg: "Order not found" });
//     }

//     if (order.user.toString() !== req.user.id) {
//       return res.status(403).json({ msg: "Unauthorized" });
//     }

//     res.status(200).json({ order });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

module.exports = router;
