const mongoose = require('mongoose');

// Define the schema for steps
const StepsSchema = new mongoose.Schema({
    step_order: {
        type: Number,
        required: true // Order of the step
    },
    titre: {
        type: String,
        required: true // Title of the step
    },
    workflow_id: {
        type: String,
        required: true // Title of the step
    },
    stepType: {
        type: String,
        required: true // Title of the step
    }
});

// Define the schema for suggestion_process
const SuggestionProcessSchema = new mongoose.Schema({
    id_domaine: {
        type: String,
        required: true // Ensure id_domaine is provided
    },
    steps: [StepsSchema] // Array of step objects
});

// Create the model based on the schema
const SuggestionProcess = mongoose.model('SuggestionProcess', SuggestionProcessSchema);

// Export the model
module.exports = SuggestionProcess;
