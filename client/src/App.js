import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';
import DashboardAdmin from './components/DashboardAdmin';
import Register from './components/Register';
import RecoverPassword from './components/RecoverPassword';
import Account from './components/Account';
import Notifications from './components/Notifications';
import CreateUser from './components/CreateUser';
import ListUsers from './components/ListUsers';
import ManageUsers from './components/ManageUsers';
import UserProfile from './components/UserProfile';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/recover-password" element={<RecoverPassword />} />
                <Route path="/manage-users" element={<ManageUsers />} />
                <Route path="/dashboard-admin" element={<DashboardAdmin />} />
                <Route path="/account" element={<Account />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/list-users" element={<ListUsers />} />
                <Route path="/user-profile/:id" element={<UserProfile />} />
                <Route path="*" element={<div>Página não encontrada</div>} />
            </Routes>
        </Router>
    );
};

export default App;
