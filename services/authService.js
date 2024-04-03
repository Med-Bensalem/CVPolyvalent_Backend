import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = async (username, password, firstName, lastName, dateOfBirth, gender, phone, image) => {
    try {
        await axios.post(`${API_URL}/register`, { username, password, firstName, lastName, dateOfBirth, gender, phone, image });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data.token;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { register, login };
