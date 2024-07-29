const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: false },
    read: { type: Boolean, default: false }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
