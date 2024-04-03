// Routes for user languages
const express = require('express');
const router = express.Router();
const languageController = require('../controllers/langueController');

// Add a language to a user
router.post('/users/:userId/languages', languageController.addLanguageToUser);

// Get languages of a user
router.get('/users/:userId/languages', languageController.getLanguesByUser);

// Update a language
router.put('/users/:userId/languages/:languageId', languageController.updateLanguage);

// Delete a language
router.delete('/users/:userId/languages/:languageId', languageController.deleteLanguage);

module.exports = router;
