const Test = require("../models/Test");
const multer = require("multer");
const fs = require('fs'); // Pour gérer la suppression de fichiers

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

const createTest = async (req, res) => {
    try {
        const { userId, title } = req.body;
        const FileTest = req.files['FileTest'][0].path;
        const test = new Test({ FileTest: FileTest, userId, title });
        await test.save();
        res.status(201).json(test);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de test." });
    }
};

const getTestByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const tests = await Test.find({ userId: userId });
        res.json(tests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting tests for user' });
    }
};

// Récupérer un test par son identifiant
const getTestById = async (req, res) => {
    try {
        const testId = req.params.id;
        const test = await Test.findById(testId);

        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        res.json(test);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting test by ID' });
    }
};

// Modifier un test par son identifiant
const updateTest = async (req, res) => {
    try {
        const testId = req.params.id;
        const { title } = req.body;
        const test = await Test.findById(testId);

        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        // Mettre à jour le titre si fourni
        if (title) {
            test.title = title;
        }

        // Mettre à jour le fichier PDF si fourni
        if (req.files && req.files['FileTest']) {
            // Supprimer l'ancien fichier
            if (test.FileTest) {
                fs.unlinkSync(test.FileTest);
            }

            test.FileTest = req.files['FileTest'][0].path;
        }

        await test.save();
        res.json(test);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating test' });
    }
};

// Supprimer un test par son identifiant
const deleteTest = async (req, res) => {
    try {
        const testId = req.params.id;
        const test = await Test.findById(testId);

        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        // Supprimer le fichier PDF associé
        if (test.FileTest) {
            fs.unlinkSync(test.FileTest);
        }

        // Supprimer le test lui-même
        await Test.findByIdAndDelete(testId);

        res.json({ message: 'Test deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting test' });
    }
};

module.exports = { createTest, upload, getTestByUser, getTestById, updateTest, deleteTest };
