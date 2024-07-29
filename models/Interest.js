// competence.js
const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;
