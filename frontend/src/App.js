import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserPage from './UserPage';
import AdminPage from './AdminPage';
import './styles.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Ticket System</h1>
                    <nav className="App-nav">
                        <Link to="/user" className="App-link">User Page</Link>
                        <Link to="/admin" className="App-link">Admin Page</Link>
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