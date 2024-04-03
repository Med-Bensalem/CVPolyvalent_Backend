const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Mettez l'URL de votre API

// Ajouter une compétence à un utilisateur
const addCompetenceToUser = async (userId, competenceData) => {
    try {
        const response = await axios.post(`${API_URL}/users/${userId}/competences`, competenceData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding competence to user');
    }
};

// Obtenir les compétences d'un utilisateur
const getCompetencesByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/competences`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting competences of user');
    }
};

// Mettre à jour une compétence
const updateCompetence = async (userId, competenceId, competenceData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}/competences/${competenceId}`, competenceData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating competence');
    }
};

// Supprimer une compétence
const deleteCompetence = async (userId, competenceId) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}/competences/${competenceId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting competence');
    }
};
const getCompetenceById = async (competenceId) => {
    try {
        const response = await axios.get(`${API_URL}/competences/${competenceId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting competence by ID');
    }
};

module.exports = { addCompetenceToUser, getCompetencesByUser, updateCompetence, deleteCompetence ,getCompetenceById};
