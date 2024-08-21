const mongoose = require('mongoose');

// Schema for Genre
const scoreSchema = new mongoose.Schema({
    label: { type: String, required: true },
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;