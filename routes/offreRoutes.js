const express = require('express');
const router = express.Router();
const offreController = require('../controllers/offreController');

// Certificates Routes

// Add an offer to a user
router.post('/users/:userId/offres', offreController.addOffreToUser);

// Get offers of a user
router.get('/users/:userId/offres', offreController.getOffresByUser);

// Get a specific offer by its ID
router.get('/offres/:offreId', offreController.getOffreById);

// Update an offer
router.put('/users/:userId/offres/:offreId', offreController.updateOffre);

// Delete an offer
router.delete('/users/:userId/offres/:offreId', offreController.deleteOffre);

// Get all offers
router.get('/offres', offreController.getAllOffres);

// Nouvelles routes pour les méthodes de recherche
router.get('/recherche/typeEmploi', offreController.rechercheParTypeEmploi);
router.get('/recherche/experience', offreController.rechercheParExperience);
router.get('/recherche/niveauEtude', offreController.rechercheParNiveauEtude);

module.exports = router;
