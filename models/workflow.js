// workflow.js
const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
    offreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offre', required: true }
});

const Workflow = mongoose.model('Workflow', workflowSchema);

module.exports = Workflow;
