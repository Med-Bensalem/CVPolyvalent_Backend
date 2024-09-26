const Postule = require("../models/Postule");
const multer = require('multer');
const Langue = require("../models/Langue");
const User = require("../models/User");
const {sendEmail} = require("../services/emailService");
const Offre = require("../models/Offre");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('application/pdf')) {
        cb(null, true);
    } else {
        cb(new Error('Veuillez télécharger un fichier PDF.'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const createPostule = async (req, res) => {
    try {
        const { userId, offreId, description,dateCreation,score} = req.body;
        const cvPath = req.files['cv'][0].path;
        const lettreMotivationPath = req.files['lettreMotivation'][0].path;

        const postule = new Postule({ cv: cvPath, lettreMotivation: lettreMotivationPath, userId, offreId, description,dateCreation,score});
        await postule.save();

        res.status(201).json(postule);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de la candidature." });
    }
};

const getPostuleByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const Postules = await Postule.find({ userId: userId });
        res.json(Postules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting postules for user' });
    }
};

const getPostuleByOffer = async (req, res) => {
    try {
        const offreId = req.params.offreId;
        const Postules = await Postule.find({ offreId: offreId });
        res.json(Postules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting postules for offre' });
    }
};

const updatePostuleStatus = async (req, res) => {
    const { postuleId, status } = req.body;

    try {
        // Find the postule by ID and update its status
        const postule = await Postule.findByIdAndUpdate(postuleId, { status }, { new: true });

        if (!postule) {
            return res.status(404).json({ message: 'Candidature non trouvée' });
        }

        res.status(200).json({ message: 'Statut mis à jour avec succès', postule });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut', error });
    }
};

const sendStatusChangeEmails = async (req, res) => {
    try {
        const { postuleIds } = req.body; // Expect an array of postule IDs
        const postules = await Postule.find({ _id: { $in: postuleIds } });

        for (const postule of postules) {

            const user = await User.findById(postule.userId);
            const offre = await Offre.findById(postule.offreId);

            if (!user || !user.email) {
                return res.status(404).json({ message: 'User not found or no email available' });
            }

            // Customize the email based on the postule status
            const subject = `Changement du status de votre candidature`;
            const text = `Bonjour, votre candidature pour l'offre ${offre.titre} a été mise à jour.`;

            await sendEmail(user.email, subject, text); // Assuming userId is the email
        }

        res.status(200).json({ message: 'Emails envoyés avec succès' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi des emails', error });
    }
};




// Exportez également la variable `upload`
module.exports = { createPostule, upload,getPostuleByUser,getPostuleByOffer ,updatePostuleStatus,sendStatusChangeEmails};
