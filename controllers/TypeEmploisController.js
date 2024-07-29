const TypeEmplois = require("../models/TypeEmploi");
const addTypeEmplois = async (req, res) => {
    try {
        const { titre } = req.body;
        const newTypeEmplois = new TypeEmplois({ titre });
        const savedTypeEmplois = await newTypeEmplois.save();
        res.status(201).json(savedTypeEmplois);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir tous les TypeEmploiss
const getAllTypeEmplois = async (req, res) => {
    try {
        const TypeEmploi = await TypeEmplois.find();
        res.status(200).json(TypeEmploi);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir un TypeEmplois par ID
const getTypeEmploisById = async (req, res) => {
    try {
        const TypeEmploi = await TypeEmplois.findById(req.params.id);
        res.status(200).json(TypeEmploi);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Modifier un TypeEmplois
const updateTypeEmplois = async (req, res) => {
    try {
        const updatedTypeEmplois = await TypeEmplois.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTypeEmplois);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Supprimer un TypeEmplois
const deleteTypeEmplois = async (req, res) => {
    try {
        await TypeEmplois.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Type Emplois supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { addTypeEmplois, getAllTypeEmplois, getTypeEmploisById, updateTypeEmplois, deleteTypeEmplois };
