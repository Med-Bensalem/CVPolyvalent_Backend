const Postule = require("../models/Postule");
const multer = require('multer');
const Langue = require("../models/Langue");
const User = require("../models/User");
const {sendEmail} = require("../services/emailService");
const Offre = require("../models/Offre");
const Condition = require("../models/Condition");
const mongoose = require("mongoose");
const Step = require("../models/Step");

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
        const { userId, offreId, description, dateCreation, score } = req.body;
        const cvPath = req.files['cv'][0].path;
        const lettreMotivationPath = req.files['lettreMotivation'][0].path;

        const postule = new Postule({
            cv: cvPath,
            lettreMotivation: lettreMotivationPath,
            userId,
            offreId,
            description,
            dateCreation,
            score
        });

        await postule.save();

        // Fetch the user to get the gender
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Convert the string offreId to ObjectId
        const objectIdOffreId = new mongoose.Types.ObjectId(offreId);

        // Find the condition by offreId
        const condition = await Condition.findOne({ offreId: objectIdOffreId });

        // Check if condition exists before accessing its genre property
        if (condition && user.gender === condition.genre) {
            console.log("c'est kif kif ");
            // Update the status to 1 if the gender matches
            postule.status = 1;
            await postule.save(); // Save the updated postule
        }

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



        // Fetch steps based on the provided status
        const steps = await Step.find({ step_order: status });


        // Check if any steps were returned
        if (steps.length > 0) {
            const step = steps[0]; // Get the first step from the array


            if (step.stepType === 'ACCEPTED') {
                // Set postule.accepted to true
                postule.accepted = true;

            }
        } else {
            console.log('No steps found for the provided status.'); // Log if no steps were found
        }

        // Save the updated postule
        await postule.save();


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


const getAcceptedPostules = async (req, res) => {
    try {
        // Query the Postule collection for accepted postules
        const acceptedPostules = await Postule.find({ accepted: true }).populate('userId');

        // Return the retrieved accepted postules
        res.json(acceptedPostules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting accepted postules' });
    }
};




// Exportez également la variable `upload`
module.exports = { createPostule, upload,getPostuleByUser,getPostuleByOffer ,
    updatePostuleStatus,sendStatusChangeEmails,getAcceptedPostules};
