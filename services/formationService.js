const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Mettez l'URL de votre API

// Ajouter une formation à un utilisateur
const addFormationToUser = async (userId, formationData) => {
    try {
        const response = await axios.post(`${API_URL}/users/${userId}/formations`, formationData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding formation to user');
    }
};

// Obtenir les formations d'un utilisateur
const getFormationsByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/formations`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting formations of user');
    }
};

// Mettre à jour une formation
const updateFormation = async (userId, formationId, formationData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}/formations/${formationId}`, formationData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating formation');
    }
};

// Supprimer une formation
const deleteFormation = async (userId, formationId) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}/formations/${formationId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting formation');
    }
};

module.exports = { addFormationToUser, getFormationsByUser, updateFormation, deleteFormation };
