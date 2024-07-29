// routes/secteurRoutes.js
const express = require('express');
const router = express.Router();
const secteurController = require('../controllers/secteurController');

// Route pour ajouter un secteur
router.post('/secteurs', secteurController.addSecteur);

// Route pour obtenir tous les secteurs
router.get('/secteurs', secteurController.getAllSecteurs);

// Route pour obtenir un secteur par ID
router.get('/secteurs/:id', secteurController.getSecteurById);

// Route pour modifier un secteur
router.put('/secteurs/:id', secteurController.updateSecteur);

// Route pour supprimer un secteur
router.delete('/secteurs/:id', secteurController.deleteSecteur);
// Route pour la recherche
// Route pour obtenir un secteur par titre
router.get('/secteurs/bytitre/:titre', secteurController.getSecteurByTitre);

module.exports = router;
