const Processus = require('../models/processus');

// Create a new Processus
const createProcessus = async (req, res) => {
    try {
        const { description, status } = req.body;
        const newProcessus = new Processus({ description, status });
        await newProcessus.save();
        res.status(201).json({ message: 'Processus created successfully', Processus: newProcessus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating processus' });
    }
};

// Get all Processus
const getAllProcessus = async (req, res) => {
    try {
        const processus = await Processus.find();
        res.status(200).json(processus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching processus' });
    }
};

// Get Processus by ID
const getProcessusById = async (req, res) => {
    try {
        const { id } = req.params;
        const processus = await Processus.findById(id);
        if (!processus) {
            return res.status(404).json({ error: 'Processus not found' });
        }
        res.status(200).json(processus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching processus' });
    }
};

// Update a Processus
const updateProcessus = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, status } = req.body;
        const updatedProcessus = await Processus.findByIdAndUpdate(id, { description, status }, { new: true });
        if (!updatedProcessus) {
            return res.status(404).json({ error: 'Processus not found' });
        }
        res.status(200).json({ message: 'Processus updated successfully', Processus: updatedProcessus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating processus' });
    }
};

// Delete a Processus
const deleteProcessus = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProcessus = await Processus.findByIdAndDelete(id);
        if (!deletedProcessus) {
            return res.status(404).json({ error: 'Processus not found' });
        }
        res.status(200).json({ message: 'Processus deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting processus' });
    }
};

module.exports = { createProcessus, getAllProcessus, getProcessusById, updateProcessus, deleteProcessus };
