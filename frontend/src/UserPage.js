import React, { useState } from 'react';
import './UserPage.css';

function UserPage() {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [priority, setPriority] = useState('Medium');

    const createTicket = async () => {
        if (!newTitle || !newDescription) {
            alert('Please provide both a title and a description for the ticket');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle, description: newDescription, priority }),
            });

            if (response.ok) {
                alert('Ticket submitted successfully!');
                setNewTitle('');
                setNewDescription('');
                setPriority('Medium');
            } else {
                console.error('Failed to create ticket');
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    return (
        <div className="user-container">
            <h2>Create a Support Ticket</h2>

            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Enter a brief title"
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Describe your issue..."
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>

            <button className="submit-btn" onClick={createTicket}>
                Submit Ticket
            </button>
        </div>
    );
}

export default UserPage;
