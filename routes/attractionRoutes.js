const express = require('express');
const router = express.Router();
const {
    getAllAttractions,
    getAttractionById,
    createAttraction,
    updateAttraction,
    deleteAttraction,
    getTopRatedAttractions
} = require('../controllers/attractionController');

// 📝 Routes for Attractions
router.get('/top-rated', getTopRatedAttractions);

router.get('/', getAllAttractions);           // Get all attractions
router.get('/:id', getAttractionById);        // Get one attraction by ID
router.post('/', createAttraction);          // Create a new attraction
router.put('/:id', updateAttraction);        // Update attraction by ID
router.delete('/:id', deleteAttraction);     // Delete attraction by ID


module.exports = router;
