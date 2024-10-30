const multer = require("multer");
const WorkTest = require("../models/workTest");


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

const createWorkTest = async (req, res) => {
    try {
        const { userId, testId, dateCreation, score } = req.body;

        const workFile = req.files['workFile'][0].path;

        const workTest = new WorkTest({
            workFile: workFile,
            userId,
            testId,
            dateCreation,
            score
        });

        await workTest.save();


        res.status(201).json(workTest);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de la candidature." });
    }
};

// Get WorkTest by testId
const getWorkTestByTestId = async (req, res) => {
    try {
        const { testId } = req.params;

        // Fetch work tests by testId
        const workTests = await WorkTest.find({ testId }).populate('userId', 'nom prenom');

        if (!workTests || workTests.length === 0) {
            return res.status(404).json({ message: "Aucun test trouvé pour cet ID." });
        }

        // Extract the scores from the work tests
        const scores = workTests.map(test => test.score);

        // Calculate best score (maximum)
        const bestScore = Math.max(...scores);

        // Calculate minimum score
        const minScore = Math.min(...scores);

        // Count the number of scores less than 50
        const countLessThan50 = scores.filter(score => score > 50).length;

        // Return the data as JSON
        res.status(200).json({
            bestScore,
            minScore,
            countLessThan50,
            workTests,  // Include the original list of work tests if needed
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des tests." });
    }
};

module.exports = { createWorkTest , upload , getWorkTestByTestId}

