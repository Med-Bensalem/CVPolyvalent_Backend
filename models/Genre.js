const mongoose = require('mongoose');

// Schema for Genre
const genreSchema = new mongoose.Schema({
    label: { type: String, required: true },
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;