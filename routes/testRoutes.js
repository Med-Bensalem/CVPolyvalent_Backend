const express = require('express');
const router = express.Router();
const testController = require('../controllers/TestController');
const { upload } = require("../controllers/TestController");

// Route pour créer une nouvelle candidature à partir de fichiers
router.post('/tests', upload.fields([{ name: 'FileTest', maxCount: 1 }]), testController.createTest);

// Route pour récupérer les tests d'un utilisateur spécifique
router.get('/users/:userId/tests', testController.getTestByUser);

// Route pour récupérer un test spécifique par son ID
router.get('/tests/:id', testController.getTestById);

// Route pour modifier un test spécifique par son ID
router.put('/tests/:id', upload.fields([{ name: 'FileTest', maxCount: 1 }]), testController.updateTest);

// Route pour supprimer un test spécifique par son ID
router.delete('/tests/:id', testController.deleteTest);

module.exports = router;
