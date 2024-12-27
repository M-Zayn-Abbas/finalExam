const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const attractionRoutes = require('./routes/attractionRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const reviewRoutes = require('./routes/reviewRoutes');




const app = express();

app.use(cors());

// Middleware
app.use(express.json()); // Parse JSON requests

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/FinalTerm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
});

// Routes
app.use('/api/attractions', attractionRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/reviews', reviewRoutes);




// Root Route
app.get('/', (req, res) => {
    res.send('🎉 Tourist Management System API is running!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ success: false, message: 'Something went wrong!' });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
