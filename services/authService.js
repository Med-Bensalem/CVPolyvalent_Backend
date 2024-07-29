import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = async (password, name, prenom, email, role, secteur) => {
    try {
        let approuver = role === 'candidat' ? true : false;

        let userData;
        if (role === 'candidat') {
            userData = { password, name, prenom, email, role, approuver };
        } else if (role === 'entreprise') {
            userData = { password, name, email, role, secteur, approuver };
        } else {
            console.error("Invalid role");
            return false;
        }

        const response = await axios.post(`${API_URL}/register`, userData);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};



const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        const { token, user } = response.data;

        if (user && !user.approuver) {
            console.log("User not approved yet");
            return null;
        }

        return token;
    } catch (error) {
        console.error(error);
        return null;
    }
};


const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details by ID:', error);
        throw new Error('Failed to fetch user details');
    }
};

const completeProfile = async (userId, profileData) => {
    try {
        await axios.put(`${API_URL}/user/${userId}`, profileData);
        return true;
    } catch (error) {
        console.error('Error completing profile:', error);
        return false;
    }
};

const getUsersByRole = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/role/entreprise`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users by role:', error);
        throw new Error('Failed to fetch users by role');
    }
};
const getUsersApproved = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/approuved`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users approuved:', error);
        throw new Error('Failed to fetch users approuved');
    }
};
const getUsersNotApproved = async () => {
    try {
        const response = await axios.get(`${API_URL}/users/NotApprouved`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users Not Aprouved:', error);
        throw new Error('Failed to fetch users Not Aprouved');
    }
};
const userApproval = async (userId) => {
    try {
        await axios.put(`${API_URL}/user/approve/${userId}`);
        return true;
    } catch (error) {
        console.error('Error approving user:', error);
        return false;
    }
};
const userReject = async (userId) => {
    try {
        await axios.put(`${API_URL}/user/reject/${userId}`);
        return true;
    } catch (error) {
        console.error('Error rejecting user:', error);
        return false;
    }
};
const updateUserViews = async (userId) => {
    try {
        await axios.put(`${API_URL}/user/${userId}/views`);
        return true;
    } catch (error) {
        console.error('Error updating user views:', error);
        return false;
    }
};
const changePassword = async (userId, currentPassword, newPassword) => {
    try {
        const response = await axios.put(`${API_URL}/user/${userId}/change-password`, { currentPassword, newPassword });
        return { success: true, message: response.data.message };
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw { message: "Network or server error" }; // Throwing a generic error message
        }
    }
};

export { register, login, getUserById, completeProfile,getUsersByRole,userApproval ,getUsersApproved,getUsersNotApproved, updateUserViews,changePassword};