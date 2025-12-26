import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "Student email not found. Please register." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    // ✅ ONLY 4 ADMINS USING IF STATEMENT
    let role = "student";

    if (
      email === "shivani.cs24@bmsce.ac.in" ||
      email === "shivayogi.cs24@bmsce.ac.in" ||
      email === "shashankspatil.cs24@bmsce.ac.in" ||
      email === "shashankns.cs24@bmsce.ac.in"
    ) {
      role = "admin";
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: role, // ✅ use calculated role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: role,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




export default router;
