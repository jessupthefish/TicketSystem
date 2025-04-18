import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [tickets, setTickets] = useState([]);
    const [newTitle, setNewTitle] = useState('');  // State to store the new ticket title
    const [newDescription, setNewDescription] = useState('');  // State to store the new ticket description

    // Fetch tickets from the backend API when the app loads
    useEffect(() => {
        fetch('http://localhost:3001/api/tickets')  // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => setTickets(data))
            .catch(error => console.error('Error fetching tickets:', error));
    }, []);

    // Function to handle ticket creation
    const createTicket = async () => {
        if (!newTitle || !newDescription) {
            alert('Please provide both a title and a description for the ticket');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newTitle,
                    description: newDescription,
                }),
            });

            if (response.ok) {
                const newTicket = await response.json();
                setTickets([...tickets, newTicket]);  // Add the new ticket to the existing list
                setNewTitle('');  // Reset the input fields
                setNewDescription('');
            } else {
                console.error('Failed to create ticket');
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Ticket List</h1>
                <ul>
                    {tickets.length === 0 ? (
                        <li>No tickets available</li>
                    ) : (
                        tickets.map(ticket => (
                            <li key={ticket.id}>
                                {ticket.title} - {ticket.description}
                            </li>
                        ))
                    )}
                </ul>

                {/* Form to create a new ticket */}
                <h2>Create New Ticket</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Ticket Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Ticket Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                </div>
                <button onClick={createTicket}>Create Ticket</button>
            </header>
        </div>
    );
}

export default App;
