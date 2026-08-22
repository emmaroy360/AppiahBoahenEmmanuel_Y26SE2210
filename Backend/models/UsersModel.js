const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    usrname: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
      trim: true,
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", usersSchema);
