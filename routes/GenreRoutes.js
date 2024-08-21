const express = require('express');
const router = express.Router();
const genController = require('../controllers/GenreController');

// Route pour ajouter un genre
router.post('/genres', genController.addGenre);

// Route pour obtenir tous les genres
router.get('/genres', genController.getAllGenres);

module.exports = router;