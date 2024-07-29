// models/Secteur.js
const mongoose = require('mongoose');

const secteurSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    }
});

const Secteur = mongoose.model('Secteur', secteurSchema);

module.exports = Secteur;
