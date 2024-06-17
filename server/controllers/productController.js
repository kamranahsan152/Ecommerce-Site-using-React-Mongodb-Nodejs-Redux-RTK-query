const express = require("express");
const jsonMiddleware = require("../middleware/bodyParser");
const isAuthenticated = require("../middleware/auth");
const AuthenticatedRoles = require("../middleware/authrole");
const Product = require("../models/productModel");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const Storage = multer.diskStorage({
  destination: "uploads/products",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("image");
router.post(
  "/add-product",
  jsonMiddleware,
  isAuthenticated,
  AuthenticatedRoles("admin"),
  upload,
  async (req, res) => {
    try {
      const {
        productName,
        // Manufacturer,
        // Type,
        description,
        price,
        category,
        stock,
      } = req.body;

      //   console.log(req.body);

      const newProduct = new Product({
        productName,
        // Manufacturer,
        // Type,
        description,
        price,
        Images: req.file.path,
        category,
        stock,
      });

      await newProduct.save();

      res.status(200).json({ msg: "Product added successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: err.message });
    }
  }
);

router.get(
  "/populate",
  isAuthenticated,
  AuthenticatedRoles("admin"),
  async (req, res) => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const data = response.data;
      // const response = await fetch("https://fakestoreapi.com/products");
      // const data = await response.json();

      const products = data.map((product) => ({
        productName: product.title,
        description: product.description,
        price: product.price,
        Images: product.image,
        category: product.category,
        stock: 10, // Default stock value
      }));

      const productsData = await Product.insertMany(products);
      res.json({ message: "Products added to the database", productsData });
    } catch (error) {
      res.status(500).json({ error: "Failed to populate products" });
    }
  }
);

router.get("/product-detail/:id", isAuthenticated, async (req, res) => {
  const id = req.params.id;
  try {
    const findProduct = await Product.findById(id);

    if (!findProduct) {
      return res.status(404).json({ msg: "Product not found!" });
    }

    res.status(200).json(findProduct);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

router.delete(
  "/product/:id",
  isAuthenticated,
  AuthenticatedRoles("admin"),
  async (req, res) => {
    const id = req.params.id;
    try {
      const findProduct = await Product.findById(id);

      if (!findProduct) {
        return res.status(404).json({ msg: "Product not found!" });
      }

      await Product.deleteOne({ _id: id });

      res.status(200).json({ msg: "Product deleted successfully!" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
);

router.put(
  "/update-product/:id",
  jsonMiddleware,
  isAuthenticated,
  AuthenticatedRoles("admin"),
  upload,
  async (req, res) => {
    const id = req.params.id;
    try {
      const findProduct = await Product.findById(id);
      if (!findProduct) {
        return res.status(404).json({ msg: "Product not found!" });
      }

      // console.log();

      const {
        productName,
        // Manufacturer,
        // Type,
        description,
        price,
        category,
        stock,
      } = req.body;
      let updatedFields = {
        productName,
        // Manufacturer,
        // Type,
        description,
        price,
        category,
        stock,
      };
      if (req.file) {
        updatedFields.Images = req.file.path;
      }
      await Product.findByIdAndUpdate(id, updatedFields, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({ msg: "Product Update successfully!" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
);

router.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
