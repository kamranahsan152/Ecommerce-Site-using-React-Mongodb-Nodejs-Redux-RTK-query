const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "user",
  },
  orders: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Orders", required: true },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
