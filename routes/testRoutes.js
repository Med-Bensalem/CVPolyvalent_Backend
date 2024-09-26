const express = require('express');
const router = express.Router();
const testController = require('../controllers/TestController');
const {upload} = require("../controllers/TestController");



// Route pour créer une nouvelle candidature à partir de fichiers
router.post('/tests', upload.fields([{ name: 'FileTest', maxCount: 1 }]), testController.createTest);
router.get('/users/:userId/tests', testController.getTestByUser);




module.exports = router;
