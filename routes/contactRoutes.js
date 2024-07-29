const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route pour ajouter un contact
router.post('/contacts', contactController.addContact);

// Route pour obtenir tous les contacts
router.get('/contacts', contactController.getAllContacts);

// Route pour marquer un contact comme lu
router.put('/contacts/:id', contactController.markAsRead);

module.exports = router;
