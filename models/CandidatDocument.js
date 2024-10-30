const mongoose = require('mongoose');

const candidatDocumentSchema = new mongoose.Schema({
    documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
    candidatId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workFile: { type: String, required: true },
    dateCreation:{type:Date},

});

const CandidatDocument = mongoose.model('CandidatDocument', candidatDocumentSchema);

module.exports = CandidatDocument;