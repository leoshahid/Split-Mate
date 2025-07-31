import api from '../services/api';

const useExpense = () => {
    const fetchExpenses = async () => {
        try {
            const response = await api.get('/expenses');
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const createExpense = async (data) => {
        try {
            const response = await api.post('/expenses', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return { fetchExpenses, createExpense };
};

export default useExpense; 