const Review = require('../models/Review');
const Attraction = require('../models/Attraction');
const Visitor = require('../models/Visitor');

// 📝 Get all attractions
const getAllAttractions = async (req, res) => {
    try {
        const attractions = await Attraction.find();
        res.status(200).json({ success: true, data: attractions });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 📝 Get a single attraction by ID
const getAttractionById = async (req, res) => {
    try {
        const attraction = await Attraction.findById(req.params.id);
        if (!attraction) {
            return res.status(404).json({ success: false, message: 'Attraction not found' });
        }
        res.status(200).json({ success: true, data: attraction });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 📝 Create a new attraction
const createAttraction = async (req, res) => {
    try {
        const { name, location, entryFee} = req.body;
        const newAttraction = await Attraction.create({ name, location, entryFee});
        res.status(201).json({ success: true, data: newAttraction });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// 📝 Update an attraction by ID
const updateAttraction = async (req, res) => {
    try {
        const updatedAttraction = await Attraction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedAttraction) {
            return res.status(404).json({ success: false, message: 'Attraction not found' });
        }

        res.status(200).json({ success: true, data: updatedAttraction });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// 📝 Delete an attraction by ID
const deleteAttraction = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if attraction exists
        const attraction = await Attraction.findById(id);
        if (!attraction) {
            return res.status(404).json({ success: false, message: 'Attraction not found' });
        }

        // Delete all reviews associated with this attraction
        await Review.deleteMany({ attraction: id });

        // Optionally, remove attraction reference from visitors
        await Visitor.updateMany(
            { visitedAttractions: id },
            { $pull: { visitedAttractions: id } }
        );

        // Delete the attraction
        await Attraction.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Attraction and related reviews removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getTopRatedAttractions = async (req, res) => {
    try {
        const topAttractions = await Attraction.find()
            .sort({ rating: -1 }) // Sort by rating in descending order
            .limit(5); // Limit to top 5 attractions

        res.status(200).json({
            success: true,
            data: topAttractions,
        });
    } catch (error) {
        console.error('❌ Error fetching top-rated attractions:', error.message);
        res.status(500).json({
            success: false,
            error: 'Server error while fetching top-rated attractions',
        });
    }
};

module.exports = {
    getAllAttractions,
    getAttractionById,
    createAttraction,
    updateAttraction,
    deleteAttraction,
    getTopRatedAttractions
};
