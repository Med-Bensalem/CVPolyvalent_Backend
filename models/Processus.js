const mongoose = require('mongoose');

const processusSchema = new mongoose.Schema({
    description: { type: String, required: true },
    status: { type: Number, required: true },

});

const Processus = mongoose.model('Processus', processusSchema);

module.exports = Processus;
