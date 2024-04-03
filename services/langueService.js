const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Mettez l'URL de votre API

// Ajouter une langue à un utilisateur
const addLanguageToUser = async (userId, languageData) => {
    try {
        const response = await axios.post(`${API_URL}/users/${userId}/languages`, languageData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding language to user');
    }
};

// Obtenir les langues d'un utilisateur
const getLanguagesByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/languages`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting languages of user');
    }
};

// Mettre à jour une langue
const updateLanguage = async (userId, languageId, languageData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}/languages/${languageId}`, languageData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating language');
    }
};

// Supprimer une langue
const deleteLanguage = async (userId, languageId) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}/languages/${languageId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting language');
    }
};

module.exports = { addLanguageToUser, getLanguagesByUser, updateLanguage, deleteLanguage };
