// controllers/NiveauEtudeController.js
const NiveauEtude = require('../models/NiveauEtude');

// Créer un NiveauEtude
const addNiveauEtude = async (req, res) => {
    try {
        const { titre } = req.body;
        const newNiveauEtude = new NiveauEtude({ titre });
        const savedNiveauEtude = await newNiveauEtude.save();
        res.status(201).json(savedNiveauEtude);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir tous les NiveauEtudes
const getAllNiveauEtudes = async (req, res) => {
    try {
        const NiveauEtudes = await NiveauEtude.find();
        res.status(200).json(NiveauEtudes);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir un NiveauEtude par ID
const getNiveauEtudeById = async (req, res) => {
    try {
        const NiveauxEtude = await NiveauEtude.findById(req.params.id);
        res.status(200).json(NiveauxEtude);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Modifier un NiveauEtude
const updateNiveauEtude = async (req, res) => {
    try {
        const updatedNiveauEtude = await NiveauEtude.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedNiveauEtude);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Supprimer un NiveauEtude
const deleteNiveauEtude = async (req, res) => {
    try {
        await NiveauEtude.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'NiveauEtude supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { addNiveauEtude, getAllNiveauEtudes, getNiveauEtudeById, updateNiveauEtude, deleteNiveauEtude };
