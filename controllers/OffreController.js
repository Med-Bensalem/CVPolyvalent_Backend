const Offre = require("../models/Offre");
const User = require("../models/User");
const Workflow = require("../models/workflow");
const Step = require("../models/Step");

const addOffreToUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const {
            titre,
            nbPoste,
            typeEmploi,
            experience,
            remuneration,
            langue,
            niveauEtude,
            dateExpiration,
            description,
            exigences,
            dateCreation,
            idDomaine
        } = req.body;

        // Step 1: Create a new offer
        const newOffre = new Offre({
            titre,
            nbPoste,
            typeEmploi,
            experience,
            remuneration,
            langue,
            niveauEtude,
            dateExpiration,
            description,
            exigences,
            userId,
            dateCreation,
            idDomaine
        });

        await newOffre.save();

        // Step 2: Create a workflow associated with the new offer
        const newWorkflow = new Workflow({
            offreId: newOffre._id,  // Use the _id from the newly created offer
        });

        await newWorkflow.save();

        // Step 3: Create the initial step (step 0)
        const step0 = new Step({
            workflow_id: newWorkflow._id,  // Use the _id from the newly created workflow
            step_order: 0,
            titre: "En Attente" ,
            stepType: "PENDING"// Default title for step 0
        });

        await step0.save();



        res.status(201).json({
            message: 'Offre and Workflow added successfully',
            offre: newOffre,
            workflow: newWorkflow,
            offreId: newOffre._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding Offre or Workflow' });
    }
};



const getOffresByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const Offres = await Offre.find({ userId: userId });
        res.json(Offres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting Offres' });
    }
};

// Adding the new function getOffreById
const getOffreById = async (req, res) => {
    try {
        const { offreId } = req.params;
        const offre = await Offre.findById(offreId);
        if (!offre) {
            return res.status(404).json({ error: 'Offre not found' });
        }
        res.json(offre);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting Offre by ID' });
    }
};

const updateOffre = async (req, res) => {
    try {
        const userId = req.params.userId;
        const offreId = req.params.offreId;
        const { titre, nbPoste, typeEmploi, experience, remuneration, langue, niveauEtude, dateExpiration, description, exigences ,idDomaine} = req.body;
        const updatedOffre = await Offre.findByIdAndUpdate(offreId, { titre, nbPoste, typeEmploi, experience, remuneration, langue, niveauEtude, dateExpiration, description, exigences,idDomaine }, { new: true });
        if (!updatedOffre) {
            return res.status(404).json({ error: 'Offre not found' });
        }
        res.json({ message: 'Offre updated successfully', offre: updatedOffre });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating Offre' });
    }
};

const deleteOffre = async (req, res) => {
    try {
        const offreId = req.params.offreId;
        await Offre.findByIdAndDelete(offreId);
        await Workflow.deleteMany({ offre_id: offreId });
        res.json({ message: 'Offre deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting Offre' });
    }
};

const getAllOffres = async (req, res) => {
    try {
        // Récupérer toutes les offres triées par date de création descendante
        const offres = await Offre.find().sort({ dateCreation: 'desc' });

        res.status(200).json(offres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching all offres" });
    }
};
// Nouvelle fonction de recherche par type d'emploi
const rechercheParTypeEmploi = async (req, res) => {
    try {
        const typeEmploi = req.query.typeEmploi;
        const offres = await Offre.find({ typeEmploi: typeEmploi });
        res.status(200).json(offres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching by typeEmploi' });
    }
};

// Nouvelle fonction de recherche par expérience
const rechercheParExperience = async (req, res) => {
    try {
        const experience = req.query.experience;
        const offres = await Offre.find({ experience: experience });
        res.status(200).json(offres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching by experience' });
    }
};

// Nouvelle fonction de recherche par niveau d'étude
const rechercheParNiveauEtude = async (req, res) => {
    try {
        const niveauEtude = req.query.niveauEtude;
        const offres = await Offre.find({ niveauEtude: niveauEtude });
        res.status(200).json(offres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching by niveauEtude' });
    }
};

module.exports = {
    addOffreToUser,
    updateOffre,
    deleteOffre,
    getOffresByUser,
    getAllOffres,
    getOffreById,
    rechercheParTypeEmploi,
    rechercheParExperience,
    rechercheParNiveauEtude
};