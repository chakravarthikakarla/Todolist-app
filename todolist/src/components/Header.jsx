import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/profile", { withCredentials: true })
            .then(response => setUser(response.data))
            .catch(() => setUser(null));
    }, []);

    const handleLogout = () => {
        axios.post("http://localhost:3001/logout", {}, { withCredentials: true })
            .then(() => {
                setUser(null);
                navigate("/home");  
            })
            .catch(err => console.error("Logout failed", err));
    };

    return (
        <nav className="flex justify-between items-center p-5 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
            {/* ✅ Logo (Navigates to Home) */}
            <h1 className="text-2xl font-bold cursor-pointer text-white" onClick={() => navigate("/home")}>
                Todo App
            </h1>

            {/* ✅ Navbar Links (Always Visible) */}
            <div className="flex space-x-6 text-white text-lg">
                <Link to="/about" className="hover:text-blue-400 transition-all">About</Link>
                <Link to="/contact" className="hover:text-blue-400 transition-all">Contact</Link>
            </div>

            {/* ✅ User Authentication Links */}
            <div className="flex space-x-4">
                {user ? (
                    <>
                        <span className="text-white">Hello, {user.username}</span>
                        <button 
                            className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white transition-all"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/login" 
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-all"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/register" 
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white transition-all"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Header;
