const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please fill in your username"],
    },
    email: {
      type: String,
      required: [true, "Please fill in your email address"],
      unique: [true, "Email already used"],
    },
    password: { type: String, required: [true, "Password field required"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
