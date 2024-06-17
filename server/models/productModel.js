const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "please Enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product price"],
    maxLength: [8, "Price cannot exceed 8 character"],
  },
  Images: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, "Please Enter the product category"],
  },
  stock: {
    type: Number,
    required: [true, "please Enter the product stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Products", ProductSchema);

module.exports = Product;
