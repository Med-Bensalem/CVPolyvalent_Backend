const express = require('express');
const docController = require("../controllers/documentController");
const stepController = require("../controllers/StepController");
const router = express.Router();

// Route pour ajouter un document
router.post('/documents', docController.addDocument);

// Route pour récupérer les documents par offreId
router.get('/documents/offer/:offreId', docController.getDocummentByOffer);

// Route pour supprimer un document
router.delete('/documents/:id', docController.deleteDocument);

// Route pour modifier un document
router.put('/documents/:id', docController.updateDocument); // Ajout de la route PUT pour modifier un document

router.patch('/documents/:docId/uploadeddoc', docController.updateUploadedDocument);

module.exports = router;
