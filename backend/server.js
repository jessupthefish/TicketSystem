const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Database connection error', err));

// GET all tickets
app.get('/api/tickets', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM tickets ORDER BY created_at DESC');
        console.log('Tickets fetched:', result.rows);  // Log the fetched tickets
        res.json(result.rows);
    } catch (error) {
        console.error('Failed to fetch tickets:', error);
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
});

// POST new ticket
app.post('/api/tickets', async (req, res) => {
    const { title, description, priority, status } = req.body;

    // Log the incoming request data
    console.log('Received data (POST):', { title, description, priority, status });

    try {
        const result = await client.query(
            'INSERT INTO tickets (title, description, priority, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, description, priority || 'Medium', status || 'Open']
        );
        console.log('Ticket created:', result.rows[0]);  // Log the created ticket
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Failed to create ticket' });
    }
});

// PUT update ticket
app.put('/api/tickets/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    // Log the incoming update data
    console.log('Received data (PUT):', { title, description, priority, status, id });

    try {
        const result = await client.query(
            'UPDATE tickets SET title = $1, description = $2, priority = $3, status = $4, updated_at = now() WHERE id = $5 RETURNING *',
            [title, description, priority, status, id]
        );
        console.log('Ticket updated:', result.rows[0]);  // Log the updated ticket
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ error: 'Failed to update ticket' });
    }
});

// DELETE a ticket
app.delete('/api/tickets/:id', async (req, res) => {
    const { id } = req.params;

    // Log the ticket ID being deleted
    console.log('Deleting ticket with ID:', id);

    try {
        await client.query('DELETE FROM tickets WHERE id = $1', [id]);
        console.log('Ticket deleted:', id);  // Log the deleted ticket ID
        res.status(204).end();
    } catch (error) {
        console.error('Failed to delete ticket:', error);
        res.status(500).json({ error: 'Failed to delete ticket' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
