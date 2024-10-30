const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    titreDocument: {
        type: String,
        required: true
    },
    offreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offre', required: true },
    uploadedDocument: { type: Boolean, default: false,}
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;