const express = require('express');
const router = express.Router();
const secController = require('../controllers/ScoreController');

// Route pour ajouter un region
router.post('/scores', secController.addScore);

// Route pour obtenir tous les regions
router.get('/scores', secController.getAllScores);

module.exports = router;