const mongoose = require('mongoose');

const offreSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    nbPoste: { type: Number, required: true },
    typeEmploi: { type: String,required: true },
    experience: { type: String,required: true },
    remuneration: { type: String,required: true },
    langue: { type: String,required: true },
    niveauEtude: { type: String,required: true },
    dateExpiration: { type: Date,required: true },
    description: { type: String ,required: true},
    exigences: { type: String ,required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateCreation:{type:Date}
});

const Offre = mongoose.model('Offre', offreSchema);

module.exports = Offre;
