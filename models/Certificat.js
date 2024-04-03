const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    certificat: { type: String, required: true },
    reference: { type: String, required: true },
    dateEmission: { type: Date, required: true },
    dateExpiration: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
