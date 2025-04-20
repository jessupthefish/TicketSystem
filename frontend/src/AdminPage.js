import React, { useEffect, useState } from 'react';
import './AdminPage.css'; // Add this for custom styles

function AdminPage() {
    const [tickets, setTickets] = useState([]);
    const [editTicketId, setEditTicketId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editPriority, setEditPriority] = useState('');
    const [editStatus, setEditStatus] = useState('');

    const fetchTickets = () => {
        fetch('http://localhost:3001/api/tickets')
            .then(res => res.json())
            .then(data => setTickets(data))
            .catch(err => console.error('Failed to fetch tickets:', err));
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleEdit = (ticket) => {
        setEditTicketId(ticket.id);
        setEditTitle(ticket.title);
        setEditDescription(ticket.description);
        setEditPriority(ticket.priority);
        setEditStatus(ticket.status);
    };

    const saveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/tickets/${editTicketId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editTitle,
                    description: editDescription,
                    priority: editPriority,
                    status: editStatus,
                }),
            });

            if (response.ok) {
                setEditTicketId(null);
                fetchTickets();
            }
        } catch (err) {
            console.error('Error updating ticket:', err);
        }
    };

    const deleteTicket = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/tickets/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchTickets();
            }
        } catch (err) {
            console.error('Error deleting ticket:', err);
        }
    };

    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>
            {tickets.length === 0 ? (
                <p>No tickets found.</p>
            ) : (
                <div className="ticket-list">
                    {tickets.map(ticket => (
                        <div key={ticket.id} className="ticket-card">
                            {editTicketId === ticket.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                    />
                                    <textarea
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                    />
                                    <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                    <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                                        <option>Open</option>
                                        <option>In Progress</option>
                                        <option>Closed</option>
                                    </select>
                                    <div className="btn-group">
                                        <button onClick={saveEdit}>Save</button>
                                        <button className="cancel" onClick={() => setEditTicketId(null)}>Cancel</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3>{ticket.title}</h3>
                                    <p>{ticket.description}</p>
                                    <p><strong>Priority:</strong> {ticket.priority}</p>
                                    <p><strong>Status:</strong> {ticket.status}</p>
                                    <p><strong>Created:</strong> {new Date(ticket.created_at).toLocaleString()}</p>
                                    <div className="btn-group">
                                        <button onClick={() => handleEdit(ticket)}>Edit</button>
                                        <button className="delete" onClick={() => deleteTicket(ticket.id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminPage;
