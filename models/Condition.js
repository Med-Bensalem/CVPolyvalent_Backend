const mongoose = require('mongoose');

const conditionSchema = new mongoose.Schema({
    offreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offre', required: true },
    description: { type: String, required: true }
});

const Condition = mongoose.model('Condition', conditionSchema);

module.exports = Condition;
