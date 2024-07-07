import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';
import DashboardAdmin from './components/DashboardAdmin';
import Register from './components/Register';
import RecoverPassword from './components/RecoverPassword';
import Account from './components/Account';
import Notifications from './components/Notifications';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/recover-password" element={<RecoverPassword />} />
                <Route path="/dashboard-admin" element={<DashboardAdmin />} />
                <Route path="/account" element={<Account />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default App;
