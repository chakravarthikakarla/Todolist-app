import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Header.css";

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/profile", { withCredentials: true })
            .then(response => setUser(response.data))
            .catch(() => setUser(null));
    }, [user]);  // ✅ Dependency added to re-fetch user data on state change

    const handleLogout = () => {
        axios.post("http://localhost:3001/logout", {}, { withCredentials: true })
            .then(() => {
                setUser(null);
                navigate("/home");  // ✅ Redirects to home page
            })
            .catch(err => console.error("Logout failed", err));
    };

    return (
        <nav className="header">
            <h1 className="logo" onClick={()=>navigate('/home')}>Todo App</h1>
            <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
            <div className="nav-links">
                {user ? (
                    <>
                        <span className="user-greeting">Hello, {user.username}</span>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        

                    </>
                )}
                
            </div>
        </nav>
    );
}

export default Header;
