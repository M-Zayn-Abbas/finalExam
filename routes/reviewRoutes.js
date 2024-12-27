const express = require('express');
const router = express.Router();
const {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');

// 📝 Routes for Reviews
router.get('/', getAllReviews);          // Get all reviews
router.get('/:id', getReviewById);       // Get one review by ID
router.post('/', createReview);          // Create a new review
router.put('/:id', updateReview);        // Update a review by ID
router.delete('/:id', deleteReview);     // Delete a review by ID

module.exports = router;
