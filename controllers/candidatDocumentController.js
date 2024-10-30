const multer = require("multer");
const CandidatDocument = require("../models/CandidatDocument");
const Document = require("../models/Document");

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

const createDocumentWork = async (req, res) => {
    try {
        const { documentId, candidatId, dateCreation } = req.body;

        const workFile = req.files['workFile'][0].path;

        const doc = new CandidatDocument({
            workFile: workFile,
            documentId,
            candidatId,
            dateCreation,

        });

        await doc.save();


        res.status(201).json(doc);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de la candidature." });
    }
};

const getDocummentByUser = async (req, res) => {
    try {
        const candidatId = req.params.candidatId;
        const documents = await CandidatDocument.find({ candidatId: candidatId }).populate('documentId');
        res.json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting document for user' });
    }
};



module.exports = { createDocumentWork , upload ,getDocummentByUser}