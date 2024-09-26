// controllers/domaineController.js
const Domaine = require("../models/Domaine");

// Créer un domaine
const addDomaine = async (req, res) => {
    try {
        const { titre } = req.body;
        const newDomaine = new Domaine({ titre });
        const savedDomaine = await newDomaine.save();
        res.status(201).json(savedDomaine);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir tous les domaines
const getAllDomaines = async (req, res) => {
    try {
        const domaines = await Domaine.find();
        res.status(200).json(domaines);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir un domaine par ID
const getDomaineById = async (req, res) => {
    try {
        const domaine = await Domaine.findById(req.params.id);
        res.status(200).json(domaine);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Modifier un domaine
const updateDomaine = async (req, res) => {
    try {
        const updatedDomaine = await Domaine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedDomaine);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Supprimer un domaine
const deleteDomaine = async (req, res) => {
    try {
        await Domaine.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Domaine supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};


module.exports = { addDomaine, getAllDomaines, getDomaineById, updateDomaine, deleteDomaine};
