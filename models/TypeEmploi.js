const mongoose = require('mongoose');

const typeEmploisSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    }
});

const TypeEmplois = mongoose.model('TypeEmplois', typeEmploisSchema);

module.exports = TypeEmplois;
