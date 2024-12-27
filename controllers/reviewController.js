const Review = require('../models/Review');
const Attraction = require('../models/Attraction');
const Visitor = require('../models/Visitor');

// 📝 Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('attraction', 'name location') // Show specific fields from Attraction
            .populate('visitor', 'name email'); // Show specific fields from Visitor
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 📝 Get a review by ID
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('attraction', 'name location')
            .populate('visitor', 'name email');
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        res.status(200).json({ success: true, data: review });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 📝 Create a new review
const createReview = async (req, res) => {
    try {
        const { attraction, visitor, score, comment } = req.body;

        // ✅ Validate Attraction and Visitor exist
        const attractionExists = await Attraction.findById(attraction);
        const visitorExists = await Visitor.findById(visitor);

        if (!attractionExists) {
            return res.status(400).json({ success: false, message: 'Attraction not found' });
        }

        if (!visitorExists) {
            return res.status(400).json({ success: false, message: 'Visitor not found' });
        }

        // ✅ Check if the visitor has visited the attraction
        if (!visitorExists.visitedAttractions.includes(attraction)) {
            return res.status(403).json({
                success: false,
                message: 'You cannot review this attraction as you have not visited it yet.'
            });
        }

        // ✅ Check if the visitor has already reviewed this attraction
        const existingReview = await Review.findOne({ attraction, visitor });
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this attraction.'
            });
        }

        // ✅ Create the new review
        const newReview = await Review.create({ attraction, visitor, score, comment });

        // ✅ Update Attraction Rating
        const reviews = await Review.find({ attraction });
        const totalScore = reviews.reduce((acc, review) => acc + review.score, 0);
        const averageScore = totalScore / reviews.length;

        attractionExists.rating = averageScore.toFixed(2); // Keep rating to 2 decimal points
        await attractionExists.save();

        res.status(201).json({
            success: true,
            data: newReview,
            message: 'Review added and attraction rating updated successfully.'
        });
    } catch (error) {
        console.error('❌ Error creating review:', error.message);
        res.status(400).json({ success: false, error: error.message });
    }
};

// 📝 Update a review by ID
const updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        .populate('attraction', 'name location')
        .populate('visitor', 'name email');

        if (!updatedReview) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        res.status(200).json({ success: true, data: updatedReview });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// 📝 Delete a review by ID
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the review
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        // Store attraction ID before deleting the review
        const attractionId = review.attraction;

        // Delete the review
        await Review.findByIdAndDelete(id);

        // Recalculate average rating for the attraction
        const reviews = await Review.find({ attraction: attractionId });
        const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);
        const averageRating = reviews.length > 0 ? (totalScore / reviews.length).toFixed(2) : 0;

        // Update the attraction's rating
        await Attraction.findByIdAndUpdate(attractionId, { rating: averageRating });

        res.status(200).json({ success: true, message: 'Review deleted and attraction rating updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};
