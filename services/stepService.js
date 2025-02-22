const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Base URL of your API

// Ajouter un step
const createStep = async (stepData) => {
    try {
        const response = await axios.post(`${API_URL}/steps`, stepData);
        return response.data;
    } catch (error) {
        console.error('Error creating step:', error.response?.data || error.message);
        throw new Error('Error creating step');
    }
};

// Obtenir des steps par workflow_id
const getStepsByWorkflowId = async (workflowId) => {
    try {
        const response = await axios.get(`${API_URL}/steps/workflow/${workflowId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting steps by workflowId:', error.response?.data || error.message);
        throw new Error('Error getting steps');
    }
};

const getStepsEntrepriseByWorkflowId = async (workflowId) => {
    try {
        const response = await axios.get(`${API_URL}/steps/workflow/entreprise/${workflowId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting steps by workflowId:', error.response?.data || error.message);
        throw new Error('Error getting steps');
    }
};


// Obtenir un step par ID
const getStepById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/steps/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting step by ID:', error.response?.data || error.message);
        throw new Error('Error getting step');
    }
};

// Modifier un step
const updateStep = async (id, stepData) => {
    try {
        const response = await axios.put(`${API_URL}/steps/${id}`, stepData);
        return response.data;
    } catch (error) {
        console.error('Error updating step:', error.response?.data || error.message);
        throw new Error('Error updating step');
    }
};

// Supprimer un step
const deleteStep = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/steps/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting step:', error.response?.data || error.message);
        throw new Error('Error deleting step');
    }
};

// Modifier le champ viewedtest à true
const updateViewedTest = async (stepId) => {
    try {
        const response = await axios.patch(`${API_URL}/steps/${stepId}/viewedtest`);
        return response.data;
    } catch (error) {
        console.error('Error updating viewedtest:', error.response?.data || error.message);
        throw new Error('Error updating viewedtest');
    }
};

const updateUploadedTest = async (stepId) => {
    try {
        const response = await axios.patch(`${API_URL}/steps/${stepId}/uploadedtest`);
        return response.data;
    } catch (error) {
        console.error('Error updating viewedtest:', error.response?.data || error.message);
        throw new Error('Error updating viewedtest');
    }
};

module.exports = { createStep, getStepsByWorkflowId, getStepById, updateStep, deleteStep ,getStepsEntrepriseByWorkflowId,updateViewedTest,updateUploadedTest};
