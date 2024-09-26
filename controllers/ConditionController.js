const Condition = require("../models/Condition");
const Contact = require("../models/Contact");
const {findOne} = require("../models/workflow");
const Workflow = require("../models/workflow");
const Step = require("../models/Step");

const addCondition = async (req, res) => {
    try {
        const { offreId, genre, niveauxacadem, lieu, score } = req.body;
        const newCond = new Condition({ offreId, genre, niveauxacadem, lieu, score });
        await newCond.save();
        res.status(201).json({ message: 'Condition added successfully', Condition: newCond });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding condition' });
    }
};


// Obtenir un step par ID
const getConditionById = async (req, res) => {
    try {
        const { id } = req.params;
        const cond = await Condition.findById(id);

        if (!Condition) {
            return res.status(404).json({ error: 'Condition not found' });
        }

        res.status(200).json(cond);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting condition' });
    }
};

// Modifier un step
const updateCondition = async (req, res) => {
    try {
        const { offreId } = req.params;
        const { genre, niveauxacadem, lieu, score } = req.body;

        // Check if the condition exists
        const existingCondition = await Condition.findOne({ offreId });

        if (!existingCondition) {
            // Condition not found, so we add a step to the workflow

            // Find the workflow associated with the offer ID
            const workflow = await Workflow.findOne({ offreId });

            if (!workflow) {
                return res.status(404).json({ error: 'Workflow not found' });
            }

            // Add a new step to the workflow
            const step0 = new Step({
                workflow_id: workflow._id,  // Use the _id from the newly created workflow
                step_order: 1,
                titre: "Préselection",
                stepType:'PRESELECTION'
            });

            await step0.save();

            // Now create a new condition since it does not exist
            const newCondition = new Condition({ offreId, genre, niveauxacadem, lieu, score });
            await newCondition.save();

            return res.status(201).json({
                message: 'Condition and workflow step added successfully',
                Condition: newCondition,
                workflow
            });
        }

        // If the condition exists, update it
        const updatedCondition = await Condition.findOneAndUpdate(
            { offreId }, // Filter to find the condition by offreId
            { genre, niveauxacadem, lieu, score },
            { new: true, runValidators: true } // Return the updated document, and run schema validators
        );

        res.status(200).json({
            message: 'Condition updated successfully',
            Condition: updatedCondition
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating condition or workflow' });
    }
};



// Supprimer un step
const deleteCondition = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the step by its ID and remove it
        const deletedCond = await Condition.findByIdAndDelete(id);

        if (!deletedCond) {
            return res.status(404).json({ error: 'Condition not found' });
        }

        res.status(200).json({ message: 'Condition deleted successfully', Condition: deletedCond });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting condition' });
    }
};

const getConditionByOffer = async (req, res) => {
    try {
        const offreId = req.params.offreId;
        const conditions = await Condition.find({ offreId: offreId });
        res.json(conditions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting conditions for offre' });
    }
};

const getAllConditions = async (req, res) => {
    try {
        const conditions = await Condition.find();
        res.status(200).json(conditions);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { addCondition, getConditionById,updateCondition, deleteCondition ,getAllConditions,getConditionByOffer};
