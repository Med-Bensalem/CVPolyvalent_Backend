// routes/secteurRoutes.js
const express = require('express');
const router = express.Router();
const domaineController = require('../controllers/DomaineController');

// Route pour ajouter un domaine
router.post('/domaines', domaineController.addDomaine);

// Route pour obtenir tous les domaines
router.get('/domaines', domaineController.getAllDomaines);

// Route pour obtenir un domaine par ID
router.get('/domaines/:id', domaineController.getDomaineById);

// Route pour modifier un domaine
router.put('/domaines/:id', domaineController.updateDomaine);

// Route pour supprimer un domaine
router.delete('/domaines/:id', domaineController.deleteDomaine);


module.exports = router;
