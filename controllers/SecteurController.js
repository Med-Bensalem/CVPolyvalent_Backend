// controllers/secteurController.js
const Secteur = require('../models/Secteur');

// Créer un secteur
const addSecteur = async (req, res) => {
    try {
        const { titre } = req.body;
        const newSecteur = new Secteur({ titre });
        const savedSecteur = await newSecteur.save();
        res.status(201).json(savedSecteur);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir tous les secteurs
const getAllSecteurs = async (req, res) => {
    try {
        const secteurs = await Secteur.find();
        res.status(200).json(secteurs);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir un secteur par ID
const getSecteurById = async (req, res) => {
    try {
        const secteur = await Secteur.findById(req.params.id);
        res.status(200).json(secteur);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Modifier un secteur
const updateSecteur = async (req, res) => {
    try {
        const updatedSecteur = await Secteur.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedSecteur);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Supprimer un secteur
const deleteSecteur = async (req, res) => {
    try {
        await Secteur.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Secteur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const getSecteurByTitre = async (req, res) => {
    try {
        const { titre } = req.params; // Access `titre` from `req.params` directly
        const secteur = await Secteur.findOne({ titre });
        res.status(200).json(secteur);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};







module.exports = { addSecteur, getAllSecteurs, getSecteurById, updateSecteur, deleteSecteur ,getSecteurByTitre};
