const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const upload = require("../middleware/upload");
const { authMiddleware } = require("../middleware/authMiddleware");

/* =========================
   Raise Complaint (student)
========================= */
router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    const { name, title, category, description } = req.body;

    if (!name || !title || !category || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const complaint = new Complaint({
      name,
      studentEmail: req.user.email,
      title,
      category,
      description,
      file: req.file ? req.file.filename : null,
    });

    await complaint.save();
    res.status(201).json({ message: "Complaint created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   Student: Track My Complaints
========================= */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Access denied" });
    }

    const complaints = await Complaint.find({
      studentEmail: req.user.email,
    }).sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (err) {
    console.error("Track complaint error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   Admin: View All Complaints
========================= */
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    console.error("View complaints error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// View Complaints (student)
router.get("/view", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Access denied" });
    }

    const complaints = await Complaint.find({
      studentEmail: req.user.email,
    }).sort({ createdAt: -1 });

    res.status(200).json(complaints);
  } catch (err) {
    console.error("View complaints error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ DELETE complaint (student)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.studentEmail !== req.user.email) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Complaint.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    console.error("Delete complaint error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ UPDATE complaint (student)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { category, description } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (complaint.studentEmail !== req.user.email) {
      return res.status(403).json({ message: "Access denied" });
    }

    complaint.category = category;
    complaint.description = description;

    await complaint.save();

    res.status(200).json({ message: "Complaint updated successfully" });
  } catch (err) {
    console.error("Update complaint error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
