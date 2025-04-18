// Import necessary modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client } = require('pg'); // PostgreSQL client

// Initialize express and configure .env
dotenv.config();
const app = express();

// CORS Configuration (important for frontend-backend communication)
app.use(cors({
    origin: 'http://localhost:3000', // React app origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.options('*', cors()); // Handle preflight requests

// Middleware to parse JSON
app.use(express.json());

// Set up the database connection
const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Database connection error', err));

// GET - Fetch all tickets
app.get('/api/tickets', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM tickets');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});

// POST - Create a new ticket
app.post('/api/tickets', async (req, res) => {
    const { title, description } = req.body;
    console.log('Creating ticket:', title, description); // Log for debug
    try {
        const result = await client.query(
            'INSERT INTO tickets (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Failed to create ticket' });
    }
});

// PUT - Update an existing ticket
app.put('/api/tickets/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const result = await client.query(
            'UPDATE tickets SET title = $1, description = $2 WHERE id = $3 RETURNING *',
            [title, description, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update ticket' });
    }
});

// DELETE - Delete a ticket
app.delete('/api/tickets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM tickets WHERE id = $1', [id]);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete ticket' });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
