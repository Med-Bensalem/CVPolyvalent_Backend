const express = require('express');
const router = express.Router();
const stepController = require('../controllers/stepController'); // Adjust the path as needed

// Route to add a step
router.post('/steps', stepController.addStep);

// Route to get steps by workflow_id
router.get('/steps/workflow/:workflowId', stepController.getStepsByWorkflowId);

// Route to get steps entreprise by workflow_id
router.get('/steps/workflow/entreprise/:workflowId', stepController.getStepsEntrepriseByWorkflowId);

// Route to get a step by its ID
router.get('/steps/:id', stepController.getStepById);

// Route to update a step by its ID
router.put('/steps/:id', stepController.updateStep);

// Route to delete a step by its ID
router.delete('/steps/:id', stepController.deleteStep);

router.patch('/steps/:stepId/viewedtest', stepController.updateViewedTest);
router.patch('/steps/:stepId/uploadedtest', stepController.updateUploadedTest);




module.exports = router;
