const mongoose = require('mongoose');

const stepSchema = new mongoose.Schema({
    workflow_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workflow', required: true },
    step_order: { type: Number, required: true },
    description: { type: String, required: true }
});

const Step = mongoose.model('Step', stepSchema);

module.exports = Step;
