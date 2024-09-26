require('dotenv').config(); // Add this at the top of your server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const formationRoutes = require('./routes/formationRoutes');
const langueRoutes = require('./routes/langueRoutes');
const certificatRoutes = require('./routes/certificatRoutes');
const competenceRoutes = require('./routes/competenceRoutes');
const interetRoutes = require('./routes/interetRoutes');
const offreRoutes = require('./routes/offreRoutes');
const stepRoutes = require('./routes/StepRoutes');

const workflowRoutes = require('./routes/workflowRoutes');
const postuleRoutes = require('./routes/postuleRoutes');
const contactRoutes = require('./routes/contactRoutes');
const secteurRoutes = require('./routes/secteurRoutes');
const typeEmploiRoutes = require('./routes/typeEmploiRoutes');
const typeExperienceRoutes = require('./routes/typeExperienceRoutes');
const niveauEtudeRoutes = require('./routes/niveauEtudeRoutes');
const conditionsRoutes = require('./routes/conditionRoutes');
const genresRoutes = require('./routes/GenreRoutes');
const regionsRoutes = require('./routes/RegionRoutes');
const scoresRoutes = require('./routes/ScoreRoutes');
const testsRoutes = require('./routes/testRoutes');
const domainesRoutes = require('./routes/domaineRoutes');






const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/formations', formationRoutes);
app.use('/api/langues', langueRoutes);
app.use('/api/certificats', certificatRoutes);
app.use('/api/competences', competenceRoutes);
app.use('/api/interests', interetRoutes);
app.use('/api/offres', offreRoutes);
app.use('/api/steps', stepRoutes);
app.use('/api/workflows', workflowRoutes);
app.use('/api/postules', postuleRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/secteurs', secteurRoutes);
app.use('/api/typeEmplois', typeEmploiRoutes);
app.use('/api/typeExperiences', typeExperienceRoutes);
app.use('/api/niveauEtudes', niveauEtudeRoutes);
app.use('/api/conditions', conditionsRoutes);
app.use('/api/genres', genresRoutes);
app.use('/api/regions', regionsRoutes);
app.use('/api/scores', scoresRoutes);
app.use('/api/tests', testsRoutes);
app.use('/api/domaines', domainesRoutes);


app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/cv_polyvalent', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
