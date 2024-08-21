const Score = require("../models/Score");

const addScore = async (req, res) => {
    try {
        const { label } = req.body;
        const newScore = new Score({ label });
        const savedScore = await newScore.save();
        res.status(201).json(savedScore);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Obtenir tous les secteurs
const getAllScores = async (req, res) => {
    try {
        const scores = await Score.find();
        res.status(200).json(scores);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { addScore,getAllScores};