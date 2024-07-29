// models/Secteur.js
const mongoose = require('mongoose');

const niveauEtudeSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    }
});

const NiveauEtude = mongoose.model('NiveauEtude', niveauEtudeSchema);

module.exports = NiveauEtude;
