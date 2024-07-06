import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import NoAccess from './components/NoAccess';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/no-access" element={<NoAccess />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
