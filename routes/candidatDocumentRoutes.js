const express = require('express');
const router = express.Router();
const {upload} = require("../controllers/workTestController");
const candidatDocController = require('../controllers/candidatDocumentController');



// Route pour créer une nouvelle work test  à partir de fichiers
router.post('/candidatDocuments', upload.fields([{ name: 'workFile', maxCount: 1 }]), candidatDocController.createDocumentWork);

// Route pour récupérer les documents par user
router.get('/documents/users/:candidatId', candidatDocController.getDocummentByUser);

module.exports = router;
