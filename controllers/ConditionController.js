const Condition = require("../models/Condition");
const Contact = require("../models/Contact");

const addCondition = async (req, res) => {
    try {
        const { offreId, description } = req.body;
        const newCond = new Condition({ offreId, description });
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
        const { id } = req.params;
        const { description } = req.body;

        // Find the step by its ID and update it
        const updatedCond = await Condition.findByIdAndUpdate(
            id,
            {description },
            { new: true } // Return the updated document
        );

        if (!updatedCond) {
            return res.status(404).json({ error: 'Condition not found' });
        }

        res.status(200).json({ message: 'Condition updated successfully', Condition: updatedCond });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating condition' });
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
