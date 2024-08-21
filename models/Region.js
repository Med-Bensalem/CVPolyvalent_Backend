const mongoose = require('mongoose');

// Schema for Genre
const regionSchema = new mongoose.Schema({
    label: { type: String, required: true },
});

const Region = mongoose.model('Region', regionSchema);

module.exports = Region;