const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

// @route   GET /api/medicines
// @desc    Get all medicine reminders
router.get("/", async(req, res) => {
    try {
        const medicines = await Medicine.find().sort({ createdAt: -1 });
        res.json(medicines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/medicines
// @desc    Add a new medicine reminder
router.post("/", async(req, res) => {
    try {
        const { name, dosage, time, frequency, notes } = req.body;

        const newMedicine = new Medicine({ name, dosage, time, frequency, notes });
        const savedMedicine = await newMedicine.save();

        res.status(201).json(savedMedicine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   PUT /api/medicines/:id
// @desc    Update a medicine reminder (e.g. edit details or mark as taken)
router.put("/:id", async(req, res) => {
    try {
        const updatedMedicine = await Medicine.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true } // return the updated document, not the old one
        );

        if (!updatedMedicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        res.json(updatedMedicine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   DELETE /api/medicines/:id
// @desc    Delete a medicine reminder
router.delete("/:id", async(req, res) => {
    try {
        const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);

        if (!deletedMedicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        res.json({ message: "Medicine deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;