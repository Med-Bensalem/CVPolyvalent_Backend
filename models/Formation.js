// formation.js
const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
    diplome: { type: String, required: true },
    etablissement: { type: String, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date },
    enCours: { type: Boolean },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Formation = mongoose.model('Formation', formationSchema);

module.exports = Formation;
