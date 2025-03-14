import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

const Create = () => {  
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/profile", { withCredentials: true })
            .then((res) => setUser(res.data))
            .catch(() => setUser(null));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/get", { withCredentials: true })
            .then((res) => setTodos(res.data))
            .catch((err) => console.error("Error fetching tasks:", err));
    }, []);

    const handleAdd = async () => {
        if (!task.trim()) {
            setError("Task cannot be empty");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/add", { task }, { withCredentials: true });
            setTodos([...todos, response.data]);
            setTask("");
            setError("");
        } catch (err) {
            console.error("Error adding task:", err.response?.data || err.message);
            setError(err.response?.data?.error || "Failed to add task.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/delete/${id}`, { withCredentials: true });
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (err) {
            console.error("Error deleting task:", err.response?.data || err.message);
            setError("Failed to delete task.");
        }
    };

    const handleLogout = () => {
        axios.post("http://localhost:3001/logout", {}, { withCredentials: true })
            .then(() => {
                setUser(null);
                navigate("/home");
            })
            .catch(err => console.error("Logout failed", err));
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            {/* ✅ Header with About & Contact links */}
            <header className="flex justify-between items-center p-6 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
                <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/home")}>
                    TodoList
                </h1>
                <nav className="space-x-4">
                    <Link to="/about" className="text-gray-300 hover:text-gray-400">About</Link>
                    <Link to="/contact" className="text-gray-300 hover:text-gray-400">Contact</Link>

                    {user ? (
                        <>
                            <span className="text-lg text-gray-300">Hello, {user.username}</span>
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-all"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate("/login")}
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
                        </>
                    )}
                </nav>
            </header>

            {/* ✅ Main Content */}
            <main className="flex flex-col items-center justify-center flex-grow">
                <div className="w-full max-w-lg bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20">
                    <h2 className="text-2xl text-white font-bold text-center mb-6">
                        {user ? `${user.username}'s To-Do List` : "To-Do List"}
                    </h2>

                    {/* ✅ Input Field */}
                    <div className="flex gap-3">
                        <input
                            type="text"
                            className="flex-1 p-3 text-lg bg-white/20 text-white placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Task..."
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-lg shadow-lg transition-all"
                            onClick={handleAdd}
                        >
                            Add
                        </button>
                    </div>

                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

                    {/* ✅ Task List */}
                    <div className="mt-6 space-y-3">
                        {todos.length > 0 ? (
                            todos.map((todo) => (
                                <motion.div
                                    key={todo._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex justify-between items-center bg-white/20 p-3 rounded-xl shadow-md border border-white/10"
                                >
                                    <span className="text-white text-lg">{todo.task}</span>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md transition-all"
                                        onClick={() => handleDelete(todo._id)}
                                    >
                                        Delete
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-300 text-center mt-4">No tasks available</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Create;
