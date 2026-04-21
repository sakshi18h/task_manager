const express = require("express");
const Task = require("../models/Task");

// ✅ correct import
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();


// 🔹 CREATE TASK (Admin, Manager)
router.post("/", verifyToken, authorizeRoles("admin", "manager"), async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔹 GET ALL TASKS (Admin, Manager)
router.get("/", verifyToken, authorizeRoles("admin", "manager"), async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});


// 🔹 GET MY TASKS (All users)
router.get("/my", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching my tasks" });
  }
});


// 🔥 DAY 5: UPDATE TASK (status or full update)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,   // can update status, title, etc
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
});


// 🔥 DAY 5: DELETE TASK (Admin only)
router.delete("/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
});


module.exports = router;