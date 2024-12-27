const Visitor = require('../models/Visitor');
const Attraction = require('../models/Attraction');
const Review = require('../models/Review');


// 📝 Get all visitors
const getAllVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find().populate('visitedAttractions');
        res.status(200).json({ success: true, data: visitors });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 📝 Get a single visitor by ID
const getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id).populate('visitedAttractions');
        if (!visitor) {
            return res.status(404).json({ success: false, message: 'Visitor not found' });
        }
        res.status(200).json({ success: true, data: visitor });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 📝 Create a new visitor
const createVisitor = async (req, res) => {
    try {
        const { name, email, visitedAttractions } = req.body;
        
        // Check if attractions exist
        if (visitedAttractions && visitedAttractions.length > 0) {
            for (const attractionId of visitedAttractions) {
                const attraction = await Attraction.findById(attractionId);
                if (!attraction) {
                    return res.status(400).json({ success: false, message: `Attraction with ID ${attractionId} not found` });
                }
            }
        }

        const newVisitor = await Visitor.create({ name, email, visitedAttractions });
        res.status(201).json({ success: true, data: newVisitor });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// 📝 Update a visitor by ID
const updateVisitor = async (req, res) => {
    try {
        const updatedVisitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('visitedAttractions');

        if (!updatedVisitor) {
            return res.status(404).json({ success: false, message: 'Visitor not found' });
        }

        res.status(200).json({ success: true, data: updatedVisitor });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// 📝 Delete a visitor by ID
const deleteVisitor = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if visitor exists
        const visitor = await Visitor.findById(id);
        if (!visitor) {
            return res.status(404).json({ success: false, message: 'Visitor not found' });
        }

        // Delete all reviews associated with this visitor
        await Review.deleteMany({ visitor: id });

        // Delete the visitor
        await Visitor.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: 'Visitor and related reviews removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🧑‍💻 Get Visitors with Count of Reviewed Attractions
const getVisitorActivity = async (req, res) => {
    try {
        const visitorActivity = await Review.aggregate([
            {
                $group: {
                    _id: '$visitor', // Group by visitor ID
                    reviewCount: { $sum: 1 } // Count number of reviews per visitor
                }
            },
            {
                $lookup: {
                    from: 'visitors', // Collection to join
                    localField: '_id', // Field from Review
                    foreignField: '_id', // Field from Visitor
                    as: 'visitorInfo'
                }
            },
            {
                $unwind: '$visitorInfo' // Deconstruct the visitorInfo array
            },
            {
                $project: {
                    _id: 0,
                    visitorId: '$visitorInfo._id',
                    name: '$visitorInfo.name',
                    email: '$visitorInfo.email',
                    reviewCount: 1
                }
            },
            {
                $sort: { reviewCount: -1 } // Sort by review count in descending order
            }
        ]);

        res.status(200).json({
            success: true,
            data: visitorActivity
        });
    } catch (error) {
        console.error('❌ Error fetching visitor activity:', error.message);
        res.status(500).json({
            success: false,
            error: 'Server error while fetching visitor activity'
        });
    }
};

module.exports = {
    getAllVisitors,
    getVisitorById,
    createVisitor,
    updateVisitor,
    deleteVisitor,
    getVisitorActivity
};
