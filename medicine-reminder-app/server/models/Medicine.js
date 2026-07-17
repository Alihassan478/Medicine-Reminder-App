const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // must provide a medicine name
    },
    dosage: {
        type: String,
        required: true, // e.g. "500mg" or "1 tablet"
    },
    time: {
        type: String,
        required: true, // e.g. "08:00 AM" - when to take it
    },
    frequency: {
        type: String,
        default: "Daily", // e.g. Daily, Twice a day, Weekly
    },
    notes: {
        type: String,
        default: "",
    },
    taken: {
        type: Boolean,
        default: false, // whether today's dose has been marked as taken
    },
}, {
    timestamps: true, // automatically adds createdAt and updatedAt fields
});

// "Medicine" here becomes the collection name "medicines" in MongoDB automatically
module.exports = mongoose.model("Medicine", medicineSchema);