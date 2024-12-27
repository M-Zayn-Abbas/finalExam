const mongoose = require('mongoose');

// Visitor Schema
const VisitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
    },
    visitedAttractions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attraction'
    }]
}, {
    timestamps: true
});

// Export Model
const Visitor = mongoose.model('Visitor', VisitorSchema);
module.exports = Visitor;
