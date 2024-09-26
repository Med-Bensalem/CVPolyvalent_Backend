const Step = require('../models/step'); // Adjust the path as needed

// Ajouter un step avec auto-incrémentation pour step_order
const addStep = async (req, res) => {
    try {
        const { workflow_id, titre, adress, meet, dateEntretien, stepType } = req.body;

        // Ajouter le nouveau step
        const lastStep = await Step.findOne({ workflow_id }).sort('-step_order');
        const step_order = lastStep ? lastStep.step_order + 1 : 1;

        const newStep = new Step({ workflow_id, titre, adress, meet, dateEntretien, step_order, stepType });
        await newStep.save();

        // Vérifier si un step 'Refusé' existe déjà pour ce workflow_id
        const refuseStep = await Step.findOne({ workflow_id, stepType: 'REJECTED' });

        if (refuseStep) {
            // Mettre à jour le step 'Refusé' avec le step_order du nouveau step
            refuseStep.step_order = step_order + 1;
            await refuseStep.save();
        } else {
            // Ajouter un step 'Refusé' avec le step_order du nouveau step + 1
            const refuseStepOrder = step_order + 1;
            const newRefuseStep = new Step({
                workflow_id,
                titre: 'Refusé',
                step_order: refuseStepOrder,
                stepType: 'REJECTED'
            });
            await newRefuseStep.save();
        }

        // Vérifier si un step 'Accepté' existe déjà pour ce workflow_id
        const acceptStep = await Step.findOne({ workflow_id, stepType: 'ACCEPTED' });

        if (acceptStep) {
            // Mettre à jour le step 'Accepté' avec le step_order du dernier step + 2 (après 'Refusé')
            acceptStep.step_order = step_order + 2;
            await acceptStep.save();
        } else {
            // Ajouter un step 'Accepté' avec le step_order du dernier step + 2
            const acceptStepOrder = step_order + 2;
            const newAcceptStep = new Step({
                workflow_id,
                titre: 'Accepté',
                step_order: acceptStepOrder,
                stepType: 'ACCEPTED'
            });
            await newAcceptStep.save();
        }

        res.status(201).json({ message: 'Steps added successfully', step: newStep });
    } catch (error) {
        console.error('Error adding steps:', error);
        res.status(500).json({ error: 'Error adding steps' });
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

const getStepsEntrepriseByWorkflowId = async (req, res) => {
    try {
        const { workflowId } = req.params;

        // Validation du workflowId
        if (!workflowId) {
            return res.status(400).json({ error: 'Workflow ID is required' });
        }

        // Récupérer tous les steps triés par step_order
        const steps = await Step.find({ workflow_id: workflowId }).sort('step_order');

        // Vérifier s'il y a des steps
        if (steps.length === 0) {
            return res.status(404).json({ message: 'No steps found for this workflow' });
        }

        // Si moins de 3 steps, il n'y a rien à éliminer
        if (steps.length <= 3) {
            return res.status(200).json([]);
        }

        // Éliminer le premier et les deux derniers steps
        const filteredSteps = steps.slice(1, -2);

        res.status(200).json(filteredSteps);
    } catch (error) {
        console.error('Error getting steps:', error);
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
        const { titre, adress, meet, dateEntretien, step_order } = req.body;

        // Trouver le step par son ID et le mettre à jour
        const updatedStep = await Step.findByIdAndUpdate(
            id,
            { titre, adress, meet, dateEntretien, step_order },
            { new: true } // Retourner le document mis à jour
        );

        if (!updatedStep) {
            return res.status(404).json({ error: 'Step not found' });
        }

        res.status(200).json({ message: 'Step updated successfully', step: updatedStep });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating step' });
    }
};

// Supprimer un step
const deleteStep = async (req, res) => {
    try {
        const { id } = req.params;

        // Trouver le step par son ID et le supprimer
        const deletedStep = await Step.findByIdAndDelete(id);

        if (!deletedStep) {
            return res.status(404).json({ error: 'Step not found' });
        }

        res.status(200).json({ message: 'Step deleted successfully', step: deletedStep });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting step' });
    }
};

// Modifier seulement le step_order
const updateStepOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { step_order } = req.body;

        if (step_order === undefined) {
            return res.status(400).json({ error: 'step_order is required' });
        }

        // Trouver le step par son ID et mettre à jour uniquement le step_order
        const updatedStep = await Step.findByIdAndUpdate(
            id,
            { step_order },
            { new: true } // Retourner le document mis à jour
        );

        if (!updatedStep) {
            return res.status(404).json({ error: 'Step not found' });
        }

        res.status(200).json({ message: 'Step order updated successfully', step: updatedStep });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating step order' });
    }
};



module.exports = { addStep, getStepsByWorkflowId, getStepById, updateStep, deleteStep ,updateStepOrder,getStepsEntrepriseByWorkflowId};
