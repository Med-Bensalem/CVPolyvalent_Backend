const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
    workflow_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workflow', required: true },
    titre: { type: String, required: true },
    step_order: { type: Number },
    adress: { type: String },
    meet: { type: String },
    dateEntretien: { type: Date },
    stepType: {type: String,required: true},
    testId: { type: String},
    viewedTest: {type: Boolean},
    uploadedTest: {type: Boolean},
});

// Use mongoose.models to check if the model is already defined
const Step = mongoose.models.Step || mongoose.model('Step', stepSchema);

module.exports = Step;