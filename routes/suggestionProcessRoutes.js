const express = require('express');
const suggestionController = require("../controllers/suggestionProcessController");
const router = express.Router();

// Route to add a new suggestion process
router.post('/suggestions/steps/:idDomaine', suggestionController.saveStepsFromProcess);

// Route to get steps by domaine ID
router.get('/suggestions/steps/:idDomaine', suggestionController.getStepsByDomaine);

module.exports = router;
