const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Mettez l'URL de votre API

// Service pour créer une work test
const createDocumentCandidat = async (workFile,documentId,candidatId, dateCreation) => {
    try {
        const formData = new FormData();
        formData.append('workFile', workFile);
        formData.append('documentId', documentId);
        formData.append('candidatId', candidatId);
        formData.append('dateCreation', dateCreation);


        const response = await axios.post(`${API_URL}/candidatDocuments`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la création de la work test');
    }
};

const getDocumentByUser = async (candidatId) => {
    try {
        const response = await axios.get(`${API_URL}/documents/users/${candidatId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting conditions by offer:', error.response?.data || error.message);
        throw new Error('Error getting conditions by offer');
    }
};


module.exports = {
    createDocumentCandidat,
    getDocumentByUser
};
