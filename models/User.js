const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nom: { type: String, required: true },
    role: { type: String, required: true },
    approuver: { type: Boolean, required: true, default: false },
    prenom: {
        type: String,
        required: function() { return this.role === 'candidat'; }
    },

    secteur: {
        type: String,
        required: function() { return this.role === 'entreprise'; }
    },
    adress: { type: String },
    dateOfBirth: { type: Date },
    dateDispo: { type: Date },
    gender: { type: String },
    phone: { type: String },
    image: { type: String },
    contrat: { type: String },
    poste:{type :String},
    views: { type: Number, default: 0 }

});

const User = mongoose.model('User', userSchema);

module.exports = User;
