const Region = require("../models/Region");

const addRegion = async (req, res) => {
    try {
        const { label } = req.body;
        const newRegion = new Region({ label });
        const savedRegion = await newRegion.save();
        res.status(201).json(savedRegion);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir tous les secteurs
const getAllRegions = async (req, res) => {
    try {
        const regions = await Region.find();
        res.status(200).json(regions);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { addRegion,getAllRegions};