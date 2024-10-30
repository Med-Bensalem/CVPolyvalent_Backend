const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Mettez l'URL de votre API

// Créer un test avec téléchargement de fichier
const createTest = async (userId, FileTest, title) => {
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

// Obtenir les tests d'un utilisateur par son userId
const getTestsByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/tests`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la récupération des tests de l\'utilisateur');
    }
};

// Obtenir un test par son identifiant
const getTestById = async (testId) => {
    try {
        const response = await axios.get(`${API_URL}/tests/${testId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la récupération du test par ID');
    }
};

// Mettre à jour un test avec téléchargement de fichier (facultatif)
const updateTest = async (testId, title, FileTest) => {
    try {
        const formData = new FormData();
        if (FileTest) {
            formData.append('FileTest', FileTest);
        }
        if (title) {
            formData.append('title', title);
        }

        const response = await axios.put(`${API_URL}/tests/${testId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la mise à jour du test');
    }
};

// Supprimer un test par son identifiant
const deleteTest = async (testId) => {
    try {
        const response = await axios.delete(`${API_URL}/tests/${testId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la suppression du test');
    }
};

module.exports = { createTest, getTestsByUser, getTestById, updateTest, deleteTest };
