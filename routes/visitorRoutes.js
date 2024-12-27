const express = require('express');
const router = express.Router();
const {
    getAllVisitors,
    getVisitorById,
    createVisitor,
    updateVisitor,
    deleteVisitor,
    getVisitorActivity
} = require('../controllers/visitorController');

// 📝 Routes for Visitors
router.get('/', getAllVisitors);           // Get all visitors
router.get('/:id', getVisitorById);        // Get one visitor by ID
router.post('/', createVisitor);           // Create a new visitor
router.put('/:id', updateVisitor);         // Update visitor by ID
router.delete('/:id', deleteVisitor);      // Delete visitor by ID
router.get('/activity', getVisitorActivity);


module.exports = router;
