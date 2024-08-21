const mongoose = require('mongoose');

const postuleSchema = new mongoose.Schema({
    cv: { type: String, required: true },
    lettreMotivation: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    offreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offre', required: true },
    description: { type: String },
    dateCreation:{type:Date},
    etat: { type: Boolean, default: false },
    score: { type: Number }

});

const Postule = mongoose.model('Postule', postuleSchema);

module.exports = Postule;
