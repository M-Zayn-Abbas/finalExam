const mongoose = require('mongoose');

const AttractionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Attraction name is required'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
    },
    entryFee: {
        type: Number,
        required: [true, 'Entry fee is required'],
        min: [0, 'Entry fee cannot be negative'],
    },
    rating: {
        type: Number,
        min: [0, 'Rating cannot be below 0'],
        max: [5, 'Rating cannot exceed 5'],
        default: 0,
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Export the model
module.exports = mongoose.model('Attraction', AttractionSchema);
