const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String },
    phone: { type: String },
    image: { type: String },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
