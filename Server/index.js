require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcryptjs');
const UserModel = require('./Models/User');
const TodoModel = require('./Models/Todo');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todolist';

// ✅ CORS Configuration
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Allow frontend ports
    credentials: true, // Ensure cookies are sent
}));

app.use(express.json());

// ✅ Session Configuration with MongoDB Store
app.use(session({
    secret: process.env.SESSION_SECRET || 'super_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: {
        secure: false, // Change to `true` in production (HTTPS)
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Failed:", err));

/* ==================== AUTHENTICATION ROUTES ==================== */

// ✅ Register a new user
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Login user
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

        req.session.userId = user._id;
        req.session.username = user.username;

        res.json({ message: "Login successful", user: { username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Logout user
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: "Logout failed" });
        res.json({ message: "Logout successful" });
    });
});

// ✅ Get logged-in user profile
app.get('/profile', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Not authenticated" });
    }
    res.json({ userId: req.session.userId, username: req.session.username });
});

/* ==================== TODO LIST ROUTES ==================== */

// ✅ Check session (Debug Route)
app.get('/session', (req, res) => {
    res.json({ session: req.session });
});

// ✅ Get tasks for the logged-in user
app.get('/get', async (req, res) => {
    try {
        if (!req.session.userId) return res.status(401).json({ error: "Unauthorized" });

        const todos = await TodoModel.find({ userId: req.session.userId });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Add a new task
app.post('/add', async (req, res) => {
    try {
        if (!req.session.userId) return res.status(401).json({ error: "Unauthorized" });

        const { task } = req.body;
        if (!task) return res.status(400).json({ error: "Task is required" });

        const newTask = await TodoModel.create({ userId: req.session.userId, task });
        res.json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Delete a task
app.delete('/delete/:id', async (req, res) => {
    try {
        if (!req.session.userId) return res.status(401).json({ error: "Unauthorized" });

        const task = await TodoModel.findById(req.params.id);
        if (!task) return res.status(404).json({ error: "Task not found" });

        if (task.userId.toString() !== req.session.userId) {
            return res.status(403).json({ error: "Unauthorized to delete this task" });
        }

        await TodoModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
