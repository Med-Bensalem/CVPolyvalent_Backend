const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Mettez l'URL de votre API

// Ajouter une certification à un utilisateur
const addCertificationToUser = async (userId, certificatData) => {
    try {
        const response = await axios.post(`${API_URL}/users/${userId}/certificates`, certificatData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error adding certification to user');
    }
};

// Obtenir les certifications d'un utilisateur
const getCertificatesByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/certificates`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting certifications of user');
    }
};

// Mettre à jour une certification
const updateCertification = async (userId, certificationId, certificatData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}/certificates/${certificationId}`, certificatData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error updating certification');
    }
};

// Supprimer une certification
const deleteCertification = async (userId, certificationId) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}/certificates/${certificationId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting certification');
    }
};

module.exports = { addCertificationToUser, getCertificatesByUser, updateCertification, deleteCertification };
