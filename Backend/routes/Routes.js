const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const UsersModel = require("../models/UsersModel");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/register", async (req, res) => {
  try {
    const { usrname, firstname, surname, email, password } = req.body;

    if (!usrname || !firstname || !surname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UsersModel.findOne({
      $or: [{ email }, { usrname }],
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UsersModel.create({
      usrname,
      firstname,
      surname,
      email,
      active: true,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        usrname: user.usrname,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
        active: user.active,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        usrname: user.usrname,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
        active: user.active,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/profile", AuthMiddleware, async (req, res) => {
  try {
    const user = await UsersModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New contact message from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/welcome-mailer", async (req, res) => {
  try {
    const { email, firstname } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to My App!",
      html: `<h2>Welcome ${firstname || "aboard"}!</h2>
             <p>Thank you for registering. We're glad to have you with us.</p>`,
    });

    res.status(200).json({ message: "Welcome mail sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
