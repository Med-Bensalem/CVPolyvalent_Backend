const Genre = require("../models/Genre");

const addGenre = async (req, res) => {
    try {
        const { label } = req.body;
        const newGenre = new Genre({ label });
        const savedGenre = await newGenre.save();
        res.status(201).json(savedGenre);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir tous les secteurs
const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { addGenre,getAllGenres};