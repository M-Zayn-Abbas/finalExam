const mongoose = require('mongoose');

// Review Schema
const ReviewSchema = new mongoose.Schema({
    attraction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction',
        required: true
    },
    visitor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor',
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: [1, 'Score must be at least 1'],
        max: [5, 'Score cannot exceed 5']
    },
    comment: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Export Model
const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
