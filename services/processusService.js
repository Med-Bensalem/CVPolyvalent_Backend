import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update this with the URL of your API

// Ajouter un Processus
const addProcessus = async (processusData) => {
    try {
        const response = await axios.post(API_URL, processusData);
        return response.data;
    } catch (error) {
        console.error('Error adding processus:', error.response?.data || error.message);
        throw new Error('Erreur lors de l\'ajout du Processus');
    }
};

// Obtenir tous les Processus
const getAllProcessus = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching all processus:', error.response?.data || error.message);
        throw new Error('Erreur lors de la récupération de tous les Processus');
    }
};

// Obtenir un Processus par ID
const getProcessusById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching processus by ID:', error.response?.data || error.message);
        throw new Error('Erreur lors de la récupération du Processus');
    }
};

// Modifier un Processus
const updateProcessus = async (id, processusData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, processusData);
        return response.data;
    } catch (error) {
        console.error('Error updating processus:', error.response?.data || error.message);
        throw new Error('Erreur lors de la modification du Processus');
    }
};

// Supprimer un Processus
const deleteProcessus = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting processus:', error.response?.data || error.message);
        throw new Error('Erreur lors de la suppression du Processus');
    }
};

export { addProcessus, getAllProcessus, getProcessusById, updateProcessus, deleteProcessus };
