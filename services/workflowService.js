const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Update this with the URL of your API

// Ajouter un workflow
const createWorkflow = async (offreId) => {
    try {
        const response = await axios.post(`${API_URL}/workflows/${offreId}`);
        return response.data;
    } catch (error) {
        console.error('Error creating workflow:', error.response?.data || error.message);
        throw new Error('Error creating workflow');
    }
};

// Obtenir un workflow par offreId
const getWorkflowByOffreId = async (offreId) => {
    try {
        const response = await axios.get(`${API_URL}/workflows/${offreId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting workflow by offreId:', error.response?.data || error.message);
        throw new Error('Error getting workflow');
    }
};

// Obtenir une offre par workflowId
const getOffreByWorkflowId = async (workflowId) => {
    try {
        const response = await axios.get(`${API_URL}/offre-by-workflow/${workflowId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting offer by workflowId:', error.response?.data || error.message);
        throw new Error('Error getting offer');
    }
};

module.exports = { createWorkflow, getWorkflowByOffreId, getOffreByWorkflowId };
