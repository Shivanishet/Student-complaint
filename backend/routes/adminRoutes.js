import express from "express";
import Complaint from "../models/Complaint.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// -------------------
// GET all complaints
// -------------------
router.get("/complaints", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -------------------
// GET reports/statistics
// -------------------
// -------------------
// GET reports/statistics
// -------------------
router.get("/reports", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    const total = complaints.length;

    // Normalize status strings to avoid mismatches
    const normalize = (s) => s.toLowerCase().replace(/\s/g, "");

    const statusCounts = {
      submitted: complaints.filter(c => normalize(c.status) === "submitted").length,
      inprogress: complaints.filter(c => normalize(c.status) === "inprogress").length,
      resolved: complaints.filter(c => normalize(c.status) === "resolved").length,
      closed: complaints.filter(c => normalize(c.status) === "closed").length,
    };

    const complaintData = complaints.map(c => ({
      _id: c._id,
      candidateName: c.name || "N/A",
      candidateEmail: c.studentEmail || "N/A",
      text: c.description || "N/A",
      status: c.status,
      createdAt: c.createdAt,
    }));

    res.json({
      total,
      statusCounts,
      complaints: complaintData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// -------------------
// PUT update complaint status
// -------------------
router.put("/complaints/:id/status", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.json({ message: "Status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
