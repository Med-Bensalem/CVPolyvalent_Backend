const express = require('express');
const CondController = require("../controllers/ConditionController");
const router = express.Router();

// Route pour ajouter un secteur
router.post('/conditions', CondController.addCondition);

// Route pour obtenir tous les secteurs
router.get('/conditions/offer/:offreId', CondController.getConditionByOffer);

// Route pour obtenir un secteur par ID
router.get('/conditions/:id', CondController.getConditionById);

// Route pour modifier un secteur
router.put('/conditions/:offreId', CondController.updateCondition);

// Route pour supprimer un secteur
router.delete('/conditions/:id', CondController.deleteCondition);
// Route pour obtenir tous les contacts
router.get('/conditions', CondController.getAllConditions);

module.exports = router;
