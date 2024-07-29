const TypeExperience = require("../models/TypeExperience");
const addTypeExperience = async (req, res) => {
    try {
        const { titre } = req.body;
        const newTypeExperience = new TypeExperience({ titre });
        const savedTypeExperience = await newTypeExperience.save();
        res.status(201).json(savedTypeExperience);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir tous les TypeExperiences
const getAllTypeExperience = async (req, res) => {
    try {
        const TypeExperiences = await TypeExperience.find();
        res.status(200).json(TypeExperiences);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir un TypeExperience par ID
const getTypeExperienceById = async (req, res) => {
    try {
        const TypExperiences = await TypeExperience.findById(req.params.id);
        res.status(200).json(TypExperiences);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Modifier un TypeExperience
const updateTypeExperience = async (req, res) => {
    try {
        const updatedTypeExperience = await TypeExperience.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTypeExperience);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Supprimer un TypeExperience
const deleteTypeExperience = async (req, res) => {
    try {
        await TypeExperience.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Type Experience supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { addTypeExperience, getAllTypeExperience, getTypeExperienceById, updateTypeExperience, deleteTypeExperience };
