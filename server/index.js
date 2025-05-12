const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const plantRoutes = require('./routes/plants');
const userRoutes = require('./routes/users');
const tourRoutes = require('./routes/tours');
const chatbotRoutes = require('./routes/chatbot');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the public directory
// Important: The order matters - more specific routes should come first
app.use('/models', express.static(path.join(__dirname, '../public/models')));
app.use(express.static(path.join(__dirname, '../public')));

// Connect to MongoDB with updated options
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/virtual-herbal-garden')
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit if cannot connect to database
  });

// Routes
app.use('/api/plants', plantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/chatbot', chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});