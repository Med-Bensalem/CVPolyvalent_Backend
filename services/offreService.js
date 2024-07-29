const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Mettez l'URL de votre API

// Ajouter une offre
const addOffre = async (userId, offreData) => {
    try {
        const response = await axios.post(`${API_URL}/users/${userId}/offres`, offreData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding offre ');
    }
};

// Obtenir les offres d'un utilisateur
const getOffresByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/offres`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting offres of user');
    }
};

// Mettre à jour une offre
const updateOffre = async (userId, offreId, offreData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}/offres/${offreId}`, offreData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating offre');
    }
};

// Supprimer une certification
const deleteOffre = async (userId, offreId) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}/offres/${offreId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting offre');
    }
};

const getAllOffres = async () => {
    try {
        const response = await axios.get(`${API_URL}/offres`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting all offres');
    }
};

const getOffreById = async (offreId) => {
    try {
        const response = await axios.get(`${API_URL}/offres/${offreId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting offre by ID');
    }
};


// Nouvelle fonction de recherche par type d'emploi
const rechercheParTypeEmploi = async (typeEmploi) => {
    try {
        const response = await axios.get(`${API_URL}/recherche/typeEmploi?typeEmploi=${typeEmploi}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error searching by typeEmploi');
    }
};

// Nouvelle fonction de recherche par expérience
const rechercheParExperience = async (experience) => {
    try {
        const response = await axios.get(`${API_URL}/recherche/experience?experience=${experience}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error searching by experience');
    }
};

// Nouvelle fonction de recherche par niveau d'étude
const rechercheParNiveauEtude = async (niveauEtude) => {
    try {
        const response = await axios.get(`${API_URL}/recherche/niveauEtude?niveauEtude=${niveauEtude}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error searching by niveauEtude');
    }
};

module.exports = {
    addOffre,
    getOffresByUser,
    updateOffre,
    deleteOffre,
    getAllOffres,
    getOffreById,
    rechercheParTypeEmploi,
    rechercheParExperience,
    rechercheParNiveauEtude
};