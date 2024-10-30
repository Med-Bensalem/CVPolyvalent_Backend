const SuggestionProcess = require("../models/suggestionProcess");
const Step = require("../models/Step");


// Controller function to get steps by domaine ID
const getStepsByDomaine = async (req, res) => {
    const { idDomaine } = req.params; // Get the idDomaine from request parameters

    try {
        // Find the suggestion process by id_domaine
        const suggestionProcess = await SuggestionProcess.findOne({ id_domaine: idDomaine });


        if (!suggestionProcess) {
            return res.status(404).json({ message: 'Suggestion process not found for this domaine' });
        }

        // Return the steps in the response
        res.status(200).json({
            steps: suggestionProcess.steps
        });
    } catch (error) {
        console.error('Error fetching steps:', error);
        res.status(500).json({ message: 'Failed to retrieve steps' });
    }
};


const saveStepsFromProcess = async (req, res) => {
    const { idDomaine } = req.params;
    const { idWorkflow } = req.body; // `idWorkflow` from the request body

    if (!idDomaine || !idWorkflow) {
        return res.status(400).json({ message: 'idDomaine and idWorkflow are required' });
    }

    try {
        // Find the suggestion process by domain ID
        const suggestionProcess = await SuggestionProcess.findOne({ id_domaine: idDomaine });

        if (!suggestionProcess) {
            return res.status(404).json({ message: 'Suggestion process not found for this domaine' });
        }

        const { steps } = suggestionProcess;

        if (!steps || steps.length === 0) {
            return res.status(400).json({ message: 'No steps available to save' });
        }

        const savedSteps = [];
        let stepOrder = 0;

        // Add the "EN ATTENTE" step as the first step
        const pendingStep = new Step({
            workflow_id: idWorkflow,
            titre: 'En attente', // Pending step title
            step_order: stepOrder++,
            stepType: 'PENDING' // Assuming "PENDING" is the type for "En attente"
        });
        const savedPendingStep = await pendingStep.save();
        savedSteps.push(savedPendingStep);

        // Save suggested steps with incremented order
        for (const step of steps) {
            const newStep = new Step({
                step_order: stepOrder++,
                titre: step.titre,
                stepType: step.stepType,
                workflow_id: idWorkflow
            });
            const savedStep = await newStep.save();
            savedSteps.push(savedStep);
        }

        // Add "REJECTED" and "ACCEPTED" steps as the final steps
        const rejectedStep = new Step({
            workflow_id: idWorkflow,
            titre: 'Refusé',
            step_order: stepOrder++,
            stepType: 'REJECTED',
        });
        const savedRejectedStep = await rejectedStep.save();
        savedSteps.push(savedRejectedStep);

        const acceptedStep = new Step({
            workflow_id: idWorkflow,
            titre: 'Accepté',
            step_order: stepOrder,
            stepType: 'ACCEPTED',
        });
        const savedAcceptedStep = await acceptedStep.save();
        savedSteps.push(savedAcceptedStep);

        res.status(200).json({
            message: 'Steps saved successfully, with EN ATTENTE as first step and REJECTED and ACCEPTED as last steps',
            savedSteps
        });
    } catch (error) {
        console.error('Error saving steps:', error);
        res.status(500).json({ message: 'Failed to save steps', error: error.message });
    }
};






module.exports = {
    getStepsByDomaine,
    saveStepsFromProcess
};
