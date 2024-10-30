const mongoose = require('mongoose');

// Define the schema for steps
const StepsSchema = new mongoose.Schema({
    id_steps: {
        type: String, // Unique identifier for the step
        required: true,
        unique: true // Ensuring that each step has a unique ID
    },
    order: {
        type: Number,
        required: true // Order of the step
    },
    titre: {
        type: String,
        required: true // Title of the step
    }
});

// Define the schema for suggestion_process
const SuggestionProcessSchema = new mongoose.Schema({
    id_domaine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domaine', // Reference to the Domaine model
        required: true // Ensure id_domaine is provided
    },
    steps: [StepsSchema] // Array of step objects
});

// Create the model based on the schema
const SuggestionProcess = mongoose.model('SuggestionProcess', SuggestionProcessSchema);

// Export the model
module.exports = SuggestionProcess;
