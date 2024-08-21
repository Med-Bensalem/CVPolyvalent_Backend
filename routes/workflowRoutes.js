const express = require('express');
const WorkflowController = require("../controllers/WorkflowController");
const router = express.Router();

// Add a workflow
router.post('/workflows/:offreId', WorkflowController.addWorkflow);
router.get('/workflows/:offreId', WorkflowController.getWorkflowByOffreId);

module.exports = router;
