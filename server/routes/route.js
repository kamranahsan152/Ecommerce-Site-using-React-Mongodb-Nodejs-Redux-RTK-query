const express = require("express");
const app = express();
const User = require("../controllers/userController");
const Product = require("../controllers/productController");
const Order = require("../controllers/orderController");
const cors = require("cors");

app.use(
  cors({
    //   origin: "https://mediswift.netlify.app",
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));
app.use("/api/v1", User);
app.use("/api/v1", Product);
app.use("/api/v1", Order);
module.exports = app;
