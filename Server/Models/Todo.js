const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: String, required: true }
});

module.exports = mongoose.model("Todo", TodoSchema);
