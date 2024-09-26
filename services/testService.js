const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Mettez l'URL de votre API

const createTest = async (userId,FileTest,title) => {
    try {
        const formData = new FormData();
        formData.append('FileTest', FileTest);
        formData.append('userId', userId);
        formData.append('title', title);

        const response = await axios.post(`${API_URL}/tests`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la création de test');
    }
};

const getTestsByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/tests`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting tests of user');
    }
};

module.exports = { createTest,getTestsByUser}