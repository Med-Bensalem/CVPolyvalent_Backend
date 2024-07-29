// routes/NiveauEtudeRoutes.js
const express = require('express');
const router = express.Router();
const NiveauEtudeController = require('../controllers/NiveauEtudeController');

// Route pour ajouter un NiveauEtude
router.post('/NiveauEtudes', NiveauEtudeController.addNiveauEtude);

// Route pour obtenir tous les NiveauEtudes
router.get('/niveauEtudes', NiveauEtudeController.getAllNiveauEtudes);

// Route pour obtenir un NiveauEtude par ID
router.get('/niveauEtudes/:id', NiveauEtudeController.getNiveauEtudeById);

// Route pour modifier un NiveauEtude
router.put('/niveauEtudes/:id', NiveauEtudeController.updateNiveauEtude);

// Route pour supprimer un NiveauEtude
router.delete('/niveauEtudes/:id', NiveauEtudeController.deleteNiveauEtude);

module.exports = router;
