import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Update this with your API URL
const addDocument = async (documentData) => {
    try {
        const response = await axios.post(`${API_URL}/documents`, documentData);
        return response.data;
    } catch (error) {
        console.error('Error adding document:', error.response?.data || error.message);
        throw new Error('Error adding document');
    }
};

const updateDocument = async (id, documentData) => {
    try {
        const response = await axios.put(`${API_URL}/documents/${id}`, documentData);
        return response.data;
    } catch (error) {
        console.error('Error updating document:', error.response?.data || error.message);
        throw new Error('Error updating document');
    }
};


// Supprimer une document
const deleteDocument = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/documents/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting document:', error.response?.data || error.message);
        throw new Error('Error deleting document');
    }
};

// Obtenir les documents par offreId
const getDocumentByOffer = async (offreId) => {
    try {
        const response = await axios.get(`${API_URL}/documents/offer/${offreId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting conditions by offer:', error.response?.data || error.message);
        throw new Error('Error getting conditions by offer');
    }
};

const updateUploadedDoc = async (docId) => {
    try {
        const response = await axios.patch(`${API_URL}/documents/${docId}/uploadeddoc`);
        return response.data;
    } catch (error) {
        console.error('Error updating viewedtest:', error.response?.data || error.message);
        throw new Error('Error updating viewedtest');
    }
};

export {addDocument,deleteDocument,getDocumentByOffer,updateDocument,updateUploadedDoc}