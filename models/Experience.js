// experience.js
const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    nomEntreprise: { type: String, required: true },
    description: { type: String },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date },
    disponibilite: { type: Boolean },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;
