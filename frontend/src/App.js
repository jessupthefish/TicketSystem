import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserPage from './UserPage';
import AdminPage from './AdminPage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Ticket System</h1>
                    <nav>
                        <Link to="/user" style={{ marginRight: '1rem', color: 'white' }}>User Page</Link>
                        <Link to="/admin" style={{ color: 'white' }}>Admin Page</Link>
                    </nav>

                    <Routes>
                        <Route path="/user" element={<UserPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
