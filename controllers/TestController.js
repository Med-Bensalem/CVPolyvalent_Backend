const Test = require("../models/Test");
const multer = require("multer");

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
        const { userId, title} = req.body;
        const FileTest = req.files['FileTest'][0].path;
        const test = new Test({ FileTest: FileTest,userId,title});
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

module.exports = { createTest, upload,getTestByUser}