import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <header className="flex justify-between items-center p-6 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
                <h1 className="text-2xl font-bold">TodoList</h1>
                <nav className="space-x-4">
                    <button
                        onClick={() => navigate("/login")} // ✅ Make sure this path matches App.jsx
                        className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-all"
                    >
                        Register
                    </button>
                </nav>
            </header>
            <main className="flex flex-col items-center justify-center flex-grow text-center">
                <h2 className="text-4xl font-bold mb-4">Welcome to the Todo App</h2>
                <p className="text-lg text-gray-300">Please login or register to manage your tasks.</p>
            </main>
        </div>
    );
};

export default Home;
