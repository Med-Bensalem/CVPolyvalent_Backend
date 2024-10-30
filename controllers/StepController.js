const Step = require('../models/step'); // Adjust the path as needed

// Ajouter un step avec auto-incrémentation pour step_order
const addStep = async (req, res) => {
    try {
        const { workflow_id, titre, adress, meet, dateEntretien, stepType, testId } = req.body;

        // Validation: Ensure testId is provided for TEST steps
        if (stepType === 'TEST' && !testId) {
            return res.status(400).json({ error: 'testId is required for TEST steps' });
        }

        // Fetch existing steps for the workflow
        const existingSteps = await Step.find({ workflow_id }).sort('step_order');
        let step_order = existingSteps.length + 1;

        // Check if "EN ATTENTE" step exists; if not, create it as the first step
        let pendingStep = await Step.findOne({ workflow_id, stepType: 'PENDING' });
        if (!pendingStep) {
            pendingStep = new Step({
                workflow_id,
                titre: 'En attente', // Pending step title
                step_order: 0,
                stepType: 'PENDING' // Assuming "PENDING" is the type for "En attente"
            });
            await pendingStep.save();
        }

        // Add the new step after "EN ATTENTE"
        const newStepData = {
            workflow_id,
            titre,
            adress,
            meet,
            dateEntretien,
            step_order,
            stepType,
        };
        if (stepType === 'TEST') {
            newStepData.testId = testId;
            newStepData.viewedTest = false;
            newStepData.uploadedTest = false;
        }

        const newStep = new Step(newStepData);
        await newStep.save();

        // Add "REJECTED" and "ACCEPTED" steps at the end of the workflow sequence
        step_order += 1;

        // Fetch or create the "REJECTED" step
        let rejectedStep = await Step.findOne({ workflow_id, stepType: 'REJECTED' });
        if (rejectedStep) {
            rejectedStep.step_order = step_order;
            await rejectedStep.save();
        } else {
            rejectedStep = new Step({
                workflow_id,
                titre: 'Refusé',
                step_order: step_order,
                stepType: 'REJECTED',
            });
            await rejectedStep.save();
        }

        // Fetch or create the "ACCEPTED" step, positioned after "REJECTED"
        step_order += 1;
        let acceptedStep = await Step.findOne({ workflow_id, stepType: 'ACCEPTED' });
        if (acceptedStep) {
            acceptedStep.step_order = step_order;
            await acceptedStep.save();
        } else {
            acceptedStep = new Step({
                workflow_id,
                titre: 'Accepté',
                step_order: step_order,
                stepType: 'ACCEPTED',
            });
            await acceptedStep.save();
        }

        res.status(201).json({
            message: 'Steps added successfully with PENDING, REJECTED, and ACCEPTED steps ensured',
            addedSteps: [pendingStep, newStep, rejectedStep, acceptedStep]
        });
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

const getStepByStatus = async (req, res) => {
    try {
        const { status } = req.params; // On récupère le statut depuis les paramètres de la requête
        const steps = await Step.find({ status }); // Recherche des étapes ayant le statut spécifié

        if (steps.length === 0) {
            return res.status(404).json({ error: 'No steps found with the specified status' });
        }

        res.status(200).json(steps); // Renvoie les étapes trouvées
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting steps by status' });
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

// Modifier le champ viewedtest à true
const updateViewedTest = async (req, res) => {
    try {
        const { stepId } = req.params; // Assurez-vous d'envoyer l'ID du step
        // Mettre à jour le champ viewedtest à true
        const updatedStep = await Step.findByIdAndUpdate(
            stepId,
            { viewedTest: true },
            { new: true } // Retourner le document mis à jour
        );

        if (!updatedStep) {
            return res.status(404).json({ error: 'Step not found' });
        }

        res.status(200).json({ message: 'Step updated successfully', step: updatedStep });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating step viewedtest' });
    }
};

// Modifier le champ uploadedtest à true
const updateUploadedTest = async (req, res) => {
    try {
        const { stepId } = req.params; // Assurez-vous d'envoyer l'ID du step
        // Mettre à jour le champ viewedtest à true
        const updatedStep = await Step.findByIdAndUpdate(
            stepId,
            { uploadedTest: true },
            { new: true } // Retourner le document mis à jour
        );

        if (!updatedStep) {
            return res.status(404).json({ error: 'Step not found' });
        }

        res.status(200).json({ message: 'Step updated successfully', step: updatedStep });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating step viewedtest' });
    }
};




module.exports = {
    addStep, getStepsByWorkflowId, getStepById, updateStep,
    deleteStep ,updateStepOrder,getStepsEntrepriseByWorkflowId,
    updateViewedTest,updateUploadedTest
};
