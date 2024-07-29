const express = require('express');
const router = express.Router();
const interestController = require('../controllers/InterestController');

// Add a competence to a user
router.post('/users/:userId/interests', interestController.addInterestToUser);

// Get competences of a user
router.get('/users/:userId/interests', interestController.getInterestsByUser);

// Get a competence by its ID
router.get('/interests/:id', interestController.getInterestById);

// Update a competence
router.put('/users/:userId/interests/:interestId', interestController.updateInterest);

// Delete a competence
router.delete('/users/:userId/interests/:interestId', interestController.deleteInterest);

module.exports = router;
