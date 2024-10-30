const Document  = require("../models/Document");
const Condition = require("../models/Condition");
const Step = require("../models/Step");

const addDocument = async (req, res) => {
    try {
        const { offreId, titreDocument } = req.body;
        const newDocument = new Document({ offreId, titreDocument});
        await newDocument.save();
        res.status(201).json({ message: 'Document added successfully', Document: newDocument });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding condition' });
    }
};
const updateDocument = async (req, res) => {
    try {
        const { id } = req.params; // Récupère l'ID du document depuis les paramètres de l'URL
        const { titreDocument } = req.body; // Récupère les données du corps de la requête

        // Trouver le document par ID et le mettre à jour avec les nouvelles données
        const updatedDocument = await Document.findByIdAndUpdate(
            id,
            { titreDocument }, // Mettre à jour les champs souhaités (ici juste le titre)
            { new: true } // Renvoie le document mis à jour
        );

        // Si le document n'est pas trouvé
        if (!updatedDocument) {
            return res.status(404).json({ error: 'Document non trouvé' });
        }

        // Si la mise à jour est réussie, renvoyer le document mis à jour
        res.status(200).json({
            message: 'Document mis à jour avec succès',
            document: updatedDocument
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Erreur lors de la mise à jour du document'
        });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the step by its ID and remove it
        const deletedDoc = await Document.findByIdAndDelete(id);

        if (!deletedDoc) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.status(200).json({ message: 'Document deleted successfully', Condition: deletedDoc });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting Document' });
    }
};

const getDocummentByOffer = async (req, res) => {
    try {
        const offreId = req.params.offreId;
        const documents = await Document.find({ offreId: offreId });
        res.json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting conditions for offre' });
    }
};

const updateUploadedDocument = async (req, res) => {
    try {
        const { docId } = req.params; // Assurez-vous d'envoyer l'ID du step
        // Mettre à jour le champ viewedtest à true
        const updatedDoc = await Document.findByIdAndUpdate(
            docId,
            { uploadedDocument: true },
            { new: true } // Retourner le document mis à jour
        );

        if (!updatedDoc) {
            return res.status(404).json({ error: 'doc not found' });
        }

        res.status(200).json({ message: 'doc updated successfully', step: updatedDoc });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating doc viewedtest' });
    }
};

module.exports = {addDocument,getDocummentByOffer,deleteDocument,updateDocument,updateUploadedDocument}