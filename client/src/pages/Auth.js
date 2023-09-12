import React from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import Login from "./Login"; // Import your existing Login component
import RegisterForm from "./RegisterForm"; // Import the new RegisterForm component
import '../App.css'

export const Auth = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    const goToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="auth">
            <button onClick={goToLogin}>Login</button>
            <button onClick={goToRegister}>Register</button>

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<RegisterForm navigate={navigate} />} />
            </Routes>
        </div>
    );
};
