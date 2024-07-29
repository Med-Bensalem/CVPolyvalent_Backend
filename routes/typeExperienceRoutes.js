// routes/secteurRoutes.js
const express = require('express');
const TypeExperieneController = require("../controllers/TypeExperienceController");

const router = express.Router();

// Route pour ajouter un secteur
router.post('/typeExperience', TypeExperieneController.addTypeExperience);

// Route pour obtenir tous les secteurs
router.get('/typeExperience', TypeExperieneController.getAllTypeExperience);

// Route pour obtenir un secteur par ID
router.get('/typeExperience/:id', TypeExperieneController.getTypeExperienceById);

// Route pour modifier un secteur
router.put('/typeExperience/:id', TypeExperieneController.updateTypeExperience);

// Route pour supprimer un secteur
router.delete('/typeExperience/:id', TypeExperieneController.deleteTypeExperience);

module.exports = router;
