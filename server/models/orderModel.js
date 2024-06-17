const mongoose = require("mongoose");
const User = require("./userModel");
const OrderSchema = mongoose.Schema({
  orderItems: [
    {
      productName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      Images: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Products",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  orderAt: {
    type: Date,
    required: true,
  },
  shippingPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: false,
  },
  orderStatus: {
    type: String,
    default: "Pending",
  },
  crearedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("Orders", OrderSchema);

OrderSchema.pre("save", async function (next) {
  try {
    const user = await User.findById(this.user);
    if (user.role === "user") {
      user.orders.push(this._id);
      await user.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = Order;
