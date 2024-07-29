const express = require('express');
const router = express.Router();
const competenceController = require('../controllers/competenceController');

// Add a competence to a user
router.post('/users/:userId/competences', competenceController.addSkillToUser);

// Get competences of a user
router.get('/users/:userId/competences', competenceController.getCompetencesByUser);

// Get a competence by its ID
router.get('/competences/:id', competenceController.getCompetenceById);

// Update a competence
router.put('/users/:userId/competences/:competenceId', competenceController.updateSkill);

// Delete a competence
router.delete('/users/:userId/competences/:competenceId', competenceController.deleteSkill);

module.exports = router;
