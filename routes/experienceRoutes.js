// Experiences Routes
const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');

// Add an experience to a user
router.post('/users/:userId/experiences', experienceController.addExperienceToUser);

// Get experiences of a user
router.get('/users/:userId/experiences', experienceController.getExperiencesByUser);

// Update an experience
router.put('/users/:userId/experiences/:experienceId', experienceController.updateExperience);

// Delete an experience
router.delete('/users/:userId/experiences/:experienceId', experienceController.deleteExperience);

module.exports = router;
