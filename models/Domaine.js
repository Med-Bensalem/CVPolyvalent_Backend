// models/Secteur.js
const mongoose = require('mongoose');

const domaineSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    }
});

const Domaine = mongoose.model('Domaine', domaineSchema);

module.exports = Domaine;
