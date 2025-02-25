require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json()); // Allows JSON request bodies
app.use(cors()); // Enables Cross-Origin Resource Sharing

// Simple Test Route
app.get('/', (req, res) => {
    res.send('IT Ticketing System Backend is Running');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
