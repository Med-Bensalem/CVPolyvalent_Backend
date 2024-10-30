const Workflow = require("../models/workflow");
const { sendEmail } = require("../services/emailService");
const Offre = require("../models/Offre");

const addWorkflow = async (req, res) => {
    try {
        const { offreId } = req.params;
        const newWorkflow = new Workflow({ offreId });
        await newWorkflow.save();

        // Send email notification
        const recipientEmail = 'hammabensalem0096@gmail.com'; // Replace with actual recipient email
        const subject = 'New Workflow Added';
        const text = `A new workflow has been added with offreId: ${offreId}`;

        await sendEmail(recipientEmail, subject, text);

        res.status(201).json({ message: 'Workflow added successfully', Workflow: newWorkflow });
    } catch (error) {
        console.error('Error in addWorkflow:', error.message);
        res.status(500).json({ error: 'Error adding workflow' });
    }
};

const getWorkflowByOffreId = async (req, res) => {
    try {
        const { offreId } = req.params;
        const workflow = await Workflow.findOne({ offreId });
        if (!workflow) {
            return res.status(404).json({ error: 'Workflow not found' });
        }
        res.status(200).json(workflow);
    } catch (error) {
        console.error('Error in getWorkflowByOffreId:', error.message);
        res.status(500).json({ error: 'Error getting workflow' });
    }
};

const getOffreByWorkflowId = async (req, res) => {
    try {
        const { workflowId } = req.params; // Récupérer le workflowId à partir des paramètres



        // Trouver le workflow par son ID
        const workflow = await Workflow.findById(workflowId);
        if (!workflow) {
            return res.status(404).json({ error: 'Workflow not found' });
        }

        // Récupérer l'offre associée au workflow (via offreId)
        const offre = await Offre.findById(workflow.offreId);
        if (!offre) {
            return res.status(404).json({ error: 'Offre not found' });
        }

        // Retourner l'offre
        res.status(200).json(offre);
    } catch (error) {
        console.error('Error in getOffreByWorkflowId:', error.message);
        res.status(500).json({ error: 'Error getting offer by workflow' });
    }
};



module.exports = { addWorkflow, getWorkflowByOffreId ,getOffreByWorkflowId};
