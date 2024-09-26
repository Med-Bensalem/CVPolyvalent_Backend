const mongoose = require('mongoose');

const conditionSchema = new mongoose.Schema({
    offreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offre', required: true },
    genre: { type: String},
    niveauxacadem: { type: String },
    lieu: { type: String },
    score: { type: String}
});

const Condition = mongoose.model('Condition', conditionSchema);

module.exports = Condition;
