const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Mettez l'URL de votre API

// Ajouter une expérience à un utilisateur
const addExperienceToUser = async (userId, experienceData) => {
    try {
        const response = await axios.post(`${API_URL}/users/${userId}/experiences`, experienceData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding experience to user');
    }
};

// Obtenir les expériences d'un utilisateur
const getExperiencesByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/experiences`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting experiences of user');
    }
};

// Mettre à jour une expérience
const updateExperience = async (userId, experienceId, experienceData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}/experiences/${experienceId}`, experienceData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating experience');
    }
};

// Supprimer une expérience
const deleteExperience = async (userId, experienceId) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}/experiences/${experienceId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting experience');
    }
};

module.exports = { addExperienceToUser, getExperiencesByUser, updateExperience, deleteExperience };
