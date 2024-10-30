const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Mettez l'URL de votre API

// Service pour créer une work test
const createWorkTest = async (workFile,userId, testId, dateCreation,score) => {
    try {
        const formData = new FormData();
        formData.append('workFile', workFile);
        formData.append('userId', userId);
        formData.append('testId', testId);
        formData.append('dateCreation', dateCreation);
        formData.append('score', score);

        const response = await axios.post(`${API_URL}/workTest`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la création de la work test');
    }
};

// Service pour obtenir une work test par testId
const getWorkTestByTestId = async (testId) => {
    try {
        const response = await axios.get(`${API_URL}/workTest/${testId}`);
        // The response now includes bestScore, minScore, countLessThan50, and workTests
        const { bestScore, minScore, countLessThan50, workTests } = response.data;
        return { bestScore, minScore, countLessThan50, workTests }; // Return the structured data
    } catch (error) {
        console.error('Erreur lors de la récupération de la work test:', error);
        throw new Error('Erreur lors de la récupération de la work test');
    }
};



module.exports = {
    createWorkTest,
    getWorkTestByTestId
};
