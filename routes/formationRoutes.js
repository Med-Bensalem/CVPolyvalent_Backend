// Formations Routes
const express = require('express');
const router = express.Router();
const formationController = require('../controllers/formationController');

// Add a formation to a user
router.post('/users/:userId/formations', formationController.addEducationToUser);

// Get formations of a user
router.get('/users/:userId/formations', formationController.getFormationsByUser);

// Update a formation
router.put('/users/:userId/formations/:formationId', formationController.updateEducation);

// Delete a formation
router.delete('/users/:userId/formations/:formationId', formationController.deleteEducation);

module.exports = router;
