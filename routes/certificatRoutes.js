// Certificates Routes
const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificatController');

// Add a certificate to a user
router.post('/users/:userId/certificates', certificateController.addCertificationToUser);

// Get certificates of a user
router.get('/users/:userId/certificates', certificateController.getCertificatesByUser);

// Update a certificate
router.put('/users/:userId/certificates/:certificateId', certificateController.updateCertification);

// Delete a certificate
router.delete('/users/:userId/certificates/:certificateId', certificateController.deleteCertification);

module.exports = router;
