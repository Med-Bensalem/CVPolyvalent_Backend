const Postule = require("../models/Postule");
const multer = require('multer');
const Langue = require("../models/Langue");

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
const changePostuleState = async (req, res) => {
    try {
        const postId = req.params.postId;
        const postule = await Postule.findById(postId);
        if (!postule) {
            return res.status(404).json({ message: "Postule not found" });
        }
        postule.etat = true;
        await postule.save();
        res.json({ message: "Postule state updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating postule state' });
    }
};

// Exportez également la variable `upload`
module.exports = { createPostule, upload,getPostuleByUser,getPostuleByOffer,changePostuleState };
