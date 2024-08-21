const express = require('express');
const router = express.Router();
const regController = require('../controllers/RegionController');

// Route pour ajouter un region
router.post('/regions', regController.addRegion);

// Route pour obtenir tous les regions
router.get('/regions', regController.getAllRegions);

module.exports = router;