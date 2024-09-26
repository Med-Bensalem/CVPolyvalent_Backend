const express = require('express');
const router = express.Router();
const postuleController = require('../controllers/PostuleController');
const {upload} = require("../controllers/PostuleController");



// Route pour créer une nouvelle candidature à partir de fichiers
router.post('/postule', upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'lettreMotivation', maxCount: 1 }]), postuleController.createPostule);
router.get('/users/:userId/postules', postuleController.getPostuleByUser);
router.get('/offres/:offreId/postules', postuleController.getPostuleByOffer);
router.put('/postule/update-status', postuleController.updatePostuleStatus);
router.post('/postule/send-emails', postuleController.sendStatusChangeEmails);



module.exports = router;
