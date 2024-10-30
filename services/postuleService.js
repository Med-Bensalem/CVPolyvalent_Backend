const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Mettez l'URL de votre API

// Service pour créer une candidature
const createPostule = async (userId, cvFile, lettreMotivationFile, offreId, description, dateCreation) => {
    try {
        const formData = new FormData();
        formData.append('cv', cvFile);
        formData.append('lettreMotivation', lettreMotivationFile);
        formData.append('userId', userId);
        formData.append('offreId', offreId);
        formData.append('description', description);
        formData.append('dateCreation', dateCreation);

        const response = await axios.post(`${API_URL}/postule`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la création de la candidature');
    }
};

// Service pour récupérer les candidatures d'un utilisateur
const getPostulesByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/postules`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la récupération des candidatures de l\'utilisateur');
    }
};

// Service pour récupérer les candidatures pour une offre
const getPostulesByOffer = async (offreId) => {
    try {
        const response = await axios.get(`${API_URL}/offres/${offreId}/postules`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la récupération des candidatures pour l\'offre');
    }
};

// Service pour mettre à jour le statut d'une candidature
const updatePostuleStatus = async (postuleId, status) => {
    try {
        const response = await axios.put(`${API_URL}/postule/update-status`, {
            postuleId,
            status
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la mise à jour du statut de la candidature');
    }
};

// Service pour envoyer des emails aux utilisateurs dont le statut a changé
const sendStatusChangeEmails = async (postuleIds) => {
    try {
        const response = await axios.post(`${API_URL}/postule/send-emails`, {
            postuleIds
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de l\'envoi des emails de notification');
    }
};

const getAcceptedPostules = async () => {
    try {
        const response = await axios.get(`${API_URL}/postules/accepted`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la récupération des candidatures acceptées');
    }
};

module.exports = {
    createPostule,
    getPostulesByUser,
    getPostulesByOffer,
    updatePostuleStatus,
    sendStatusChangeEmails,// Export the email sending function
    getAcceptedPostules
};
