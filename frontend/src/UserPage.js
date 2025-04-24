import React, { useState } from 'react';
import './styles.css';

function UserPage() {
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [priority, setPriority] = useState('Medium');

    const createTicket = async () => {
        // Log the values before creating the ticket
        console.log('Creating ticket with values:', {
            title: newTitle,
            description: newDescription,
            priority: priority,
        });

        if (!newTitle || !newDescription) {
            alert('Please provide both a title and a description for the ticket');
            return;
        }

        try {
            // Log the fetch request
            console.log('Sending POST request with body:', {
                title: newTitle,
                description: newDescription,
                priority: priority,
            });

            const response = await fetch('http://localhost:3001/api/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: newTitle, description: newDescription, priority }),
            });

            // Log the response status
            console.log('Response status:', response.status);

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
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <button className="submit-btn" onClick={createTicket}>
                Submit Ticket
            </button>
        </div>
    );
}

export default UserPage;
