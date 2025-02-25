// Import necessary modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client } = require('pg'); // Assuming you're using PostgreSQL

// Initialize express and configure .env
dotenv.config();
const app = express();

// Middleware
app.use(express.json());  // to parse JSON request bodies
app.use(cors());          // enable CORS for cross-origin requests

// Set up the database connection
const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Database connection error', err));

// Define API endpoints

// GET - Fetch all tickets
app.get('/api/tickets', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM tickets');  // Assuming a 'tickets' table in your DB
        res.json(result.rows);  // Send tickets data as JSON
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});

// POST - Create a new ticket
app.post('/api/tickets', async (req, res) => {
    const { title, description } = req.body;  // Assuming the frontend sends title and description
    try {
        const result = await client.query('INSERT INTO tickets (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
        res.status(201).json(result.rows[0]);  // Send the created ticket back
    } catch (error) {
        res.status(500).json({ error: 'Failed to create ticket' });
    }
});

// PUT - Update an existing ticket
app.put('/api/tickets/:id', async (req, res) => {
    const { id } = req.params;  // Get ticket ID from URL
    const { title, description } = req.body;  // Get new data from the request body
    try {
        const result = await client.query('UPDATE tickets SET title = $1, description = $2 WHERE id = $3 RETURNING *', [title, description, id]);
        res.json(result.rows[0]);  // Send the updated ticket back
    } catch (error) {
        res.status(500).json({ error: 'Failed to update ticket' });
    }
});

// DELETE - Delete a ticket
app.delete('/api/tickets/:id', async (req, res) => {
    const { id } = req.params;  // Get ticket ID from URL
    try {
        await client.query('DELETE FROM tickets WHERE id = $1', [id]);
        res.status(204).end();  // Send a "no content" response if the ticket was deleted
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete ticket' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
