const mongoose = require('mongoose');

const typeExperienceSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    }
});

const TypeExperience = mongoose.model('TypeExperience', typeExperienceSchema);

module.exports = TypeExperience;
