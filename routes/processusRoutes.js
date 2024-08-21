// routes/secteurRoutes.js
const express = require('express');
const ProcController = require("../controllers/ProcessusController");
const router = express.Router();

// Route pour ajouter un secteur
router.post('/processus', ProcController.createProcessus);

// Route pour obtenir tous les secteurs
router.get('/processus', ProcController.getAllProcessus);

// Route pour obtenir un secteur par ID
router.get('/processus/:id', ProcController.getProcessusById);

// Route pour modifier un secteur
router.put('/processus/:id', ProcController.updateProcessus);

// Route pour supprimer un secteur
router.delete('/processus/:id', ProcController.deleteProcessus);

module.exports = router;
