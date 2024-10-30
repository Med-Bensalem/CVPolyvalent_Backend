const mongoose = require('mongoose');

const workTestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    workFile: { type: String, required: true },
    dateCreation:{type:Date},
    score: { type: Number },

});

const WorkTest = mongoose.model('WorkTest', workTestSchema);

module.exports = WorkTest;
