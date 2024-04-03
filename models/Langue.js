// langue.js
const mongoose = require('mongoose');

const langueSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Langue = mongoose.model('Langue', langueSchema);

module.exports = Langue;
