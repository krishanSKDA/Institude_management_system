// Import required modules
const express = require("express")
const User = require("../models/user");
const router = express.Router();

// Import functions from controller
const {
  loginUser,
  registerUser,
  logoutUser,
} = require('../controllers/authController')

router.post("/login", (req, res) => loginUser(req, res))

// // router.post("/register", (req, res) => registerUser(req, res))
// Register new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const newUser = new User({ name, email, isAdmin });

    // Set password hash
    newUser.setPassword(password);

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/logout", (req, res) => logoutUser(req, res))

module.exports = router;
