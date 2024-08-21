import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update this with your API URL

// Ajouter une Condition
const addCondition = async (conditionData) => {
    try {
        const response = await axios.post(`${API_URL}/conditions`, conditionData);
        return response.data;
    } catch (error) {
        console.error('Error adding condition:', error.response?.data || error.message);
        throw new Error('Error adding condition');
    }
};

// Obtenir une Condition par ID
const getConditionById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/conditions/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting condition by ID:', error.response?.data || error.message);
        throw new Error('Error getting condition');
    }
};

// Modifier une Condition
const updateCondition = async (id, conditionData) => {
    try {
        const response = await axios.put(`${API_URL}/conditions/${id}`, conditionData);
        return response.data;
    } catch (error) {
        console.error('Error updating condition:', error.response?.data || error.message);
        throw new Error('Error updating condition');
    }
};

// Supprimer une Condition
const deleteCondition = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/conditions/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting condition:', error.response?.data || error.message);
        throw new Error('Error deleting condition');
    }
};

// Obtenir les Conditions par offreId
const getConditionByOffer = async (offreId) => {
    try {
        const response = await axios.get(`${API_URL}/conditions/offer/${offreId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting conditions by offer:', error.response?.data || error.message);
        throw new Error('Error getting conditions by offer');
    }
};
const getAllConditions = async () => {
    try {
        const response = await axios.get(`${API_URL}/conditions`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la récupération de tous les conditions');
    }
};
export { addCondition, getConditionById, updateCondition, deleteCondition, getConditionByOffer,getAllConditions };
