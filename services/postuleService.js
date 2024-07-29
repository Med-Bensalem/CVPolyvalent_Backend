const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Mettez l'URL de votre API

const createPostule = async (userId, cvFile, lettreMotivationFile, offreId, description,dateCreation) => {
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

const getOffresByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/postules`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting postules of user');
    }
};

const getPostulesByOffer = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/offres/${offreId}/postules`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting postules of offers');
    }
};
const updatePostuleState = async (postId) => {
    try {
        const response = await axios.put(`${API_URL}/postules/${postId}/changer-etat`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating postule state');
    }
};


module.exports = { createPostule,getOffresByUser ,getPostulesByOffer,updatePostuleState};
