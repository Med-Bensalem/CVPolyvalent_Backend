const express = require('express');
const WorkflowController = require("../controllers/WorkflowController");
const router = express.Router();

// Ajouter un workflow
router.post('/workflows/:offreId', WorkflowController.addWorkflow);

// Obtenir un workflow par offreId
router.get('/workflows/:offreId', WorkflowController.getWorkflowByOffreId);

// Obtenir une offre par workflowId
router.get('/offre-by-workflow/:workflowId', WorkflowController.getOffreByWorkflowId);

module.exports = router;
