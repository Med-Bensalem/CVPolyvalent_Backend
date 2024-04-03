// competence.js
const mongoose = require('mongoose');

const competenceSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Competence = mongoose.model('Competence', competenceSchema);

module.exports = Competence;
