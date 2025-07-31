import api from '../services/api';

const useGroup = () => {
    const fetchGroups = async () => {
        try {
            const response = await api.get('/groups');
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const createGroup = async (data) => {
        try {
            const response = await api.post('/groups', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return { fetchGroups, createGroup };
};

export default useGroup; 