const Step = require('../models/step'); // Adjust the path as needed

// Ajouter un step
const addStep = async (req, res) => {
    try {
        const { workflow_id, step_order, description } = req.body;
        const newStep = new Step({ workflow_id, step_order, description });
        await newStep.save();
        res.status(201).json({ message: 'Step added successfully', Step: newStep });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding step' });
    }
};

// Obtenir des steps par workflow_id
const getStepsByWorkflowId = async (req, res) => {
    try {
        const { workflowId } = req.params;
        const steps = await Step.find({ workflow_id: workflowId }).sort('step_order');
        res.status(200).json(steps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting steps' });
    }
};

// Obtenir un step par ID
const getStepById = async (req, res) => {
    try {
        const { id } = req.params;
        const step = await Step.findById(id);

        if (!step) {
            return res.status(404).json({ error: 'Step not found' });
        }

        res.status(200).json(step);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting step' });
    }
};

// Modifier un step
const updateStep = async (req, res) => {
    try {
        const { id } = req.params;
        const { step_order, description } = req.body;

        // Find the step by its ID and update it
        const updatedStep = await Step.findByIdAndUpdate(
            id,
            { step_order, description },
            { new: true } // Return the updated document
        );

        if (!updatedStep) {
            return res.status(404).json({ error: 'Step not found' });
        }

        res.status(200).json({ message: 'Step updated successfully', Step: updatedStep });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating step' });
    }
};

// Supprimer un step
const deleteStep = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the step by its ID and remove it
        const deletedStep = await Step.findByIdAndDelete(id);

        if (!deletedStep) {
            return res.status(404).json({ error: 'Step not found' });
        }

        res.status(200).json({ message: 'Step deleted successfully', Step: deletedStep });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting step' });
    }
};

module.exports = { addStep, getStepsByWorkflowId, getStepById, updateStep, deleteStep };
