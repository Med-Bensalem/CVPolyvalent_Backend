// routes/secteurRoutes.js
const express = require('express');
const TypeEmploisController = require("../controllers/TypeEmploisController");
const router = express.Router();

// Route pour ajouter un secteur
router.post('/typeEmplois', TypeEmploisController.addTypeEmplois);

// Route pour obtenir tous les secteurs
router.get('/typeEmplois', TypeEmploisController.getAllTypeEmplois);

// Route pour obtenir un secteur par ID
router.get('/typeEmplois/:id', TypeEmploisController.getTypeEmploisById);

// Route pour modifier un secteur
router.put('/typeEmplois/:id', TypeEmploisController.updateTypeEmplois);

// Route pour supprimer un secteur
router.delete('/typeEmplois/:id', TypeEmploisController.deleteTypeEmplois);

module.exports = router;
