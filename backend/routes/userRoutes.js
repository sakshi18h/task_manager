const express = require("express");
const User = require("../models/User");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();


// GET ALL USERS (Protected Route)
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin", "manager", "employee"),
  async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching users",
        error: error.message,
      });
    }
  }
);


// TEST ROUTE (IMPORTANT for debugging)
router.get("/test", (req, res) => {
  res.json({ message: "User route working" });
});


module.exports = router;