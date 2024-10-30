const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Base URL of your API

// Obtenir les étapes par id_domaine
const getStepsByDomaine = async (idDomaine) => {
    try {
        const response = await axios.get(`${API_URL}/suggestions/steps/${idDomaine}`);
        return response.data; // Return the steps data
    } catch (error) {
        console.error('Error getting steps by domaine:', error.response?.data || error.message);
        throw new Error('Error getting steps');
    }
};

// Save a new step
const saveStepsFromProcess = async (idDomaine, idWorkflow) => {
    if (!idDomaine || !idWorkflow) {
        throw new Error('Both idDomaine and idWorkflow are required');
    }

    try {
        const response = await axios.post(`${API_URL}/suggestions/steps/${idDomaine}`, {
            idWorkflow
        });
        return response.data; // Return saved steps
    } catch (error) {
        console.error('Error saving steps from process:', error.message);
        throw new Error(`Failed to save steps: ${error.response?.data?.message || error.message}`);
    }
};


module.exports = { getStepsByDomaine, saveStepsFromProcess };
