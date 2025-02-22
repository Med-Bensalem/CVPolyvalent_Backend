const mongoose = require('mongoose');

const postuleSchema = new mongoose.Schema({
    cv: { type: String, required: true },
    lettreMotivation: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    offreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offre', required: true },
    description: { type: String },
    dateCreation:{type:Date},
    score: { type: Number },
    status: { type: Number, default: 0 },
    accepted: { type: Boolean, default: false },

});

const Postule = mongoose.model('Postule', postuleSchema);

module.exports = Postule;
