// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { upload } = require("../controllers/authController");

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/users/role/entreprise', authController.getUsersByRole);
router.get('/users/approved', authController.getUsersApproved);
router.get('/users/notApproved', authController.getUsersNotApproved);
router.get('/user/:userId', authController.getUserById);
router.put('/user/:userId/approve', authController.approveUser);
router.put('/user/:userId/reject', authController.rejectUser);
router.put('/user/:userId', authController.completeProfile);
router.post('/user/:userId/upload-image', authController.upload.single('image'), authController.completeProfile);
router.put('/user/:userId/views', authController.updateUserViews);
router.put('/user/:userId/change-password', authController.changePassword);

module.exports = router;
