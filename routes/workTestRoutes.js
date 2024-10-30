const express = require('express');
const router = express.Router();
const workController = require('../controllers/workTestController');
const {upload} = require("../controllers/workTestController");



// Route pour créer une nouvelle work test  à partir de fichiers
router.post('/workTest', upload.fields([{ name: 'workFile', maxCount: 1 }]), workController.createWorkTest);

// Route for getting WorkTest by testId
router.get('/workTest/:testId', workController.getWorkTestByTestId);


module.exports = router;
